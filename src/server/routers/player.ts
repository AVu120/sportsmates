/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { Prisma } from "@prisma/client";
import sgMail from "@sendgrid/mail";
import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";

import { supabase } from "@/services/authentication";
import {
  ANY_DISTANCE_FROM_YOU,
  ANY_GENDER,
  CLOSEST_TO_ME,
  genderOptions,
  MOST_RECENTLY_ACTIVE,
  OLDEST_TO_YOUNGEST,
  searchRadiusOptions,
  sortByOptions,
  YOUNGEST_TO_OLDEST,
} from "@/utils/constants/player";

import { prisma } from "../lib/prisma";
import { procedure, router } from "../trpc";

/** User must be logged in and the owner of this data to access this. */
const secureApi = (id: string, supabaseId: string) => {
  if (id !== supabaseId) {
    throw new Error("You are not authorized to do this.");
  }
};

const calculateAge = (birthday: string) =>
  Math.floor(
    // @ts-ignore
    (new Date().getTime() - new Date(birthday).getTime()) / 3.15576e10
  );

export const playerRouter = router({
  getPrivateData: procedure
    .input(
      z.object({
        supabaseId: z.string().uuid(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { supabaseId } = input;

      // Only enable this to run from server in getServerSideProps.
      // Blocks use from client side.
      //@ts-ignore
      const accessToken = ctx?.req?.cookies["my-access-token"];
      //@ts-ignore
      const refreshToken = ctx?.req?.cookies["my-refresh-token"];
      if (accessToken && refreshToken) {
        const {
          data: { user },
          error,
        } = await supabase?.auth.setSession({
          //@ts-ignore
          refresh_token: refreshToken,
          //@ts-ignore
          access_token: accessToken,
        });

        if (error || user?.id !== supabaseId)
          throw new Error("You are not authorized to do this.");

        const latestPlayer = await prisma.player.findUnique({
          where: {
            supabaseId,
          },
        });
        return latestPlayer;
      } else throw new Error("You are not authorized to do this.");
    }),
  getPublicData: procedure
    .input(
      z.object({
        supabaseId: z.string().uuid(),
      })
    )
    .query(async ({ input }) => {
      const latestPlayer = await prisma.player.findUnique({
        select: {
          supabaseId: true,
          firstName: true,
          lastName: true,
          skillLevel: true,
          gender: true,
          birthday: true,
          city: true,
          description: true,
          lastSignIn: true,
        },
        where: {
          supabaseId: input.supabaseId,
        },
      });

      const redactedPlayer = {
        id: latestPlayer?.supabaseId,
        firstName: latestPlayer?.firstName,
        lastName: latestPlayer?.lastName,
        skillLevel: latestPlayer?.skillLevel,
        gender: latestPlayer?.gender,
        //@ts-ignore
        age: calculateAge(latestPlayer?.birthday as string),
        city: latestPlayer?.city,
        description: latestPlayer?.description,
        lastSignIn: latestPlayer?.lastSignIn,
      };
      return redactedPlayer;
    }),
  getLatest: procedure.query(async ({}) => {
    const latestPlayer = await prisma.player.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });
    return latestPlayer || "No players yet";
  }),
  list: procedure
    .input(
      z.object({
        longitude: z.number().min(-180).max(180).optional(),
        latitude: z.number().min(-180).max(180).optional(),
        // Search range in meters.
        searchRadius: z
          .string()
          .refine(
            (data) =>
              searchRadiusOptions.map(({ value }) => value).includes(data),
            "Not a valid value"
          ),
        gender: z
          .string()
          .refine(
            (data) => genderOptions.map(({ value }) => value).includes(data),
            "Not a valid value"
          ),
        sortBy: z
          .string()
          .refine(
            (data) => sortByOptions.map(({ value }) => value).includes(data),
            "Not a valid value"
          ),
      })
    )
    .query(async ({ input }) => {
      /**
       * For pagination docs you can have a look here
       * @see https://trpc.io/docs/useInfiniteQuery
       * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
       */

      const { longitude, latitude, searchRadius, gender, sortBy } = input;

      const sortByClauseOptions: { [index: string]: string } = {
        [MOST_RECENTLY_ACTIVE]: `ORDER BY "lastSignIn" DESC`,
        [OLDEST_TO_YOUNGEST]: "ORDER BY birthday ASC",
        [YOUNGEST_TO_OLDEST]: "ORDER BY birthday DESC",
        [CLOSEST_TO_ME]: `ORDER BY coordinates <-> ST_Point(${longitude}, ${latitude}) ASC`,
      };

      let whereClause = "";
      // If search radius is not set.
      if (searchRadius === ANY_DISTANCE_FROM_YOU) {
        // If gender is set.
        if (gender !== ANY_GENDER) {
          whereClause += `WHERE gender = '${gender}' AND "isApproved" = true`;
        } else whereClause += `WHERE "isApproved" = true`;
      } else {
        whereClause += `WHERE ST_DWithin(coordinates, ST_Point(${longitude}, ${latitude}), ${searchRadius}000)`;

        if (gender !== ANY_GENDER) {
          whereClause += ` AND gender = '${gender}' AND "isApproved" = true`;
        } else whereClause += ` AND "isApproved" = true`;
      }

      let players = await prisma.$queryRaw`
      SELECT "supabaseId" as id, "firstName", "lastName", "skillLevel", birthday, "lastSignIn", city, description, gender
      FROM "Player"
      ${Prisma.raw(whereClause)}
      ${Prisma.raw(sortByClauseOptions[sortBy])}
      LIMIT 10;`;

      // Birthday is redacted and only age is returned to prevent leakage of PII to the client.
      // @ts-ignore
      players = players.map((player) => {
        const age = calculateAge(player.birthday);
        const { birthday, ...playerWithoutBirthday } = player;

        return { ...playerWithoutBirthday, age };
      });

      return players;
    }),
  add: procedure
    .input(
      z.object({
        supabaseId: z.string().uuid(),
        // Pass in Javascript Date object here containing user's local timezone info (aka new Date() in browser).
        email: z.string().email(),
        createdAt: z.coerce.date(),
      })
    )
    .mutation(async ({ input }) => {
      const player = await prisma.player.create({
        data: input,
      });
      return player;
    }),
  update: procedure
    .input(
      z.object({
        supabaseId: z.string().uuid(),
        firstName: z.string(),
        lastName: z.string(),
        skillLevel: z
          .string()
          .refine(
            (data) => ["Beginner", "Intermediate", "Advanced"].includes(data),
            "Not a valid value"
          ),
        birthday: z.coerce.date(),
        city: z.string(),
        description: z.string(),
        longitude: z.number().min(-180).max(180).optional(),
        latitude: z.number().min(-180).max(180).optional(),
        gender: z
          .string()
          .refine(
            (data) => ["Male", "Female"].includes(data),
            "Not a valid value"
          ),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // @ts-ignore
      secureApi(ctx?.user?.id, input.supabaseId);

      const {
        supabaseId,
        firstName,
        lastName,
        skillLevel,
        birthday,
        city,
        description,
        longitude,
        latitude,
        gender,
      } = input;

      const isUpdatingCoordinates =
        typeof longitude === "number" && typeof latitude === "number";

      if (isUpdatingCoordinates)
        await prisma.$queryRaw`
          UPDATE "Player"
          SET "firstName" = ${firstName}, 
              "lastName" = ${lastName}, 
              "skillLevel" = ${skillLevel}, 
              birthday = ${birthday},
              city = ${city},
              description = ${description},
              coordinates = ST_Point(${longitude}, ${latitude}),
              gender = ${gender}
          WHERE "supabaseId" = ${supabaseId};`;
      else
        await prisma.$queryRaw`
          UPDATE "Player"
          SET "firstName" = ${firstName}, 
              "lastName" = ${lastName}, 
              "skillLevel" = ${skillLevel}, 
              birthday = ${birthday},
              city = ${city},
              description = ${description},
              gender = ${gender}
          WHERE "supabaseId" = ${supabaseId};`;
      return input;
    }),
  updateLastSignIn: procedure
    .input(
      z.object({
        email: z.string().email(),
        lastSignIn: z.coerce.date(),
      })
    )
    .mutation(async ({ input }) => {
      const { email, lastSignIn } = input;
      await prisma.$queryRaw`
      UPDATE "Player"
      SET "lastSignIn" = ${lastSignIn}
      WHERE "email" = ${email};`;
      return input;
    }),
  sendEmail: procedure
    .input(
      z.object({
        fromSupabaseId: z.string().uuid(),
        supabaseId: z.string().uuid(),
        fromName: z.string(),
        message: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // @ts-ignore
      if (!ctx.user)
        throw new Error("You must be logged in to send a message.");

      const { supabaseId, fromName, message, fromSupabaseId } = input;

      sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

      const emailResponse = await prisma.player.findUnique({
        select: {
          email: true,
        },
        where: {
          supabaseId: supabaseId,
        },
      });

      // Basically will never run but I want to keep TS happy.
      if (!emailResponse?.email)
        throw new Error("This user has not provided an email.");

      const { email } = emailResponse;

      const msg = {
        to: email, // Change to your recipient
        from: "info@sportsmates.net", // Change to your verified sender
        subject: `${fromName} has messaged you from Sportsmates!`,
        text: message,
        html: `<strong>${message}</strong>`,
      };

      await new Promise((resolve, reject) => {
        sgMail
          .send(msg)
          .then(() => {
            console.log(
              `Email sent from supabaseIds: ${fromSupabaseId} to ${supabaseId}`
            );
            resolve(true);
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      });
    }),
  uploadProfilePicture: procedure
    .input(
      z.object({
        supabaseId: z.string().uuid(),
        // @ts-ignore
        file: z.custom<File>(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { supabaseId, file } = input;
      console.log({ file });
      // @ts-ignore
      secureApi(ctx.user?.id, supabaseId);

      // Use the uploaded file's name as the asset's public ID and
      // allow overwriting the asset with new versions
      // const options = {
      //   upload_preset: process.env.SIGNED_UPLOAD_PRESET,
      //   public_id: `${supabaseId}-profile-picture`,
      // };

      const timestamp = Math.round(new Date().getTime() / 1000);
      const signature = cloudinary.utils.api_sign_request(
        {
          timestamp: timestamp,
          public_id: `${supabaseId}-profile-picture`,
          folder: process.env.IMAGE_FOLDER || "",
          upload_preset: process.env.SIGNED_UPLOAD_PRESET || "",
        },
        process.env.CLOUDINARY_API_SECRET || ""
      );

      const formData = new FormData();
      formData.append("file", file);
      formData.append("public_id", `${supabaseId}-profile-picture`);
      formData.append("api_key", process.env.CLOUDINARY_API_KEY || "");
      formData.append("timestamp", timestamp.toString());
      formData.append("signature", signature);
      formData.append("folder", process.env.IMAGE_FOLDER || "");
      formData.append("upload_preset", process.env.SIGNED_UPLOAD_PRESET || "");

      const requestOptions = {
        method: "POST",
        body: formData,
      };
      try {
        // Upload the image
        // @ts-ignore
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
          requestOptions
        );
        // const result = await cloudinary.uploader.upload_stream(file, options);
        console.log("RAN");
        const data = await response.json();
        const { public_id, version } = data;
        return { public_id, version } as { public_id: string; version: number };
      } catch (error) {
        console.log("ERROR");
        console.error(error);
      }
    }),
});
