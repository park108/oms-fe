export const getApi = (serviceName) => {
	if("organization" === serviceName) {
		if("development" === process.env.NODE_ENV) {
			return "http://localhost:8080"
		}
		else if("production" == process.env.NODE_ENV) {
			return "http://oms-27717587.ap-northeast-2.elb.amazonaws.com";
		}
	}
}

export const isUuid = (id) => {
	const regexExpForUuid = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
	return regexExpForUuid.test(id);
}

export const log = (str) => {
	if("development" === process.env.NODE_ENV) {
		console.log(str);
	}
}