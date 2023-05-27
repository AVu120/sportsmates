import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Form from "@radix-ui/react-form";
import { Cross2Icon } from "@radix-ui/react-icons";

import buttonStyles from "@/_styles/_buttons.module.scss";
import formStyles from "@/_styles/_forms.module.scss";
import { Input } from "@/components/form/Input";

import styles from "./SendMessage.module.scss";

export const SendMessageModal = () => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className={buttonStyles.primary_button}>Message</button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className={styles.DialogOverlay} />
      <Dialog.Content className={styles.DialogContent}>
        <Dialog.Title className={styles.DialogTitle}>Send Message</Dialog.Title>
        <Form.Root>
          <Input isRequired type="textarea" name="message" />
        </Form.Root>
        <div
          style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}
        >
          <button className={buttonStyles.primary_button} onClick={() => {}}>
            Send
          </button>
        </div>
        <button className={styles.IconButton} aria-label="Close">
          <Cross2Icon />
        </button>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
