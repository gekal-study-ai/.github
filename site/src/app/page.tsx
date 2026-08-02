import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import GradientText from "@/components/GradientText";
import PhasePipeline from "@/components/PhasePipeline";
import SectionHeading from "@/components/SectionHeading";
import TagRow from "@/components/TagRow";
import {
  phases,
  principles,
  repos,
  site,
  statusLabel,
  strengths,
  weaknesses,
  type RepoStatus,
} from "@/content/data";
import { fontMono } from "@/theme";

const chipColor: Record<RepoStatus, "success" | "warning" | "default"> = {
  active: "success",
  paused: "warning",
  hub: "default",
  planned: "default",
};

export default function Home() {
  return (
    <Container>
      <Box component="section" sx={{ pt: { xs: 8, sm: 11 }, pb: 1 }}>
        <Typography variant="overline" sx={{ color: "primary.main", display: "block", mb: 1.5 }}>
          {site.org} — learning system
        </Typography>

        <Typography variant="h1" component="h1" gutterBottom>
          AI を、<GradientText>動かしながら</GradientText>学ぶ。
        </Typography>

        <Typography sx={{ color: "text.secondary", maxWidth: "66ch", fontSize: "1.05rem" }}>
          画像生成・文書理解・エージェントを実際に走らせながら AI
          を学ぶための実験リポジトリ群です。動かす、制約を測る、残す。
          このサイトはその観測結果と、これから進む経路をまとめたものです。
        </Typography>

        <Stack direction="row" sx={{ gap: 1.5, flexWrap: "wrap", mt: 4 }}>
          <Button href="/roadmap/" variant="contained" endIcon={<ArrowForwardIcon />}>
            ロードマップを見る
          </Button>
          <Button
            href={site.orgUrl}
            variant="outlined"
            color="inherit"
            endIcon={<OpenInNewIcon />}
          >
            GitHub Organization
          </Button>
        </Stack>

        {/* 概況を計器のように並べる */}
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
            { label: "repositories", value: String(repos.length) },
            { label: "phases", value: String(phases.length) },
            { label: "updated", value: site.updatedAt },
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
        <SectionHeading index="01" title="リポジトリ" note="1 テーマ 1 リポジトリ / 全 4 件" />
        <Grid container spacing={2}>
          {repos.map((repo) => (
            <Grid key={repo.name} size={{ xs: 12, sm: 6 }}>
              <Card sx={{ height: "100%" }}>
                <CardContent
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    p: 2.75,
                  }}
                >
                  <Stack
                    direction="row"
                    sx={{ justifyContent: "space-between", alignItems: "center", gap: 1.25 }}
                  >
                    <Typography
                      variant="h3"
                      component="h3"
                      sx={{ fontFamily: fontMono, fontSize: "0.92rem", wordBreak: "break-all" }}
                    >
                      {repo.url ? <Link href={repo.url}>{repo.name}</Link> : repo.name}
                    </Typography>
                    <Chip
                      label={statusLabel[repo.status]}
                      size="small"
                      variant="outlined"
                      color={chipColor[repo.status]}
                    />
                  </Stack>

                  <Typography variant="overline" sx={{ color: "text.secondary" }}>
                    {repo.theme}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {repo.description}
                  </Typography>

                  <TagRow items={repo.stack} />

                  <Box
                    sx={{
                      mt: "auto",
                      pt: 1.5,
                      borderTop: "1px dashed",
                      borderColor: "divider",
                    }}
                  >
                    <Typography variant="overline" component="div" sx={{ color: "primary.main" }}>
                      ここで得た知見
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "0.84rem", color: "text.secondary" }}
                    >
                      {repo.learned}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box component="section" sx={{ mt: 10 }}>
        <SectionHeading index="02" title="現在地" note={`自己診断 / ${site.updatedAt} 時点`} />
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="overline" component="div" sx={{ color: "success.main", mb: 2 }}>
              ✓ できていること
            </Typography>
            <Stack component="ul" sx={{ gap: 1.75, listStyle: "none", m: 0, p: 0 }}>
              {strengths.map((item) => (
                <Stack key={item} component="li" direction="row" sx={{ gap: 1.25 }}>
                  <Box
                    sx={{
                      mt: "0.72em",
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      bgcolor: "success.main",
                      flexShrink: 0,
                    }}
                  />
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {item}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="overline" component="div" sx={{ color: "warning.main", mb: 2 }}>
              ! 埋めるべき穴
            </Typography>
            <Stack sx={{ gap: 2.5 }}>
              {weaknesses.map((item) => (
                <Box
                  key={item.title}
                  sx={{ borderLeft: 2, borderColor: "warning.main", pl: 2, py: 0.25 }}
                >
                  <Typography sx={{ fontWeight: 650, fontSize: "0.95rem" }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {item.body}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Box>

      <Box component="section" sx={{ mt: 10 }}>
        <SectionHeading index="03" title="進め方" note="3 つの原則" />
        <Grid container spacing={3}>
          {principles.map((p, i) => (
            <Grid key={p.title} size={{ xs: 12, sm: 4 }}>
              <Typography
                sx={{
                  fontFamily: fontMono,
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  lineHeight: 1.2,
                  mb: 1.25,
                  background: "linear-gradient(120deg, var(--accent-1), var(--accent-2))",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                0{i + 1}
              </Typography>
              <Typography variant="h3" component="h3" sx={{ fontSize: "1rem", mb: 1 }}>
                {p.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {p.body}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box component="section" sx={{ mt: 10 }}>
        <SectionHeading
          index="04"
          title="ロードマップ"
          note="時期は目安。完了条件を満たしたら次のフェーズへ"
        />
        <PhasePipeline phases={phases} basePath="/roadmap/" />
      </Box>
    </Container>
  );
}
