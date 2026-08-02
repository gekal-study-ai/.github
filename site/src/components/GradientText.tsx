import Box from "@mui/material/Box";

/** 見出しの一部をアクセントのグラデーションで塗る */
export default function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <Box
      component="span"
      sx={{
        background: "linear-gradient(110deg, var(--accent-1), var(--accent-2))",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
      }}
    >
      {children}
    </Box>
  );
}
