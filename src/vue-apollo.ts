import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  from,
  InMemoryCache,
} from "@apollo/client/core";
import { asyncMap } from "@apollo/client/utilities";
import { createUploadLink } from "apollo-upload-client";

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: "http://localhost:4000/graphql",
});

// Cache implementation
const cache = new InMemoryCache();

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem("token") || null,
    },
  }));

  return asyncMap(forward(operation), async (response) => {
    const { response: res } = operation.getContext();
    if (res) {
      const token = res.headers.get("AUTHORIZATION");

      if (token) {
        localStorage.setItem("token", token);
      }
    }
    return response;
  });
});

const apolloUpload = createUploadLink({
  uri: "/graphql",
  credentials: "include",
});

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: from([authMiddleware, httpLink, apolloUpload]),
  cache,
});
