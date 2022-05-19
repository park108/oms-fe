<template>
	<Header title="Management Console" routeName="login" />
	<section class="section section--login-box">
		<div class="div div--login-input">
			<label for="user-id" class="label label--login-attributename">ID</label>
			<input class="input input--login-attribute" id="user-id" v-model="userId" type="input" />
		</div>
		<div class="div div--login-input">
			<label for="password" class="label label--login-attributename">Password</label>
			<input class="input input--login-attribute" id="password" v-model="password" type="password" />
		</div>
		<div class="div div--login-input">
			<button class="button button--login-submit" @click="login">Login</button>
		</div>
	</section>
	<Footer />
</template>
<script>
	import Header from "@/Header.vue";
	import Footer from "@/Footer.vue";

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
		},
		created() {

			document.title = "Login - OMS";			
		},
		methods: {
			login() {
				//TODO: Make login logic
				sessionStorage.setItem("user", this.userId);
				this.$router.push({name: "Index"});
			}
		}
	}
</script>