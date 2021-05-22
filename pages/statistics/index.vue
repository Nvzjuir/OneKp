<template>
	<view class="content">
		<view class="title">
			<view class="titleCard" style="color: #FFBB33;">
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
		<u-card :title="'支出' +cardItem.sun" :sub-title="cardItem.title" v-for="(cardItem,index) in billData"
			:key="index">
			<view class="" slot="body" v-for="(item,index) in cardItem.body" :key="index">
				<view class="u-body-item u-flex u-border-bottom u-row-between u-p-t-0">
					<image
						src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg"
						mode="aspectFill"></image>
					<view class="u-body-item-title u-line-2">{{item.classify}}</view>
					<view>
						{{item.istable?'+'+item.amount:'-'+item.amount}}
					</view>
				</view>
			</view>
		</u-card>
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
				title: '素胚勾勒出青花，笔锋浓转淡',
				subTitle: '2020-05-15',
				billDataLength: 0
			}
		},
		onLoad() {
			this.tabbar = this.$store.state.tabbar
		},
		onShow() {
			this.sqlLite.selectSql().then(data => {
				console.log(data)
				this.test(data)
				// this.billData = data.reduce((billData, item, index) => {
				// 	console.log(index)
				// 	billData[item.time] = billData[item.time] ? [...billData[item.time], item] : [item];
				// 	return billData;
				// }, {})
				console.log(list)
				this.billDataLength = Object.keys(this.billData).length
				if (this.billData.length == data.length) {
					return;
				} else {
					this.billData = data;
					this.calMonData()
				}
			})
		},
		methods: {
			// 计算月数据
			calMonData() {
				this.monSpending = 0
				this.monIncome = 0
				this.monSurplus = 0
				this.billData.forEach(item => {
					this.monSpending += item.amount
				})
				this.monSurplus = this.monIncome - this.monSpending
			},
			test(data) {
				var moth = [],
					flag = 0,
					list = data;
				var wdy = {
					title: '',
					body: '',
					sun: 0
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
						ab.body.push(list[i]);
						ab.sun += list[i].amount
						flag = 0;

					} else if (flag == 0) {
						wdy = {};
						wdy.title = list[i]['time'];
						wdy.sun = list[i]['amount']
						wdy.body = new Array();
						wdy.body.push(list[i]);
						moth.push(wdy);
					}
				}
				console.log(moth)
				this.billData = moth
			}
		}
	}
</script>

<style lang="less" scoped>
	page,
	.content {
		height: 100%;
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
</style>
