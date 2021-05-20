<template>
	<view class="content">

		<!-- tabs选择器 -->
		<u-subsection class="u-margin-26" :list="tabsList" :current="tabsCurrent" mode="subsection"
			@change="tabsChange">
		</u-subsection>

		<!-- 分类选择 -->
		<swiper class="swiper" @change="swiperChange" :current="swiperCurrent">
			<swiper-item>
				<u-grid :col="4" :border="false" @click="gridClick" hover-class="gridHover">
					<u-grid-item index="waimai" :style="{'color':(gridItemCurrent == 'waimai' ?'red':'#000')}">
						<u-icon class="iconfont icon-waimai"></u-icon>
						<view class="grid-text">饮食1</view>
					</u-grid-item>
					<u-grid-item index="hongbao" :style="{'color':(gridItemCurrent == 'hongbao' ?'red':'#000')}">
						<u-icon class="iconfont icon-hongbao-m" :size="46"></u-icon>
						<view class="grid-text">红包</view>
					</u-grid-item>
					<u-grid-item index="lingshi" :style="{'color':(gridItemCurrent == 'lingshi' ?'red':'#000')}">
						<u-icon class="iconfont icon-lingshi" :size="46"></u-icon>
						<view class="grid-text">零食</view>
					</u-grid-item>
					<u-grid-item index="mao" :style="{'color':(gridItemCurrent == 'mao' ?'red':'#000')}">
						<u-icon class="iconfont icon-buoumaotubiao45" :size="46"></u-icon>
						<view class="grid-text">猫用品</view>
					</u-grid-item>
					<u-grid-item index="huafei" :style="{'color':(gridItemCurrent == 'huafei' ?'red':'#000')}">
						<u-icon class="iconfont icon-huafei" :size="46"></u-icon>
						<view class="grid-text">话费</view>
					</u-grid-item>
					<u-grid-item index="shenghuo" :style="{'color':(gridItemCurrent == 'shenghuo' ?'red':'#000')}">
						<u-icon class="iconfont icon-shuifei" :size="46"></u-icon>
						<view class="grid-text">生活支出</view>
					</u-grid-item>
					<u-grid-item index="zhuanzhang" :style="{'color':(gridItemCurrent == 'zhuanzhang' ?'red':'#000')}">
						<u-icon class="iconfont icon-zhuanzhang" :size="46"></u-icon>
						<view class="grid-text">转账</view>
					</u-grid-item>
					<u-grid-item index="yule" :style="{'color':(gridItemCurrent == 'yule' ?'red':'#000')}">
						<u-icon class="iconfont icon-ziyuan" :size="46"></u-icon>
						<view class="grid-text">娱乐</view>
					</u-grid-item>
					<u-grid-item index="yanjiu" :style="{'color':(gridItemCurrent == 'yanjiu' ?'red':'#000')}">
						<u-icon class="iconfont icon-yan_" :size="46"></u-icon>
						<view class="grid-text">烟酒</view>
					</u-grid-item>
				</u-grid>
			</swiper-item>
			<swiper-item>
				<u-grid :col="4" :border="false">
					<u-grid-item>
						<u-icon class="iconfont icon-waimai"></u-icon>
						<view class="grid-text">饮食</view>
					</u-grid-item>
					<u-grid-item>
						<u-icon class="iconfont icon-hongbao-m" :size="46"></u-icon>
						<view class="grid-text">红包</view>
					</u-grid-item>
					<u-grid-item>
						<u-icon class="iconfont icon-jianzhi" :size="46"></u-icon>
						<view class="grid-text">零食</view>
					</u-grid-item>
				</u-grid>
			</swiper-item>
		</swiper>

		<!-- 键盘 -->
		<u-keyboard ref="uKeyboard" @change="valChange" :safe-area-inset-bottom="true" :mask-close-able="false"
			:mask="false" @backspace="backspace" @confirm="keySave" v-model="showKey" :tips="value">
			<slot name="default">
				<view class="keySlot">
					<u-button @click="timeShow = true" size="mini">{{btnTime}}</u-button>
					<u-field v-model="info" placeholder="请填写备注">
					</u-field>
				</view>
			</slot>
		</u-keyboard>

		<!-- 日期选择 -->
		<u-picker v-model="timeShow" mode="time" @confirm="timeBack" :start-year="startYear" :end-year="endYear"
			:params="timeParams">
		</u-picker>

		<!-- 自定义底部导航 -->
		<u-tabbar :list="tabbar" :mid-button="true"></u-tabbar>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				timeParams: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},
				info: '',
				tabbar: '',
				tabsList: [{
					name: '支出'
				}, {
					name: '收入'
				}],
				tabsCurrent: 0,
				swiperCurrent: 0,
				gridItemCurrent: '',
				showKey: false,
				value: ' ',
				timeShow: false,
				btnTime: new Date().toISOString().slice(5, 10),
				startYear: '',
				endYear: ''
			}
		},
		onLoad() {
			this.tabbar = this.$store.state.tabbar
			// this.startYear = (new Date().toISOString().slice(0, 4) - 5).toString()
			// this.endYear = (new Date().toISOString().slice(0, 4) + 5).toString()
			let start = new Date().toISOString().slice(0, 4),
				end = new Date().toISOString().slice(0, 4)
			start = parseInt(start) - 5
			end = parseInt(end) + 5
			this.startYear = start
			this.endYear = end
		},
		mounted() {
			// #ifdef APP-PLUS
			this.sqlLite.createTable();
			// #endif
			console.log(this.tabsCurrent)
		},
		methods: {
			timeBack(e) {
				console.log(e)
				this.btnTime = e.month + '-' + e.day
			},
			keySave() {
				console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
				// uni.onTabBarMidButtonTap(() => {
					plus.android.requestPermissions(['android.permission.INTERNET'], function(e) {
						console.log(e)
						if (e.deniedAlways.length > 0) { //权限被永久拒绝  
							// 弹出提示框解释为何需要权限，引导用户打开设置页面开启  
							console.log('权限被永久拒绝' + e.deniedAlways.toString());
						}
						if (e.deniedPresent.length > 0) { //权限被临时拒绝  
							// 弹出提示框解释为何需要权限，可再次调用plus.android.requestPermissions申请权限  
							console.log('权限被临时拒绝' + e.deniedPresent.toString());
						}
						if (e.granted.length > 0) { //权限被允许  
							console.log('权限被允许' + e.granted.toString());
						}
					}, function(e) {
						console.log('Request Permissions error:' + JSON.stringify(e));
					});
					uni.navigateTo({
						url: '/pages/add/index'
					})
				// });
				console.log(this.gridItemCurrent, this.value, this.info, this.btnTime)
				let SqlData = {
					classify: this.gridItemCurrent,
					amount: this.value,
					time: this.btnTime,
					info: this.info
				}
				console.log("SSSSSSSSSS",this.tabsCurrent)
				this.sqlLite.insertData(SqlData,this.tabsCurrent);
				this.sqlLite.selectSql();
				this.gridItemCurrent = ''
				this.value = ' '
				this.info = ''
			},
			tabsChange(index) {
				this.tabsCurrent = index;
				this.swiperCurrent = index;
				console.log(index)
			},
			// 按键被点击(点击退格键不会触发此事件)
			valChange(val) {
				if (this.value.length > 8) return
				// 将每次按键的值拼接到value变量中，注意+=写法
				this.value += val;
				console.log(this.value);
			},
			// 退格键被点击
			backspace() {
				// 删除value的最后一个字符
				if (this.value.length) this.value = this.value.substr(0, this.value.length - 1);
				console.log(this.value);
			},
			swiperChange(e) {
				this.tabsCurrent = e.detail.current
				// this.tabsChange(e.detail.current)
			},
			gridClick(index) {
				this.showKey = true;
				this.gridItemCurrent = index
			}
		}
	}
</script>

<style lang="less" scoped>
	// icon
	@import '../../static/icon/iconfont.css';

	page,
	.content {
		height: 100vh;
		min-height: 768rpx;
	}

	.iconfont {
		font-size: 52rpx;
	}

	.grid-text {
		font-size: 12rpx;
	}

	.swiper {
		height: 100%;
	}

	.keySlot {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
