<template>
	<view class="content">
		<u-tabbar :list="tabbar" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabbar: ''
			}
		},
		onLoad() {
			this.tabbar = this.$store.state.tabbar
		}
	}
</script>

<style>
</style>
