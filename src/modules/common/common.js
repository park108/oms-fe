export const getApi = (serviceName) => {

	// TODO: Change URL
	const apis = {
		organization: {
			development: "http://localhost:8080",
			production: "http://oms-27717587.ap-northeast-2.elb.amazonaws.com",
		},
		customer: {
			development: "http://localhost:8080",
			production: "http://oms-27717587.ap-northeast-2.elb.amazonaws.com",
		},
		product: {
			development: "http://localhost:8080",
			production: "http://oms-27717587.ap-northeast-2.elb.amazonaws.com",
		},
		user: {
			development: "http://localhost:8080",
			production: "http://oms-27717587.ap-northeast-2.elb.amazonaws.com",
		},
		code: {
			development: "http://localhost:8080",
			production: "http://oms-27717587.ap-northeast-2.elb.amazonaws.com",
		},
	}

	return apis[serviceName][process.env.NODE_ENV];
}

export const isUuid = (id) => {
	// 8-4-4-4-12 (32 byte)
	const regexExpForUuid = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
	return regexExpForUuid.test(id);
}

export const sleep = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms))
}

export const log = (str) => {
	if("development" === process.env.NODE_ENV) {
		console.log("[DEV] " + str);
	}
}

export const confirmCreateItem = (orgDesc) => {
	return window.confirm("Do you want to create a " + orgDesc + " ?");
}

export const confirmUpdateItem = (orgDesc) => {
	return window.confirm("Do you want to update a " + orgDesc + " ?");
}

export const confirmDeleteItem = (orgDesc) => {
	return window.confirm("Do you want to delete a " + orgDesc + " ?");
}

export function getGames(games) {

   log("==================================================");
   log(new Date());
   log("--------------------------------------------------");

   let game = [];
   let slot = [];
   
   for(let i = 0; i < games; i++) {

	   let pick = 0;

	   while(6 > pick) {

		   let no = Math.floor((45 * Math.random()) % 45) + 1;

		   if(slot.indexOf(no) > -1) {
			   continue;
		   }
		   else if(game.indexOf(no) > -1) {
			   continue;
		   }

		   game.push(no);
		   slot.push(no);

		   ++pick;

		   game.sort((a, b) =>{ return a*1-b*1});
		   slot.sort((a, b) =>{ return a*1-b*1});

		   if(slot.length === 45) {
			   log("------------ Slot is full.  Flush it. ------------");
			   slot = [];
		   }
	   }

	   log("GAME(" + (i+1) + ") = " + game);
	   game = [];
   }

   log("==================================================");
}