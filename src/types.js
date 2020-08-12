const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

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

const { asNexusMethod } = require("nexus");
const { GraphQLDateTime } = require("graphql-iso-date");
const GQLDateTime = asNexusMethod(GraphQLDateTime, "datetime");
const { GraphQLInputObjectType } = require("graphql");
const { coords } = require("./api/geocode");

// const DateScalar = scalarType({
// 	name: "Date",
// 	serialize: (value) => value.getTime(),
// 	parseValue: (value) => new Date(value),
// 	parseLiteral: (ast) => (ast.kind === "IntValue" ? new Date(ast.value) : null),
// 	asNexusMethod: "date",
// 	rootTyping: "Date",
// });

const Account = objectType({
	name: "Account",
	definition(t) {
		t.int("id", { description: "Id of the account" });
		t.string("acct_num", { description: "Account number" });
		t.int("advisor_id", { description: "Advisor of account's ID" });
		t.int("contact_primary_id", { description: "Primary Contact ID" });
		t.int("contact_secondary_id", {
			description: "Secondary Contact ID",
			nullable: true,
		});
		t.int("from_lead_id", { description: "ID of lead account came from" });
		t.int("lead_creator_id", { description: "ID of lead creator" });
		t.int("account_creator_id", { description: "ID of account creator" });
		t.int("location_id", {
			description: "ID of account location",
			nullable: true,
		});
		t.string("organization_id", {
			description: "Name of organization associated with account",
			nullable: true,
		});
		t.string("status", { description: "Account status" });
		t.string("type", { description: "Account type" });
		t.boolean("test_account", {
			description: "Whether this is a test account",
			nullable: true,
		});
		t.field("Contact_Account_contact_primary_idToContact", {
			type: Contact,
			nullable: true,
		});
		t.field("Contact_Account_contact_secondary_idToContact", {
			type: Contact,
			nullable: true,
		});
		t.field("Lead", {
			type: Lead,
			nullable: true,
		});
		t.field("User_Account_lead_creator_idToUser", {
			type: User,
			nullable: true,
		});
		t.field("User_Account_account_creator_idToUser", {
			type: User,
			nullable: true,
		});
		t.field("Location", {
			type: Location,
			nullable: true,
		});
		t.field("Company", {
			type: Company,
			nullable: true,
		});
		t.field("User_Account_advisor_idToUser", {
			type: User,
			nullable: true,
		});
	},
});

const Assessment = objectType({
	name: "Assessment",
	definition(t) {
		t.int("id", { description: "Id of the Assessment" });
		t.int("account_id", { description: "Id of the associated account" });
		t.int("assessor_id", { description: "Id of the assessor" });
		t.int("lead_id", { description: "Id of the associated lead" });
		t.datetime("date_assessed", {
			description: "Date-timestamp of assessment",
		});
		t.field("Account", { type: Account, nullable: true });
		t.field("User", { type: User, nullable: true });
		t.field("Lead", { type: Lead, nullable: true });
		t.list.field("AssessmentAnswer", {
			type: AssessmentAnswer,
			nullable: true,
		});
	},
});

const AssessmentAnswer = objectType({
	name: "AssessmentAnswer",
	definition(t) {
		t.int("id", { description: "Id of the Assessment Answer" });
		t.int("assessment_id", { description: "Id of the associated assessment" });
		t.int("question_id", { description: "Id of the question" });
		t.int("phrasing_id", { description: "Id of the associated phrasing" });
		t.string("answer", { description: "Answer" });
		t.field("Assessment", { type: Assessment, nullable: false });
		t.field("AssessmentQuestion", {
			type: AssessmentQuestion,
			nullable: false,
		});
		t.field("AssessmentPhrasing", {
			type: AssessmentPhrasing,
			nullable: false,
		});
	},
});

const AssessmentPhrasing = objectType({
	name: "AssessmentPhrasing",
	definition(t) {
		t.int("id", { description: "Id of the Assessment Phrasing" });
		t.int("question_id", { description: "Id of the question" });
		t.string("phrasing", { description: "Phrasing of the question" });
		t.string("related_info", {
			description: "Additional info regarding the question",
		});
		t.field("AssessmentQuestion", {
			type: AssessmentQuestion,
			nullable: false,
		});
		t.list.field("AssessmentAnswers", {
			type: AssessmentAnswer,
			nullable: true,
		});
	},
});

const AssessmentQuestion = objectType({
	name: "AssessmentQuestion",
	definition(t) {
		t.int("id", { description: "Id of the Question" });
		t.int("current_phrasing_id", {
			description: "Id of the current phrasing of the question",
			nullable: true,
		});
		t.string("answer_type", { description: "Answer type of the question" });
		t.string("category", { description: "Category of the question" });
		t.string("enum", { description: "Enum of the question" });
		t.string("info_type", { description: "Info type of the question" });
		t.string("question", { description: "Question" });
		t.boolean("required", {
			description:
				"Is the answer to this question required to complete an assessment?",
		});
		t.field("AssessmentPhrasing", { type: AssessmentPhrasing, nullable: true });
		t.list.field("AssessmentPhrasings", {
			type: AssessmentPhrasing,
			nullable: true,
		});
		t.list.field("AssessmentAnswers", {
			type: AssessmentAnswer,
			nullable: true,
		});
		t.list.field("EnumAssessmentAnswers", {
			type: EnumAssessmentAnswer,
			nullable: true,
		});
	},
});

const Company = objectType({
	name: "Company",
	definition(t) {
		t.int("id", { description: "Id of the company" });
		t.string("name", { description: "Name of the company" });
		t.string("parent_co", { description: "Parent company of the company" });
		t.string("child_co", { description: "Parent company of the company" });
		t.boolean("active", { description: "Whether this is an active company" });
		t.boolean("test_lead_source", {
			description: "Whether this is a test company",
		});

		// 	t.field("Account_Account_contact_primary_idToContact", {
		// 		type: User,
		// 		nullable: true
		// 	});
		// 	t.field("Account_Account_contact_secondary_idToContact ", {
		// 		type: Contact,
		// 		nullable: true
		// 	});
	},
});

const Contact = objectType({
	name: "Contact",
	definition(t) {
		t.int("id", { description: "Id of the contact" });
		t.string("first_name", { description: "First name of the contact" });
		t.string("legal_first_name", {
			description: "Legal first name of the contact",
			nullable: true,
		});
		t.string("middle_name", {
			description: "Middle name of the contact",
			nullable: true,
		});
		t.string("last_name", { description: "Last name of the contact" });
		t.string("suffix", {
			description: "Suffix of the contact",
			nullable: true,
		});
		t.string("email_one", {
			description: "First email address of the contact",
		});
		t.string("email_two", {
			description: "Sencond email address of the contact",
		});
		t.string("phone_cell", { description: "Cell phone number of the contact" });
		t.string("phone_home", { description: "Home phone number of the contact" });
		t.int("primary_location_id", {
			description: "Id of the location of the contact",
		});
		t.int("additional_location", {
			description: "Additional location of the contact",
		});
		t.boolean("test_contact", {
			description: "Whether this is a test contact",
		});
		t.string("full_name", (root) => `${root.first_name} ${root.last_name}`);
		t.int("sales_disqual_reason_id", {
			description: "Id of the sales campaign disqualification reason",
			nullable: true,
		});
		t.int("lead_campaign_disqual_reason_id", {
			description: "Id of the lead campaign disqualification reason",
			nullable: true,
		});
		t.int("marketing_disqual_reason_id", {
			description: "Id of the marketing disqualification reason",
			nullable: true,
		});
		t.list.field("Account_Account_contact_primary_idToContact", {
			type: Account,
			nullable: true,
		});
		t.list.field("Account_Account_contact_secondary_idToContact", {
			type: Account,
			nullable: true,
		});
		t.field("EnumLeadCampaignDisqualReason", {
			type: EnumLeadCampaignDisqualReason,
			nullable: true,
		});
		t.field("EnumSalesDisqualReason", {
			type: EnumSalesDisqualReason,
			nullable: true,
		});
		t.field("EnumMarketingDisqualReason", {
			type: EnumMarketingDisqualReason,
			nullable: true,
		});
	},
});

const Lead = objectType({
	name: "Lead",
	definition(t) {
		t.int("id", { description: "Id of the lead" });
		t.string("first_name", {
			description: "First name of the lead",
			nullable: true,
		});
		t.string("legal_first_name", {
			description: "Legal first name of the lead",
			nullable: true,
		});
		t.string("middle_name", {
			description: "Middle name of the lead",
			nullable: true,
		});
		t.string("last_name", {
			description: "Last name of the lead",
			nullable: true,
		});
		t.string("suffix", {
			description: "Suffix of the lead's name",
			nullable: true,
		});
		t.string("address_one", {
			description: "First line of lead address",
			nullable: true,
		});
		t.string("address_two", {
			description: "Second line of lead address",
			nullable: true,
		});
		t.string("city", { description: "City of lead address", nullable: true });
		t.string("state_abbr", {
			description: "State of lead address",
			nullable: true,
		});
		t.string("zip", {
			description: "ZIP code of lead address",
			nullable: true,
		});
		t.string("gate_code", {
			description: "Gate code of lead address",
			nullable: true,
		});
		t.boolean("address_verified", {
			description: "Has the lead's address been verified?",
			nullable: true,
		});
		t.string("latitude", { description: "Latitude of the location" });
		t.string("longitude", { description: "Longitude of the location" });
		t.string("phone_cell", {
			description: "Cell phone number of lead",
			nullable: true,
		});
		t.string("phone_home", {
			description: "Home phone number of lead",
			nullable: true,
		});
		t.string("email_one", {
			description: "Primary email address of the lead",
			nullable: true,
		});
		t.string("email_two", {
			description: "Secondary email address of the lead",
			nullable: true,
		});
		t.string("stage", { description: "Stage the lead is in", nullable: true });
		t.int("lead_campaign_id", {
			description: "Id of the lead",
			nullable: true,
		});
		t.int("lead_creator_id", { description: "Id of the lead", nullable: true });
		t.int("lead_converter_id", {
			description: "Id of the user that converted the lead to an account",
			nullable: true,
		});
		t.int("lead_campaign_id", {
			description: "Id of the lead campaign",
			nullable: true,
		});
		t.boolean("marketing_qualified", {
			description: "Whether this is marketing qualified",
			nullable: true,
		});
		t.boolean("marketing_callable", {
			description: "Whether this lead can be called",
			nullable: true,
		});
		t.boolean("marketing_emailable", {
			description: "Whether this lead can be emailed",
			nullable: true,
		});
		t.boolean("marketing_textable", {
			description: "Whether this lead can be texted",
			nullable: true,
		});
		t.string("lead_marketing_tag_collection", {
			description: "",
			nullable: true,
		});
		t.boolean("assessment_complete", {
			description: "Has the assessment for this lead been completed?",
			nullable: true,
		});
		t.boolean("test_lead", {
			description: "Whether this is a test lead",
			nullable: true,
		});
		t.int("lead_campaign_disqual_reason_id", {
			description: "Id of the lead campaign disqualification reason",
			nullable: true,
		});
		t.int("marketing_disqual_reason_id", {
			description: "Id of the marketing disqualification reason",
			nullable: true,
		});

		//This field must be renamed in the prisma.schema after any introspect
		t.field("LeadCreator", {
			type: User,
			nullable: true,
		});
		//This field must be renamed in the prisma.schema after any introspect
		t.field("LeadConverter", {
			type: User,
			nullable: true,
		});
		//This field must be renamed in the prisma.schema after any introspect
		t.field("LeadOwner", {
			type: User,
			nullable: true,
		});
		t.field("LeadCampaign", {
			type: LeadCampaign,
			nullable: false,
		});
		t.field("EnumLeadCampaignDisqualReason", {
			type: EnumLeadCampaignDisqualReason,
			nullable: true,
		});
		t.field("EnumMarketingDisqualReason", {
			type: EnumMarketingDisqualReason,
			nullable: true,
		});
	},
});

const LeadCampaign = objectType({
	name: "LeadCampaign",
	definition(t) {
		t.int("id", { description: "Id of the campaign" });
		t.string("name", { description: "Name of the campaign" });
		t.string("lead_direction", { description: "Direction of lead" });
		t.boolean("active", { description: "Whether this is an active campaign" });
		t.int("lead_source_id", { description: "Id of the lead source" });
		t.int("company_id", { description: "Id of the company" });
		t.boolean("test_lead_campaign", {
			description: "Whether this is a test lead campaign",
			nullable: true,
		});
		t.field("Company", {
			type: Company,
			nullable: true,
		});
		t.field("LeadSource", {
			type: LeadSource,
			nullable: true,
		});
	},
});

const LeadSource = objectType({
	name: "LeadSource",
	definition(t) {
		t.int("id", { description: "Id of the source" });
		t.string("name", { description: "Name of the source" });
		t.boolean("active", { description: "Whether this is an active source" });
		t.string("type", { description: "Type of the source" });
		t.boolean("test_lead_source", {
			description: "Whether this is a test source",
		});
	},
});

const LeadWorkingEventLog = objectType({
	name: "LeadWorkingEventLog",
	definition(t) {
		t.int("id", { description: "Id of the event" });
		t.int("comm_type_id", {
			description: "Id of the communication type of the event",
		});
		t.int("lead_id", { description: "Id of the lead this event is for" });
		t.int("lwe_dispo_id", {
			description: "Id of the disposition for this event",
		});
		t.string("notes", { description: "Notes for this event" });
		t.int("lwe_log_creator_id", {
			description: "Id of the creator of this event",
		});
		t.datetime("event_timestamp", { description: "Timestamp of the event" });
		t.boolean("test_log_entry", { description: "Is this a test log entry?" });
		t.field("Lead", {
			description: "Lead assoicated with this event",
			type: Lead,
			nullable: true,
		});
		t.field("User", {
			description: "User that created this log entry",
			type: User,
			nullable: true,
		});
		t.field("EnumCommunicationType", {
			description: "Communication Type of this log entry",
			type: EnumCommunicationType,
			nullable: true,
		});
		t.field("EnumLeadWorkingEventDispo", {
			description: "Disposition of this log entry",
			type: EnumLeadWorkingEventDispo,
			nullable: true,
		});
	},
});

const Location = objectType({
	name: "Location",
	definition(t) {
		t.int("id", { description: "Id of the location" });
		t.string("address_one", { description: "Address line 1 of the location" });
		t.string("address_two", {
			description: "Address line 2 of the location",
			nullable: true,
		});
		t.string("city", { description: "Address city of the location" });
		t.string("state_abbr", { description: "Address state of the location" });
		t.string("zip", { description: "Address ZIP code of the location" });
		t.string("gate_code", { description: "Gate code of location" });
		t.string("latitude", { description: "Latitude of the location" });
		t.string("longitude", { description: "Longitude of the location" });
		t.boolean("active", { description: "Whether this is an active source" });
		t.boolean("test_location", {
			description: "Whether this is a test location",
		});
		t.list.field("Account_Account_location_idToLocation", {
			type: Account,
			nullable: true,
		});
		t.field("Contact", {
			type: Contact,
			nullable: true,
		});
	},
});

const LocationCoords = objectType({
	name: "LocationCoords",
	definition(t) {
		t.float("latitude", { description: "Latitude of the address" });
		t.float("longitude", { description: "Longitude of the address" });
		t.string("formatted_address", { description: "Fomatted address found" });
	},
});

const Role = objectType({
	name: "Role",
	definition(t) {
		t.int("id", { description: "Id of the role" });
		t.string("name", { description: "Name of the role" });
		t.string("default_access", { description: "Default access of the user" });
		t.boolean("test_role", { description: "Whether this is a test role" });
	},
});

const SalesTeam = objectType({
	name: "SalesTeam",
	definition(t) {
		t.int("id", { description: "Id of the team" });
		t.string("name", { description: "Name of the team" });
		t.string("office_id", { description: "Office where team is based" });
		t.int("team_lead_one_id", { description: "Id of the first team lead" });
		t.int("team_lead_two_id", { description: "Id of the second team lead" });
		t.string("type", { description: "Team type" });
		t.boolean("active", {
			description: "Whether team is active",
		});
		t.int("parent_team_id", { description: "" });
		t.int("child_team_id", { description: "" });
		t.boolean("test_sales_team", {
			description: "Whether this is a test team",
		});
		t.field("User_SalesTeam_team_lead_one_idToUser", {
			desription: "Team lead",
			type: User,
			nullable: true,
		});
		t.field("Office", {
			description: "Office of the team",
			type: User,
			nullable: true,
		});
		t.list.field("User_SalesTeamToUser_team_id", {
			description: "Memebers of the team",
			type: User,
			nullable: true,
		});
	},
});

const User = objectType({
	name: "User",
	definition(t) {
		t.int("id", { description: "Id of the user" });
		t.string("first_name", { description: "First name of the user" });
		t.string("last_name", { description: "Last name of the user" });
		t.string("suffix", { description: "Suffix of the user's name" });
		t.string("preferred_first_name", {
			description: "Preferred first name of the user",
		});
		t.string("email_nerd", { description: "Work email address of the user" });
		t.int("company_id", { description: "Id of the user's company" });
		t.int("team_id", { description: "Id of the user's team" });
		t.int("role_id", { description: "Id of the user's role" });
		t.int("team_position_id", { description: "" });
		t.string("email_personal", {
			description: "Personal email address of the user",
		});
		t.boolean("employment_status", {
			description: "Employment status of the user",
		});
		t.string("address_one", { description: "Address line 1 of the user" });
		t.string("address_two", { description: "Address line 2 of the user" });
		t.string("city", { description: "Address city of the user" });
		t.string("state_abbr", { description: "Address state of the user" });
		t.string("zip", { description: "Address ZIP code of the user" });
		t.string("access", { description: "Access of the user" });
		t.int("area_id", { description: "Area Id of the user" });
		t.string("enitity_type", { description: "Type of user" });
		t.int("payroll_id", { description: "Payroll Id of the user" });
		t.string("phone_cell", { description: "Cell phone number of user" });
		t.string("phone_cell_carrier", {
			description: "Cellular carrier of the user",
		});
		t.string("phone_home", { description: "Home phone number of the user" });
		t.int("referred_by", { description: "User that referred the user" });
		t.int("created_by", { description: "User that created the user" });

		t.int("security_pin", { description: "Security PIN of the user" });
		t.int("third_party_ids", { description: "" });
		t.string("avatar_link", {
			description: "Link to avatar of user",
			nullable: true,
		});
		t.boolean("test_user", { description: "Test user indicator" });
		t.string("full_name", (root) => `${root.first_name} ${root.last_name}`);
		t.field("Company", {
			type: Company,
			nullable: true,
			args: [],
		});
		t.field("Role", {
			type: Role,
			nullable: true,
			args: [],
		});
		t.field("SalesTeams_SalesTeamsToUsers_team_id", {
			description: "Sales Team user belongs to",
			type: SalesTeam,
			nullable: true,
		});
	},
});

const EnumAssessmentAnswer = objectType({
	name: "EnumAssessmentAnswer",
	definition(t) {
		t.int("id", { description: "Id of the answer enum" });
		t.string("choice", { description: "Name of the answer choice" });
		t.string("image", {
			description: "URL of the answer image",
			nullable: true,
		});
		t.int("question_id", {
			description: "Id of the question the answer is for",
		});
		t.field("AssessmentQuestion", {
			desription: "Question the answer is for",
			type: AssessmentQuestion,
			nullable: true,
		});
	},
});

const EnumCommunicationType = objectType({
	name: "EnumCommunicationType",
	definition(t) {
		t.int("id", { description: "Id of the communication type" });
		t.string("name", { description: "Name of the communication type" });
		t.string("description", {
			description: "Description of the communication type",
		});
		t.list.field("Contact", {
			description: "List of Contacts that have this communication type",
			type: Contact,
			nullable: true,
		});
		t.list.field("ContactCommunicationLog", {
			description:
				"List of Contact Communications that have this communication type",
			type: Contact,
			nullable: true,
		});
		t.list.field("LeadWorkingEventLog", {
			description:
				"List of Lead Working Events that have this communication type",
			type: Contact,
			nullable: true,
		});
	},
});

const EnumLeadCampaignDisqualReason = objectType({
	name: "EnumLeadCampaignDisqualReason",
	definition(t) {
		t.int("id", { description: "Id of the reason" });
		t.string("name", { description: "Name of the reason" });
		t.list.field("Contact", {
			description: "List of Contacts that have this reason",
			type: Contact,
			nullable: true,
		});
		t.list.field("Contact", {
			description: "List of Contacts that have this reason",
			type: Contact,
			nullable: true,
		});
		t.list.field("Lead", {
			description: "List of Leads that have this reason",
			type: Lead,
			nullable: true,
		});
	},
});

const EnumLeadWorkingEventDispo = objectType({
	name: "EnumLeadWorkingEventDispo",
	definition(t) {
		t.int("id", { description: "Id of the disposition" });
		t.string("name", { description: "Name of the disposition" });
		t.string("description", { description: "Description of the disposition" });
		t.list.field("Contact", {
			description: "List of Contacts that have this disposition",
			type: Contact,
			nullable: true,
		});
		t.list.field("LeadWorkingEventLog", {
			description: "List of Lead Working Events that have this disposition",
			type: Contact,
			nullable: true,
		});
	},
});

const EnumMarketingDisqualReason = objectType({
	name: "EnumMarketingDisqualReason",
	definition(t) {
		t.int("id", { description: "Id of the reason" });
		t.string("name", { description: "Name of the reason" });
		t.list.field("Contact", {
			description: "List of Contacts that have this reason",
			type: Contact,
			nullable: true,
		});
		t.list.field("Contact", {
			description: "List of Contacts that have this reason",
			type: Contact,
			nullable: true,
		});
		t.list.field("Lead", {
			description: "List of Leads that have this reason",
			type: Lead,
			nullable: true,
		});
	},
});

const EnumSalesDisqualReason = objectType({
	name: "EnumSalesDisqualReason",
	definition(t) {
		t.int("id", { description: "Id of the reason" });
		t.string("name", { description: "Name of the reason" });
		t.list.field("Contact", {
			description: "List of Contacts that have this reason",
			type: Contact,
			nullable: true,
		});
		t.list.field("Contact", {
			description: "List of Contacts that have this reason",
			type: Contact,
			nullable: true,
		});
	},
});

const getRole = async (args) => {
	const curRole = await prisma.role
		.findOne({
			where: args,
		})
		.then((result) => {
			if (result === null) {
				throw new Error(`No role with id of "${args.id}"`);
			}
			console.log("getRole result: ", result);
			return result;
		});

	return curRole;
};

const Types = {
	Account,
	Assessment,
	AssessmentAnswer,
	AssessmentPhrasing,
	AssessmentQuestion,
	Lead,
	LeadWorkingEventLog,
	LocationCoords,
	Role,
	SalesTeam,
	User,
	EnumAssessmentAnswer,
	EnumCommunicationType,
	EnumLeadCampaignDisqualReason,
	EnumLeadWorkingEventDispo,
	EnumMarketingDisqualReason,
	EnumSalesDisqualReason,
	GQLDateTime,
};

module.exports = Types;
