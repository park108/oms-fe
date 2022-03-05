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

const orgUri = "channels";

const dummyData = [
	{
		distributionChannel: "20",
		distributionChannelDesc: "Domestic",
		id: "d9e0125f-e0bb-47aa-953d-aa9075a554d1",
	},
	{
		distributionChannel: "40",
		distributionChannelDesc: "Export",
		id: "809b30d1-6ab2-4192-a93f-590a2a7e24ae",
	},
]