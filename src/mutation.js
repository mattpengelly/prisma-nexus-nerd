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

const { convertLead } = require("./convertlead");
const { get } = require("https");

const Mutation = mutationType({
	definition(t) {
		t.field("createLead", {
			type: "Lead",
			args: {
				test_lead: booleanArg({ nullable: true }),
				marketing_qualified: stringArg({ nullable: true }),
				email_one: stringArg({ nullable: true }),
				email_two: stringArg({ nullable: true }),
				first_name: stringArg({ nullable: true }),
				last_name: stringArg({ nullable: true }),
				address_one: stringArg({ nullable: true }),
				address_two: stringArg({ nullable: true }),
				city: stringArg({ nullable: true }),
				state_abbr: stringArg({ nullable: true }),
				zip: stringArg({ nullable: true }),
				gate_code: stringArg({ nullable: true }),
				address_verified: booleanArg({ nullable: true }),
				phone_cell: stringArg({ nullable: true }),
				phone_home: stringArg({ nullable: true }),
				latitude: stringArg({ nullable: true }),
				longitude: stringArg({ nullable: true }),
				lead_creator_id: intArg({ nullable: true }),
				lead_owner_id: intArg({ nullable: true }),
				lead_campaign_id: intArg({ nullable: true }),
				stage: stringArg({ nullable: true }),
			},
			resolve: (parent, args, ctx) => {
				args.test_lead = args.test_lead || false;
				args.marketing_qualified = args.marketing_qualified || false;
				args.lead_campaign_id = args.lead_campaign_id || 4;
				if ("lead_creator_id" in args) {
					args.LeadCreator = { connect: { id: args.lead_creator_id } };
					delete args.lead_creator_id;
				}
				if ("lead_owner_id" in args) {
					args.LeadOwner = { connect: { id: args.lead_owner_id } };
					delete args.lead_owner_id;
				}
				// if ("lead_campaign_id" in args) {
				args.LeadCampaign = { connect: { id: args.lead_campaign_id } };
				delete args.lead_campaign_id;
				// }
				console.log("args: ", args);

				return ctx.prisma.lead.create({
					data: args,
				});
			},
		});
		t.field("updateLead", {
			type: "Lead",
			args: {
				id: intArg({ nullable: false }),
				test_lead: booleanArg({ nullable: true }),
				marketing_qualified: stringArg({ nullable: true }),
				email_one: stringArg({ nullable: true }),
				email_two: stringArg({ nullable: true }),
				first_name: stringArg({ nullable: true }),
				legal_first_name: stringArg({ nullable: true }),
				middle_name: stringArg({ nullable: true }),
				last_name: stringArg({ nullable: true }),
				suffix: stringArg({ nullable: true }),
				address_one: stringArg({ nullable: true }),
				address_two: stringArg({ nullable: true }),
				city: stringArg({ nullable: true }),
				state_abbr: stringArg({ nullable: true }),
				zip: stringArg({ nullable: true }),
				gate_code: stringArg({ nullable: true }),
				address_verified: booleanArg({ nullable: true }),
				phone_cell: stringArg({ nullable: true }),
				phone_home: stringArg({ nullable: true }),
				latitude: stringArg({ nullable: true }),
				longitude: stringArg({ nullable: true }),
				lead_creator_id: intArg({ nullable: true }),
				lead_owner_id: intArg({ nullable: true }),
				lead_campaign_id: intArg({ nullable: true }),
				stage: stringArg({ nullable: true }),
				notification_preference_call: booleanArg({ nullable: true }),
				notification_preference_text: booleanArg({ nullable: true }),
				notification_preference_email: booleanArg({ nullable: true }),
			},
			resolve: (parent, args, ctx) => {
				let id = args.id;
				delete args.id;
				if ("lead_creator_id" in args) {
					args.LeadCreator = { connect: { id: args.lead_creator_id } };
					delete args.lead_creator_id;
				}
				if ("lead_owner_id" in args) {
					args.LeadOwner = { connect: { id: args.lead_owner_id } };
					delete args.lead_owner_id;
				}
				if ("lead_campaign_id" in args) {
					args.LeadCampaign = { connect: { id: args.lead_campaign_id } };
					delete args.lead_campaign_id;
				}
				console.log("args: ", args);

				return ctx.prisma.lead.update({
					where: { id: id },
					data: args,
				});
			},
		});

		t.field("createAssessment", {
			type: "Assessment",
			args: {
				account_id: intArg({ nullable: true }),
				assessor_id: intArg({ nullable: true }),
				lead_id: intArg({ nullable: true }),
			},
			resolve: (parent, args, ctx) => {
				if ("account_id" in args) {
					args.Account = { connect: { id: args.account_id } };
					delete args.account_id;
				}
				if ("assessor_id" in args) {
					args.User = { connect: { id: args.assessor_id } };
					delete args.assessor_id;
				}
				if ("lead_id" in args) {
					args.Lead = { connect: { id: args.lead_id } };
					delete args.lead_id;
				}
				console.log("args: ", args);

				return ctx.prisma.assessment.create({
					data: args,
				});
			},
		});
		t.field("updateAssessment", {
			type: "Assessment",
			args: {
				id: intArg({ nullable: false }),
				account_id: intArg({ nullable: true }),
				assessor_id: intArg({ nullable: true }),
				lead_id: intArg({ nullable: true }),
			},
			resolve: (parent, args, ctx) => {
				let id = args.id;
				delete args.id;
				if ("account_id" in args) {
					args.Account = { connect: { id: args.account_id } };
					delete args.account_id;
				}
				if ("assessor_id" in args) {
					args.User = { connect: { id: args.assessor_id } };
					delete args.assessor_id;
				}
				if ("lead_id" in args) {
					args.Lead = { connect: { id: args.lead_id } };
					delete args.lead_id;
				}
				console.log("args: ", args);

				return ctx.prisma.assessment.update({
					where: { id: id },
					data: args,
				});
			},
		});

		t.field("createAssessmentAnswer", {
			type: "AssessmentAnswer",
			args: {
				assessment_id: intArg({ nullable: false }),
				question_id: intArg({ nullable: true }),
				phrasing_id: intArg({ nullable: true }),
				answer: stringArg({ nullable: true }),
			},
			resolve: (parent, args, ctx) => {
				if ("assessment_id" in args) {
					args.Assessment = { connect: { id: args.assessment_id } };
					delete args.assessment_id;
				}
				if ("question_id" in args) {
					args.AssessmentQuestion = { connect: { id: args.question_id } };
					delete args.question_id;
				}
				if ("phrasing_id" in args) {
					args.AssessmentPhrasing = { connect: { id: args.phrasing_id } };
					delete args.phrasing_id;
				}
				console.log("args: ", args);

				return ctx.prisma.assessmentAnswer.create({
					data: args,
					include: {
						Assessment: true,
						AssessmentQuestion: true,
						AssessmentPhrasing: true,
					},
				});
			},
		});
		t.field("updateAssessmentAnswer", {
			type: "AssessmentAnswer",
			args: {
				id: intArg({ nullable: false }),
				assessment_id: intArg({ nullable: true }),
				question_id: intArg({ nullable: true }),
				phrasing_id: intArg({ nullable: true }),
				answer: stringArg({ nullable: true }),
			},
			resolve: (parent, args, ctx) => {
				let id = args.id;
				delete args.id;
				if ("assessment_id" in args) {
					args.Assessment = { connect: { id: args.assessment_id } };
					delete args.assessment_id;
				}
				if ("question_id" in args) {
					args.AssessmentQuestion = { connect: { id: args.question_id } };
					delete args.question_id;
				}
				if ("phrasing_id" in args) {
					args.AssessmentPhrasing = { connect: { id: args.phrasing_id } };
					delete args.phrasing_id;
				}
				console.log("args: ", args);

				return ctx.prisma.assessmentAnswer.update({
					where: { id: id },
					data: args,
					include: {
						Assessment: true,
						AssessmentQuestion: true,
						AssessmentPhrasing: true,
					},
				});
			},
		});

		t.field("dynamicAssessmentAnswer", {
			type: "AssessmentAnswer",
			args: {
				assessment_id: intArg({ nullable: false }),
				question_id: intArg({ nullable: false }),
				phrasing_id: intArg({ nullable: false }),
				answer: stringArg({ nullable: false }),
			},
			resolve: async (parent, args, ctx) => {
				args.Assessment = { connect: { id: args.assessment_id } };
				args.AssessmentQuestion = { connect: { id: args.question_id } };
				args.AssessmentPhrasing = { connect: { id: args.phrasing_id } };
				console.log("args: ", args);

				const answer = await ctx.prisma.assessmentAnswer.findMany({
					where: {
						assessment_id: args.assessment_id,
						question_id: args.question_id,
					},
				});
				let answerId = false;
				if (answer[0]) {
					answerId = answer[0].id;
				};
				delete args.assessment_id;
				delete args.question_id;
				delete args.phrasing_id;
				if (!answerId) {
					return ctx.prisma.assessmentAnswer.create({
						data: args,
						include: {
							Assessment: true,
							AssessmentQuestion: true,
							AssessmentPhrasing: true,
						},
					});
				} else {
					return ctx.prisma.assessmentAnswer.update({
						where: { id: answerId },
						data: args,
						include: {
							Assessment: true,
							AssessmentQuestion: true,
							AssessmentPhrasing: true,
						},
					});
				}
			},
		});

		t.field("createAssessmentPhrasing", {
			type: "AssessmentPhrasing",
			args: {
				question_id: intArg({ nullable: true }),
				phrasing: stringArg({ nullable: true }),
				related_info: stringArg({ nullable: true }),
			},
			resolve: (parent, args, ctx) => {
				if ("question_id" in args) {
					args.AssessmentQuestion = { connect: { id: args.question_id } };
					delete args.question_id;
				}
				console.log("args: ", args);

				return ctx.prisma.assessmentPhrasing.create({
					data: args,
					include: {
						AssessmentQuestion: true,
					},
				});
			},
		});
		t.field("updateAssessmentPhrasing", {
			type: "AssessmentPhrasing",
			args: {
				id: intArg({ nullable: false }),
				question_id: intArg({ nullable: true }),
				phrasing: stringArg({ nullable: true }),
				related_info: stringArg({ nullable: true }),
			},
			resolve: (parent, args, ctx) => {
				let id = args.id;
				delete args.id;
				if ("question_id" in args) {
					args.AssessmentQuestion = { connect: { id: args.question_id } };
					delete args.question_id;
				}
				console.log("args: ", args);

				return ctx.prisma.assessmentPhrasing.update({
					where: { id: id },
					data: args,
					include: {
						AssessmentQuestion: true,
					},
				});
			},
		});

		t.field("createEnumAssessmentAnswer", {
			type: "EnumAssessmentAnswer",
			args: {
				question_id: intArg({ nullable: true }),
				choice: stringArg({ nullable: true }),
				image: stringArg({ nullable: true }),
			},
			resolve: (parent, args, ctx) => {
				if ("question_id" in args) {
					args.AssessmentQuestion = { connect: { id: args.question_id } };
					delete args.question_id;
				}
				console.log("args: ", args);

				return ctx.prisma.enumAssessmentAnswer.create({
					data: args,
					include: {
						AssessmentQuestion: { include: { AssessmentPhrasing: true } },
					},
				});
			},
		});
		t.field("updateEnumAssessmentAnswer", {
			type: "EnumAssessmentAnswer",
			args: {
				id: intArg({ nullable: false }),
				question_id: intArg({ nullable: true }),
				choice: stringArg({ nullable: true }),
				image: stringArg({ nullable: true }),
			},
			resolve: (parent, args, ctx) => {
				let id = args.id;
				delete args.id;
				if ("question_id" in args) {
					args.AssessmentQuestion = { connect: { id: args.question_id } };
					delete args.question_id;
				}
				console.log("args: ", args);

				return ctx.prisma.enumAssessmentAnswer.update({
					where: { id: id },
					data: args,
					include: {
						AssessmentQuestion: { include: { AssessmentPhrasing: true } },
					},
				});
			},
		});

		t.field("createLWELog", {
			type: "LeadWorkingEventLog",
			nullable: true,
			args: {
				comm_type_id: intArg({ nullable: false }),
				lead_id: intArg({ nullable: false }),
				lwe_dispo_id: intArg({ nullable: false }),
				lwe_log_creator_id: intArg({ nullable: false }),
				notes: stringArg({ nullable: true }),
				test_log_entry: booleanArg({ nullable: true }),
			},
			resolve(parent, args, ctx) {
				args.test_log_entry = args.test_log_entry || false;
				args.Lead = { connect: { id: args.lead_id } };
				delete args.lead_id;
				args.User = { connect: { id: args.lwe_log_creator_id } };
				delete args.lwe_log_creator_id;
				args.EnumCommunicationType = { connect: { id: args.comm_type_id } };
				delete args.comm_type_id;
				args.EnumLeadWorkingEventDispo = { connect: { id: args.lwe_dispo_id } };
				delete args.lwe_dispo_id;

				console.log("parent: ", parent);
				console.log("args: ", args);
				return ctx.prisma.leadWorkingEventLog.create({
					data: args,
					include: {
						Lead: true,
						User: true,
						EnumCommunicationType: true,
						EnumLeadWorkingEventDispo: true,
					},
				});
			},
		});

		t.field("convertLead", {
			type: "Account",
			args: {
				lead_id: intArg({ nullable: false }),
				type: stringArg({ nullable: true }),
				advisor_id: intArg({ nullable: false }),
				account_creator_id: intArg({ nullable: false }),
			},
			resolve: async (parent, args, ctx) => {
				return await convertLead(
					ctx,
					args.lead_id,
					args.account_creator_id,
					args.advisor_id,
					args.type
				);
			},
		});

		t.field("createUser", {
			type: "User",
			args: { name: stringArg() },
			resolve: (parent, { name }) => createUser(name),
		});
	},
});

module.exports = { Mutation };
