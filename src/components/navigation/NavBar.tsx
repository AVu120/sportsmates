import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";

import buttonStyles from "@/src/_styles/_buttons.module.scss";
import { Page } from "@/src/types/pages";

import styles from "./NavBar.module.scss";

interface ComponentProps {
  page: Page;
}

export const NavBar = ({ page }: ComponentProps) => {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List className={styles.list}>
        <NavigationMenu.Item
          className={`${buttonStyles.link_button} ${
            page === "home" ? buttonStyles.selected_link_button : ""
          }`}
        >
          <Link href="/">Players </Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item
          className={`${buttonStyles.link_button} ${
            page === "meetups" ? buttonStyles.selected_link_button : ""
          }`}
        >
          <Link href="/meetups">Meetups </Link>
        </NavigationMenu.Item>

        {/* <NavigationMenu.Indicator className={styles.NavigationMenuIndicator} /> */}
      </NavigationMenu.List>

      {/* <NavigationMenu.Viewport /> */}
    </NavigationMenu.Root>
  );
};
