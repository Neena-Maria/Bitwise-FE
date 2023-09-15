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
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    login: builder.mutation({
        query: () => {
          return {
            url: "/api/google/initiate-auth",
            method: "POST",
          }
        },
      }),
      getWorkSpaces: builder.query({
        query: () => {
          return {
            url: "/api/workspace",
            method: "GET",
          }
        },
      }),
      addWorkSpace: builder.mutation({
        query: (requestBody) => {
          return {
            url: "/api/workspace",
            method: "POST",
            body:requestBody
          }
        },
      }),
  }),
});

export const { useLoginMutation, useGetWorkSpacesQuery, useLazyGetWorkSpacesQuery, useAddWorkSpaceMutation } = api;
