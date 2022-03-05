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

const orgUri = "offices";

const dummyData = [
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
]