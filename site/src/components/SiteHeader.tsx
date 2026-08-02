import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { site } from "@/content/data";
import { fontMono } from "@/theme";

const navItems = [
  { label: "概要", href: "/" },
  { label: "ロードマップ", href: "/roadmap/" },
  { label: "GitHub", href: site.orgUrl },
];

const navLinkSx = {
  color: "text.secondary",
  fontFamily: fontMono,
  fontSize: "0.8rem",
  letterSpacing: "0.06em",
  py: 0.5,
  borderBottom: "1px solid transparent",
  transition: "color .15s, border-color .15s",
  "&:hover": { color: "primary.main", borderBottomColor: "primary.main" },
} as const;

export default function SiteHeader() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        backdropFilter: "blur(10px)",
        backgroundColor:
          "color-mix(in srgb, var(--mui-palette-background-default) 78%, transparent)",
      }}
    >
      <Container>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 62,
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <Link href="/" underline="none">
            <Stack direction="row" sx={{ alignItems: "center", gap: 1.25 }}>
              {/* 稼働中を示すインジケータ */}
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "linear-gradient(120deg, var(--accent-1), var(--accent-2))",
                  boxShadow: "0 0 8px var(--accent-1)",
                  flexShrink: 0,
                }}
              />
              <Typography
                component="span"
                sx={{ fontFamily: fontMono, fontSize: "0.85rem", fontWeight: 600 }}
              >
                gekal-study-ai
                <Box component="span" sx={{ color: "text.secondary", fontWeight: 400 }}>
                  /ai
                </Box>
              </Typography>
            </Stack>
          </Link>

          <Stack direction="row" sx={{ gap: 2.5 }}>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} underline="none" sx={navLinkSx}>
                {item.label}
              </Link>
            ))}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
