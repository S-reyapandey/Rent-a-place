
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { useValue } from "../../../context/ContextProvider";
import { Box, Stack, Typography } from "@mui/material";


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function PieRoomsCost() {
  const {
    state: { rooms },
  } = useValue();
  const [costGroups, setCostGroups] = useState([]);

  useEffect(() => {
    let free = 0,
      lessThan1500 = 0,
      between1500And7500 = 0,
      moreThan7500 = 0;
    rooms.forEach((room) => {
      if (room.price === 0) return free++;
      if (room.price < 1500) return lessThan1500++;
      if (room.price <= 7500) return between1500And7500++;
      moreThan7500++;
    });
    setCostGroups([
      { name: "Free Stay", qty: free },
      { name: "Less than Rs.1500", qty: lessThan1500 },
      { name: "Between Rs.1500 and Rs.7500", qty: between1500And7500 },
      { name: "More Than Rs.7500", qty: moreThan7500 },
    ]);
  }, [rooms]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
      }}
    >
      <PieChart width={200} height={200}>
        <Pie
          data={costGroups}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="qty"
        >
          {costGroups.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <Stack gap={2}>
        <Typography variant="h6">Rooms Cost</Typography>
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          {COLORS.map((color, i) => (
            <Stack key={color} alignItems="center" spacing={1}>
              <Box sx={{ width: 20, height: 20, background: color }} />
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                {costGroups[i]?.name}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Stack>
    </Box>
  );
}
