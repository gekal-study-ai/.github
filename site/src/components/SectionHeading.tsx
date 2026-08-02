import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type Props = {
  title: string;
  note?: string;
};

export default function SectionHeading({ title, note }: Props) {
  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "space-between",
        alignItems: "baseline",
        flexWrap: "wrap",
        gap: 2,
        borderBottom: 1,
        borderColor: "divider",
        pb: 1.5,
        mb: 3.5,
      }}
    >
      <Typography variant="h2" component="h2">
        {title}
      </Typography>
      {note && (
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {note}
        </Typography>
      )}
    </Stack>
  );
}
