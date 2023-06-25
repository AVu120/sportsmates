import { FixedSizeList as List } from "react-window";
import Link from "next/link";

import { ProfilePicture } from "@/components/profile/ProfilePicture";
import { player } from "@/types/player";
import { useViewport } from "@/utils/hooks/useViewport";
import { formatLastSignInDate, getInitials } from "@/utils/player";

import styles from "./PlayersList.module.scss";

interface ComponentProps {
  players: player[];
  isLoading?: boolean;
}

const getDynamicRowHeight = (width: number) => {
  if (width < 400) return 420;
  if (width < 500) return 350;
  if (width < 600) return 320;
  if (width < 800) return 275;
  if (width < 1000) return 250;
  if (width < 1200) return 220;
  if (width < 1400) return 210;
  if (width < 1600) return 200;
  if (width >= 1600) return 200;
  return 200;
};

const PlayersList = ({ players, isLoading }: ComponentProps) => {
  const { width } = useViewport();
  if (isLoading)
    return <div style={{ textAlign: "center" }}>Loading players...</div>;
  if (!players || players.length === 0) {
    return <div style={{ textAlign: "center" }}>No players found</div>;
  }
  return (
    <div>
      <List
        height={800}
        itemCount={players.length}
        itemSize={getDynamicRowHeight(width)}
        width="100%"
      >
        {({ index, style }: { index: number; style: React.CSSProperties }) => {
          const {
            lastSignIn,
            firstName,
            lastName,
            profilePictureUrl,
            id,
            skillLevel,
            gender,
            age,
            city,
            description,
          } = players[index];
          const formattedLastSignInDate = formatLastSignInDate(lastSignIn);
          const initials = getInitials(firstName || "", lastName || "");

          return (
            <div style={style}>
              <Link href={`/players/${id}`} key={id}>
                <div className={styles.card}>
                  <div className={styles.top_row_info}>
                    <div style={{ display: "flex" }}>
                      <ProfilePicture
                        initials={initials}
                        url={profilePictureUrl || ""}
                      />
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
            </div>
          );
        }}
      </List>
    </div>
  );
};

export default PlayersList;
