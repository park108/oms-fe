export const getApi = (serviceName) => {
	if("organization" === serviceName) {
		if("development" === process.env.NODE_ENV) {
			return "http://localhost:8080"
		}
		else if("production" == process.env.NODE_ENV) {
			return "http://oms-27717587.ap-northeast-2.elb.amazonaws.com";
		}
	}
}

export const isUuid = (id) => {
	const regexExpForUuid = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
	return regexExpForUuid.test(id);
}

export const log = (str) => {
	if("development" === process.env.NODE_ENV) {
		console.log("[DEV] " + str);
	}
}

export const confirmCreateItem = (orgDesc) => {
	return window.confirm("Do you want to create a " + orgDesc + " ?");
}

export const confirmUpdateItem = (orgDesc) => {
	return window.confirm("Do you want to update a " + orgDesc + " ?");
}

export const confirmDeleteItem = (orgDesc) => {
	return window.confirm("Do you want to delete a " + orgDesc + " ?");
}

export const dummyData = {
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

export function getGames(games) {

   log("==================================================");
   log(new Date());
   log("--------------------------------------------------");

   let game = [];
   let slot = [];
   
   for(let i = 0; i < games; i++) {

	   let pick = 0;

	   while(6 > pick) {

		   let no = Math.floor((45 * Math.random()) % 46) + 1;

		   if(slot.indexOf(no) > -1) {
			   continue;
		   }
		   else if(game.indexOf(no) > -1) {
			   continue;
		   }

		   game.push(no);
		   slot.push(no);

		   ++pick;

		   game.sort((a, b) =>{ return a*1-b*1});
		   slot.sort((a, b) =>{ return a*1-b*1});

		   if(slot.length === 45) {
			   log("------------ Slot is full.  Flush it. ------------");
			   slot = [];
		   }
	   }

	   log("GAME(" + (i+1) + ") = " + game);
	   game = [];
   }

   log("==================================================");
}