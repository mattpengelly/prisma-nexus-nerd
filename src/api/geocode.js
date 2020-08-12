const opencage = require("opencage-api-client");

let coords = function(add1, add2, city, st, zip) {
	const address = "".concat(
		add1 || "",
		" ",
		add2 || "",
		", ",
		city || "",
		", ",
		st || "",
		" ",
		zip || ""
	);

	let result = opencage
		.geocode({ q: address })
		.then((data) => {
			// console.log(JSON.stringify(data));
			if (data.status.code == 200) {
				if (data.results.length > 0) {
					var place = data.results[0];
					console.log("Formatted address: ", place.formatted);
					console.log("Coordinates: ", place.geometry);
					console.log("Time Zone: ", place.annotations.timezone.name);
					return {
						latitude: place.geometry.lat,
						longitude: place.geometry.lng,
						formatted_address: place.formatted,
					};
				}
			} else if (data.status.code == 402) {
				console.log("hit free-trial daily limit");
                console.log("become a customer: https://opencagedata.com/pricing");
                return "Free trial limit of queries has been exceeded"
			} else {
				// other possible response codes:
				// https://opencagedata.com/api#codes
                console.log("error", data.status.message);
                return ("Error from geolocation API:  ", data.status.message)
			}
		})
		.catch((error) => {
			console.log("error", error.message);
            return {Error: error.message}
		});
	return result;
};

module.exports = { coords };

// ... prints
// Theresienhöhe 11, 80339 Munich, Germany
// { lat: 48.1341651, lng: 11.5464794 }
// Europe/Berlin
