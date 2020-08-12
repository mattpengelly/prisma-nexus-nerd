const nextAcctNum = async (state, type, ctx) => {
	const prefix = state + "-" + (type === "Residential" ? "R" : "C") + "-";

	// const prefixes = ["AZ-R-", "AZ-C-", "CA-R-", "CA-C-", "TX-R-", "TX-C-"];

	const prefixes = "('AZ-R-', 'AZ-C-', 'CA-R-', 'CA-C-', 'TX-R-', 'TX-C-')"
	// let acctSearch = [];
	// prefixes.forEach((item) => {
	// 	const newItem = {
	// 		acct_num: {
	// 			startsWith: item,
	// 		},
	// 	};
	// 	acctSearch.push(newItem);
    // });
    // console.log("acctSearch: ", acctSearch);
	
	highAcct = await ctx.prisma.raw("SELECT acct_num FROM Account WHERE SUBSTR(acct_num,1,5) IN " + prefixes + " ORDER BY SUBSTR(acct_num, -6) DESC LIMIT 1")

	// highAcct = await ctx.prisma.account.findMany({
	// 	where: {
	// 		OR: acctSearch,
	// 	},
	// 	select: substr(acct_num, ),
	// 	orderBy: { acct_num.substr(): "desc" },
	// 	take: 1,
	// });
	const highAcctNum = highAcct[0].acct_num;
	let num = Number(highAcctNum.substr(5)) + 1;
	console.log("highAcctNum: ", highAcctNum);	
	let newAcctNum = prefix + num;
	console.log("New Account Number: ", newAcctNum);
	return newAcctNum;
};

module.exports = { nextAcctNum };
