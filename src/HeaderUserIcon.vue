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
	export default {
		data() {
			return {
				isMenuOpen: false,
				isLoggedIn: false,
				userInitial: "",
			}
		},
		created() {
			const userInfo = sessionStorage.getItem("user");
			if(null !== userInfo && "undefined" !== userInfo) {
				this.isLoggedIn = true;
				this.userInitial = userInfo.substring(0, 2);
			}
			else {
				this.isLoggedIn = false;
				this.logout();
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
				this.isMenuOpen = false;
				// TODO: Make logout logic
				sessionStorage.clear();
				this.$router.push({name: "login"});
			},
		}
	}
</script>