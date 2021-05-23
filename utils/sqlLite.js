export default {
	// 打开数据库
	openSql() {
		return new Promise((resolve, reject) => {
			plus.sqlite.openDatabase({
				name: 'KpData',
				path: '_doc/KpData.db',
				success: function(e) {
					console.log('openDatabase success!');
				},
				fail: function(e) {
					console.log('openDatabase failed: ' + JSON.stringify(e));
				}
			});
		})
	},

	// 关闭数据库
	cloneSql() {
		plus.sqlite.closeDatabase({
			name: 'KpData',
			success: function(e) {
				console.log('closeDatabase success!');
			},
			fail: function(e) {
				console.log('closeDatabase failed: ' + JSON.stringify(e));
			}
		});
	},
	//创建数据库表
	createTable() {
		return new Promise((resolve, reject) => {
			plus.sqlite.executeSql({
				name: 'KpData',
				sql: 'create table if not exists database("id" INTEGER PRIMARY KEY AUTOINCREMENT,"classify" CHAR(10),"amount" DECIMAL(18,2) NOT NULL,"time" CHAR(60),"timeyear" CHAR(4),"timemonth" CHAR(2),"info" CHAR(60),"istable" INT(1),"icon" CHAR(20))',
				success: function(e) {
					console.log(e)
				},
				fail: function(e) {
					console.log(e)
				}
			})
		})
	},
	//添加数据
	insertData(data, isTable) {
		console.log(data, isTable)
		if(data.amount == 0) return;
		return new Promise((resolve, reject) => {
			plus.sqlite.executeSql({
				name: 'KpData',
				sql: 'insert into database(classify,amount,time,timeyear,timemonth,info,istable,icon) values("' + data
					.classify + '","' +
					data.amount + '","' + data.time + '","'+ data.timeyear + '","'+ data.timemonth + '","' + data.info + '","' + isTable + '","' + data.icon + '")',
				success: function(e) {
					console.log('executeSql success!');
				},
				fail: function(e) {
					console.log('executeSql failed: ' + JSON.stringify(e));
				}
			});
		})
	},
	//查询数据库
	selectSql(year,month) {
		return new Promise((resolve, reject) => {
			plus.sqlite.selectSql({
				name: 'KpData',
				sql: 'select * from database where timeyear ="' + year + '" and timemonth = "' + month + '"',
				success: function(data) {
					console.log(data)
					resolve(data);
					// return data
				},
				fail: function(e) {
					console.log('selectSql failed: ' + JSON.stringify(e));
				}
			});
		})
	}
}
