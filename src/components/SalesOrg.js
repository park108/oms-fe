import { log, isUuid, dummyData } from "../common.js"
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
		},
		moveDetail: function(e) {
			const org = e.target;
			log(org.getAttribute("value"));
		}
	},
};

const orgUri = "orgs";