export default {
	data() {
		return {
			groups: []
		}
	},
	created() {
		this.fetchData();
	},
	methods: {
		fetchData: function() {
			this.groups = [
				{
					corp: {
						companyName: "SK on co., ltd.",
						companyCode: "S000",
						companyCodeDesc: "SK on",
						countryCode: "KR",
						vatNumber: "2428702258",
						id: "287263ec-21d7-4bf3-93e2-4b59bd977fdb",
					},
					salesGroup: "100",
					salesGroupDesc: "Asia",
					id: "233b7633-5e7c-4984-8d62-cd58c6e36716",
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
					salesGroup: "200",
					salesGroupDesc: "Europe",
					id: "47a439cf-dde5-4506-b321-ae1786a832e2",
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
					salesGroup: "300",
					salesGroupDesc: "America",
					id: "5de6dc58-bc43-45fc-a8e1-7786adc33046",
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
					salesGroup: "900",
					salesGroupDesc: "Domestic",
					id: "b03f2480-9614-4f45-9a6d-e8e3fec5a36b",
				},
			]
		}
	},
};