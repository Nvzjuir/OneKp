<template>
	<view class="content">
		<!-- #ifdef APP-PLUS || H5 -->
		<view @click="echarts.onClick" :prop="option" :change:prop="echarts.updateEcharts" id="echarts" class="echarts">
		</view>
		<!-- #endif -->
		<!-- #ifndef APP-PLUS || H5 -->
		<view>非 APP、H5 环境不支持</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				option: {
					tooltip: {
						trigger: 'item'
					},
					legend: {
						top: '5%',
						left: 'center',
						itemGap: 20
					},
					series: [{
						// name: '访问来源',
						type: 'pie',
						radius: ['40%', '70%'],
						avoidLabelOverlap: false,
						itemStyle: {
							borderRadius: 10,
							borderColor: '#fff',
							borderWidth: 2
						},
						label: {
							show: false,
							position: 'center'
						},
						emphasis: {
							label: {
								show: true,
								fontSize: '20',
								fontWeight: 'bold',
								backgroundColor: 'red'
							}
						},
						labelLine: {
							show: false
						},
						data: []
					}]
				}
			}
		},
		mounted() {
			this.sqlLite.openSql();
			this.sqlLite.selectSql('2021', '05').then(data => {
				this.dataClassify(data)
			})
			this.sqlLite.cloneSql();
		},
		methods: {
			onViewClick(options) {
				console.log(options)
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
						if (moth[j].title == list[i]['classify']) {
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
						wdy.title = list[i]['classify'];
						// list[i]['istable'] ? wdy.income = list[i]['amount'] : wdy.surplus = list[i]['amount']
						wdy.surplus = list[i]['istable'] ? 0 : list[i]['amount']
						wdy.income = list[i]['istable'] ? list[i]['amount'] : 0
						wdy.body = new Array();
						wdy.body.push(list[i]);
						moth.push(wdy);
					}
				}
				const chartdata = this.option.series[0].data
				moth.forEach(item => {
					chartdata.push({
						name: item.title,
						value: item.surplus
					})
				})
			}
		}
	}
</script>

<script module="echarts" lang="renderjs">
	let myChart
	export default {
		mounted() {
			if (typeof window.echarts === 'function') {
				this.initEcharts()
			} else {
				// 动态引入较大类库避免影响页面展示
				const script = document.createElement('script')
				// view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
				script.src = 'static/echarts.js'
				script.onload = this.initEcharts.bind(this)
				document.head.appendChild(script)
			}
		},
		methods: {
			initEcharts() {
				myChart = echarts.init(document.getElementById('echarts'))
				// 观测更新的数据在 view 层可以直接访问到
				myChart.setOption(this.option)
			},
			updateEcharts(newValue, oldValue, ownerInstance, instance) {
				// 监听 service 层数据变更
				myChart.setOption(newValue)
			},
			onClick(event, ownerInstance) {
				// 调用 service 层的方法
				ownerInstance.callMethod('onViewClick', {
					test: 'test'
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.echarts {
		margin-top: 100px;
		width: 100%;
		height: 500px;
	}
</style>
