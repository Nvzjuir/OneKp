<template>
	<view class="content">
		<u-subsection class="u-margin-26" :list="tabsList" :tabsCurrent="0" mode="subsection" @change="tabsChange">
		</u-subsection>
		<u-keyboard ref="uKeyboard" @change="valChange" :safe-area-inset-bottom="true" :show-tips="false"
			:mask-close-able="false" @cancel="showKey=false" @confirm="test" :mask="false" @backspace="backspace"
			v-model="showKey">
		</u-keyboard>
		<u-tabbar :list="tabbar" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabbar: '',
				tabsList: [{
					name: '1'
				}, {
					name: '2'
				}],
				tabsCurrent: 0,
				showKey: true,
				value: '',
			}
		},
		onLoad() {
			this.tabbar = this.$store.state.tabbar
		},
		methods: {
			test() {
				console.log("SSS")
			},
			tabsChange(index) {
				this.tabsCurrent = index;
				console.log(index)
			},
			// 按键被点击(点击退格键不会触发此事件)
			valChange(val) {
				// 将每次按键的值拼接到value变量中，注意+=写法
				this.value += val;
				console.log(this.value);
			},
			// 退格键被点击
			backspace() {
				// 删除value的最后一个字符
				if (this.value.length) this.value = this.value.substr(0, this.value.length - 1);
				console.log(this.value);
			}
		}
	}
</script>

<style lang="less" scoped>
</style>
