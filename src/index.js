const { GraphQLServer } = require("graphql-yoga");

const typeDefs = "./src/schema.graphql";
let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL"
  },
  {
    id: "link-1",
    url: "www.prisma.io",
    description: "Prisma replaces ORMs"
  }
];
// 1
let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, args) => {
      const link = links.find(link => link.id === args.id);
      return link;
    }
  },

  Mutation: {
    // 2
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      const oldLink = links.find(link => link.id === args.id);
      const newLink = {
        ...oldLink,
        url: args.url,
        description: args.description
      };
      let updatedLinks = links;
      updatedLinks[links.indexOf(oldLink)] = newLink;
      links = updatedLinks;
      return newLink;
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});
server.start(() => console.log("server is running"));
