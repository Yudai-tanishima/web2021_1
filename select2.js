const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

let sql = `
select company.name, device.name as name2, device.type 
from company inner join device 
on company.id=device.id
`

db.serialize( () => {
	db.all( sql, (error, row) => {
		if(error) {
			console.log('Error: ', error );
			return;
		}
		for( let data of row ) {
			console.log( data.name + ' : ' + data.name2 + ' : ' + data.type + ' : ' + data.company_id);
		}
	});
});
