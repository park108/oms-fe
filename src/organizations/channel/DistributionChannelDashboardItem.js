import { isUuid } from "@/common.js"
import { OrganizationDataHandler } from "../OrganizationDataHandler.js";

export default {
	data() {
		return {
			isLoading: true,
			list: []
		}
	},
	props: {
		corpId: '',
		orgUri: '',
	},
	watch: {
		corpId: async function() {
			if(isUuid(this.corpId)) {
				this.list = await OrganizationDataHandler.getList(this.corpId, this.orgUri);
				this.isLoading = false;
			}
		},
	},
	methods: {
		moveList: function(e) {
			const routeTo = "/" + this.orgUri + "/";
			this.$store.state.orgUri = this.orgUri;
			this.$router.push(routeTo);
		}
	},
};