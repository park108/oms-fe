import { getApi, log, dummyData } from "@/common.js"

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