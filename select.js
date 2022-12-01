const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

let sql = `
select device.name, device.type from company inner join device on company.company_id=device.company_id where company.id=1 AND device.type ="マウス";
`

db.serialize( () => {
	db.all( sql, (error, row) => {
		if(error) {
			console.log('Error: ', error );
			return;
		}
		for( let data of row ) {
			console.log( data.id + ' : ' + data.name + ' : ' + data.company_id);
		}
	});
});
