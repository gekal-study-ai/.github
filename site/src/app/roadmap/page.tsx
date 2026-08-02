import type { Metadata } from "next";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import PhaseList from "@/components/PhaseList";
import SectionHeading from "@/components/SectionHeading";
import { phases, site, type Phase } from "@/content/data";
import { fontMono } from "@/theme";

export const metadata: Metadata = {
  title: "ロードマップ",
  description:
    "6 つのフェーズごとの学習項目・成果物・完了条件。既存リポジトリの現在地から逆算して組んだ AI 学習の計画。",
};

function ItemBlock({
  title,
  items,
  checkbox = false,
}: {
  title: string;
  items: readonly string[];
  checkbox?: boolean;
}) {
  return (
    <Box>
      <Typography variant="overline" component="h4" sx={{ color: "text.secondary", m: 0, mb: 1.75 }}>
        {title}
      </Typography>
      <Stack component="ul" sx={{ gap: 1.4, listStyle: "none", m: 0, p: 0 }}>
        {items.map((item) => (
          <Stack key={item} component="li" direction="row" sx={{ gap: 1 }}>
            {checkbox ? (
              <CheckBoxOutlineBlankIcon
                sx={{ fontSize: "1rem", mt: "0.35em", color: "text.secondary", flexShrink: 0 }}
              />
            ) : (
              <Box
                component="span"
                sx={{ color: "text.secondary", flexShrink: 0, lineHeight: 1.8 }}
              >
                –
              </Box>
            )}
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {item}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

function PhaseDetail({ phase, first }: { phase: Phase; first: boolean }) {
  return (
    <Box
      component="article"
      id={`phase-${phase.id}`}
      sx={{
        borderTop: first ? 0 : 1,
        borderColor: "divider",
        pt: first ? 0 : 5,
        mt: first ? 0 : 7,
      }}
    >
      <Stack direction="row" sx={{ gap: 1.75, alignItems: "baseline", flexWrap: "wrap", mb: 1.25 }}>
        <Chip
          label={`PHASE ${phase.id}`}
          size="small"
          variant="outlined"
          color="primary"
          sx={{ fontFamily: fontMono, fontSize: "0.72rem" }}
        />
        <Typography variant="h2" component="h2" sx={{ fontSize: "1.5rem" }}>
          {phase.title}
        </Typography>
      </Stack>

      <Typography sx={{ color: "text.secondary", maxWidth: "68ch", mb: 3 }}>
        {phase.tagline}
      </Typography>

      <Stack
        direction="row"
        sx={{
          gap: 3.5,
          flexWrap: "wrap",
          mb: 3.5,
          pb: 2.5,
          borderBottom: "1px dashed",
          borderColor: "divider",
          color: "text.secondary",
        }}
      >
        <Typography variant="body2">
          <Box component="b" sx={{ mr: 1, fontWeight: 650 }}>
            目安時期
          </Box>
          {phase.period}
        </Typography>
        <Typography variant="body2">
          <Box component="b" sx={{ mr: 1, fontWeight: 650 }}>
            新規リポジトリ
          </Box>
          {phase.newRepo ? (
            <Box component="code" sx={{ fontFamily: fontMono, fontSize: "0.88em" }}>
              {phase.newRepo}
            </Box>
          ) : (
            "なし"
          )}
        </Typography>
      </Stack>

      <Grid container spacing={3.5}>
        <Grid size={{ xs: 12, md: 4 }}>
          <ItemBlock title="学ぶこと" items={phase.topics} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <ItemBlock title="成果物" items={phase.deliverables} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <ItemBlock title="完了条件" items={phase.criteria} checkbox />
        </Grid>
      </Grid>
    </Box>
  );
}

export default function RoadmapPage() {
  return (
    <Container>
      <Box component="section" sx={{ pt: 9, pb: 1 }}>
        <Typography variant="h1" component="h1" gutterBottom>
          学習ロードマップ
        </Typography>
        <Typography sx={{ color: "text.secondary", maxWidth: "68ch", fontSize: "1.05rem" }}>
          6 つのフェーズに分けています。各フェーズには成果物と完了条件があり、
          条件を満たしたら次へ進みます。時期はあくまで目安です。
        </Typography>
        <Stack direction="row" sx={{ gap: 1.5, flexWrap: "wrap", mt: 3.5 }}>
          <Button
            href={site.roadmapUrl}
            variant="outlined"
            color="inherit"
            endIcon={<OpenInNewIcon />}
          >
            ROADMAP.md（GitHub）
          </Button>
        </Stack>
      </Box>

      <Box component="section" sx={{ mt: 9 }}>
        <SectionHeading title="全体" note="四半期ごとに見直す" />
        <PhaseList phases={phases} basePath="" />
      </Box>

      <Box component="section" sx={{ mt: 9 }}>
        {phases.map((phase, i) => (
          <PhaseDetail key={phase.id} phase={phase} first={i === 0} />
        ))}
      </Box>
    </Container>
  );
}
