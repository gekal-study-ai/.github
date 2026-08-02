import Box from "@mui/material/Box";

import { fontMono } from "@/theme";

/** 技術名を等幅の小さなタグとして並べる */
export default function TagRow({ items }: { items: readonly string[] }) {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
      {items.map((item) => (
        <Box
          key={item}
          component="span"
          sx={{
            fontFamily: fontMono,
            fontSize: "0.68rem",
            letterSpacing: "0.04em",
            color: "text.secondary",
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            px: 0.85,
            py: 0.15,
            whiteSpace: "nowrap",
          }}
        >
          {item}
        </Box>
      ))}
    </Box>
  );
}
