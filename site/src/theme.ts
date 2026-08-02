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

// 日本語の可読性を優先し、行間を広めに、字間をわずかに開ける。
const theme = createTheme({
  // OS のライト / ダーク設定に追従させる。切り替え UI は持たない。
  cssVariables: { colorSchemeSelector: "media" },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: "#2f6f4e", contrastText: "#fbfbf9" },
        warning: { main: "#8a6d1f" },
        background: { default: "#fbfbf9", paper: "#ffffff" },
        text: { primary: "#1a1a19", secondary: "#5f5f59" },
        divider: "#e3e3dd",
      },
    },
    dark: {
      palette: {
        primary: { main: "#7cc79b", contrastText: "#121311" },
        warning: { main: "#d6b95f" },
        background: { default: "#121311", paper: "#1b1c19" },
        text: { primary: "#e8e8e2", secondary: "#a4a49a" },
        divider: "#2c2e29",
      },
    },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: fontSans,
    fontSize: 16,
    body1: { lineHeight: 1.85, letterSpacing: "0.01em" },
    body2: { lineHeight: 1.8, letterSpacing: "0.01em" },
    h1: {
      fontSize: "clamp(1.9rem, 5vw, 2.7rem)",
      fontWeight: 650,
      lineHeight: 1.4,
      letterSpacing: "-0.01em",
    },
    h2: { fontSize: "1.3rem", fontWeight: 650, lineHeight: 1.5 },
    h3: { fontSize: "1.02rem", fontWeight: 650, lineHeight: 1.5 },
    // セクション見出しのラベル用
    overline: {
      fontSize: "0.78rem",
      fontWeight: 700,
      letterSpacing: "0.08em",
      lineHeight: 2,
    },
    button: { textTransform: "none", fontWeight: 550 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { WebkitTextSizeAdjust: "100%" },
        body: { WebkitFontSmoothing: "antialiased" },
        // 見出しへのアンカー移動時にヘッダーへ隠れないようにする
        "[id^='phase-']": { scrollMarginTop: 80 },
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
        root: { backgroundImage: "none" },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, letterSpacing: "0.04em" },
        sizeSmall: { fontSize: "0.72rem" },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { paddingInline: 18, paddingBlock: 9 },
      },
    },
    // href を渡すだけで next/link 経由の遷移になるようにする
    MuiLink: {
      defaultProps: { underline: "hover", component: LinkBehavior },
      styleOverrides: { root: { color: "inherit" } },
    },
    MuiButtonBase: {
      defaultProps: { LinkComponent: LinkBehavior },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme: t }) => ({
          paddingBlock: 20,
          paddingInline: 4,
          borderBottom: `1px solid ${t.palette.divider}`,
          alignItems: "baseline",
        }),
      },
    },
  },
});

export { fontMono };
export default theme;
