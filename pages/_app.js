import "@/styles/globals.css";
import axios from "axios";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";

const SWROptions = {
  fetcher: (url) => axios.get(url).then((res) => res.data),
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <SWRConfig value={SWROptions}>
        <Component {...pageProps} />
      </SWRConfig>
    </SessionProvider>
  );
}
