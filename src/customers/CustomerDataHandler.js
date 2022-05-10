import { getApi, sleep, log } from "@/common.js"

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

				// TODO: Make test latency
				await sleep(100 + 100 * Math.random());

				log("Set customer list from dummy data for test");
			}

			return result;
		}
	}

	static async getCustomer(corpId, customerNo) {

		// TODO: Make test latency
		await sleep(100 + 100 * Math.random());

		return dummyData.filter(item => item.customerNo === customerNo)[0];
	}
}


const dummyData = [
	{
		customerNo: "1000359",
		customerName: "Mitsubishi Fuso Truck&Bus Corporation",
		address: "10 Ohkura-cho, Nakahara-ku, Kawasaki-shi, Kanagawa, 211-8522, Japan",
		salesAreaData: [
			{
				salesOrg: "S000",
				distributionChannel: "40",
				division: "51",
				salesOffice: "S100",
				salesGroup: "100",
				currency: "USD",
				customerPricingProcedure: "1",
				deliveringPlant: "",
				shippingCondition: "01",
				incoterms: "DDU",
				paymentTerms: "G120",
				creditControlArea: "S110"
			},
		]
	},
	{
		customerNo: "1000376",
		customerName: "Solarwatt Gmbh",
		address: "Maria-Reiche-Str, 2AD-01109, Dresden, 01109, Germany",
		salesAreaData: [
			{
				salesOrg: "S000",
				distributionChannel: "40",
				division: "51",
				salesOffice: "S100",
				salesGroup: "100",
				currency: "EUR",
				customerPricingProcedure: "1",
				deliveringPlant: "",
				shippingCondition: "01",
				incoterms: "EXW",
				paymentTerms: "YT01",
				creditControlArea: "S110"
			},
		]
	},
	{
		customerNo: "1000383",
		customerName: "Daimler AG",
		address: "Mercedesstrasse 120, Stuttgart, 70372, Germany",
		salesAreaData: [
			{
				salesOrg: "S000",
				distributionChannel: "40",
				division: "51",
				salesOffice: "S100",
				salesGroup: "100",
				currency: "EUR",
				customerPricingProcedure: "1",
				deliveringPlant: "",
				shippingCondition: "01",
				incoterms: "DAP",
				paymentTerms: "C045",
				creditControlArea: "S110"
			},
		]
	},
	{
		customerNo: "1001983",
		customerName: "Volkswagen Aktiengesellschaft",
		address: "Berliner Ring 2, 38440 Wolfsburg, Germany",
		salesAreaData: [
			{
				salesOrg: "S000",
				distributionChannel: "40",
				division: "51",
				salesOffice: "S100",
				salesGroup: "100",
				currency: "EUR",
				customerPricingProcedure: "1",
				deliveringPlant: "",
				shippingCondition: "01",
				incoterms: "DDU",
				paymentTerms: "C030",
				creditControlArea: "S110"
			},
		]
	},
	{
		customerNo: "1002148",
		customerName: "Valmet Automotive Inc",
		address: "23501 Uusikaupunki, 23501, Finland",
		salesAreaData: [
			{
				salesOrg: "S000",
				distributionChannel: "40",
				division: "51",
				salesOffice: "S100",
				salesGroup: "100",
				currency: "EUR",
				customerPricingProcedure: "1",
				deliveringPlant: "",
				shippingCondition: "01",
				incoterms: "DAF",
				paymentTerms: "C045",
				creditControlArea: "S110"
			},
		]
	},
	{
		customerNo: "1000396",
		customerName: "Ford Motor Company",
		address: "1 American Rd, Dearborn, MI 48126, United States",
		salesAreaData: [
			{
				salesOrg: "S000",
				distributionChannel: "40",
				division: "51",
				salesOffice: "S100",
				salesGroup: "100",
				currency: "USD",
				customerPricingProcedure: "1",
				deliveringPlant: "",
				shippingCondition: "01",
				incoterms: "FCA",
				paymentTerms: "C120",
				creditControlArea: "S110"
			},
		]
	},
	{
		customerNo: "1073324",
		customerName: "Polestar",
		address: "Assar Gabrielssons Väg 9. SE-405 31 Gothenburg. Sweden",
	},
	{
		customerNo: "1018116406",
		customerName: "Hyundai Mobis Co.,Ltd.",
		address: "203, Teheran-ro Gangnam-gu Seoul, 06141, South Korea",
		salesAreaData: [
			{
				salesOrg: "S000",
				distributionChannel: "20",
				division: "51",
				salesOffice: "S100",
				salesGroup: "100",
				currency: "KRW",
				customerPricingProcedure: "1",
				deliveringPlant: "1752",
				shippingCondition: "01",
				incoterms: "DDP",
				paymentTerms: "G090",
				creditControlArea: "S100"
			},
			{
				salesOrg: "S000",
				distributionChannel: "20",
				division: "51",
				salesOffice: "S100",
				salesGroup: "100",
				currency: "KRW",
				customerPricingProcedure: "1",
				deliveringPlant: "1752",
				shippingCondition: "01",
				incoterms: "DDP",
				paymentTerms: "C135",
				creditControlArea: "S100"
			},
		]
	},
	{
		customerNo: "3128179335",
		customerName: "SK Mobile Enegy Co.,Ltd.",
		address: "207, Seongyeon-ro, Seongyeon-myeon, 31930, South Korea",
		salesAreaData: [
			{
				salesOrg: "S000",
				distributionChannel: "20",
				division: "51",
				salesOffice: "S100",
				salesGroup: "100",
				currency: "KRW",
				customerPricingProcedure: "1",
				deliveringPlant: "",
				shippingCondition: "01",
				incoterms: "EXW",
				paymentTerms: "C060",
				creditControlArea: "S100"
			},
		]
	},
];