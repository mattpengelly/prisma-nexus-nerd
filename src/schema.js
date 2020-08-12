const { nexusPrismaPlugin } = require("nexus-prisma");
const { makeSchema } = require("nexus");
const { Query } = require("./query.js");
const { Mutation } = require("./mutation.js");
const {
	Account,
	Assessment,
	AssessmentAnswer,
	AssessmentPhrasing,
	AssessmentQuestion,
	EnumAssessmentAnswer,
	Lead,
	LeadWorkingEventLog,
	Role,
	SalesTeam,
	User,
	LocationCoords,
	GQLDateTime,
} = require("./types.js");
// import * as Types from './src/types.js'

const Schema = makeSchema({
	types: [
		Query,
		Mutation,
		Account,
		Assessment,
		AssessmentAnswer,
		AssessmentPhrasing,
		AssessmentQuestion,
		EnumAssessmentAnswer,
		Lead,
		LeadWorkingEventLog,
		Role,
		SalesTeam,
		User,
		LocationCoords,
		GQLDateTime,
	],
	plugins: [nexusPrismaPlugin()],
	// stops some error
	resolverValidationOptions: {
		requireResolversForResolveType: false,
	},
	plugins: [nexusPrismaPlugin()],
	outputs: {
		schema: __dirname + "/generated/schema.graphql",
		typegen: __dirname + "/generated/nexus.ts",
	},
});

module.exports = { Schema };
