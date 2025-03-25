import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Map from "./Map";
import { grey } from "@mui/material/colors";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import supabase from "../supabaseClient";

import Infinity from "../maps/infinity.png";
import Courtyard from "../maps/courtyard.png";
import Ironworks from "../maps/ironworks.png";
import Japanese from "../maps/japanese.png";
import Spider from "../maps/spider.png";
import Troubled from "../maps/troubled.png";
import Deep from "../maps/deep.png";
import Dreadful from "../maps/dreadful.png";
import Hidden from "../maps/hidden.png";
import Limbus from "../maps/limbus.png";
import Purgatory from "../maps/purgatory.png";
import Ragnarok from "../maps/ragnarok.png";

function Main() {
  const [mode, setMode] = useState("CTF");
  const [stats, setStats] = useState({});

  const fetchGameStats = async () => {
    const table = mode === "CTF" ? "gamesctf" : "gamestdm";
    const { data, error } = await supabase.from(table).select("*");

    if (error) {
      console.error("error", error);
      return;
    }

    console.log("data", data);

    const mapStats = {};

    data.forEach((game) => {
      const mapName = game.map.trim();
      if (!mapStats[mapName]) {
        mapStats[mapName] = {
          wins: 0,
          losses: 0,
          damage: 0,
          time: 0,
          caps: 0,
          frags: 0,
          deaths: 0,
          games: 0,
        };
      }

      mapStats[mapName].wins += game.win;
      mapStats[mapName].losses += game.win ? 0 : 1;
      mapStats[mapName].damage += game.damage;
      mapStats[mapName].time += game.time;

      if (mode === "CTF") {
        mapStats[mapName].caps += game.caps;
      } else {
        mapStats[mapName].frags += game.frags;
        mapStats[mapName].deaths += game.deaths;
      }

      mapStats[mapName].games += 1;
    });

    console.log("stats", mapStats);

    setStats(mapStats);
  };

  useEffect(() => {
    fetchGameStats();
  }, [mode]);

  const ctfMaps = [
    { title: "Spider", image: Spider },
    { title: "Japanese", image: Japanese },
    { title: "Courtyard", image: Courtyard },
    { title: "Ironworks", image: Ironworks },
    { title: "Troubled", image: Troubled },
    { title: "Infinity", image: Infinity },
  ];

  const tdmMaps = [
    { title: "Deep", image: Deep },
    { title: "Dreadful", image: Dreadful },
    { title: "Hidden", image: Hidden },
    { title: "Limbus", image: Limbus },
    { title: "Purgatory", image: Purgatory },
    { title: "Ragnarok", image: Ragnarok },
  ];

  const currentMaps = mode === "CTF" ? ctfMaps : tdmMaps;

  const pieChartData = Object.keys(stats).map((mapName, index) => ({
    id: index,
    value: stats[mapName].games,
    label: mapName,
  }));

  const barChartData = Object.keys(stats).map((mapName) => ({
    label: mapName,
    winPercentage: (
      (stats[mapName].wins /
        (stats[mapName].wins + stats[mapName].losses || 1)) *
      100
    ).toFixed(1),
    capsOrNet:
      mode === "CTF"
        ? (stats[mapName].caps / stats[mapName].games).toFixed(2)
        : (
            (stats[mapName].frags - stats[mapName].deaths) /
            (stats[mapName].games || 1)
          ).toFixed(1),
  }));

  return (
    <div>
      <h1 style={{ color: grey[50], textAlign: "center" }}>Enesy Quake Stats</h1>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ButtonGroup
          variant="outlined"
          sx={{ marginBottom: 2, borderColor: grey[100] }}
        >
          <Button
            onClick={() => setMode("CTF")}
            variant={mode === "CTF" ? "contained" : "outlined"}
            sx={{
              color: mode === "CTF" ? grey[900] : grey[100],
              backgroundColor: mode === "CTF" ? grey[100] : "transparent",
              borderColor: grey[100],
              "&:hover": { backgroundColor: grey[100], color: grey[900] },
            }}
          >
            CTF
          </Button>
          <Button
            onClick={() => setMode("TDM")}
            variant={mode === "TDM" ? "contained" : "outlined"}
            sx={{
              color: mode === "TDM" ? grey[900] : grey[100],
              backgroundColor: mode === "TDM" ? grey[100] : "transparent",
              borderColor: grey[100],
              "&:hover": { backgroundColor: grey[100], color: grey[900] },
            }}
          >
            TDM
          </Button>
        </ButtonGroup>

        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ maxWidth: "fit-content", flexWrap: "nowrap" }}
        >
          {currentMaps.map((map, index) => {
            const mapData = stats[map.title] || {
              wins: 0,
              losses: 0,
              damage: 0,
              time: 1,
              caps: 0,
              frags: 0,
              deaths: 0,
              games: 1,
            };
            const winPercentage = (
              (mapData.wins / (mapData.wins + mapData.losses || 1)) *
              100
            ).toFixed(0);
            const capsPer20 = ((mapData.caps / mapData.time) * 1200).toFixed(2);
            const net =
              mode === "TDM"
                ? (
                    (mapData.frags - mapData.deaths) /
                    (mapData.wins + mapData.losses || 1)
                  ).toFixed(1)
                : capsPer20;
            const dpm = (mapData.damage / (mapData.time / 60)).toFixed(0);

            return (
              <Grid item key={index}>
                <Map
                  title={map.title}
                  image={map.image}
                  mode={mode}
                  stats={{
                    winPercentage,
                    caps: capsPer20,
                    net,
                    dpm,
                    wins: mapData.wins,
                    losses: mapData.losses,
                  }}
                />
              </Grid>
            );
          })}
        </Grid>

        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 2 }}
        >
          <Grid item>
            <PieChart data={pieChartData} />
          </Grid>

          <Grid item>
            <BarChart data={barChartData} mode={mode} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Main;
