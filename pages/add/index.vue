<template>
	<view class="content">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<!-- tabs选择器 -->
		<u-subsection class="u-margin-26" :list="tabsList" :current="tabsCurrent" mode="subsection"
			@change="tabsChange">
		</u-subsection>

		<!-- 分类选择 -->
		<swiper class="swiper" @change="swiperChange" :current="swiperCurrent">
			<swiper-item>
				<u-grid :col="4" :border="false" hover-class="gridHover">
					<u-grid-item @click="gridClick('饮食','waimai')"
						:style="{'color':(gridItemCurrent == '饮食' ?'red':'#000')}">
						<u-icon class="iconfont icon-waimai"></u-icon>
						<view class="grid-text">饮食</view>
					</u-grid-item>
					<u-grid-item @click="gridClick('红包','hongbao-m')"
						:style="{'color':(gridItemCurrent == '红包' ?'red':'#000')}">
						<u-icon class="iconfont icon-hongbao-m" :size="46"></u-icon>
						<view class="grid-text">红包</view>
					</u-grid-item>
					<u-grid-item @click="gridClick('零食','lingshi')"
						:style="{'color':(gridItemCurrent == '零食' ?'red':'#000')}">
						<u-icon class="iconfont icon-lingshi" :size="46"></u-icon>
						<view class="grid-text">零食</view>
					</u-grid-item>
					<u-grid-item @click="gridClick('猫用品','buoumaotubiao45')"
						:style="{'color':(gridItemCurrent == '猫用品' ?'red':'#000')}">
						<u-icon class="iconfont icon-buoumaotubiao45" :size="46"></u-icon>
						<view class="grid-text">猫用品</view>
					</u-grid-item>
					<u-grid-item @click="gridClick('话费','huafei')"
						:style="{'color':(gridItemCurrent == '话费' ?'red':'#000')}">
						<u-icon class="iconfont icon-huafei" :size="46"></u-icon>
						<view class="grid-text">话费</view>
					</u-grid-item>
					<u-grid-item @click="gridClick('生活支出','shuifei')"
						:style="{'color':(gridItemCurrent == '生活支出' ?'red':'#000')}">
						<u-icon class="iconfont icon-shuifei" :size="46"></u-icon>
						<view class="grid-text">生活支出</view>
					</u-grid-item>
					<u-grid-item index="zhuanzhang" @click="gridClick('转账','zhuanzhang')"
						:style="{'color':(gridItemCurrent == '转账' ?'red':'#000')}">
						<u-icon class="iconfont icon-zhuanzhang" :size="46"></u-icon>
						<view class="grid-text">转账</view>
					</u-grid-item>
					<u-grid-item @click="gridClick('娱乐','ziyuan')"
						:style="{'color':(gridItemCurrent == '娱乐' ?'red':'#000')}">
						<u-icon class="iconfont icon-ziyuan" :size="46"></u-icon>
						<view class="grid-text">娱乐</view>
					</u-grid-item>
					<u-grid-item @click="gridClick('烟酒','yan_')" data-test="test"
						:style="{'color':(gridItemCurrent == '烟酒' ?'red':'#000')}">
						<u-icon class="iconfont icon-yan_" :size="46"></u-icon>
						<view class="grid-text">烟酒</view>
					</u-grid-item>
				</u-grid>
			</swiper-item>
			<swiper-item>
				<u-grid :col="4" :border="false">
					<u-grid-item @click="gridClick('工资','web-icon-')" data-test="test"
						:style="{'color':(gridItemCurrent == '工资' ?'red':'#000')}">
						<u-icon class="iconfont icon-web-icon-" :size="46"></u-icon>
						<view class="grid-text">工资</view>
					</u-grid-item>
					<u-grid-item @click="gridClick('红包','hongbao-m')"
						:style="{'color':(gridItemCurrent == '红包' ?'red':'#000')}">
						<u-icon class="iconfont icon-hongbao-m" :size="46"></u-icon>
						<view class="grid-text">红包</view>
					</u-grid-item>
					<u-grid-item @click="gridClick('兼职','jianzhi')"
						:style="{'color':(gridItemCurrent == '兼职' ?'red':'#000')}">
						<u-icon class="iconfont icon-jianzhi" :size="46"></u-icon>
						<view class="grid-text">兼职</view>
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
				gridItemIcon: '',
				endYear: '',
				curYear: new Date().toISOString().slice(0, 4),
				curMonth: new Date().toISOString().slice(5, 7)
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
			this.sqlLite.openSql();
			this.sqlLite.createTable();
			this.sqlLite.cloneSql();
			// #endif
			console.log(this.curMonth)
		},
		methods: {
			timeBack(e) {
				console.log(e)
				this.btnTime = e.month + '-' + e.day
				this.curMonth = e.month
				this.curYear = e.year
			},
			keySave() {
				console.log(this.gridItemCurrent, this.value, this.info, this.btnTime)
				let SqlData = {
					classify: this.gridItemCurrent,
					amount: this.value,
					time: this.btnTime,
					timeyear: this.curYear,
					timemonth: this.curMonth,
					info: this.info,
					icon: this.gridItemIcon
				}
				this.sqlLite.openSql();
				this.sqlLite.insertData(SqlData, this.tabsCurrent);
				this.sqlLite.cloneSql();
				this.gridItemCurrent = ''
				this.value = ' '
				this.info = ''
			},
			tabsChange(index) {
				this.tabsCurrent = index;
				this.swiperCurrent = index;
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
			},
			gridClick(index, icon) {
				this.showKey = true;
				this.gridItemCurrent = index
				this.gridItemIcon = icon
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

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background-color: #fff;
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
