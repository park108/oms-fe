<template>
	<Header title="Management Console" routeName="login" />
	<div>
		<span>ID</span>
		<input v-model="id" type="input" />
	</div>
	<div>
		<span>Password</span>
		<input v-model="password" type="password" />
	</div>
	<div>
		<button @click="login">Login</button>
	</div>
</template>
<script>
	import Header from "@/Header.vue";

	export default {
		data() {
			return {
				id: "",
				password: "",
			}
		},
		components: {
			Header,
		},
		methods: {
			login() {
				//TODO: Make login logic
				sessionStorage.setItem("user", this.id);
				this.$router.push({name: "Index"});
			}
		}
	}
</script>