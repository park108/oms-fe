export default {
	data() {
		return {
			channels: []
		}
	},
	created() {
		this.fetchData();
	},
	methods: {
		fetchData: function() {
			this.channels = [
				{
					corp: {
						companyName: "SK on co., ltd.",
						companyCode: "S000",
						companyCodeDesc: "SK on",
						countryCode: "KR",
						vatNumber: "2428702258",
						id: "287263ec-21d7-4bf3-93e2-4b59bd977fdb",
					},
					distributionChannel: "20",
					distributionChannelDesc: "Domestic",
					id: "d9e0125f-e0bb-47aa-953d-aa9075a554d1",
				},
				{
					corp: {
						companyName: "SK on co., ltd.",
						companyCode: "S000",
						companyCodeDesc: "SK on",
						countryCode: "KR",
						vatNumber: "2428702258",
						id: "287263ec-21d7-4bf3-93e2-4b59bd977fdb",
					},
					distributionChannel: "40",
					distributionChannelDesc: "Export",
					id: "809b30d1-6ab2-4192-a93f-590a2a7e24ae",
				},
			]
		}
	}
};