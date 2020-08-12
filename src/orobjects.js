const orObjects = (obj) => {
	let nestArr = [];
	Object.keys(obj).forEach(function(item) {
		if (item != "useOr") {
			let nestObj = {};
			console.log(item); // key
			console.log(obj[item]); // value
			nestObj[item] = obj[item];
			nestArr.push(nestObj);
		}
	});
	return nestArr;
};

module.exports = { orObjects };
