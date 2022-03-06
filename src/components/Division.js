import { isUuid, dummyData } from "../common.js"
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
				this.list = dummyData[orgUri];
			}
			this.isLoading = false;
		}
	},
};

const orgUri = "divs";