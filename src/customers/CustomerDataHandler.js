import { getApi, log, } from "@/common.js"

export class CustomerDataHandler {

	static async getList(corpId) {

		log("CALL CustomerDataHandler.getList(" + corpId + ")");

		// TODO: Make query string for conditions
		const url = getApi("customer") + "/corps/" + corpId;
		let result;

		try {
			const res = await fetch(url);

			if(404 === res.status) {
				log("Customers are not found");
				result = null;
			}
			else {
				const data = await res.json();
				log("Customer list fetched successfully.");
				log(data);
				result = data;
			}
		}
		catch (err) {
			console.error(err);	
			result = null;
		}
		finally {

			// TODO: Delete before deilvery backend
			if(null == result) {
				result = dummyData;
				log("Set customer list from dummy data for test");
			}
			
			return result;
		}
	}
}


const dummyData = [
	{
		customerNo: "210987",
		customerName: "Daimler AG",
		address: "Mercedesstrasse 120, Stuttgart, 70372, Germany",
		salesAreaData: [
			{
				salesOrg: "S000",
				distributionChannel: "20",
				division: "51",
			},
			{
				salesOrg: "S000",
				distributionChannel: "40",
				division: "51",
			},
		]
	},
	{
		customerNo: "210028",
		customerName: "Volkswagen AG",
		address: "Berliner Ring 2, 38440 Wolfsburg, Germany",
		salesAreaData: [
			{
				salesOrg: "S000",
				distributionChannel: "40",
				division: "51",
			},
		]
	},
	{
		customerNo: "210029",
		customerName: "Volkswagen America",
		address: "2200 Woodland Pointe Avenue Herndon, VA 20171 United States",
		salesAreaData: [
			{
				salesOrg: "S000",
				distributionChannel: "40",
				division: "51",
			},
		]
	},
	{
		customerNo: "248361",
		customerName: "Ford Motor Company",
		address: "1 American Rd, Dearborn, MI 48126, United States",
		salesAreaData: [
			{
				salesOrg: "S000",
				distributionChannel: "40",
				division: "51",
			},
		]
	},
	{
		customerNo: "200163",
		customerName: "Polestar",
		address: "Assar Gabrielssons Väg 9. SE-405 31 Gothenburg. Sweden",
		salesAreaData: [
			{
				salesOrg: "S000",
				distributionChannel: "40",
				division: "51",
			},
		]
	},
	{
		customerNo: "1018116406",
		customerName: "Hyundai Mobis",
		address: "203, Teheran-ro Gangnam-gu Seoul, 06141, South Korea",
		salesAreaData: [
			{
				salesOrg: "S000",
				distributionChannel: "20",
				division: "51",
			},
			{
				salesOrg: "S000",
				distributionChannel: "40",
				division: "51",
			},
		]
	},
];