export const getApi = (serviceName) => {
	// TODO: Change URL
	if("organization" === serviceName) {
		if("development" === process.env.NODE_ENV) {
			return "http://localhost:8080"
		}
		else if("production" == process.env.NODE_ENV) {
			return "http://oms-27717587.ap-northeast-2.elb.amazonaws.com";
		}
	}
	else if("customer" === serviceName) {
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

export function sleep(ms) {
	const wakeUpTime = Date.now() + ms;
	while (Date.now() < wakeUpTime) {}
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