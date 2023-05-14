import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import buttonStyles from "@/_styles/_buttons.module.scss";

import styles from "./DropDownMenu.module.scss";

interface ComponentProps {
  options: {
    label: string;
    link?: string;
    onClick?: () => void;
  }[];
}
export const DropDownMenu = ({ options }: ComponentProps) => (
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
        {options.map(({ label, link, onClick }) =>
          link ? (
            <Link href={link} key={label}>
              <DropdownMenu.Item
                className={`${styles.DropdownMenuItem} ${buttonStyles.link_button}`}
              >
                {label}
              </DropdownMenu.Item>
            </Link>
          ) : (
            <DropdownMenu.Item
              className={`${styles.DropdownMenuItem} ${buttonStyles.link_button}`}
              key={label}
              onClick={onClick}
            >
              {label}
            </DropdownMenu.Item>
          )
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
);
