import { getApi, isUuid, log } from "../common.js"

const orgUri = "groups";

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
		salesGroup: "100",
		salesGroupDesc: "Asia",
		id: "233b7633-5e7c-4984-8d62-cd58c6e36716",
	},
	{
		salesGroup: "200",
		salesGroupDesc: "Europe",
		id: "47a439cf-dde5-4506-b321-ae1786a832e2",
	},
	{
		salesGroup: "300",
		salesGroupDesc: "America",
		id: "5de6dc58-bc43-45fc-a8e1-7786adc33046",
	},
	{
		salesGroup: "900",
		salesGroupDesc: "Domestic",
		id: "b03f2480-9614-4f45-9a6d-e8e3fec5a36b",
	},
]