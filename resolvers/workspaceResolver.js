const workspaceResolvers = {
  Query: {
    workspaces: async (_, args, { db }) => {
      try {
        const { type, limit } = args;
        const filters = {};
        if (type) {
          filters["type"] = type;
        }
        let dbQuery = db.collection("workspaces").find(filters);
        if (limit) {
          dbQuery = dbQuery.limit(limit);
        }
        const data = await dbQuery.toArray();
        return data;
      } catch (error) {
        console.error("Error fetching workspaces:", error);
        throw new Error("Failed to fetch workspaces");
      }
    },
  },
  Workspace: {
    boards: async (parent, _, { db }) => {
      return await db
        .collection("boards")
        .find({ workspaceId: parent._id })
        .toArray();
    },
  },
};

export default workspaceResolvers;
