import Link from "next/link";

import { ProfilePicture } from "@/components/profile/ProfilePicture";
import { player } from "@/types/player";
import { months } from "@/utils/constants/dates";
import { formatLastSignInDate } from "@/utils/player";

import styles from "./PlayersList.module.scss";
interface ComponentProps {
  players: player[];
  isLoading: boolean;
}

const PlayersList = ({ players, isLoading }: ComponentProps) => {
  if (isLoading)
    return <div style={{ textAlign: "center" }}>Loading players...</div>;
  if (!players || players.length === 0) {
    return <div style={{ textAlign: "center" }}>No players found</div>;
  }
  return (
    <div>
      {players.map(
        ({
          firstName,
          lastName,
          skillLevel,
          gender,
          age,
          lastSignIn,
          city,
          description,
          id,
        }) => {
          const formattedLastSignInDate = formatLastSignInDate(lastSignIn);
          return (
            <Link href={`/players/${id}`} key={id}>
              <div className={styles.card}>
                <div className={styles.top_row_info}>
                  <div style={{ display: "flex" }}>
                    <ProfilePicture height="75px" />
                    <div className={styles.name_skillLevel_gender_age}>
                      <p
                        style={{ fontWeight: "bold" }}
                      >{`${firstName} ${lastName}`}</p>
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
            </Link>
          );
        }
      )}
    </div>
  );
};

export default PlayersList;
