import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { site } from "@/content/data";

const navItems = [
  { label: "概要", href: "/" },
  { label: "ロードマップ", href: "/roadmap/" },
];

export default function SiteHeader() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        backdropFilter: "blur(8px)",
        backgroundColor: "color-mix(in srgb, var(--mui-palette-background-default) 88%, transparent)",
      }}
    >
      <Container>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 60,
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            underline="none"
            sx={{ fontSize: "0.95rem", fontWeight: 650 }}
          >
            gekal-study-ai{" "}
            <Box component="span" sx={{ color: "text.secondary", fontWeight: 400 }}>
              / Study Memo for AI
            </Box>
          </Link>

          <Stack direction="row" spacing={2.5} sx={{ fontSize: "0.9rem" }}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                underline="none"
                sx={{
                  color: "text.secondary",
                  py: 0.5,
                  borderBottom: "1.5px solid transparent",
                  transition: "color .15s, border-color .15s",
                  "&:hover": { color: "text.primary", borderBottomColor: "primary.main" },
                }}
              >
                <Typography variant="body2" component="span">
                  {item.label}
                </Typography>
              </Link>
            ))}
            <Link
              href={site.orgUrl}
              underline="none"
              sx={{
                color: "text.secondary",
                py: 0.5,
                borderBottom: "1.5px solid transparent",
                transition: "color .15s, border-color .15s",
                "&:hover": { color: "text.primary", borderBottomColor: "primary.main" },
              }}
            >
              <Typography variant="body2" component="span">
                GitHub
              </Typography>
            </Link>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
