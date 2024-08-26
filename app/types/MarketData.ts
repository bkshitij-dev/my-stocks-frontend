import { StockData } from "./StockData";

export type MarketData = {
    date: string;
    time: string;
    index: number;
    percentageChange: number;
    stocks: StockData[];
}