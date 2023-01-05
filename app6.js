const express = require("express");
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }));
let a;


app.get("/", (req, res) => {
  const message = "格会社ごとの人気のゲーミングデバイス一覧です";
res.render('show', {mes:message});
});

app.get("/com", (req, res) => {
  db.serialize( () => {
        db.all("select id, name from company;", (error, row) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            res.render('com', {data:row});
        })
    })
});

app.get("/devall", (req, res) => {
  db.serialize( () => {
        db.all("select id, type from device where company_id = 8 ;", (error, row) => {
          if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            res.render('devall', {data:row});
        })
    })
});


app.get("/search", (req, res) => { 
  db.serialize( () => { 
    console.log(req.query.type)
     db.all("select company.id, device.name, device.type from company inner join device on company.company_id=device.company_id where company.id=" + req.query.id + " AND device.type ='" + req.query.type 
  + "';", (error, row) =>
       {  if( error ) { 
       res.render('show', {mes:"エラーです"}); 
     }
      //console.log(row);                                                 
        res.render('dev', {data:row}); 
 }) 
 }) 
}) 

app.get("/com/:id", (req, res) => { 
  db.serialize( () => { 
    //console.log(req.params)
     db.all("select company.id, device.name, device.type from company inner join device on company.company_id=device.company_id where company.id=" + req.params.id + ";", (error, row) =>
       {  if( error ) { 
       res.render('show', {mes:"エラーです"}); 
     } 
        let a = req.params.id;
//console.log(row);                                                 
        res.render('dev', {data:row}); 
        a = req.params.id
 }) 
 }) 
}) 

app.get("/devall/:type", (req, res) => { 
  db.serialize( () => { 
    //console.log(req.params)
     db.all("select company.id, device.name, device.type from company inner join device on company.company_id=device.company_id where device.type='" + req.params.type + "';", (error, row) =>
       {  if( error ) { 
       res.render('show', {mes:"エラーです"}); 
     } 
        let a = req.params.id;
//console.log(row);                                                 
        res.render('type', {data:row}); 
        a = req.params.id
 }) 
 }) 
}) 

app.post("/insert", (req, res) => { 
 let sql = ` 
insert into device ("type", "name", "company_id" ) values ("` + req.body.type + `", "` + req.body.name + `", ` + req.body.company_id + `); ` 
   console.log(sql); 
  db.serialize( () => { 
    db.run( sql, (error, row) => { 
      console.log(error); 
      if(error) { 
        res.render('show', {mes:"エラーです"}); 
      } 
      res.render('show',　{mes:成功});
    }); 
  }); 
  console.log(req.body);
 }); 

app.use(function(req, res, next) {
  res.status(404).send('ページが見つかりません');
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
