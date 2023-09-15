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
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<any, string>({
        query: (name) => `pokemon/${name}`,
      }),
  }),
});

export const { useGetPokemonByNameQuery } = api;
