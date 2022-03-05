import { isUuid, log } from "../common.js"
import { OrganizationDataHandler } from "./OrganizationDataHandler.js";

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
	watch: {
		corpId: function() {
			if(isUuid(this.corpId)) this.getList();
		}
	},
	methods: {
		getList: async function() {
			this.list = await OrganizationDataHandler.getList(this.corpId, orgUri);
			if(null === this.list) {
				this.list = dummyData;
			}
			this.isLoading = false;
		}
	},
};

const orgUri = "orgs";

const dummyData = [
	{
		salesOrg: "S000",
		salesOrgDesc: "Battery District",
		id: "57738ddb-cdbb-4901-b8d4-49897142e8ab",
	},
	{
		salesOrg: "S100",
		salesOrgDesc: "Material District",
		id: "15e70991-b766-4538-99da-cb7f4f4dd42c",
	},
]