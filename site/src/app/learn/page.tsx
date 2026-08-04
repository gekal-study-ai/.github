import type { Metadata } from "next";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import GradientText from "@/components/GradientText";
import SectionHeading from "@/components/SectionHeading";
import TagRow from "@/components/TagRow";
import { currentPhaseId, phases } from "@/content/data";
import {
  resourceKindLabel,
  studyIntro,
  studyItems,
  studyOrder,
  type Resource,
  type StudyItem,
} from "@/content/study";
import { fontMono } from "@/theme";

const phase = phases.find((p) => p.id === currentPhaseId)!;

export const metadata: Metadata = {
  title: "いま学ぶこと",
  description:
    "現在地 Phase 0「基礎の言語化」で押さえるべき 4 項目と、その参考資料。Transformer・Diffusion・VLM・評価指標を、手元のリポジトリと結びつけて学ぶための道案内。",
};

function ResourceRow({ resource }: { resource: Resource }) {
  const title = resource.url ? (
    <Link href={resource.url} sx={{ fontWeight: 600 }}>
      {resource.title}
    </Link>
  ) : (
    <Box component="span" sx={{ fontWeight: 600 }}>
      {resource.title}
    </Box>
  );

  return (
    <Box
      component="li"
      sx={{
        py: 1.75,
        borderBottom: "1px dashed",
        borderColor: "divider",
        "&:last-of-type": { borderBottom: 0 },
      }}
    >
      <Stack
        direction="row"
        sx={{ gap: 1, alignItems: "baseline", flexWrap: "wrap", mb: 0.5 }}
      >
        <Box
          component="span"
          sx={{
            fontFamily: fontMono,
            fontSize: "0.62rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "primary.main",
            border: 1,
            borderColor: "color-mix(in srgb, var(--accent-1) 40%, transparent)",
            borderRadius: 1,
            px: 0.7,
            py: 0.1,
            flexShrink: 0,
          }}
        >
          {resourceKindLabel[resource.kind]}
        </Box>
        <Typography variant="body2" component="span" sx={{ minWidth: 0 }}>
          {title}
        </Typography>
        <Box
          component="span"
          sx={{
            fontFamily: fontMono,
            fontSize: "0.68rem",
            color: "text.secondary",
            opacity: 0.75,
          }}
        >
          {resource.author}
        </Box>
      </Stack>
      <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.85rem" }}>
        {resource.note}
      </Typography>
    </Box>
  );
}

function StudyBlock({ item, index }: { item: StudyItem; index: number }) {
  return (
    <Box
      component="article"
      id={item.id}
      sx={{
        scrollMarginTop: 88,
        borderTop: index === 0 ? 0 : 1,
        borderColor: "divider",
        pt: index === 0 ? 0 : 5,
        mt: index === 0 ? 0 : 7,
      }}
    >
      <Stack direction="row" sx={{ gap: 2, alignItems: "baseline", mb: 1.5 }}>
        <Typography
          component="span"
          sx={{
            fontFamily: fontMono,
            fontSize: "1.5rem",
            fontWeight: 600,
            lineHeight: 1.2,
            background: "linear-gradient(120deg, var(--accent-1), var(--accent-2))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            flexShrink: 0,
          }}
        >
          0{index + 1}
        </Typography>
        <Typography variant="h2" component="h2" sx={{ fontSize: "1.4rem" }}>
          {item.title}
        </Typography>
      </Stack>

      <Typography variant="body2" sx={{ color: "text.secondary", maxWidth: "70ch", mb: 2.5 }}>
        {item.why}
      </Typography>

      {/* 答えられるようになりたい問い */}
      <Box
        sx={{
          borderLeft: 2,
          borderColor: "primary.main",
          pl: 2,
          py: 0.5,
          mb: 2.5,
          background:
            "linear-gradient(90deg, var(--card-hover), transparent 70%)",
        }}
      >
        <Typography variant="overline" component="div" sx={{ color: "primary.main" }}>
          答えられるようになりたい問い
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {item.question}
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="overline" component="div" sx={{ color: "text.secondary" }}>
          手を動かして確かめる
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {item.exercise}
        </Typography>
      </Box>

      <Typography variant="overline" component="h3" sx={{ color: "text.secondary", m: 0 }}>
        参考資料 — {item.resources.length} 件
      </Typography>
      <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0 }}>
        {item.resources.map((r) => (
          <ResourceRow key={r.title} resource={r} />
        ))}
      </Box>
    </Box>
  );
}

export default function LearnPage() {
  const totalResources = studyItems.reduce((n, i) => n + i.resources.length, 0);

  return (
    <Container>
      <Box component="section" sx={{ pt: { xs: 8, sm: 11 }, pb: 1 }}>
        <Typography variant="overline" sx={{ color: "primary.main", display: "block", mb: 1.5 }}>
          phase {String(phase.id).padStart(2, "0")} — {phase.title}
        </Typography>

        <Typography variant="h1" component="h1" gutterBottom>
          いま<GradientText>学ぶこと</GradientText>
        </Typography>

        <Typography sx={{ color: "text.secondary", maxWidth: "68ch", fontSize: "1.05rem" }}>
          {studyIntro}
        </Typography>

        <Stack direction="row" sx={{ gap: 1.5, flexWrap: "wrap", mt: 4 }}>
          <Button href="/roadmap/#phase-0" variant="contained" endIcon={<ArrowForwardIcon />}>
            Phase 0 の完了条件
          </Button>
        </Stack>

        <Stack
          direction="row"
          sx={{
            gap: { xs: 3, sm: 5 },
            flexWrap: "wrap",
            mt: 6,
            pt: 3,
            borderTop: 1,
            borderColor: "divider",
          }}
        >
          {[
            { label: "topics", value: String(studyItems.length) },
            { label: "resources", value: String(totalResources) },
            { label: "period", value: phase.period },
          ].map((stat) => (
            <Box key={stat.label}>
              <Typography
                sx={{
                  fontFamily: fontMono,
                  fontSize: "1.35rem",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.3,
                }}
              >
                {stat.value}
              </Typography>
              <Typography variant="overline" sx={{ color: "text.secondary" }}>
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      <Box component="section" sx={{ mt: 10 }}>
        <SectionHeading index="01" title="扱う範囲" note={`全 ${studyItems.length} 項目`} />
        <Box sx={{ mb: 3 }}>
          <TagRow items={phase.keywords} />
        </Box>
        <Stack sx={{ gap: 1 }}>
          {studyItems.map((item, i) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              underline="none"
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "baseline",
                py: 1,
                borderBottom: 1,
                borderColor: "divider",
                "&:hover": { color: "primary.main" },
              }}
            >
              <Box
                component="span"
                sx={{
                  fontFamily: fontMono,
                  fontSize: "0.75rem",
                  color: "text.secondary",
                  flexShrink: 0,
                }}
              >
                0{i + 1}
              </Box>
              <Box component="span" sx={{ fontWeight: 600, fontSize: "0.95rem" }}>
                {item.title}
              </Box>
              <Box
                component="span"
                sx={{
                  ml: "auto",
                  fontFamily: fontMono,
                  fontSize: "0.72rem",
                  color: "text.secondary",
                  whiteSpace: "nowrap",
                }}
              >
                {item.resources.length} 件
              </Box>
            </Link>
          ))}
        </Stack>
      </Box>

      <Box component="section" sx={{ mt: 10 }}>
        <SectionHeading index="02" title="進め方" note="上から順に" />
        <Stack sx={{ gap: 2.5 }}>
          {studyOrder.map((s) => (
            <Stack key={s.step} direction="row" sx={{ gap: 2, alignItems: "flex-start" }}>
              <Box
                sx={{
                  fontFamily: fontMono,
                  fontSize: "0.72rem",
                  color: "primary.main",
                  border: 1,
                  borderColor: "color-mix(in srgb, var(--accent-1) 40%, transparent)",
                  borderRadius: "50%",
                  width: 26,
                  height: 26,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  mt: "2px",
                }}
              >
                {s.step}
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 650, fontSize: "0.95rem" }}>{s.label}</Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {s.body}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      </Box>

      <Box component="section" sx={{ mt: 10 }}>
        <SectionHeading index="03" title="項目ごとの資料" note={`全 ${totalResources} 件`} />
        {studyItems.map((item, i) => (
          <StudyBlock key={item.id} item={item} index={i} />
        ))}
      </Box>

      <Box component="section" sx={{ mt: 10 }}>
        <SectionHeading index="04" title="このフェーズの完了条件" note="満たしたら Phase 1 へ" />
        <Stack component="ul" sx={{ gap: 1.4, listStyle: "none", m: 0, p: 0 }}>
          {phase.criteria.map((c) => (
            <Stack key={c} component="li" direction="row" sx={{ gap: 1 }}>
              <CheckBoxOutlineBlankIcon
                sx={{ fontSize: "1rem", mt: "0.35em", color: "primary.main", flexShrink: 0 }}
              />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {c}
              </Typography>
            </Stack>
          ))}
        </Stack>

        <Stack direction="row" sx={{ gap: 1.5, flexWrap: "wrap", mt: 4 }}>
          <Button
            href="/roadmap/"
            variant="outlined"
            color="inherit"
            endIcon={<ArrowForwardIcon />}
          >
            ロードマップ全体
          </Button>
          <Chip
            label="NOW"
            size="small"
            sx={{
              alignSelf: "center",
              background: "linear-gradient(120deg, var(--accent-1), var(--accent-2))",
              color: "#fff",
            }}
          />
        </Stack>
      </Box>
    </Container>
  );
}
