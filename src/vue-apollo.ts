import {
  ApolloClient,
  ApolloLink,
  from,
  InMemoryCache,
} from "@apollo/client/core";
import { asyncMap } from "@apollo/client/utilities";
import { createUploadLink } from "apollo-upload-client";
import { store } from "./store";

// Cache implementation
const cache = new InMemoryCache();

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: store.getters.token || null,
    },
  }));

  return asyncMap(forward(operation), async (response) => {
    const { response: res } = operation.getContext();
    if (res) {
      const token = res.headers.get("AUTHORIZATION");

      if (token) {
        store.commit("setToken", token);
      }
    }
    return response;
  });
});

const httpUpload: ApolloLink = createUploadLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
}) as unknown as ApolloLink;

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: from([authMiddleware, httpUpload]),
  cache,
});
