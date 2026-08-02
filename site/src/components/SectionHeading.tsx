import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { fontMono } from "@/theme";

type Props = {
  /** 等幅で示す通し番号。例: "01" */
  index: string;
  title: string;
  note?: string;
};

export default function SectionHeading({ index, title, note }: Props) {
  return (
    <Box sx={{ mb: 3.5 }}>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "baseline",
          flexWrap: "wrap",
          gap: 2,
          pb: 1.5,
        }}
      >
        <Stack direction="row" sx={{ alignItems: "baseline", gap: 1.5 }}>
          <Typography
            component="span"
            sx={{
              fontFamily: fontMono,
              fontSize: "0.72rem",
              letterSpacing: "0.14em",
              color: "primary.main",
            }}
          >
            {index}
          </Typography>
          <Typography variant="h2" component="h2">
            {title}
          </Typography>
        </Stack>
        {note && (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {note}
          </Typography>
        )}
      </Stack>

      {/* 左端だけアクセント色を残した区切り線 */}
      <Box
        sx={{
          height: 1,
          background:
            "linear-gradient(90deg, var(--accent-1), var(--mui-palette-divider) 22%, var(--mui-palette-divider))",
        }}
      />
    </Box>
  );
}
