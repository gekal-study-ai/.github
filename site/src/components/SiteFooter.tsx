import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { site } from "@/content/data";

export default function SiteFooter() {
  return (
    <Box
      component="footer"
      sx={{ borderTop: 1, borderColor: "divider", mt: 11, pt: 4, pb: 6 }}
    >
      <Container>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
            color: "text.secondary",
          }}
        >
          <Typography variant="body2">最終更新 {site.updatedAt}</Typography>
          <Typography variant="body2">
            ソース: <Link href={`${site.orgUrl}/.github`}>gekal-study-ai/.github</Link>
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
