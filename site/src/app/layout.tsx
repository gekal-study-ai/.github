import type { Metadata } from "next";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";

import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { site } from "@/content/data";
import theme from "@/theme";

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
    <html lang="ja" suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider options={{ key: "mui" }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
              sx={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}
            >
              <SiteHeader />
              <Box component="main" sx={{ flex: 1 }}>
                {children}
              </Box>
              <SiteFooter />
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
