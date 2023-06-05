import { ChangeEvent } from "react";
import * as Avatar from "@radix-ui/react-avatar";
import { UploadIcon } from "@radix-ui/react-icons";
import { CldImage } from "next-cloudinary";

import styles from "./ProfilePicture.module.scss";

interface ComponentProps {
  canUpload?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  isUploading?: boolean;
  url?: string;
  initials: string;
}

export const ProfilePicture = ({
  canUpload,
  onChange,
  isUploading,
  url,
  initials,
}: ComponentProps) => {
  if (canUpload)
    return (
      <div>
        <input
          accept="image/*"
          id="upload-profile-picture-button"
          type="file"
          style={{ display: "none" }}
          onChange={onChange}
        />
        <label
          htmlFor="upload-profile-picture-button"
          style={{ cursor: "pointer" }}
        >
          <Avatar.Root className={styles.AvatarRoot}>
            {isUploading && <p>Uploading...</p>}
            {url ? (
              <Avatar.Image
                className={styles.AvatarImage}
                src={url}
                alt="Profile picture"
              />
            ) : (
              <Avatar.Fallback className={styles.AvatarFallback}>
                {initials}
              </Avatar.Fallback>
            )}

            <div className={styles.upload_icon_container}>
              <UploadIcon className={styles.upload_icon} />
            </div>
          </Avatar.Root>
        </label>
      </div>
    );

  return (
    <div>
      <Avatar.Root className={styles.AvatarRoot}>
        {url ? (
          <Avatar.Image
            className={styles.AvatarImage}
            src={url}
            alt="Profile picture"
          />
        ) : (
          <Avatar.Fallback className={styles.AvatarFallback}>
            {initials}
          </Avatar.Fallback>
        )}
      </Avatar.Root>
    </div>
  );
};
