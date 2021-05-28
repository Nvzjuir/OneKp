<template>
	<view class="content">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
		</view>
		<!-- #endif -->
		<view class="title">
			<view class="titleCard" style="color: #FFBB33;" @click="showTime = true">
				<text>{{year}}</text>
				<text>{{month}}月</text>
			</view>
			<view class="titleCard">
				<text>月支出</text>
				<view>
					<u-count-to ref="uCountTo" color="#fff" font-size="32" :bold="true" :end-val="monSpending">
					</u-count-to>
				</view>
			</view>
			<view class="titleCard">
				<text>月收入</text>
				<view>
					<u-count-to ref="uCountTo" color="#fff" font-size="32" :bold="true" :end-val="monIncome">
					</u-count-to>
				</view>
			</view>
			<view class="titleCard">
				<text>月结余</text>
				<view>
					<u-count-to ref="uCountTo" color="#fff" font-size="32" :bold="true" :end-val="monSurplus">
					</u-count-to>
				</view>
			</view>
		</view>
		<u-card v-for="(cardItem,index) in billData" :key="index">
			<view class="cardHead" slot="head">
				<view class="headLeft">
					支出:<text style="color: red;margin-right: 2em;">{{cardItem.surplus}}</text>收入:<text
						style="color: green;">{{cardItem.income}}</text>
				</view>
				<view class="headRight">
					{{cardItem.title}}
				</view>
			</view>
			<u-swipe-action class="" slot="body" btn-width="100" v-for="(item,index) in cardItem.body" :index="index" :key="index " @click="click"
				@open="open" :options="options">
				<view class="u-flex u-border-bottom"
					style="padding:20rpx 0; justify-content: center; align-items: center;">
					<u-icon class="u-flex-1 iconfont" :class='"icon-" + item.icon' style="font-size: 60rpx;"></u-icon>
					<!-- <u-icon class="iconfont icon-jianzhi" style="font-size: 52rpx;"></u-icon> -->
					<view class="title-wrap">
						<view class="u-font-24 u-flex-2">{{item.classify}}</view>
						<view class="u-m-r-20  u-font-20 u-line-2 u-flex-2" style="color: #dddddd;">{{item.info}}</view>
						<view class="u-flex-1 u-flex u-row-center">
							<text
								:style="{'color':(item.istable?'green':'red')}">{{item.istable?'+'+item.amount:'-'+item.amount}}</text>
						</view>
					</view>
				</view>
			</u-swipe-action>
		</u-card>
		<u-picker v-model="showTime" mode="time" :params="params" @confirm="timeBack" :start-year="startYear"
			:end-year="endYear"></u-picker>
		<u-tabbar :list="tabbar" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabbar: '',
				billData: {},
				year: new Date().toISOString().slice(0, 4),
				month: new Date().toISOString().slice(5, 7),
				monSpending: 0,
				monIncome: 0,
				monSurplus: 0,
				isShow: 0,
				params: {
					year: true,
					month: true,
					day: false,
					hour: false,
					minute: false,
					second: false
				},
				showTime: false,
				startYear: '',
				endYear: '',
				options: [{
						text: '收藏',
						style: {
							backgroundColor: '#007aff'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				]
			}
		},
		onLoad() {
			this.tabbar = this.$store.state.tabbar
			let start = new Date().toISOString().slice(0, 4),
				end = new Date().toISOString().slice(0, 4)
			start = parseInt(start) - 5
			end = parseInt(end) + 5
			this.startYear = start
			this.endYear = end
		},
		onShow() {
			this.sqlLite.openSql();
			this.sqlLite.selectSql(this.year, this.month).then(data => {
				if (this.isShow == data.length) {
					return
				} else {
					this.isShow = data.length;
					this.dataClassify(data)
				}
			})
			this.sqlLite.cloneSql();
		},
		methods: {
			click(index, index1) {
				console.log(index)
				if (index1 == 1) {
					this.list.splice(index, 1);
					this.$u.toast(`删除了第${index}个cell`);
				} else {
					this.list[index].show = false;
					this.$u.toast(`收藏成功`);
				}
			},
			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			open(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.list[index].show = true;
				this.list.map((val, idx) => {
					if (index != idx) this.list[idx].show = false;
				})
			},
			// 计算月数据
			calMonData() {
				this.monSpending = 0
				this.monIncome = 0
				this.monSurplus = 0
				this.billData.forEach(item => {
					this.monSpending += item.surplus
					this.monIncome += item.income
				})
				this.monSurplus = this.monIncome - this.monSpending
			},
			timeBack(e) {
				console.log(e)
				// this.btnTime = e.month + '-' + e.day
				this.year = e.year
				this.month = e.month
				this.sqlLite.openSql();
				this.sqlLite.selectSql(e.year, e.month).then(data => {
					if (this.isShow == data.length) {
						return
					} else {
						this.isShow = data.length;
						this.dataClassify(data)
					}
				})
				this.sqlLite.cloneSql();
			},
			//数据分类
			dataClassify(data) {
				var moth = [],
					flag = 0,
					list = data;
				var wdy = {
					title: '',
					body: '',
					surplus: 0,
					income: 0
				}
				for (var i = 0; i < list.length; i++) {
					var az = '';
					for (var j = 0; j < moth.length; j++) {
						if (moth[j].title == list[i]['time']) {
							flag = 1;
							az = j;
							break;
						}
					}
					if (flag == 1) {
						var ab = moth[az];
						list[i].istable ? ab.income += list[i].amount : ab.surplus += list[i].amount
						ab.body.push(list[i]);
						flag = 0;

					} else if (flag == 0) {
						wdy = {};
						wdy.title = list[i]['time'];
						// list[i]['istable'] ? wdy.income = list[i]['amount'] : wdy.surplus = list[i]['amount']
						wdy.surplus = list[i]['istable'] ? 0 : list[i]['amount']
						wdy.income = list[i]['istable'] ? list[i]['amount'] : 0
						wdy.body = new Array();
						wdy.body.push(list[i]);
						moth.push(wdy);
					}
				}
				this.billData = moth
				this.calMonData();
			}
		}
	}
</script>

<style lang="less" scoped>
	// icon
	@import '../../static/icon/iconfont.css';

	page,
	.content {
		height: 100%;
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background-color: #B1DDF1;
	}

	.title {
		height: 200rpx;
		width: 100%;
		background-color: #B1DDF1;
		display: flex;

		.titleCard {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
		}
	}

	.u-card-wrap {
		// background-color: $u-bg-color;
		padding: 1px;
	}

	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
	}

	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}

	.cardHead {
		display: flex;
		justify-content: space-between;
	}
</style>
