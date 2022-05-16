import { getApi, sleep, log } from "@/common.js"

export class ProductDataHandler {

	static async getList(corpId) {

		log("CALL ProductDataHandler.getList(" + corpId + ")");

		// TODO: Make query string for conditions
		const url = getApi("product") + "/corps/" + corpId;
		let result;

		try {
			const res = await fetch(url);

			if(404 === res.status) {
				log("Products are not found");
				result = null;
			}
			else {
				const data = await res.json();
				log("Product list fetched successfully.");
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

	static async getProduct(corpId, productNo) {

		// TODO: Make test latency
		await sleep(100 + 100 * Math.random());

		return dummyData.filter(item => item.productNo === productNo)[0];
	}
}


const dummyData = [
	{ productNo: "CE0305S001A", productName: "E03051A_C33", division: "51", baseUnit: "EA", },
	{ productNo: "CE0370S001C", productName: "E370C_M14 NCM523", division: "51", baseUnit: "EA", },
	{ productNo: "CE0600C002A", productName: "E06002B_OS EU", division: "51", baseUnit: "EA", },
	{ productNo: "CP0260C002A", productName: "P02602A_F171", division: "51", baseUnit: "EA", },
	{ productNo: "CP0318C001A", productName: "P03181A_SG2", division: "51", baseUnit: "EA", },
	{ productNo: "CP0430S001C", productName: "P04301C_M31_NCM523", division: "51", baseUnit: "EA", },
	{ productNo: "ME01090001A", productName: "BATTERY MODULE ASSY-SHORT", division: "51", baseUnit: "EA", },
	{ productNo: "ME011400001", productName: "BATTERY MODULE 6M A-02", division: "51", baseUnit: "EA", },
	{ productNo: "ME01770001A", productName: "BATTERY MODULE ASSY-LONG", division: "51", baseUnit: "EA", },
	{ productNo: "PP0089KA401", productName: "CD_PHEV_BATTERY_PACK_ASSY", division: "51", baseUnit: "EA", },
];