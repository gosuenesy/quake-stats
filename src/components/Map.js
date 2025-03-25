import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import Grid from "@mui/material/Grid";

function Map({ title, image, stats, mode }) {
  return (
    <Card
      sx={{
        maxWidth: 200,
        backgroundColor: grey[800],
        borderRadius: 2,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <CardHeader title={title} sx={{ color: grey[50], textAlign: "center" }} />
      <CardMedia component="img" height="113" image={image} alt={title} />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Typography variant="body2" sx={{ color: grey[100] }}>
              Win%
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: grey[50] }}
            >
              {stats?.winPercentage ?? "N/A"}%
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" sx={{ color: grey[100] }}>
              {mode === "CTF" ? "Cap/20" : "Net"}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: grey[50] }}
            >
              {stats?.net ?? "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" sx={{ color: grey[100] }}>
              DPM
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: grey[50] }}
            >
              {stats?.dpm ?? "N/A"}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" sx={{ color: grey[100] }}>
              Win
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: grey[50] }}
            >
              {stats?.wins ?? "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ color: grey[100] }}>
              Loss
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: grey[50] }}
            >
              {stats?.losses ?? "N/A"}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default Map;
