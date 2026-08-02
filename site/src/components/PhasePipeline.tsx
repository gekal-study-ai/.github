import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { currentPhaseId, type Phase } from "@/content/data";
import { fontMono } from "@/theme";

type Props = {
  phases: Phase[];
  /** リンク先。同一ページ内のアンカーへ飛ばす場合は "" を渡す */
  basePath: string;
};

/** フェーズを 1 本の処理経路として並べる。現在地のノードだけ光らせる。 */
export default function PhasePipeline({ phases, basePath }: Props) {
  return (
    <Box sx={{ position: "relative" }}>
      {/* ノードをつなぐ縦線 */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          left: 13,
          top: 28,
          bottom: 28,
          width: "1px",
          background:
            "linear-gradient(180deg, var(--accent-1), var(--mui-palette-divider) 55%)",
        }}
      />

      <List disablePadding>
        {phases.map((phase) => {
          const current = phase.id === currentPhaseId;
          return (
            <ListItem key={phase.id} disablePadding>
              <ListItemButton
                {...(basePath ? {} : { component: "a" as const })}
                href={`${basePath}#phase-${phase.id}`}
                sx={{
                  borderRadius: 2,
                  "&:hover .phaseNode": {
                    borderColor: "primary.main",
                    boxShadow: "0 0 10px var(--accent-1)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "28px 1fr auto",
                    columnGap: 2,
                    rowGap: 0.5,
                    width: "100%",
                    alignItems: "start",
                  }}
                >
                  {/* ノード */}
                  <Box sx={{ display: "flex", justifyContent: "center", pt: "5px" }}>
                    <Box
                      className="phaseNode"
                      sx={{
                        width: 11,
                        height: 11,
                        borderRadius: "50%",
                        border: "2px solid",
                        borderColor: current ? "transparent" : "divider",
                        background: current
                          ? "linear-gradient(120deg, var(--accent-1), var(--accent-2))"
                          : "var(--mui-palette-background-default)",
                        boxShadow: current ? "0 0 12px var(--accent-1)" : "none",
                        transition: "border-color .2s, box-shadow .2s",
                      }}
                    />
                  </Box>

                  <Box sx={{ minWidth: 0 }}>
                    <Stack
                      direction="row"
                      sx={{ alignItems: "center", gap: 1.25, flexWrap: "wrap", mb: 0.25 }}
                    >
                      <Typography
                        component="span"
                        sx={{
                          fontFamily: fontMono,
                          fontSize: "0.7rem",
                          letterSpacing: "0.12em",
                          color: current ? "primary.main" : "text.secondary",
                        }}
                      >
                        PHASE {String(phase.id).padStart(2, "0")}
                      </Typography>
                      {current && (
                        <Chip label="NOW" size="small" variant="outlined" color="primary" />
                      )}
                    </Stack>
                    <Typography variant="h3" component="h3">
                      {phase.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {phase.tagline}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: fontMono,
                      fontSize: "0.75rem",
                      color: "text.secondary",
                      whiteSpace: "nowrap",
                      pt: "2px",
                    }}
                  >
                    {phase.period}
                  </Typography>
                </Box>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
