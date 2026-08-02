import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { site } from "@/content/data";
import { fontMono } from "@/theme";

export default function SiteFooter() {
  return (
    <Box component="footer" sx={{ mt: 12, pt: 4, pb: 6 }}>
      <Container>
        {/* アクセント色から始まる細い区切り線 */}
        <Box
          sx={{
            height: 1,
            mb: 3,
            background:
              "linear-gradient(90deg, var(--accent-1), var(--mui-palette-divider) 22%, var(--mui-palette-divider))",
          }}
        />
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
            color: "text.secondary",
            fontFamily: fontMono,
            fontSize: "0.75rem",
            letterSpacing: "0.06em",
          }}
        >
          <Box component="span">last updated {site.updatedAt}</Box>
          <Box component="span">
            source <Link href={`${site.orgUrl}/.github`}>gekal-study-ai/.github</Link>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
