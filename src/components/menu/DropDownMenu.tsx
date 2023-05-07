import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import buttonStyles from "@/_styles/_buttons.module.scss";

import styles from "./DropDownMenu.module.scss";

export const DropDownMenu = () => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild>
      <button
        className={buttonStyles.dropdown_menu}
        aria-label="Customise options"
      >
        <HamburgerMenuIcon />
      </button>
    </DropdownMenu.Trigger>

    <DropdownMenu.Portal>
      <DropdownMenu.Content className={styles.DropdownMenuContent}>
        <Link href="/">
          <DropdownMenu.Item
            className={`${styles.DropdownMenuItem} ${buttonStyles.link_button}`}
          >
            Players
          </DropdownMenu.Item>
        </Link>
        <Link href="/meetups">
          <DropdownMenu.Item
            className={`${styles.DropdownMenuItem} ${buttonStyles.link_button}`}
          >
            Meetups
          </DropdownMenu.Item>
        </Link>
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
);
