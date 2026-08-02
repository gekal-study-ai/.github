import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { fontMono } from "@/theme";
import type { Phase } from "@/content/data";

type Props = {
  phases: Phase[];
  /** リンク先。同一ページ内のアンカーへ飛ばす場合は "" を渡す */
  basePath: string;
};

export default function PhaseList({ phases, basePath }: Props) {
  return (
    <List disablePadding>
      {phases.map((phase) => (
        <ListItem key={phase.id} disablePadding>
          <ListItemButton
            // 同一ページ内アンカーは素の <a> で十分。ページ間は
            // テーマの LinkComponent 経由で next/link が使われる。
            {...(basePath ? {} : { component: "a" as const })}
            href={`${basePath}#phase-${phase.id}`}
          >
            <Stack
              direction="row"
              sx={{ gap: 2.5, width: "100%", alignItems: "baseline", flexWrap: "wrap" }}
            >
              <Typography
                sx={{
                  fontFamily: fontMono,
                  fontSize: "0.8rem",
                  color: "text.secondary",
                  letterSpacing: "0.04em",
                  width: 64,
                  flexShrink: 0,
                }}
              >
                PHASE {phase.id}
              </Typography>

              <Stack sx={{ flex: "1 1 240px", minWidth: 0 }}>
                <Typography variant="h3" component="h3">
                  {phase.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {phase.tagline}
                </Typography>
              </Stack>

              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontVariantNumeric: "tabular-nums",
                  whiteSpace: "nowrap",
                }}
              >
                {phase.period}
              </Typography>
            </Stack>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
