<template>
	<div v-if="isLoggedIn">
		<div class="div div--user-status">
			<div class="div div--user-icon" @click="openMenu" >
				{{ userInitial }} <!-- TODO: dummy user name for test -->
			</div>
		</div>
		<div class="div div--user-menu" v-if="isMenuOpen">
			<ul class="ul">
				<li class="li li--menu-item" @click="moveProfile">Your Profile</li>
				<li class="li li--menu-item" @click="moveSettings">Settings</li>
				<li class="li li--menu-item" @click="logout">Logout</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import { UserDataHandler } from '@/users/UserDataHandler';
	export default {
		data() {
			return {
				isMenuOpen: false,
				isLoggedIn: false,
				userInitial: "",
			}
		},
		created() {
			const userInfo = UserDataHandler.getUserInfo();
			if(null === userInfo) {
				this.logout();
			}
			else {
				this.isLoggedIn = true;
				this.userInitial = userInfo.initial;
			}			
		},
		methods: {
			openMenu: function(e) {
				this.isMenuOpen = !this.isMenuOpen;
			},
			moveProfile: function() {
				this.isMenuOpen = false;
				this.$router.push({name: "profile"});
			},
			moveSettings: function() {
				this.isMenuOpen = false;
				this.$router.push({name: "settings"});
			},
			logout: function() {
				sessionStorage.clear();
				this.$router.push({name: "login"});
			},
		}
	}
</script>