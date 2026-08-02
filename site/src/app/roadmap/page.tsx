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

import GradientText from "@/components/GradientText";
import PhasePipeline from "@/components/PhasePipeline";
import SectionHeading from "@/components/SectionHeading";
import TagRow from "@/components/TagRow";
import { currentPhaseId, phases, site, type Phase } from "@/content/data";
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
      <Typography
        variant="overline"
        component="h4"
        sx={{ color: checkbox ? "primary.main" : "text.secondary", m: 0, mb: 1.75 }}
      >
        {title}
      </Typography>
      <Stack component="ul" sx={{ gap: 1.4, listStyle: "none", m: 0, p: 0 }}>
        {items.map((item) => (
          <Stack key={item} component="li" direction="row" sx={{ gap: 1 }}>
            {checkbox ? (
              <CheckBoxOutlineBlankIcon
                sx={{ fontSize: "1rem", mt: "0.35em", color: "primary.main", flexShrink: 0 }}
              />
            ) : (
              <Box
                component="span"
                sx={{ color: "text.secondary", flexShrink: 0, lineHeight: 1.8, opacity: 0.6 }}
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
  const current = phase.id === currentPhaseId;

  return (
    <Box
      component="article"
      id={`phase-${phase.id}`}
      sx={{
        position: "relative",
        borderTop: first ? 0 : 1,
        borderColor: "divider",
        pt: first ? 0 : 5,
        mt: first ? 0 : 7,
      }}
    >
      <Stack
        direction="row"
        sx={{ gap: 1.75, alignItems: "center", flexWrap: "wrap", mb: 1.25 }}
      >
        <Chip
          label={`PHASE ${String(phase.id).padStart(2, "0")}`}
          size="small"
          variant="outlined"
          color="primary"
          sx={{ fontSize: "0.68rem" }}
        />
        {current && (
          <Chip
            label="NOW"
            size="small"
            color="primary"
            sx={{
              background: "linear-gradient(120deg, var(--accent-1), var(--accent-2))",
              color: "#fff",
              boxShadow: "0 0 12px var(--accent-1)",
            }}
          />
        )}
      </Stack>

      <Typography variant="h2" component="h2" sx={{ fontSize: "1.55rem", mb: 1 }}>
        {phase.title}
      </Typography>

      <Typography sx={{ color: "text.secondary", maxWidth: "66ch", mb: 2.5 }}>
        {phase.tagline}
      </Typography>

      <Box sx={{ mb: 3 }}>
        <TagRow items={phase.keywords} />
      </Box>

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
          fontFamily: fontMono,
        }}
      >
        <Typography variant="body2" sx={{ fontFamily: fontMono, fontSize: "0.8rem" }}>
          <Box component="span" sx={{ opacity: 0.65, mr: 1 }}>
            period
          </Box>
          {phase.period}
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: fontMono, fontSize: "0.8rem" }}>
          <Box component="span" sx={{ opacity: 0.65, mr: 1 }}>
            new repo
          </Box>
          {phase.newRepo ? (
            <Box component="span" sx={{ color: "primary.main" }}>
              {phase.newRepo}
            </Box>
          ) : (
            "—"
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
      <Box component="section" sx={{ pt: { xs: 8, sm: 11 }, pb: 1 }}>
        <Typography variant="overline" sx={{ color: "primary.main", display: "block", mb: 1.5 }}>
          roadmap — {phases.length} phases
        </Typography>

        <Typography variant="h1" component="h1" gutterBottom>
          学習<GradientText>ロードマップ</GradientText>
        </Typography>

        <Typography sx={{ color: "text.secondary", maxWidth: "66ch", fontSize: "1.05rem" }}>
          既存リポジトリの現在地から逆算した 6 フェーズです。各フェーズに成果物と
          完了条件があり、条件を満たしたら次へ進みます。時期はあくまで目安で、
          達成できなければ期限を延ばすのではなく範囲を縮めます。
        </Typography>

        <Stack direction="row" sx={{ gap: 1.5, flexWrap: "wrap", mt: 4 }}>
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

      <Box component="section" sx={{ mt: 10 }}>
        <SectionHeading index="01" title="全体" note="四半期ごとに見直す / 全 6 フェーズ" />
        <PhasePipeline phases={phases} basePath="" />
      </Box>

      <Box component="section" sx={{ mt: 10 }}>
        {phases.map((phase, i) => (
          <PhaseDetail key={phase.id} phase={phase} first={i === 0} />
        ))}
      </Box>
    </Container>
  );
}
