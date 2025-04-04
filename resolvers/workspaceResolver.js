const workspaceResolvers = {
  Query: {
    workspaces: async (_, __, { db }) => {
      try {
        return await db.collection("workspaces").find().toArray();
      } catch (error) {
        console.error("Error fetching workspaces:", error);
        throw new Error("Failed to fetch workspaces");
      }
    },
  },
};

export default workspaceResolvers;
