import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/server/lib/prisma";
import {
  ANY_DISTANCE_FROM_YOU,
  ANY_GENDER,
  ANY_SPORT,
  CLOSEST_TO_ME,
  genderOptions,
  MOST_RECENTLY_ACTIVE,
  OLDEST_TO_YOUNGEST,
  searchRadiusOptions,
  sortByOptions,
  sportOptions,
  YOUNGEST_TO_OLDEST,
} from "@/utils/constants/player";
import { calculateAge } from "@/utils/player";
import { listPlayersBodyAPIValidation } from "@/utils/validation/player";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    listPlayersBodyAPIValidation.parse(req.query);

    const { longitude, latitude, searchRadius, gender, sortBy, sport, offset } =
      req.query;

    if (longitude && latitude) {
      if (
        Number(longitude) < -180 ||
        Number(longitude) > 180 ||
        Number(latitude) < -180 ||
        Number(latitude) > 180
      ) {
        return res.status(400).json({
          message: "Latitude and longitude must be between -180 and 180.",
        });
      }
    }

    if (offset) {
      if (isNaN(Number(offset))) {
        return res.status(400).json({ message: "Offset must be a number." });
      }
      if (Number(offset) < 0) {
        return res
          .status(400)
          .json({ message: "Offset must be greater than or equal to 0." });
      }
    }

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

    if (sport !== ANY_SPORT) {
      whereClause += ` AND sport = '${sport}'`;
    }

    let players = await prisma.$queryRaw`
  SELECT "supabaseId" as id, "firstName", "lastName", "skillLevel", birthday, "lastSignIn", city, description, gender, "profilePictureUrl", "isProfilePictureApproved", sport
  FROM "Player"
  ${Prisma.raw(whereClause)}
  ${Prisma.raw(sortByClauseOptions[sortBy as string])}
  OFFSET ${Number(offset) || 0} LIMIT 10;`;

    // Birthday is redacted and only age is returned to prevent leakage of PII to the client.
    // @ts-ignore
    players = players.map((player) => {
      const age = calculateAge(player.birthday);
      const { birthday, ...playerWithoutBirthday } = player;

      return {
        ...playerWithoutBirthday,
        age,
        // Only show profile picture if it has been approved by admin
        profilePictureUrl: player?.isProfilePictureApproved
          ? player?.profilePictureUrl
          : "",
      };
    });

    return res.status(200).json(players);
  } else res.status(400).json({ message: "Wrong request method" });
}
