import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { grey } from "@mui/material/colors";

function OverallStats({ stats, mode }) {
  const totalGames = Object.values(stats).reduce(
    (sum, map) => sum + map.games,
    0
  );
  const totalWins = Object.values(stats).reduce(
    (sum, map) => sum + map.wins,
    0
  );
  const totalLosses = Object.values(stats).reduce(
    (sum, map) => sum + map.losses,
    0
  );
  const totalDamage = Object.values(stats).reduce(
    (sum, map) => sum + map.damage,
    0
  );
  const totalTime = Object.values(stats).reduce(
    (sum, map) => sum + map.time,
    1
  );
  const totalCaps = Object.values(stats).reduce(
    (sum, map) => sum + (map.caps || 0),
    0
  );
  const totalFrags = Object.values(stats).reduce(
    (sum, map) => sum + (map.frags || 0),
    0
  );
  const totalDeaths = Object.values(stats).reduce(
    (sum, map) => sum + (map.deaths || 0),
    0
  );

  const winPercentage = (
    (totalWins / (totalWins + totalLosses || 1)) *
    100
  ).toFixed(1);
  const capsPer20 = ((totalCaps / totalTime) * 1200).toFixed(2);
  const net =
    mode === "TDM"
      ? ((totalFrags - totalDeaths) / (totalGames || 1)).toFixed(1)
      : capsPer20;
  const dpm = (totalDamage / (totalTime / 60)).toFixed(0);

  return (
    <Card
      sx={{
        backgroundColor: grey[800],
        borderRadius: 2,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
        padding: 2,
        textAlign: "center",
        minWidth: 250,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <CardHeader title={`Overall ${mode} Stats`} sx={{ color: grey[100] }} />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ color: grey[100] }}>
              Win%
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: grey[50] }}
            >
              {winPercentage}%
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ color: grey[100] }}>
              {mode === "CTF" ? "Cap/20" : "Net"}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: grey[50] }}
            >
              {net}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ color: grey[100] }}>
              DPM
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: grey[50] }}
            >
              {dpm}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ color: grey[100] }}>
              Games
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: grey[50] }}
            >
              {totalGames}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ color: grey[100] }}>
              Wins
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: grey[50] }}
            >
              {totalWins}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ color: grey[100] }}>
              Losses
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: grey[50] }}
            >
              {totalLosses}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default OverallStats;
