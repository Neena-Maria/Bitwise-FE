import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const GITHUB_API_ENDPOINT = 'https://api.github.com/graphql';

type GetUserRepositoriesResponse = {
  user: {
    repositories: {
      nodes: {
        name: string;
        description: string | null;
      }[];
    };
  };
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.4.221:3000' }),
  endpoints: (builder) => ({
    login: builder.mutation({
        query: () => {
          return {
            url: "/api/google/initiate-auth",
            method: "POST",
          }
        },
      }),
  }),
});

export const { useLoginMutation } = api;
