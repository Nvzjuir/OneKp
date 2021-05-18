import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		tabbar: [{
				iconPath: "/static/tabbar/statistics.png",
				selectedIconPath: "/static/tabbar/statistics_selected.png",
				text: '1',
				// count: 2,
				// isDot: true,
				pagePath: "/pages/statistics/index"
			},
			{
				iconPath: "/static/tabbar/add.png",
				selectedIconPath: "/static/tabbar/add_selected.png",
				text: '2',
				midButton: true,
				pagePath: "/pages/add/index"
			},
			{
				iconPath: "/static/tabbar/my.png",
				selectedIconPath: "/static/tabbar/my_selected.png",
				text: '3',
				pagePath: "/pages/my/index"
			},
		]
	},
	mutations: {},
	actions: {}
})
export default store
