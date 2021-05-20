export default {
	// 打开数据库
	openSql() {
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
		plus.sqlite.executeSql({
			name: 'KpData',
			sql: 'create table if not exists database("id" INTEGER PRIMARY KEY AUTOINCREMENT,"classify" CHAR(10),"amount" DECIMAL(18,2) NOT NULL,"time" CHAR(60),"info" CHAR(60),"istable" INT(1))',
			success: function(e) {
				console.log("cg")
			},
			fail: function(e) {
				console.log("sb", e)
			}
		})
	},
	//添加数据
	insertData(data, isTable) {
		console.log(data, isTable)
		plus.sqlite.executeSql({
			name: 'KpData',
			sql: 'insert into database(classify,amount,time,info,istable) values("' + data.classify + '","' +
				data.amount + '","' + data.time + '","' + data.info + '","' + isTable + '")',
			success: function(e) {
				console.log('executeSql success!');
			},
			fail: function(e) {
				console.log('executeSql failed: ' + JSON.stringify(e));
			}
		});
	},
	//查询数据库
	selectSql() {
		plus.sqlite.selectSql({
			name: 'KpData',
			sql: 'select * from database',
			success: function(data) {
				console.log('selectSql success: ');
				for (var i in data) {
					console.log(data);
				}
			},
			fail: function(e) {
				console.log('selectSql failed: ' + JSON.stringify(e));
			}
		});
	}
}
