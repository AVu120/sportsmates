import { ChangeEvent } from "react";
import * as Avatar from "@radix-ui/react-avatar";
import { UploadIcon } from "@radix-ui/react-icons";
import { CldImage } from "next-cloudinary";

import styles from "./ProfilePicture.module.scss";

interface ComponentProps {
  canUpload?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  isUploading?: boolean;
  publicId?: string;
}

export const ProfilePicture = ({
  canUpload,
  onChange,
  isUploading,
  publicId,
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
            {publicId ? (
              <CldImage
                className={styles.AvatarImage}
                width={75}
                height={75}
                src={publicId}
                alt="profile picture"
              />
            ) : (
              <Avatar.Fallback className={styles.AvatarFallback}>
                AV
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
        {publicId ? (
          <CldImage
            className={styles.AvatarImage}
            width={75}
            height={75}
            src={publicId}
            alt="profile picture"
          />
        ) : (
          <Avatar.Fallback className={styles.AvatarFallback}>
            AV
          </Avatar.Fallback>
        )}
      </Avatar.Root>
    </div>
  );
};
