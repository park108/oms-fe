import { getApi, isUuid, log } from "../common.js"

const orgUri = "offices";

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