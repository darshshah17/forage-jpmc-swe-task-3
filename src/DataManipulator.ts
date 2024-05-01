import { ServerRespond } from './DataStreamer';

export interface Row {
  price_1: number,
  price_2: number,
  ratio: number,
  timestamp: Date,
  upper: number,
  lower: number,
  trigger: number | undefined,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]) : Row {
    const price1 = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2;
    const price2 = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2;
    const ratio = price1 / price2;

    const upper = 1.1;
    const lower = 0.9;

    return {
      price_1: price1,
      price_2: price2,
      ratio,
      timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ? serverResponds[0].timestamp : serverResponds[1].timestamp,
      upper: upper,
      lower: lower,
      trigger: (ratio > upper || ratio < lower) ? ratio : undefined,
    };
  }
}
