
import Corporation from "../organizations/corp/Corporation.vue";
import SalesOrg from "../organizations/org/SalesOrgDashboardItem.vue";
import DistributionChannel from "../organizations/channel/DistributionChannelDashboardItem.vue";
import Division from "../organizations/div/DivisionDashboardItem.vue";
import SalesArea from "../organizations/area/SalesAreaDashboardItem.vue";
import SalesOffice from "../organizations/office/SalesOfficeDashboardItem.vue";
import SalesGroup from "../organizations/group/SalesGroupDashboardItem.vue";

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