import { ProfilePicture } from "@/components/profile/ProfilePicture";

import styles from "./PlayersList.module.scss";
const mockPlayerData = {
  id: "clh2rt44j0000z5nro5y98v98",
  supabaseId: "b780ea0e-4c34-450e-8f41-8b0761786d90",
  email: "avu120@gmail.com",
  firstName: "Anthony",
  lastName: "Vu",
  skillLevel: "beginner",
  birthday: "1994-09-15T00:00:00.000Z",
  createdAt: "2023-04-30T02:06:23.319Z",
  lastSignIn: "2023-05-14T02:03:17.403Z",
  city: "Wentworthville NSW 2145, Australia",
  description:
    "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
  gender: "male",
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export const PlayersList = () => {
  const {
    firstName,
    lastName,
    skillLevel,
    gender,
    birthday,
    lastSignIn,
    city,
    description,
  } = mockPlayerData;
  const age = Math.floor(
    (new Date().getTime() - new Date(birthday).getTime()) / 3.15576e10
  );

  const lastSignInDate = new Date(lastSignIn);
  const formattedLastSignInDate = `${lastSignInDate.getDate()} ${
    months[lastSignInDate.getMonth()]
  } ${lastSignInDate.getFullYear()}`;

  return (
    <div className={styles.list}>
      <div className={styles.card}>
        <div className={styles.top_row_info}>
          <div style={{ display: "flex" }}>
            <ProfilePicture height="100px" />
            <div className={styles.name_skillLevel_gender_age}>
              <p style={{ fontWeight: "bold" }}>{`${firstName} ${lastName}`}</p>
              <p>{skillLevel}</p>
              <p>{`${gender}, ${age}`}</p>
            </div>
          </div>
          <div className={styles.lastSignIn_city}>
            <p>{formattedLastSignInDate}</p>
            <p>{city}</p>
          </div>
        </div>
        <div className={styles.description}>{description}</div>
      </div>
      <div className={styles.card}>
        <div className={styles.top_row_info}>
          <div style={{ display: "flex" }}>
            <ProfilePicture height="100px" />
            <div className={styles.name_skillLevel_gender_age}>
              <p style={{ fontWeight: "bold" }}>{`${firstName} ${lastName}`}</p>
              <p>{skillLevel}</p>
              <p>{`${gender}, ${age}`}</p>
            </div>
          </div>
          <div className={styles.lastSignIn_city}>
            <p>{formattedLastSignInDate}</p>
            <p>{city}</p>
          </div>
        </div>
        <div className={styles.description}>{description}</div>
      </div>
      <div className={styles.card}>
        <div className={styles.top_row_info}>
          <div style={{ display: "flex" }}>
            <ProfilePicture height="100px" />
            <div className={styles.name_skillLevel_gender_age}>
              <p style={{ fontWeight: "bold" }}>{`${firstName} ${lastName}`}</p>
              <p>{skillLevel}</p>
              <p>{`${gender}, ${age}`}</p>
            </div>
          </div>
          <div className={styles.lastSignIn_city}>
            <p>{formattedLastSignInDate}</p>
            <p>{city}</p>
          </div>
        </div>
        <div className={styles.description}>{description}</div>
      </div>
      <div className={styles.card}>
        <div className={styles.top_row_info}>
          <div style={{ display: "flex" }}>
            <ProfilePicture height="100px" />
            <div className={styles.name_skillLevel_gender_age}>
              <p style={{ fontWeight: "bold" }}>{`${firstName} ${lastName}`}</p>
              <p>{skillLevel}</p>
              <p>{`${gender}, ${age}`}</p>
            </div>
          </div>
          <div className={styles.lastSignIn_city}>
            <p>{formattedLastSignInDate}</p>
            <p>{city}</p>
          </div>
        </div>
        <div className={styles.description}>{description}</div>
      </div>
      <div className={styles.card}>
        <div className={styles.top_row_info}>
          <div style={{ display: "flex" }}>
            <ProfilePicture height="100px" />
            <div className={styles.name_skillLevel_gender_age}>
              <p style={{ fontWeight: "bold" }}>{`${firstName} ${lastName}`}</p>
              <p>{skillLevel}</p>
              <p>{`${gender}, ${age}`}</p>
            </div>
          </div>
          <div className={styles.lastSignIn_city}>
            <p>{formattedLastSignInDate}</p>
            <p>{city}</p>
          </div>
        </div>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  );
};
