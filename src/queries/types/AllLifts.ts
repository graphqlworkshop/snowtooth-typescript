/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { LiftStatus } from "./../../types/graphql-global-types";

// ====================================================
// GraphQL query operation: AllLifts
// ====================================================

export interface AllLifts_allLifts {
  __typename: "Lift";
  /**
   * The number of feet in elevation that a `Lift` ascends
   */
  elevationGain: number;
  /**
   * The unique identifier for a `Lift` (id: "panorama")
   */
  id: string;
  /**
   * The name of a `Lift`
   */
  name: string;
  /**
   * The current status for a `Lift`: `OPEN`, `CLOSED`, `HOLD`
   */
  status: LiftStatus | null;
  /**
   * The number of people that a `Lift` can hold
   */
  capacity: number;
}

export interface AllLifts {
  /**
   * A list of all `Lift` objects
   */
  allLifts: AllLifts_allLifts[];
}
