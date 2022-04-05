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
			}
			
			return result;
		}
	}

	static async getOrg(corpId, uri, orgCode, id) {

		log("CALL OrganizationDataHandler.getOrg(" + corpId + ", " + uri + ", " + orgCode + " = " + id + ")");

		const url = getApi("organization") + "/corps/" + corpId + "/" + uri + "/" + id + "/";
		let result;

		try {
			const res = await fetch(url);

			if(404 == res.status) {
				log(orgCode + " is not found");
				result = null;
			}
			else {
				const data = await res.json();
				log(orgCode + " fetched successfully.");
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
					return item.id === id;
				})[0];
			}
			
			return result;
		}
	}
}