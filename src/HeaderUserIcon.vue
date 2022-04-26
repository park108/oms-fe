<template>
	<div class="div div--user-status">
		<div class="div div--user-icon" @click="openMenu" >
			JP <!-- TODO: dummy user name for test -->
		</div>
	</div>
	<div class="div div--user-menu" v-if="isMenuOpen">
		<ul class="ul">
			<li class="li li--menu-item" @click="moveProfile">Your Profile</li>
			<li class="li li--menu-item" @click="moveSettings">Settings</li>
			<li class="li li--menu-item" @click="logout">Logout</li>
		</ul>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				isMenuOpen: false,
			}
		},
		methods: {
			openMenu: function(e) {
				this.isMenuOpen = !this.isMenuOpen;
			},
			moveProfile: function() {

			},
			moveSettings: function() {

			},
			logout: function() {

			},
		}
	}
</script>