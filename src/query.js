const {
	queryType,
	mutationType,
	objectType,
	arg,
	intArg,
	stringArg,
	idArg,
	interfaceType,
	inputObjectType,
	enumType,
	scalarType,
	booleanArg,
} = require("@nexus/schema");

const { coords } = require("./api/geocode");
const { orObjects } = require("./orobjects");

const Query = queryType({
	definition(t) {
		t.field("account", {
			type: "Account",
			nullable: true,
			args: {
				id: intArg({ nullable: true }),
				acct_num: stringArg({ nullable: true }),
			},
			resolve(parent, args, ctx) {
				console.log("parent: ", parent);
				console.log("args: ", args);
				console.log("ctx: ", ctx.prisma.contact);
				return ctx.prisma.account
					.findOne({
						where: args,
						include: {
							User_Account_lead_creator_idToUser: true,
							User_Account_advisor_idToUser: true,
							Contact_Account_contact_primary_idToContact: true,
							Contact_Account_contact_secondary_idToContact: true,
							Location: true,
						},
					})
					.then((result) => {
						if (result === null) {
							throw new Error(`No account with id of "${args.id}"`);
						}
						return result;
					});
			},
		});
		t.list.field("accounts", {
			type: "Account",
			nullable: true,
			args: {
				contact_primary_id: intArg({ nullable: true }),
				contact_secondary_id: intArg({ nullable: true }),
				from_lead_id: intArg({ nullable: true }),
				lead_creator_id: intArg({ nullable: true }),
				location_id: intArg({ nullable: true }),
				organization_id: intArg({ nullable: true }),
				advisor_id: intArg({ nullable: true }),
				status: stringArg({ nullable: true }),
				type: stringArg({ nullable: true }),
				useOr: booleanArg({ nullable: true }),
			},
			resolve(parent, args, ctx) {
				console.log("parent: ", parent);
				console.log("args: ", args);
				console.log("ctx: ", ctx.prisma.contacts);
				if (args.useOr === true) {
					let newArgs = orObjects(args);
					console.log("newArgs: ", newArgs);
					args = newArgs;
				} else {
					args = [args];
				}
				return ctx.prisma.account
					.findMany({
						where: { OR: args },
						include: {
							User_Account_lead_creator_idToUser: true,
							User_Account_advisor_idToUser: true,
							Contact_Account_contact_primary_idToContact: true,
							Contact_Account_contact_secondary_idToContact: true,
							Location: true,
						},
					})
					.then((result) => {
						if (result === null) {
							throw new Error(`No account with id of "${args.id}"`);
						}
						// console.log(result);

						return result;
					});
			},
		});

		t.field("assessment", {
			type: "Assessment",
			nullable: true,
			args: {
				id: intArg({ nullable: true }),
			},
			resolve(parent, args, ctx) {
				return ctx.prisma.assessment
					.findOne({
						where: args,
						include: {
							Account: true,
							Lead: true,
							User: true,
							AssessmentAnswer: true,
						},
					})
					.then((result) => {
						if (result === null) {
							throw new Error(`No assessment with id of "${args.id}"`);
						}
						return result;
					});
			},
		});
		t.list.field("assessments", {
			type: "Assessment",
			nullable: true,
			args: {
				account_id: intArg({ nullable: true }),
				lead_id: intArg({ nullable: true }),
				assessor_id: intArg({ nullable: true }),
				useOr: booleanArg({ nullable: true }),
			},
			resolve(parent, args, ctx) {
				if (args.useOr === true) {
					let newArgs = orObjects(args);
					console.log("newArgs: ", newArgs);
					args = newArgs;
				}
				return ctx.prisma.assessment
					.findMany({
						where: args,
						include: {
							Account: true,
							Lead: true,
							User: true,
							AssessmentAnswer: true,
						},
					})
					.then((result) => {
						if (result === null) {
							throw new Error(`No assessments with "${args}"`);
						}
						return result;
					});
			},
		});

		t.field("assessmentAnswer", {
			type: "AssessmentAnswer",
			nullable: true,
			args: {
				id: intArg({ nullable: true }),
			},
			resolve(parent, args, ctx) {
				return ctx.prisma.assessmentAnswer
					.findOne({
						where: args,
						include: {
							Assessment: true,
							AssessmentQuestion: true,
							AssessmentPhrasing: true,
						},
					})
					.then((result) => {
						if (result === null) {
							throw new Error(`No assessment answer with id of "${args.id}"`);
						}
						return result;
					});
			},
		});
		t.list.field("assessmentAnswers", {
			type: "AssessmentAnswer",
			nullable: true,
			args: {
				assessment_id: intArg({ nullable: true }),
				question_id: intArg({ nullable: true }),
				phrasing_id: intArg({ nullable: true }),
				useOr: booleanArg({ nullable: true }),
			},
			resolve(parent, args, ctx) {
				if (args.useOr === true) {
					let newArgs = orObjects(args);
					console.log("newArgs: ", newArgs);
					args = newArgs;
				}
				return ctx.prisma.assessmentAnswer
					.findMany({
						where: args,
						include: {
							Assessment: true,
							AssessmentQuestion: true,
							AssessmentPhrasing: true,
						},
					})
					.then((result) => {
						if (result === null) {
							throw new Error(`No assessment answers with "${args}"`);
						}

						return result;
					});
			},
		});

		t.field("assessmentPhrasing", {
			type: "AssessmentPhrasing",
			nullable: true,
			args: {
				id: intArg({ nullable: true }),
			},
			resolve(parent, args, ctx) {
				return ctx.prisma.assessmentPhrasing
					.findOne({
						where: args,
						include: {
							AssessmentQuestion: true,
							AssessmentAnswers: true,
						},
					})
					.then((result) => {
						if (result === null) {
							throw new Error(`No assessment phrasing with id of "${args.id}"`);
						}
						return result;
					});
			},
		});
		t.list.field("assessmentPhrasings", {
			type: "AssessmentPhrasing",
			nullable: true,
			args: {
				assessment_id: intArg({ nullable: true }),
				question_id: intArg({ nullable: true }),
				phrasing_id: intArg({ nullable: true }),
				useOr: booleanArg({ nullable: true }),
			},
			resolve(parent, args, ctx) {
				if (args.useOr === true) {
					let newArgs = orObjects(args);
					console.log("newArgs: ", newArgs);
					args = newArgs;
				}
				return ctx.prisma.assessmentPhrasing
					.findMany({
						where: args,
						include: {
							AssessmentQuestion: true,
							AssessmentAnswers: true,
						},
					})
					.then((result) => {
						if (result === null) {
							throw new Error(`No assessment phrasings with "${args}"`);
						}

						return result;
					});
			},
		});

		t.field("assessmentQuestion", {
			type: "AssessmentQuestion",
			nullable: true,
			args: {
				id: intArg({ nullable: true }),
			},
			resolve(parent, args, ctx) {
				return ctx.prisma.assessmentQuestion
					.findOne({
						where: args,
						include: {
							AssessmentPhrasing: true,
							AssessmentAnswers: true,
							EnumAssessmentAnswers: true,
						},
					})
					.then((result) => {
						if (result === null) {
							throw new Error(`No assessment question with id of "${args.id}"`);
						}
						return result;
					});
			},
		});
		t.list.field("assessmentQuestions", {
			type: "AssessmentQuestion",
			nullable: true,
			args: {
				answer_type: stringArg({ nullable: true }),
				category: stringArg({ nullable: true }),
				required: booleanArg({ nullable: true }),
			},
			resolve(parent, args, ctx) {
				if (args.useOr === true) {
					let newArgs = orObjects(args);
					console.log("newArgs: ", newArgs);
					args = newArgs;
				}
				return ctx.prisma.assessmentQuestion
					.findMany({
						where: args,
						include: {
							AssessmentPhrasing: true,
							AssessmentAnswers: true,
							EnumAssessmentAnswers: true,
						},
					})
					.then((result) => {
						if (result === null) {
							throw new Error(`No assessment questions with "${args}"`);
						}

						return result;
					});
			},
		});

		t.field("lead", {
			type: "Lead",
			nullable: true,
			args: {
				id: intArg({ nullable: true }),
				email_one: stringArg({ nullable: true }),
				phone_cell: stringArg({ nullable: true }),
			},
			resolve(parent, args, ctx) {
				console.log("parent: ", parent);
				console.log("args: ", args);
				if (Object.keys(args).length != 1) {
					throw new Error(`Query requires exactly one agrument`);
				} else {
					return ctx.prisma.lead
						.findOne({
							where: args,
							include: {
								User: true,
								LeadCreator: true,
								LeadConverter: true,
								LeadOwner: true,
								LeadCampaign: { include: { LeadSource: true } },
								EnumMarketingDisqualReason: true,
								EnumLeadCampaignDisqualReason: true,
							},
						})
						.then((result) => {
							if (result === null) {
								throw new Error(`No account with id of "${args.id}"`);
							}
							// console.log(result);

							return result;
						});
				}
			},
		});
		t.list.field("leads", {
			type: "Lead",
			nullable: true,
			args: {
				lead_creator_id: intArg({ nullable: true }),
				lead_owner_id: intArg({ nullable: true }),
				marketing_qualified: booleanArg({ nullable: true }),
				assessment_complete: booleanArg({ nullable: true }),
				address_verified: booleanArg({ nullable: true }),
				useOr: booleanArg({ nullable: true }),
			},
			resolve(parent, args, ctx) {
				console.log("Args: ", args);

				if (args.useOr === true) {
					let newArgs = orObjects(args);
					console.log("newArgs: ", newArgs);
					args = newArgs;
				} else {
					args = [args];
				}
				return ctx.prisma.lead
					.findMany({
						where: { OR: args },
						include: {
							LeadCreator: true,
							LeadConverter: true,
							LeadCampaign: true,
							LeadOwner: true,
							EnumMarketingDisqualReason: true,
							EnumLeadCampaignDisqualReason: true,
							// LeadCampaign: { include: { LeadSource: true } },
						},
					})
					.then((result) => {
						if (result === null) {
							throw new Error(`No account with data of "${args}"`);
						}
						// console.log(result);

						return result;
					});
			},
		});
		t.list.field("pipeline", {
			type: "Lead",
			nullable: true,
			args: {
				lead_creator_id: intArg({ nullable: true }),
				marketing_qualified: booleanArg({ nullable: true }),
				assessment_complete: booleanArg({ nullable: true }),
				address_verified: booleanArg({ nullable: true }),
				useOr: booleanArg({ nullable: true }),
			},
			resolve(parent, args, ctx) {
				console.log("Args: ", args);

				if (args.useOr === true) {
					let newArgs = orObjects(args);
					console.log("newArgs: ", newArgs);
					args = newArgs;
				} else {
					args = [args];
				}
				return ctx.prisma.lead
					.findMany({
						where: { OR: args },
						include: {
							LeadCreator: true,
							LeadConverter: true,
							LeadCampaign: true,
							EnumMarketingDisqualReason: true,
							EnumLeadCampaignDisqualReason: true,
							// LeadCampaign: { include: { LeadSource: true } },
						},
					})
					.then((result) => {
						if (result === null) {
							throw new Error(`No account with data of "${args}"`);
						}
						// console.log(result);

						return result;
					});
			},
		});
		t.field("LWELog", {
			type: "LeadWorkingEventLog",
			nullable: true,
			args: {
				id: intArg({ nullable: true }),
			},
			resolve(parent, args, ctx) {
				console.log("parent: ", parent);
				console.log("args: ", args);
				if (Object.keys(args).length != 1) {
					throw new Error(`Query requires exactly one agrument`);
				} else {
					return ctx.prisma.leadWorkingEventLog
						.findOne({
							where: args,
							include: {
								User: true,
								Lead: true,
								EnumCommunicationType: true,
								EnumLeadWorkingEventDispo: true,
							},
						})
						.then((result) => {
							if (result === null) {
								throw new Error(`No log with id of "${args.id}"`);
							}
							console.log(result);

							return result;
						});
				}
			},
		});
		t.list.field("LWELogs", {
			type: "LeadWorkingEventLog",
			nullable: true,
			args: {
				test_log_entry: booleanArg({ nullable: true }),
				lead_id: intArg({ nullable: true }),
			},
			resolve(parent, args, ctx) {
				return ctx.prisma.leadWorkingEventLog
					.findMany({
						where: args,
						include: {
							User: true,
							Lead: true,
							EnumCommunicationType: true,
							EnumLeadWorkingEventDispo: true,
						},
					})
					.then((result) => {
						if (result === null) {
							throw new Error(`No logs matching criteria found`);
						}
						console.log(result);
						return result;
					});
			},
		});
		t.field("role", {
			type: "Role",
			nullable: true,
			args: { id: intArg({ nullable: false }) },
			resolve(parent, args, ctx) {
				return ctx.prisma.role
					.findOne({
						where: {
							id: args.id,
						},
					})
					.then((result) => {
						if (result === null) {
							throw new Error(`No role with id of "${args.id}"`);
						}
						// console.log(result);

						return result;
					});
			},
		});
		t.field("salesTeam", {
			type: "SalesTeam",
			nullable: true,
			args: {
				name: stringArg({ nullable: true }),
				id: intArg({ nullable: true }),
			},
			resolve(parent, args, ctx) {
				return ctx.prisma.salesTeam
					.findOne({
						where: {
							...args,
						},
						include: {
							User_SalesTeamToUser_team_id: true,
							User_SalesTeam_team_lead_one_idToUser: true,
						},
					})
					.then((result) => {
						if (result.length === 0) {
							throw new Error(`No team with data of "${JSON.stringify(args)}"`);
						}
						// console.log(result);

						return result;
					});
			},
		});
		t.list.field("salesTeams", {
			type: "SalesTeam",
			nullable: true,
			args: {
				useOr: booleanArg({ nullable: true }),
				team_lead_one_id: intArg({ nullable: true }),
				team_lead_two_id: intArg({ nullable: true }),
				id: intArg({ nullable: true }),
				name: stringArg({ nullable: true }),
			},
			resolve(parent, args, ctx) {
				if (args.useOr === true) {
					let newArgs = orObjects(args);
					console.log("newArgs: ", newArgs);
					args = newArgs;
				} else {
					args = [args];
				}
				console.log("args: ", args);

				return ctx.prisma.salesTeam
					.findMany({
						where: {
							OR: args,
						},
						include: {
							User_SalesTeam_team_lead_one_idToUser: {
								include: { Role: true },
							},
							User_SalesTeamToUser_team_id: {
								include: { Role: true },
							},
						},
					})
					.then((result) => {
						if (result === null) {
							throw new Error(`No sales teams matching "${args}"`);
						}
						// console.log("salesTeams result before get role: ", result);

						// Object.keys(result).forEach(function(item) {
						// 	// console.log('item: ', result[item]);
						// 	result[item].User_SalesTeam_team_lead_one_idToUser.Role = getRole(
						// 		{
						// 			id:
						// 				result[item].User_SalesTeam_team_lead_one_idToUser.role_id,
						// 		}
						// 	);
						// 	Object.keys(result[item].User_SalesTeamToUser_team_id).forEach(
						// 		function(item2) {
						// 			result[item].User_SalesTeamToUser_team_id[
						// 				item2
						// 			].Role = getRole({
						// 				id:
						// 					result[item].User_SalesTeamToUser_team_id[item2].role_id,
						// 			});
						// 		}
						// 	);
						// });
						// console.log("salesTeams result after get role: ", result);
						return result;
					});
			},
		});
		t.list.field("user", {
			type: "User",
			nullable: true,
			args: {
				// findAll: booleanArg({nullable: true}),
				id: intArg({ nullable: true }),
				email_nerd: stringArg({ nullable: true }),
			},
			resolve(parent, args, ctx) {
				return ctx.prisma.user
					.findMany({
						where: {
							OR: [args],
						},
						include: {
							Role: true,
							SalesTeam_SalesTeamToUser_team_id: true,
						},
					})
					.then((result) => {
						if (result.length === 0) {
							throw new Error(`No user with data of "${JSON.stringify(args)}"`);
						}
						// console.log(result);

						return result;
					});
			},
		});
		t.list.field("users", {
			type: "User",
			nullable: true,
			args: {
				id: intArg({ nullable: true }),
				email_nerd: stringArg({ nullable: true }),
			},
			resolve(parent, args, ctx) {
				return ctx.prisma.user
					.findMany({
						where: args,
						include: {
							Role: true,
							SalesTeam_SalesTeamToUser_team_id: true,
						},
					})
					.then((result) => {
						if (result.length === 0) {
							throw new Error(`No user with data of "${JSON.stringify(args)}"`);
						}
						// console.log(result);

						return result;
					});
			},
		});
		t.list.field("usersByTeam", {
			type: "User",
			nullable: true,
			args: {
				// name: stringArg({ nullable: true }),
				team_id: intArg({ nullable: true }),
			},
			resolve(parent, args, ctx) {
				return ctx.prisma.user
					.findMany({
						where: {
							OR: [args],
						},
						include: {
							Role: true,
						},
					})
					.then((result) => {
						if (result.length === 0) {
							throw new Error(
								`No users with data of "${JSON.stringify(args)}"`
							);
						}
						// console.log(result);

						return result;
					});
			},
		});

		t.field("enumAssessmentAnswer", {
			type: "EnumAssessmentAnswer",
			nullable: true,
			args: {
				id: intArg({ nullable: true }),
			},
			resolve(parent, args, ctx) {
				return ctx.prisma.enumAssessmentAnswer
					.findOne({
						where: args,
						include: {
							AssessmentQuestion: { include: { AssessmentPhrasing: true } },
						},
					})
					.then((result) => {
						if (result === null) {
							throw new Error(`No account with id of "${args.id}"`);
						}
						return result;
					});
			},
		});
		t.list.field("enumAssessmentAnswers", {
			type: "EnumAssessmentAnswer",
			nullable: true,
			args: {
				question_id: intArg({ nullable: true }),
			},
			resolve(parent, args, ctx) {
				if (args.useOr === true) {
					let newArgs = orObjects(args);
					console.log("newArgs: ", newArgs);
					args = newArgs;
				} else {
					args = [args];
				}
				return ctx.prisma.enumAssessmentAnswer
					.findMany({
						where: { OR: args },
						include: {
							AssessmentQuestion: { include: { AssessmentPhrasing: true } },
						},
					})
					.then((result) => {
						if (result === null) {
							throw new Error(`No account with id of "${args.id}"`);
						}
						// console.log(result);

						return result;
					});
			},
		});

		t.field("coordinatesByAddress", {
			type: "LocationCoords",
			nullable: true,
			args: {
				address_one: stringArg({ nullable: true }),
				address_two: stringArg({ nullable: true }),
				city: stringArg({ nullable: true }),
				state_abbr: stringArg({ nullable: true }),
				zip: stringArg({ nullable: true }),
			},
			resolve(parent, args, ctx) {
				async function getCoords() {
					console.log("Args: ", args);
					const result = await coords(
						args.address_one,
						args.address_two,
						args.city,
						args.state_abbr,
						args.zip
					);
					if (result.Error) {
						throw new Error("Error from geolocation service: " + result.Error);
					}
					return result;
				}
				return getCoords();
			},
		});
	},
});

module.exports = { Query };
