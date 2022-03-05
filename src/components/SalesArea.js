import { getApi, isUuid, log } from "../common.js"

const orgUri = "areas";

export default {
	data() {
		return {
			isLoading: true,
			list: []
		}
	},
	props: {
		corpId: ''
	},
	mounted() {
	},
	watch: {
		corpId: function() {

			if(isUuid(this.corpId)) {
				log(orgUri + ".CORPID = " + this.corpId);
				this.getList();
			}
		}
	},
	methods: {
		getList: async function() {

			const url = getApi("organization") + "/corps/" + this.corpId + "/" + orgUri + "/";

			try {
				this.isLoading = true;

				const res = await fetch(url);

				if(404 === res.status) {
					log(orgUri + " is not found");
					this.list = dummyData;
				}
				else {
					const data = await res.json();
					this.list = data;
				}
			}
			catch (err) {
				console.error(err);	
			}
			finally {
				log(orgUri + ".finally...");
				this.isLoading = false;
			}
		}
	},
};

const dummyData = [
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
]