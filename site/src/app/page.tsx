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

import PhaseList from "@/components/PhaseList";
import SectionHeading from "@/components/SectionHeading";
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
      <Box component="section" sx={{ pt: 9, pb: 1 }}>
        <Typography variant="h1" component="h1" gutterBottom>
          AI を、動かしながら学ぶ。
        </Typography>
        <Typography sx={{ color: "text.secondary", maxWidth: "68ch", fontSize: "1.05rem" }}>
          {site.org} は AI
          を学ぶために作った実験リポジトリ群です。まず動かす、制約を測る、わかったことを残す。
          このサイトは、その現在地とこれから進む道筋をまとめたものです。
        </Typography>

        <Stack direction="row" sx={{ gap: 1.5, flexWrap: "wrap", mt: 3.5 }}>
          <Button
            href="/roadmap/"
            variant="contained"
            endIcon={<ArrowForwardIcon />}
          >
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
      </Box>

      <Box component="section" sx={{ mt: 9 }}>
        <SectionHeading title="リポジトリ" note="1 テーマ 1 リポジトリ" />
        <Grid container spacing={2}>
          {repos.map((repo) => (
            <Grid key={repo.name} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card sx={{ height: "100%" }}>
                <CardContent
                  sx={{ height: "100%", display: "flex", flexDirection: "column", gap: 1.5, p: 2.75 }}
                >
                  <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", gap: 1.25 }}>
                    <Typography
                      variant="h3"
                      component="h3"
                      sx={{ fontFamily: fontMono, fontSize: "0.95rem", wordBreak: "break-all" }}
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

                  <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.8rem" }}>
                    {repo.theme}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {repo.description}
                  </Typography>

                  <Box
                    sx={{
                      mt: "auto",
                      pt: 1.5,
                      borderTop: "1px dashed",
                      borderColor: "divider",
                      color: "text.secondary",
                    }}
                  >
                    <Typography variant="overline" component="div" sx={{ fontSize: "0.7rem" }}>
                      得たもの
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: "0.82rem" }}>
                      {repo.learned}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box component="section" sx={{ mt: 9 }}>
        <SectionHeading title="現在地" note={`${site.updatedAt} 時点`} />
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="overline" component="div" sx={{ color: "text.secondary", mb: 2 }}>
              できていること
            </Typography>
            <Stack component="ul" sx={{ gap: 1.75, listStyle: "none", m: 0, p: 0 }}>
              {strengths.map((item) => (
                <Stack key={item} component="li" direction="row" sx={{ gap: 1.25 }}>
                  <Box
                    sx={{
                      mt: "0.75em",
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      bgcolor: "divider",
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
            <Typography variant="overline" component="div" sx={{ color: "text.secondary", mb: 2 }}>
              埋めるべき穴
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

      <Box component="section" sx={{ mt: 9 }}>
        <SectionHeading title="進め方" />
        <Grid container spacing={3}>
          {principles.map((p, i) => (
            <Grid key={p.title} size={{ xs: 12, sm: 4 }}>
              <Typography
                sx={{ fontFamily: fontMono, fontSize: "0.8rem", color: "primary.main", mb: 1 }}
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

      <Box component="section" sx={{ mt: 9 }}>
        <SectionHeading title="ロードマップ" note="時期は目安。完了条件を満たしたら次へ" />
        <PhaseList phases={phases} basePath="/roadmap/" />
      </Box>
    </Container>
  );
}
