export default {
	data() {
		return {
			offices: []
		}
	},
	created() {
		this.fetchData();
	},
	methods: {
		fetchData: function() {
			this.offices = [
				{
					corp: {
						companyName: "SK on co., ltd.",
						companyCode: "S000",
						companyCodeDesc: "SK on",
						countryCode: "KR",
						vatNumber: "2428702258",
						id: "287263ec-21d7-4bf3-93e2-4b59bd977fdb",
					},
					salesOffice: "S100",
					salesOfficeDesc: "SKO Battery Marketing",
					id: "c13ae9ac-f2e2-44ca-981e-0dbb5ae1d2aa",
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
					salesOffice: "S200",
					salesOfficeDesc: "SKOH Marketing",
					id: "1ce3d882-6d29-48a4-a133-48f9a17fc6c6",
				},
			]
		}
	},
};