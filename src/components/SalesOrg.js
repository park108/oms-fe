export default {
	data() {
		return {
			orgs: []
		}
	},
	created() {
		this.fetchData();
	},
	methods: {
		fetchData: function() {
			this.orgs = [
				{
					corp: {
						companyName: "SK on co., ltd.",
						companyCode: "S000",
						companyCodeDesc: "SK on",
						countryCode: "KR",
						vatNumber: "2428702258",
						id: "287263ec-21d7-4bf3-93e2-4b59bd977fdb",
					},
					salesOrg: "S000",
					salesOrgDesc: "Battery District",
					id: "57738ddb-cdbb-4901-b8d4-49897142e8ab",
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
					salesOrg: "S100",
					salesOrgDesc: "Material District",
					id: "15e70991-b766-4538-99da-cb7f4f4dd42c",
				},
			]
		}
	},
};