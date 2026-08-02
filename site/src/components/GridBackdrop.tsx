import Box from "@mui/material/Box";

/**
 * 背景の装飾。等間隔のドットグリッドに、シアンと紫の光をにじませる。
 * 内容には一切干渉しないので pointer-events は無効にしてある。
 */
export default function GridBackdrop() {
  return (
    <Box
      aria-hidden
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        backgroundColor: "background.default",
        backgroundImage: [
          "radial-gradient(circle at 18% 8%, var(--glow-1), transparent 42%)",
          "radial-gradient(circle at 88% 22%, var(--glow-2), transparent 38%)",
          "radial-gradient(var(--grid-line) 1px, transparent 1px)",
        ].join(","),
        backgroundSize: "auto, auto, 32px 32px",
        // 下へ向かうほどグリッドを薄くして、情報量が増える箇所を邪魔しない
        maskImage:
          "linear-gradient(to bottom, #000 0%, #000 40%, rgba(0,0,0,0.35) 100%)",
      }}
    />
  );
}
