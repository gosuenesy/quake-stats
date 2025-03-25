import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { grey } from "@mui/material/colors";

function PieChartComponent({ data }) {
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
        title="Games Per Map"
        sx={{ color: grey[100], textAlign: "center" }}
      />
      <CardContent>
        {data.length > 0 ? (
          <PieChart
            series={[
              {
                data,
                innerRadius: 15,
                outerRadius: 115,
                paddingAngle: 3,
                cornerRadius: 3,
                startAngle: -45,
                endAngle: 315,
                cx: 150,
                cy: 150,
              },
            ]}
            width={430}
            height={300}
          />
        ) : (
          <p style={{ color: grey[100] }}>No Data Available</p>
        )}
      </CardContent>
    </Card>
  );
}

export default PieChartComponent;
