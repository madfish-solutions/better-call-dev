import { BcdNetwork, buildQuery } from "./base";

/**
 * Queries
 */

export type BcdTokenTransfersParams = {
  network: BcdNetwork;
  address: string;
  last_id?: string;
  size?: number;
};

export const getTokenTransfers = buildQuery<
  BcdTokenTransfersParams,
  BcdTokenTransfers
>("GET", (params) => `/tokens/${params.network}/transfers/${params.address}`, [
  "last_id",
  "size",
]);

/**
 * Types
 */

export interface BcdTokenTransfers {
  last_id?: string;
  transfers: BcdTokenTransfer[];
}

export interface BcdTokenTransfer {
  amount: number;
  contract: string;
  counter: number;
  from: string;
  hash: string;
  level: number;
  network: BcdNetwork;
  nonce: number;
  protocol: string;
  source: string;
  status: string;
  timestamp: string;
  to: string;
  token_id?: number;
}
