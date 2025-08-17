// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { fetchTags } from "@/lib/api";

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Simple note taking app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await fetchTags();

  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header categories={categories} />
          <main>{children}</main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
