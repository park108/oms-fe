<template>
	<Header title="Management Console" routeName="login" />
	<section class="section section--login-box">
		<div class="div div--login-input">
			<label for="user-id" class="label label--login-attributename">ID</label>
			<input class="input input--login-attribute" id="user-id" v-model="userId" type="input" @keyup.enter="login" />
		</div>
		<div class="div div--login-input">
			<label for="password" class="label label--login-attributename">Password</label>
			<input class="input input--login-attribute" id="password" v-model="password" type="password" @keyup.enter="login" />
		</div>
		<div class="div div--login-input">
			<button class="button button--login-submit" @click="login">Login</button>
		</div>
	</section>
	<Toaster />
	<Footer />
</template>
<script>
	import Header from "@/common/Header.vue";
	import Footer from "@/common/Footer.vue";
	import Toaster from "@/common/Toaster.vue";
	import { popToast } from "@/common/Toaster.vue";
	import { UserDataHandler } from "@/users/UserDataHandler.js";

	export default {
		data() {
			return {
				userId: "",
				password: "",
			}
		},
		components: {
			Header,
			Footer,
			Toaster,
		},
		created() {
			document.title = "Login - OMS";			
		},
		methods: {
			async login() {
				const id = document.getElementById("user-id");
				const password = document.getElementById("password");
				if("" === id.value) {
					popToast("WARNING", "ID is empty.", this.$store);
					id.focus();
					return;
				}
				if("" === password.value) {
					popToast("WARNING", "Password is empty.", this.$store);
					password.focus();
					return;
				}
				
				const loginResult = await UserDataHandler.login(id.value, password.value);
				if(undefined === loginResult || null === loginResult) {
					popToast("ERROR", "ID or Password is wrong.", this.$store);
					return;
				}
				sessionStorage.setItem("user", JSON.stringify(loginResult));
				sessionStorage.setItem("corpId", loginResult.corpId);
				this.$router.push({name: "Index"});
			}
		}
	}
</script>