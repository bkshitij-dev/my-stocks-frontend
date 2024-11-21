export function calculateSMA(data: any[], period: number) {
  const sma = [];
  for (let i = 0; i <= data.length - period; i++) {
      const window = data.slice(i, i + period);
      
      // Access the 'index' property for the average calculation
      const average = window.reduce((sum, item) => sum + item.index, 0) / period;
      sma.push({ date: data[i + period - 1].date, sma: Number(average.toFixed(2)) });
  }
  return sma;
}

export function calculateEMA(data: any[], period: number) {
  const emaValues = [];
  const k = 2 / (period + 1); // Smoothing factor

  // Calculate the first EMA value using a Simple Moving Average
  const initialSMA = data.slice(0, period).reduce((sum, value) => sum + value.index, 0) / period;
  emaValues.push(Number(initialSMA.toFixed(2)));

  // Calculate subsequent EMA values
  for (let i = period; i < data.length; i++) {
      const currentPrice = data[i].index;
      const ema: any = (currentPrice - emaValues[i - period]) * k + emaValues[i - period];
      emaValues.push(Number(ema.toFixed(2)));
  } 

  // Add dates for the calculated EMA values
  return emaValues.map((ema, index) => ({
      date: data[index + period - 1].date, // Match the date with the EMA value
      ema: ema
  }));
}

// export function calculateMACD(data: any[]) {
//     // Calculate the 12-day and 26-day EMAs
//     const ema12 = calculateEMA12(data);
//     const ema26 = calculateEMA26(data);
  
//     // Calculate MACD line (12-day EMA - 26-day EMA)
//     const macdLine = ema12.map((point, idx) => {
//       if (point == null || ema26[idx] == null) return null;
//       const macdValue = point.value - ema26[idx].value;
//       return { ...point, macd: macdValue };
//     });
  
//     // Calculate 9-day EMA of the MACD line to get the Signal Line
//     const signalLine = calculateEMA(macdLine.filter(Boolean), 9); // Filter out nulls
  
//     // Calculate MACD Histogram (MACD - Signal Line)
//     const histogram = macdLine.map((point, idx) => {
//       if (point == null || signalLine[idx] == null) return null;
//       const histogramValue = point.macd - signalLine[idx].value;
//       return { ...point, histogram: histogramValue };
//     });
  
//     return {
//       macdLine,
//       signalLine,
//       histogram,
//     };
//   }
  
