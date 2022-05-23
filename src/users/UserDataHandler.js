import { getApi, sleep, log } from "@/common/common.js"

export class UserDataHandler {

	static async login(id, password) {
		log("CALL UserDataHandler.login(" + id + ")");
		// TODO: Make login logic
		// TODO: Make test latency
		await sleep(100 + 100 * Math.random());
		return dummyData.filter(user => user.id === id)[0];
	}

	static async getList(corpId) {
		log("CALL UserDataHandler.getList(" + corpId + ")");
		// TODO: Make query string for conditions
		const url = getApi("user") + "/corps/" + corpId;
		let result;
		try {
			const res = await fetch(url);
			if(404 === res.status) {
				log("Users are not found");
				result = null;
			}
			else {
				const data = await res.json();
				log("User list fetched successfully.");
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
				log("Set user list from dummy data for test");
			}
			return result;
		}
	}

	static async getUser(corpId, id) {
		// TODO: Make test latency
		await sleep(100 + 100 * Math.random());
		return dummyData.filter(user => user.id === id)[0];
	}

	static async postUser(corpId, body) {
		log("CALL UserDataHandler.postUser(" + corpId + ")");
		const url = getApi("user") + "/corps/" + corpId + "/users/";
		let result;
		try {
			const res = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(body)
			});
			if(200 === res.status || 201 === res.status) {
				log("User is posted successfully.");
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

	static async putUser(corpId, id, body) {
		log("CALL UserDataHandler.putUser(" + corpId + ", " + id + ")");
		const url = getApi("product") + "/corps/" + corpId + "/users/" + id;
		let result;

		try {
			const res = await fetch(url, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(body)
			});

			if(200 === res.status || 201 === res.status) {
				log("User is putted successfully.");
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

	static async deleteUser(corpId, id, body) {
		log("CALL UserDataHandler.deleteUser(" + corpId + ", " + id + ")");
		const url = getApi("user") + "/corps/" + corpId + "/users/" + id;
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
				log("User is deleted successfully.");
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

const dummyData = [
	{
		id: "park108@gmail.com",
		name: {
			en: "Jongkil Park",
			ko: "박종길",
		},
		language: "ko",
		initial: "박",
		corpId: "1eb2035d-bb9a-4933-a0ec-438baf8cff0a",
		sessionId: "0d3643fd-4b6e-4244-94f4-1286468036a7",
	},
];