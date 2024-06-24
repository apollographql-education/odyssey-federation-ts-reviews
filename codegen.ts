import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/schema.graphql",
  generates: {
    "./src/types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        // contextType: "./context#DataSourceContext",
        useIndexSignature: true,
        federation: true,
        mappers: {
          Listing: "./src/models#ListingModel"
        }
      },
    },
  },
};

export default config;