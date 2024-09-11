import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AppLineChart = ({ data, min, max, title }: { data: any[], min: number, max: number, title: string }) => {

  const yAxisSpacingPoint = (max - min) * 0.1;

  min = Math.round(min - yAxisSpacingPoint);
  max = Math.round(max + yAxisSpacingPoint);

  return (
    <div className="rounded-xl w-full h-full p-4">
      <div className="flex justify-center items-center mb-4">
        <h1 className="text-md font-semibold">{title}</h1>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            tick={({ x, y, payload }) => (
              <text
                x={x}
                y={y + 10}  // Adjust vertical positioning
                textAnchor="middle"
                fill="#666"
                transform={`rotate(-45, ${x}, ${y + 10})`}  // Rotate labels by -45 degrees
                style={{ fontSize: '12px' }}
              >
                {payload.value}
              </text>
            )}
          />
          <YAxis axisLine={false} tickLine={false} tickMargin={20} domain={[min, max]} />
          <Tooltip />
          <Legend
            align="center"
            verticalAlign="bottom"
            wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
          />
          <Line
            type="monotone"
            dataKey="index"
            strokeWidth={5}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AppLineChart;