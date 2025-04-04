export default `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "User" type defines a user structure.
  type User {
    _id: String,
    name: String,
    role: String
  }

  type Board {
    _id: String
    name: String
    workspaceId: String
  }

  # This "Workspace" type defines the workspace structure.
  type Workspace {
    _id: String,
    name: String,
    organizationId: String,
    type: String,
    users: [User]
    boards: [Board!]
  }

  # The "Query" type lists all available queries clients can execute.
  type Query {
    workspaces(type: String, limit: Int): [Workspace]
  }
`;
