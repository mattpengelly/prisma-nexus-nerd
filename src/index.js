const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const { Schema } = require("./schema");

new GraphQLServer({ schema: Schema, context: { prisma } }).start(() =>
  console.log(
    `🚀 Server ready at: http://localhost:4000\n⭐️ See sample queries: http://pris.ly/e/js/graphql#using-the-graphql-api`,
  ),
);
