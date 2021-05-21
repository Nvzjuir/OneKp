export default {
	// 打开数据库
	openSql() {
		return new Promise((resolve, reject) => {
			plus.sqlite.openDatabase({
				name: 'KpData',
				path: '_doc/KpData.db',
				success: function(e) {
					resolve('openDatabase success!');
				},
				fail: function(e) {
					reject('openDatabase failed: ' + JSON.stringify(e));
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
				sql: 'create table if not exists database("id" INTEGER PRIMARY KEY AUTOINCREMENT,"classify" CHAR(10),"amount" DECIMAL(18,2) NOT NULL,"time" CHAR(60),"info" CHAR(60),"istable" INT(1))',
				success: function(e) {
					resolve("cg")
				},
				fail: function(e) {
					reject("sb", e)
				}
			})
		})
	},
	//添加数据
	insertData(data, isTable) {
		console.log(data, isTable)
		return new Promise((resolve, reject) => {
			plus.sqlite.executeSql({
				name: 'KpData',
				sql: 'insert into database(classify,amount,time,info,istable) values("' + data
					.classify + '","' +
					data.amount + '","' + data.time + '","' + data.info + '","' + isTable + '")',
				success: function(e) {
					resolve('executeSql success!');
				},
				fail: function(e) {
					reject('executeSql failed: ' + JSON.stringify(e));
				}
			});
		})
	},
	//查询数据库
	selectSql() {
		return new Promise((resolve, reject) => {
			plus.sqlite.selectSql({
				name: 'KpData',
				sql: 'select * from database',
				success: function(data) {
					resolve(data);
					// return data
				},
				fail: function(e) {
					reject('selectSql failed: ' + JSON.stringify(e));
				}
			});
		})
	}
}
