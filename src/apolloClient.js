import { ApolloClient, InMemoryCache } from "@apollo/client";
// const environmentServer =
//   process.env.REACT_APP_NODE_ENV === "dev"
//     ? "http://localhost:8080"
//     : process.env.REACT_APP_SERVER_URL;

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        memes: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_SERVER_URL}/graphql`,
  cache: cache,
});

export default client;
