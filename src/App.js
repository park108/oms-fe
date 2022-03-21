import Corporation from "./organizations/Corporation.vue";
import SalesOrg from "./organizations/SalesOrg.vue";
import DistributionChannel from "./organizations/DistributionChannel.vue";
import Division from "./organizations/Division.vue";
import SalesArea from "./organizations/SalesArea.vue";
import SalesOffice from "./organizations/SalesOffice.vue";
import SalesGroup from "./organizations/SalesGroup.vue";

export default {
	data() {
		return {
			corpId: String
		}
	},
	components: {
		Corporation,
		SalesOrg,
		DistributionChannel,
		Division,
		SalesArea,
		SalesOffice,
		SalesGroup,
	},
	methods: {
		setCorpId(value) {
			this.corpId = value;
		}
	},
};