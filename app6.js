const express = require("express");
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }));


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

app.get("/com/:id", (req, res) => { 
  db.serialize( () => { 
    console.log(req.params)
     db.all("select device.name, device.type from company inner join device on company.company_id=device.company_id where company.id=" + req.params.id + ";", (error, row) =>
       {  if( error ) { 
       res.render('show', {mes:"エラーです"}); 
     } 
console.log(row);                                                 res.render('dev', {data:row}); 
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
 res.redirect('/select');
    }); 
 }); 
 console.log(req.body);
 }); 

app.get("/db", (req, res) => {
    db.serialize( () => {
        db.all("select id, 都道府県, 人口 from example;", (error, row) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            res.render('select', {data:row});
        })
    })
})

app.get("/company", (req, res) => {
    //console.log(req.query.pop);    // ①
    db.serialize( () => {
        db.all("select id, name from company;", (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            //console.log(data);    // ③
            res.render('test', {data:data});
        })
    })
})

app.get("/top", (req, res) => {
    //console.log(req.query.pop);    // ①
    let desc = "";
    if( req.query.desc ) desc = " desc";
    let sql = "select id, 都道府県, 人口 from example order by 人口" + desc + " limit " + req.query.pop + ";";
    //console.log(sql);    // ②
    db.serialize( () => {
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            //console.log(data);    // ③
            res.render('select', {data:data});
        })
    })
})
app.use(function(req, res, next) {
  res.status(404).send('ページが見つかりません');
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
