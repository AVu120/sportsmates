import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Form from "@radix-ui/react-form";
import { Cross2Icon } from "@radix-ui/react-icons";

import buttonStyles from "@/_styles/_buttons.module.scss";
import formStyles from "@/_styles/_forms.module.scss";
import { Input } from "@/components/form/Input";

import styles from "./SendMessage.module.scss";

interface ComponentProps {
  open: boolean;
  onClose: () => void;
  onSend: () => void;
}

export const SendMessageModal = ({ open, onClose, onSend }: ComponentProps) => (
  <Dialog.Root open={open}>
    <Dialog.Portal>
      <Dialog.Overlay className={styles.DialogOverlay} />
      <Dialog.Content
        className={styles.DialogContent}
        onPointerDownOutside={onClose}
        onInteractOutside={onClose}
      >
        <Dialog.Title className={styles.DialogTitle}>Send Message</Dialog.Title>
        <Form.Root onSubmit={onSend}>
          <Input isRequired type="textarea" name="message" />
          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          >
            <Form.Submit>
              <button className={buttonStyles.primary_button} type="submit">
                Send
              </button>
            </Form.Submit>
          </div>
        </Form.Root>

        <button
          className={styles.IconButton}
          aria-label="Close"
          onClick={onClose}
        >
          <Cross2Icon />
        </button>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
