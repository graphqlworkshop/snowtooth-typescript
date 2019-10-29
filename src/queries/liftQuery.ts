import { gql } from "apollo-boost";

const liftQuery = gql`
  query AllLifts {
    allLifts {
      elevationGain
      id
      name
      status
      capacity
    }
  }
`;

export default liftQuery;
