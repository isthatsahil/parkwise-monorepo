import type { Metadata } from "next";
import { ApolloProvider } from "@parkwise/network/src/config/apollo";
import localFont from "next/font/local";
import "@parkwise/ui/src/app/globals.css";
import { Toaster } from "@parkwise/ui/@/components/ui/sonner";
import SessionProvider from "@parkwise/ui/src/components/molecules/SessionProvider";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Parkwise",
  description:
    "An application for managing, monitoring vehicles related parking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <ApolloProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            {children}
            <Toaster closeButton />
          </body>
        </ApolloProvider>
      </SessionProvider>
    </html>
  );
}
