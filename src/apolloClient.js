import { ApolloClient, InMemoryCache } from "@apollo/client";
const environmentServer =
  process.env.REACT_APP_NODE_ENV !== "dev"
    ? "http://localhost:8080"
    : "https://memeserverql.onrender.com";

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
  uri: `${environmentServer}/graphql`,
  cache: cache,
});

export default client;
