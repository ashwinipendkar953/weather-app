// src/components/TemperatureTrendChart.js
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const TemperatureTrendChart = ({ forecast }) => {
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-center text-cyan-500 mb-4">
        5-Day Temperature Trend
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={forecast}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => new Date(date).toLocaleDateString()}
            height={40}
          />
          <YAxis
            label={{ value: "Temp in °C", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            labelFormatter={(date) => new Date(date).toLocaleDateString()}
          />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#00C49F"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureTrendChart;
