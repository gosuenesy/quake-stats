import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { grey } from "@mui/material/colors";

function BarChartComponent({ data, mode }) {
  return (
    <Card
      sx={{
        backgroundColor: grey[800],
        borderRadius: 2,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
        padding: 2,
        textAlign: "center",
      }}
    >
      <CardHeader
        title={`Win% per Map`}
        //title={`Win % & ${mode === "CTF" ? "Caps" : "Net"} per Map`}
      />
      <CardContent>
        {data.length > 0 ? (
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: data.map((item) => item.label),
                label: "Maps",
              },
            ]}
            series={[
              {
                data: data.map((item) => item.winPercentage),
                label: "Win%",
                color: "#4caf50",
              },
            //   {
            //     data: data.map((item) => item.capsOrNet),
            //     label: mode === "CTF" ? "Caps/Game" : "Net",
            //     color: "#ff9800",
            //   },
            ]}
            width={450}
            height={300}
          />
        ) : (
          <p>No Data Available</p>
        )}
      </CardContent>
    </Card>
  );
}

export default BarChartComponent;
