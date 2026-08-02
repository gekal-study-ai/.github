"use client";

import { createTheme } from "@mui/material/styles";

import LinkBehavior from "@/components/LinkBehavior";

const fontSans = [
  "ui-sans-serif",
  "system-ui",
  "-apple-system",
  '"Hiragino Kaku Gothic ProN"',
  '"Hiragino Sans"',
  '"Noto Sans JP"',
  "Meiryo",
  "sans-serif",
].join(",");

const fontMono = [
  "ui-monospace",
  "SFMono-Regular",
  '"SF Mono"',
  "Menlo",
  "Consolas",
  "monospace",
].join(",");

/**
 * 計器のような見た目を狙う。暗い盤面にシアン → 紫のアクセントを乗せ、
 * ラベルや数値は等幅フォントで示す。ライトはその反転版。
 */
const theme = createTheme({
  cssVariables: { colorSchemeSelector: "media" },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: "#0e7490", contrastText: "#ffffff" },
        secondary: { main: "#6d28d9" },
        success: { main: "#047857" },
        warning: { main: "#b45309" },
        background: { default: "#f6f8fb", paper: "#ffffff" },
        text: { primary: "#0a0d16", secondary: "#545d73" },
        divider: "#e2e7f1",
      },
    },
    dark: {
      palette: {
        primary: { main: "#22d3ee", contrastText: "#05070b" },
        secondary: { main: "#a78bfa" },
        success: { main: "#34d399" },
        warning: { main: "#fbbf24" },
        background: { default: "#07080c", paper: "#0d0f16" },
        text: { primary: "#e7eaf3", secondary: "#8d95a9" },
        divider: "#1b1f2d",
      },
    },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: fontSans,
    fontSize: 16,
    body1: { lineHeight: 1.85, letterSpacing: "0.01em" },
    body2: { lineHeight: 1.8, letterSpacing: "0.01em" },
    h1: {
      fontSize: "clamp(2rem, 5.5vw, 3rem)",
      fontWeight: 700,
      lineHeight: 1.32,
      letterSpacing: "-0.03em",
    },
    h2: { fontSize: "1.35rem", fontWeight: 700, letterSpacing: "-0.015em", lineHeight: 1.5 },
    h3: { fontSize: "1.02rem", fontWeight: 650, letterSpacing: "-0.01em", lineHeight: 1.5 },
    // 計器のラベル。等幅・大文字・字間広め
    overline: {
      fontFamily: fontMono,
      fontSize: "0.7rem",
      fontWeight: 600,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      lineHeight: 2,
    },
    button: { textTransform: "none", fontWeight: 600, letterSpacing: "0.01em" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ":root": {
          "--accent-1": "#0e7490",
          "--accent-2": "#6d28d9",
          "--grid-line": "rgba(10, 13, 22, 0.055)",
          "--glow-1": "rgba(14, 116, 144, 0.16)",
          "--glow-2": "rgba(109, 40, 217, 0.13)",
          "--card-hover": "rgba(14, 116, 144, 0.05)",
        },
        "@media (prefers-color-scheme: dark)": {
          ":root": {
            "--accent-1": "#22d3ee",
            "--accent-2": "#a78bfa",
            "--grid-line": "rgba(255, 255, 255, 0.042)",
            "--glow-1": "rgba(34, 211, 238, 0.16)",
            "--glow-2": "rgba(167, 139, 250, 0.14)",
            "--card-hover": "rgba(34, 211, 238, 0.045)",
          },
        },
        html: {
          WebkitTextSizeAdjust: "100%",
          backgroundColor: "var(--mui-palette-background-default)",
        },
        // 背景は GridBackdrop が描くので body 自体は透過させる
        body: { WebkitFontSmoothing: "antialiased", backgroundColor: "transparent" },
        "[id^='phase-']": { scrollMarginTop: 88 },
        "::selection": {
          background: "color-mix(in srgb, var(--accent-1) 30%, transparent)",
        },
      },
    },
    MuiContainer: {
      defaultProps: { maxWidth: "md" },
      styleOverrides: {
        root: ({ theme: t }) => ({
          [t.breakpoints.up("xs")]: { paddingInline: 24 },
        }),
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0, variant: "outlined" },
      styleOverrides: {
        root: {
          backgroundImage: "none",
          transition: "border-color .2s, background-color .2s, transform .2s",
          "&:hover": {
            borderColor: "color-mix(in srgb, var(--accent-1) 45%, transparent)",
            backgroundColor: "var(--card-hover)",
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontFamily: fontMono, fontWeight: 600, letterSpacing: "0.06em" },
        sizeSmall: { fontSize: "0.68rem", height: 22 },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { paddingInline: 20, paddingBlock: 10 },
      },
      // v9 では containedPrimary スロットが無いため variants で指定する
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            background: "linear-gradient(120deg, var(--accent-1), var(--accent-2))",
            color: "#ffffff",
            "&:hover": { filter: "brightness(1.12)" },
          },
        },
      ],
    },
    MuiLink: {
      defaultProps: { underline: "hover", component: LinkBehavior },
      styleOverrides: { root: { color: "inherit" } },
    },
    MuiButtonBase: {
      defaultProps: { LinkComponent: LinkBehavior },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: { paddingBlock: 18, paddingInline: 4, alignItems: "flex-start" },
      },
    },
  },
});

export { fontMono, fontSans };
export default theme;
