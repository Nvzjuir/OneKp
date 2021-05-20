<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			// #ifdef APP-PLUS
			this.sqlLite.openSql();
			//  #endif
		},
		onHide: function() {
			console.log('App Hide')
			// #ifdef APP-PLUS
			this.sqlLite.cloneSql();
			// #endif
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
</style>
