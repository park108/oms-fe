import { getApi, log, dummyData } from "@/common.js"

export class OrganizationDataHandler {

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
}