import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/data";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: site.title,
    template: `%s | ${site.title}`,
  },
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>
        <div className="shell">
          <header className="siteHeader">
            <div className="wrap inner">
              <Link href="/" className="brand">
                gekal-study-ai <span>/ Study Memo for AI</span>
              </Link>
              <nav className="nav">
                <Link href="/">概要</Link>
                <Link href="/roadmap/">ロードマップ</Link>
                <a href={site.orgUrl}>GitHub</a>
              </nav>
            </div>
          </header>

          <main>{children}</main>

          <footer className="siteFooter">
            <div className="wrap inner">
              <span>最終更新 {site.updatedAt}</span>
              <span>
                ソース:{" "}
                <a href={`${site.orgUrl}/.github`}>gekal-study-ai/.github</a>
              </span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
