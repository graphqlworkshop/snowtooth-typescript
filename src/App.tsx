import React from "react";
import { useQuery } from "@apollo/react-hooks";
import liftQuery from "./queries/liftQuery";
import { AllLifts } from "./queries/types/AllLifts";

const App: React.FC = () => {
  const { loading, data } = useQuery<AllLifts>(liftQuery);
  if (loading) return <p>Loading</p>;
  return (
    <section>
      <h1>Snowtooth Lift Status</h1>
      {data && !loading && (
        <table>
          <thead>
            <tr>
              <th>Lift Name</th>
              <th>Lift Status</th>
            </tr>
          </thead>
          <tbody>
            {data.allLifts.map(lift => (
              <tr>
                <td>{lift.name}</td>
                <td>{lift.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default App;
