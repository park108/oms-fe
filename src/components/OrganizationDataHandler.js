import { getApi, log } from "../common.js"

export class OrganizationDataHandler {

	static async getList(corpId, uri) {

		log("CALL DataHandler.getList(" + corpId + ", " + uri + ")");

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
			return result;
		}
	}
}