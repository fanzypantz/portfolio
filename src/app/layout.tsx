import "@styles/globals.scss";

import Nav from "@components/Nav/Nav";
import { ReactNode } from "react";
import { UserProvider } from "@components/Auth/UserProvider";
import { getSessionPayload } from "@lib/Auth/sessions";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const user = await getSessionPayload();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body>
        <UserProvider userData={user}>
          <Nav user={user} />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
