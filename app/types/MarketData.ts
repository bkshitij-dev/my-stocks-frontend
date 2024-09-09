import { StockData } from "./StockData";

export type MarketData = {
    date: string;
    time: string;
    index: number;
    pointsChange: number;
    percentageChange: number;
    stocks: StockData[];
}