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
						<view class="grid-text">饮食</view>
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
			:mask="false" @backspace="backspace" v-model="showKey" :show-tips="false">
			<slot name="default">
				<view style="display: flex;justify-content: space-between;">
					<view style="text-align: left;">
						23
					</view>
					<view style="text-align: right;">
						{{value}}
					</view>
				</view>
			</slot>
		</u-keyboard>

		<!-- 自定义底部导航 -->
		<u-tabbar :list="tabbar" :mid-button="true"></u-tabbar>

	</view>
</template>

<script>
	// icon
	import '../../static/icon/iconfont.css'
	export default {
		data() {
			return {
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
				value: '',
			}
		},
		onLoad() {
			this.tabbar = this.$store.state.tabbar
		},
		methods: {
			tabsChange(index) {
				this.tabsCurrent = index;
				this.swiperCurrent = index;
				// console.log(index)
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
	.iconfont {
		font-size: 52rpx;
	}

	.grid-text {
		font-size: 12rpx;
	}
</style>
