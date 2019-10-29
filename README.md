# TypeScript and Apollo CLI

The technologies used for this project are:

- React/Create React App
- TypeScript
- GraphQL
- Apollo CLI

## Steps

## Create React App with TypeScript Setup

If you want to start from scratch, just start here! Otherwise, you can run this repo which is the finished project.

### TypeScript & Create React App

1. Run `create-react-app` with the `--typescript` flag

```
npx create-react-app snowtooth-ui --typescript
npm install graphql apollo-boost @apollo/react-hooks
cd snowtooth-ui
npm start
```

2. What's been created?

- `package.json`
- Behind the scenes of `react-scripts` everything is happening: building project, babel, etc.
- `src` for all files `.tsx`

## Apollo CLI & VSCode Extension

### 1. Downloading the Schema

```
npx apollo schema:download --endpoint=https://snowtooth.moonhighway.com graphql-schema.json
```

### 2. Installing the VSCode Extension

- Install the extension
- Add the `apollo.config.js`

```javascript
module.exports = {
  client: {
    service: "EVEPORCELLO-6318"
  }
};
```

- Add the `.env` file

```
ENGINE_API_KEY=service:eveporcello-6318:RQYT_LtqhrYG8Taw7ORtzA
```

- Show the Apollo Tab at the bottom
- In a second, we'll start to see how cool this is.

### 3. Creating the Query

1. Create `src/queries` folder
2. Create `liftQuery.ts` file

_Because of the VSCode Extension, we can use VSCode like the playground. CTRL + Space surfaces the fields_

```javascript
import { gql } from "apollo-boost";

const liftQuery = gql`
  query AllLifts {
    allLifts {
      id
      name
      status
      capacity
      trailAccess {
        id
        name
        status
      }
    }
  }
`;

export default liftQuery;
```

### 4. Generate Types

```
npx apollo codegen:generate --localSchemaFile=graphql-schema.json --target=typescript --includes=src/**/*.ts --tagName=gql --addTypename --globalTypesFile=src/types/graphql-global-types.ts types
```

## Snowtooth UI

Based on the schema and the types, we'll create the UI for Snowtooth.

1. Create Apollo Client

**src/index.tsx**

```javascript
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient({
  uri: "https://snowtooth.moonhighway.com"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
```

2. Create `App.tsx`

```typescript
import { useQuery } from "@apollo/react-hooks";
import liftQuery from "./queries/liftQuery";
import { AllLifts } from "./queries/types/AllLifts";

const App: React.FC = () => {
  const { loading, data } = useQuery<AllLifts>(liftQuery);
  if (loading) return <p>Loading</p>;

  return <h1>Snowtooth Lift Status</h1>;
};
```

3. Show the Data

```typescript
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
        <table className="lifts">
          <thead>
            <tr>
              <th>Lift Name</th>
              <th>Current Status</th>
            </tr>
          </thead>
          <tbody>
            {data.allLifts.map(lift => (
              <tr key={lift.id}>
                <td>{lift.name}</td>
                <td>{lift.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
};
```
