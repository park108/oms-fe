import { getApi, log } from "@/common.js"

export class OrganizationDataHandler {

	static async getOverview(corpId) {

		log("CALL OrganizationDataHandler.getOverview(" + corpId + ")");

		const url = getApi("organization") + "/corps/" + corpId + "/overview/";
		let result;

		try {
			const res = await fetch(url);

			if(404 === res.status) {
				log("Organization overview is not found");
				result = null;
			}
			else {
				const data = await res.json();
				log("Organization overview fetched successfully.");
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
				result = dummyData.overview;
				log("Set organization overview from dummy data for test");
			}
			
			return result;
		}
	}

	static async getList(corpId, uri) {

		log("CALL OrganizationDataHandler.getList(" + corpId + ", " + uri + ")");

		const url = getApi("organization") + "/corps/" + corpId + "/" + uri + "/";
		let result;

		try {
			const res = await fetch(url);

			if(404 === res.status) {
				log(uri + " is not found");
				result = null;
			}
			else {
				const data = await res.json();
				log(uri + " list fetched successfully.");
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
				result = dummyData[uri];
				log("Set " + uri + " from dummy data for test");
			}
			
			return result;
		}
	}

	static async getOrg(corpId, uri, orgName, orgCode) {

		log("CALL OrganizationDataHandler.getOrg(" + corpId + ", " + uri + ", " + orgName + " = " + orgCode + ")");

		const url = getApi("organization") + "/corps/" + corpId + "/" + uri + "/" + orgCode + "/";
		let result;

		try {
			const res = await fetch(url);

			if(404 == res.status) {
				log(orgName + " is not found");
				result = null;
			}
			else {
				const data = await res.json();
				log(orgName + " fetched successfully.");
				log(data);
				result = data;
			}
		}
		catch(err) {
			console.error(err);
			result = null;
		}
		finally {

			// TODO: Delete before deilvery backend
			if(null == result) {
				result = dummyData[uri].filter(item => {
					return item[orgName] === orgCode;
				})[0];
				log("Set " + orgName + " from dummy data for test");
			}
			
			return result;
		}
	}

	static async getSalesArea(corpId, org, channel, div) {

		log("CALL OrganizationDataHandler.getSalesArea(" + corpId + ", " + org + "/" + channel + "/" + div + ")");

		const url = getApi("organization") + "/corps/" + corpId + "/areas/" + org + "/" + channel + "/" + div + "/";
		let result;

		try {
			const res = await fetch(url);

			if(404 == res.status) {
				log("Sales Area is not found");
				result = null;
			}
			else {
				const data = await res.json();
				log("Sales Area fetched successfully.");
				log(data);
				result = data;
			}
		}
		catch(err) {
			console.error(err);
			result = null;
		}
		finally {

			// TODO: Delete before deilvery backend
			if(null == result) {
				result = dummyData.areas.filter(item => {
					return item.salesOrg.salesOrg === org
						&& item.distributionChannel.distributionChannel === channel
						&& item.division.division === div;
				})[0];
				log("Set Sales Area from dummy data for test");
			}
			
			return result;
		}
	}

	static async postOrg(corpId, uri, body) {

		log("CALL OrganizationDataHandler.postOrg(" + corpId + ", " + uri + ")");

		const url = getApi("organization") + "/corps/" + corpId + "/" + uri + "/";
		let result;

		try {
			const res = await fetch(url,{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(body)
			});

			if(200 === res.status || 201 === res.status) {
				log("Org is posted successfully.");
				result = res;
				result.isSuccess = true;
				result.message = "Success";

				log(result);
			}
			else {
				result = res;
				result.isSuccess = false;
				result.message = "Server Error";

				console.error(result);
			}
		}
		catch(err) {
			console.error(err);
			result = { isSuccess: false, message: "Client Error" };
		}
		finally {
			return result;
		}
	}

	static async putOrg(corpId, uri, orgCode, body) {

		log("CALL OrganizationDataHandler.putOrg(" + corpId + ", " + uri + ", " + orgCode + ")");

		const url = getApi("organization") + "/corps/" + corpId + "/" + uri + "/" + orgCode + "/";
		let result;

		try {
			const res = await fetch(url,{
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(body)
			});

			if(200 === res.status || 201 === res.status) {
				log("Org is putted successfully.");
				result = res;
				result.isSuccess = true;
				result.message = "Success";

				log(result);
			}
			else {
				result = res;
				result.isSuccess = false;
				result.message = "Server Error";

				console.error(result);
			}
		}
		catch(err) {
			console.error(err);
			result = { isSuccess: false, message: "Client Error" };
		}
		finally {
			return result;
		}
	}

	static async deleteOrg(corpId, uri, orgCode, body) {

		log("CALL OrganizationDataHandler.deleteOrg(" + corpId + ", " + uri + ", " + orgCode + ")");

		const url = getApi("organization") + "/corps/" + corpId + "/" + uri + "/" + orgCode + "/";
		let result;

		try {
			const res = await fetch(url,{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(body)
			});

			if(200 === res.status) {
				log("Org is deleted successfully.");
				result = res;
				result.isSuccess = true;
				result.message = "Success";

				log(result);
			}
			else {
				result = res;
				result.isSuccess = false;
				result.message = "Server Error";

				console.error(result);
			}
		}
		catch(err) {
			console.error(err);
			result = { message: "Client Error" }
		}
		finally {
			return result;
		}
	}
}

const dummyData = {
	"overview": {
		"orgs": [
			{ code: "S000", desc: "Battery District" },
			{ code: "S100", desc: "Material District" },
		],
		"channels": [
			{ code: "20", desc: "Domestic" },
			{ code: "40", desc: "Export" },
		],
		"divs": [
			{ code: "51", desc: "Battery" },
			{ code: "61", desc: "Material" },
		],
		"areas": [
			{ code: "S000/20/51", desc: "Battery District, Domestic, Battery" },
			{ code: "S000/40/51", desc: "Battery District, Export, Battery" },
			{ code: "S100/20/51", desc: "Material District, Domestic, Material" },
			{ code: "S100/40/61", desc: "Material District, Export, Material" },
		],
		"offices": [
			{ code: "S100", desc: "SKO Battery Marketing" },
			{ code: "S200", desc: "SKOH Marketing" },
		],
		"groups": [
			{ code: "100", desc: "Asia" },
			{ code: "200", desc: "Europe" },
			{ code: "300", desc: "America" },
			{ code: "900", desc: "Domestic" },
		],
	},
	"orgs": [
		{
			salesOrg: "S000",
			salesOrgDesc: "Battery District",
			id: "f68f0c61-ea6a-474a-b77a-60dfa830fed0",
		},
		{
			salesOrg: "S100",
			salesOrgDesc: "Material District",
			id: "bffa0dc1-24d1-4dd9-9afb-1c8201fbb911",
		},
	],
	"channels": [
		{
			distributionChannel: "20",
			distributionChannelDesc: "Domestic",
			id: "4a4782bd-8eed-40ec-a57e-2fa48270171a",
		},
		{
			distributionChannel: "40",
			distributionChannelDesc: "Export",
			id: "18162d86-6030-42cf-bec2-7b632e636fde",
		},
	],
	"divs": [
		{
			division: "51",
			divisionDesc: "Battery",
			id: "780d5915-980c-4360-a82e-460d3ea12fa4",
		},
		{
			division: "61",
			divisionDesc: "Material",
			id: "9a7f258e-434c-463d-9f20-2a5a5b259116",
		},
	],
	"areas": [
		{
			salesOrg: {
				salesOrg: "S000",
				salesOrgDesc: "Battery District",
				id: "57738ddb-cdbb-4901-b8d4-49897142e8ab",
			},
			distributionChannel: {
				distributionChannel: "20",
				distributionChannelDesc: "Domestic",
				id: "d9e0125f-e0bb-47aa-953d-aa9075a554d1",
			},
			division: {
				division: "51",
				divisionDesc: "Battery",
				id: "780d5915-980c-4360-a82e-460d3ea12fa4",
			},
			id: "af230e14-eaca-493f-a356-3bc05f43738c",
		},
		{
			salesOrg: {
				salesOrg: "S000",
				salesOrgDesc: "Battery District",
				id: "57738ddb-cdbb-4901-b8d4-49897142e8ab",
			},
			distributionChannel: {
				distributionChannel: "40",
				distributionChannelDesc: "Export",
				id: "809b30d1-6ab2-4192-a93f-590a2a7e24ae",
			},
			division: {
				division: "51",
				divisionDesc: "Battery",
				id: "780d5915-980c-4360-a82e-460d3ea12fa4",
			},
			id: "dd19e27e-72ee-4b7b-8f59-e119fdeabbcb",
		},
		{
			corp: {
				companyName: "SK on co., ltd.",
				companyCode: "S000",
				companyCodeDesc: "SK on",
				countryCode: "KR",
				vatNumber: "2428702258",
				id: "287263ec-21d7-4bf3-93e2-4b59bd977fdb",
			},
			salesOrg: {
				salesOrg: "S100",
				salesOrgDesc: "Material District",
				id: "15e70991-b766-4538-99da-cb7f4f4dd42c",
			},
			distributionChannel: {
				distributionChannel: "20",
				distributionChannelDesc: "Domestic",
				id: "d9e0125f-e0bb-47aa-953d-aa9075a554d1",
			},
			division: {
				division: "61",
				divisionDesc: "Material",
				id: "9a7f258e-434c-463d-9f20-2a5a5b259116",
			},
			id: "f8e7c7b5-1d2a-4c42-a5f4-cfaa5c98fa91",
		},
		{
			salesOrg: {
				salesOrg: "S100",
				salesOrgDesc: "Material District",
				id: "15e70991-b766-4538-99da-cb7f4f4dd42c",
			},
			distributionChannel: {
				distributionChannel: "40",
				distributionChannelDesc: "Export",
				id: "809b30d1-6ab2-4192-a93f-590a2a7e24ae",
			},
			division: {
				division: "61",
				divisionDesc: "Material",
				id: "9a7f258e-434c-463d-9f20-2a5a5b259116",
			},
			id: "18e9f9c2-89e3-45e6-84dd-6bd8ba8386cc",
		},
	],
	"offices": [
		{
			salesOffice: "S100",
			salesOfficeDesc: "SKO Battery Marketing",
			id: "c13ae9ac-f2e2-44ca-981e-0dbb5ae1d2aa",
		},
		{
			salesOffice: "S200",
			salesOfficeDesc: "SKOH Marketing",
			id: "1ce3d882-6d29-48a4-a133-48f9a17fc6c6",
		},
	],
	"groups": [
		{
			salesGroup: "100",
			salesGroupDesc: "Asia",
			id: "233b7633-5e7c-4984-8d62-cd58c6e36716",
		},
		{
			salesGroup: "200",
			salesGroupDesc: "Europe",
			id: "47a439cf-dde5-4506-b321-ae1786a832e2",
		},
		{
			salesGroup: "300",
			salesGroupDesc: "America",
			id: "5de6dc58-bc43-45fc-a8e1-7786adc33046",
		},
		{
			salesGroup: "900",
			salesGroupDesc: "Domestic",
			id: "b03f2480-9614-4f45-9a6d-e8e3fec5a36b",
		},
	]
}