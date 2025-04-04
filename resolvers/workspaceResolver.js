import { ObjectId } from "mongodb";

const workspaceResolvers = {
  Query: {
    getWorkspaces: async (_, args, { db }) => {
      try {
        const { type, limit } = args.params;
        const filters = {};
        if (type) {
          filters["type"] = type;
        }
        let dbQuery = db.collection("workspaces").find(filters);
        if (limit) {
          dbQuery = dbQuery.limit(limit);
        }
        const data = await dbQuery.toArray();
        return {
          workspaces: data,
          count: data.length,
        };
      } catch (error) {
        console.error("Error fetching workspaces:", error);
        throw new Error("Failed to fetch workspaces");
      }
    },
    getBoard: async (_, args, { db }) => {
      try {
        const { id } = args;
        console.log(args);
        return await db.collection("boards").findOne({ _id: new ObjectId(id) });
      } catch (error) {
        console.error("Error fetching board:", error);
        throw new Error("Failed to fetch board");
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
  Mutation: {
    deleteBoard: async (_, args, { db }) => {
      const { id } = args;
      await db.collection("boards").deleteOne({ _id: id });
      return {
        message: "Board deleted successfully",
      };
    },
  },
};

export default workspaceResolvers;
