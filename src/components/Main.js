import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Map from "./Map";
import { grey } from "@mui/material/colors";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import OverallStats from "./OverallStats";
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
  const [allStats, setAllStats] = useState({ ctf: {}, tdm: {} });

  useEffect(() => {
    const fetchGameStats = async () => {
      const { data: ctfData, error: ctfError } = await supabase
        .from("gamesctf")
        .select("*");
      const { data: tdmData, error: tdmError } = await supabase
        .from("gamestdm")
        .select("*");

      if (ctfError || tdmError) {
        console.error("Error fetching data", ctfError || tdmError);
        return;
      }

      const processStats = (games, isCTF) => {
        const stats = {};
        games.forEach((game) => {
          const mapName = game.map.trim();
          if (!stats[mapName]) {
            stats[mapName] = {
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

          stats[mapName].wins += game.win;
          stats[mapName].losses += game.win ? 0 : 1;
          stats[mapName].damage += game.damage;
          stats[mapName].time += game.time;
          if (isCTF) {
            stats[mapName].caps += game.caps;
          } else {
            stats[mapName].frags += game.frags;
            stats[mapName].deaths += game.deaths;
          }
          stats[mapName].games += 1;
        });

        return stats;
      };

      setAllStats({
        ctf: processStats(ctfData, true),
        tdm: processStats(tdmData, false),
      });
    };

    fetchGameStats();
  }, []);

  const stats = mode === "CTF" ? allStats.ctf : allStats.tdm;

  const ctfMaps = [
    { title: "Spider", image: Spider },
    { title: "Japanese", image: Japanese },
    { title: "Courtyard", image: Courtyard },
    { title: "Ironworks", image: Ironworks },
    { title: "Troubled", image: Troubled },
    { title: "Infinity", image: Infinity },
  ];

  const tdmMaps = [
    { title: "Dreadful", image: Dreadful },
    { title: "Hidden", image: Hidden },
    { title: "Limbus", image: Limbus },
    { title: "Purgatory", image: Purgatory },
    { title: "Ragnarok", image: Ragnarok },
    { title: "Deep", image: Deep },
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
  }));

  return (
    <div>
      <h1 style={{ color: grey[50], textAlign: "center" }}>
        Enesy Quake Stats
      </h1>
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
                    (mapData.games || 1)
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
          alignItems="stretch"
          sx={{ mt: 2 }}
        >
          <Grid item sx={{ display: "flex", height: 418 }}>
            {/*wtf*/}
            <OverallStats stats={stats} mode={mode} />
          </Grid>
          <Grid item sx={{ display: "flex", height: 450 }}>
            <PieChart data={pieChartData} />
          </Grid>
          <Grid item sx={{ display: "flex", height: 450 }}>
            <BarChart data={barChartData} mode={mode} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Main;
