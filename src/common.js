export const getApi = (serviceName) => {
	if("organization" === serviceName) {
		if("development" === process.env.NODE_ENV) {
			return "http://127.0.0.1:8080"
		}
		else if("production" == process.env.NODE_ENV) {
			return "http://oms-27717587.ap-northeast-2.elb.amazonaws.com";
		}
	}
}