const { coords } = require("./api/geocode");
const { nextAcctNum } = require("./nextacctnum");

const convertLead = async (
	ctx,
	leadId,
	creator,
	advisor,
	type = "Residential"
) => {
	const lead = await getLead(leadId, ctx);
	if (lead.stage === "Converted")
		throw new Error("Lead has already been converted");
	if (!lead.address_verified) throw new Error("Address has not been verified");
	const acct_num = await nextAcctNum(lead.state_abbr, type, ctx);
	const locationData = {
		address_one: lead.address_one,
		address_two: lead.address_two,
		city: lead.city,
		state_abbr: lead.state_abbr,
		zip: lead.zip,
		latitude: lead.latitude,
		longitude: lead.longitude,
		gate_code: lead.gate_code,
		test_location: lead.test_lead,
	};
	const contactData = {
		first_name: lead.first_name,
		last_name: lead.last_name,
		email_one: lead.email_one,
		email_two: lead.state_abbr,
		phone_cell: lead.phone_cell,
		phone_home: lead.phone_home,
		marketing_callable: lead.marketing_callable,
		marketing_emailable: lead.marketing_emailable,
		marketing_textable: lead.marketing_textable,
		marketing_qualified: lead.marketing_qualified,
		sales_qualified: false,
		test_contact: lead.test_lead,
	};

	const locationId = await createLocation(locationData, ctx);
	console.log("locationId: ", locationId);
	const contactId = await createContact(contactData, ctx);
	console.log("contactId: ", contactId);

	// if (locationId && contactId) {
	const accountData = {
		acct_num: acct_num,
		// acct_num: "".concat(
		// 	"TST-",
		// 	// locationId,
		// 	"-",
		// 	// contactId,
		// 	"-",
		// 	lead.first_name,
		// 	"-",
		// 	lead.last_name
		// ),
		status: "Active",
		stage: "PreQualification",
		Lead: { connect: { id: leadId } },
		User_Account_lead_creator_idToUser: {
			connect: { id: lead.lead_creator_id },
		},
		Contact_Account_contact_primary_idToContact: {
			connect: { id: contactId },
		},
		Location: { connect: { id: locationId } },
		User_Account_account_creator_idToUser: { connect: { id: creator } },
		User_Account_advisor_idToUser: { connect: { id: advisor } },
		Company: { connect: { id: 1 } },
		LeadCampaign: { connect: { id: lead.lead_campaign_id } },
		type: type,
		test_acct: lead.test_lead,
	};
	const logData = {
		Lead: { connect: { id: leadId } },
		User: { connect: { id: creator } },
		EnumCommunicationType: { connect: { id: 6 } },
		EnumLeadWorkingEventDispo: { connect: { id: 10 } },
		test_log_entry: lead.test_lead,
	};

	const accountId = await createAccount(accountData, ctx);
	console.log(accountId);
	if (accountId) {
		await updateLead(leadId, creator, ctx);
		await createLog(logData, ctx);
	}

	// Potential error handling code for future use.
	//
	// else if (locationId) {
	// 	await clearLocation(locationId,ctx)
	// 	throw new Error(`Contact creation failed.`);
	// }

	return ctx.prisma.account
		.findOne({
			where: { id: accountId },
			include: {
				User_Account_lead_creator_idToUser: true,
				User_Account_account_creator_idToUser: true,
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
	return "Boffo";
};

const getLead = async (leadId, ctx) => {
	return ctx.prisma.lead
		.findOne({
			where: { id: leadId },
		})
		.then((result) => {
			if (result === null) {
				throw new Error(`No lead with id of "${leadId}"`);
			}
			console.log("Lead found:  ", result);

			return result;
		});
};

const createLocation = async (locationData, ctx) => {
	if (!locationData.latitude || !locationData.longitude) {
		const coordinates = await coords(
			locationData.address_one,
			locationData.address_two,
			locationData.city,
			locationData.state_abbr,
			locationData.zip
		);
		locationData.latitude = coordinates.latitude;
		locationData.longitude = coordinates.longitude;
	}
	console.log("locationData: ", locationData);

	const newLocation = await ctx.prisma.location.create({
		data: locationData,
	});
	console.log("newLocation: ", newLocation);
	return newLocation.id;
};

const createContact = async (contactData, ctx) => {
	console.log("contactData: ", contactData);

	const newContact = await ctx.prisma.contact.create({
		data: contactData,
	});
	console.log("newContact: ", newContact);
	return newContact.id;
};

const createAccount = async (accountData, ctx) => {
	console.log("accountData: ", "\n", accountData);

	const newAccount = await ctx.prisma.account.create({
		data: accountData,
	});
	console.log("newAccount: ", newAccount);
	return newAccount.id;
};

const createLog = async (logData, ctx) => {
	const newLog = await ctx.prisma.leadWorkingEventLog.create({
		data: logData,
	});
	console.log("newLog: ", newLog);
	return newLog.id;
};

const updateLead = async (leadId, creator, ctx) => {
	console.log("Updating lead");

	await ctx.prisma.lead.update({
		where: { id: leadId },
		data: { stage: "Converted", LeadConverter: { connect: { id: creator } } },
	});
};

const clearLocation = async (locationId, ctx) => {
	ctx.prisma.location.delete({
		where: { id: locationId },
	});
};

const clearContact = async (contactId, ctx) => {
	ctx.prisma.contact.delete({
		where: { id: contactId },
	});
};

module.exports = { convertLead };
