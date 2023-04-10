import type { AppType } from "next/app";

import { trpc } from "../utils/trpc";

import "./_index.scss";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};
export default trpc.withTRPC(MyApp);
