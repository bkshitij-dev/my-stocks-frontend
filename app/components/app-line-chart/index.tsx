import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { calculateSMA, calculateEMA } from '@/app/utils/math';

const AppLineChart = ({ data, min, max, title }: { data: any[], min: number, max: number, title: string }) => {

  const yAxisSpacingPoint = (max - min) * 0.1;

  min = Math.round(min - yAxisSpacingPoint);
  max = Math.round(max + yAxisSpacingPoint);

  const SMA20 = calculateSMA(data, 20);
  const EMA9 = calculateEMA(data, 9);
  const EMA12 = calculateEMA(data, 12);
  const EMA26 = calculateEMA(data, 26);

  const combinedData = data.map((d) => {
    const smaPoint20 = SMA20.find(e => e.date === d.date);
    const emaPoint9 = EMA9.find(e => e.date === d.date);
    const emaPoint12: any = EMA12.find(e => e.date === d.date);
    const emaPoint26: any = EMA26.find(e => e.date === d.date);

    return {
      ...d,
      sma20: smaPoint20 ? smaPoint20.sma : null,
      ema9: emaPoint9 ? emaPoint9.ema : null,
      ema12: emaPoint12 ? emaPoint12.ema : null,
      ema26: emaPoint26 ? emaPoint26.ema : null
      // macd: (emaPoint12 !== undefined && emaPoint26 !== undefined) ? (emaPoint12.ema - emaPoint26.ema) : null
    };
  });

  return (
    <div className="rounded-xl w-full h-full p-4">
      <div className="flex justify-center items-center mb-4">
        <h1 className="text-md font-semibold">{title}</h1>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={combinedData}
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
                y={y + 10}
                textAnchor="middle"
                fill="#666"
                transform={`rotate(-45, ${x}, ${y + 10})`}
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
          <Line type="monotone" dataKey="index" data={data} strokeWidth={5} />
          <Line type="monotone" dataKey="sma20" stroke="#000" />
          <Line type="monotone" dataKey="ema9" stroke="red" />
          4<Line type="monotone" dataKey="ema12" stroke="#82ca9d" />
          <Line type="monotone" dataKey="ema26" stroke="#ffa500" />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
};

export default AppLineChart;