import { getApi, sleep, log } from "@/common/common.js"

export class CommonCodes {

	static uriToCodeName = [
		{ uri: "languages", name: "Languages", },
		{ uri: "currencies", name: "Currencies", },
		{ uri: "countries", name: "Countries", },
	];

	static localTestCodes = {
		languages: [
			// ISO Language Code(639-1)
			// https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
			{ code: "", description: "" },
			{ code: "ko", description: "Korean" },
			{ code: "en", description: "English" },
			{ code: "de", description: "German" },
			{ code: "fr", description: "French" },
			{ code: "it", description: "Italian" },
			{ code: "ja", description: "Japanese" },
			{ code: "zh", description: "Chinese" },
		],
		currencies: [
			// ISO Currency Code(4217)
			// https://en.wikipedia.org/wiki/ISO_4217
			{ code: "", description: "" },
			{ code: "KRW", description: "South Korean won" },
			{ code: "USD", description: "United States dollar" },
			{ code: "EUR", description: "Euro" },
			{ code: "CNY", description: "Chinese yuan" },
			{ code: "JPY", description: "Japanese yen" },
			{ code: "GBP", description: "Pound sterling" },
		],
		countries: [
			// ISO Currency Code(3166-1 alpha-2)
			// https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
			{ code: "", description: "" },
			{ code: "KR", description: "Korea, Republic of" },
			{ code: "US", description: "United States of America" },
			{ code: "DE", description: "Germany" },
			{ code: "IT", description: "Italy" },
			{ code: "JP", description: "Japan" },
			{ code: "FI", description: "Finland" },
			{ code: "SE", description: "Sweden" },
		],
	};

	static async getCodeList(corpId, uri) {
		log("CALL CommonCodes.getCodeList(" + corpId + ")");
		const url = getApi("code") + "/corps/" + corpId + "/codes/" + uri + "/";
		const codeName = this.uriToCodeName.filter(item => item.uri === uri)[0].name;
		let result;
		try {
			const res = await fetch(url);
			if(404 === res.status) {
				log(codeName + " are not found");
				result = null;
			}
			else {
				const data = await res.json();
				log(codeName + " list fetched successfully.");
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
				result = this.localTestCodes[uri];
				// TODO: Make test latency
				await sleep(100 + 100 * Math.random());
				log("Set " + codeName + " from dummy data for test");
			}
			return result;
		}
	}
}