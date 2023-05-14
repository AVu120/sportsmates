import * as Avatar from "@radix-ui/react-avatar";

import styles from "./ProfilePicture.module.scss";

interface ComponentProps {
  height?: any;
}

export const ProfilePicture = ({ height }: ComponentProps) => (
  <div>
    <Avatar.Root className={styles.AvatarRoot}>
      <Avatar.Image
        className={styles.AvatarImage}
        style={{ height }}
        // src=""
        src="https://media.licdn.com/dms/image/D5603AQECPv6Ob-MP4g/profile-displayphoto-shrink_800_800/0/1666912345281?e=1689811200&v=beta&t=RUlU5Dt7y_7Nfs_t6e6Get3BiaCI6TS-s7mOog1cvMs"
        alt="Pedro Duarte"
      />
      <Avatar.Fallback className={styles.AvatarFallback}>AV</Avatar.Fallback>
    </Avatar.Root>
  </div>
);
