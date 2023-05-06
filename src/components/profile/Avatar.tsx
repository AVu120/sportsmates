import * as Avatar from "@radix-ui/react-avatar";

import styles from "./Avatar.module.scss";

export const ProfilePicture = () => (
  <div>
    <Avatar.Root className={styles.AvatarRoot}>
      <Avatar.Image
        className={styles.AvatarImage}
        // src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
        src=""
        alt="Pedro Duarte"
      />
      <Avatar.Fallback className={styles.AvatarFallback}>AV</Avatar.Fallback>
    </Avatar.Root>
  </div>
);
