<html>
<head>
  <meta charset="utf-8">
  <title>Show message</title>
</head>
<body>
  <h2>会社名rrrr</h2>
  <table id="data">
      <% for( let row of data ) { %>
        <tr>
          <td><%= row.type %></td>
            <td><%= row.name %></td>
        </tr>
      <% } %>
  </table>

  
   <button onclick="location.href='/com'">戻る</button>
  <button onclick="location.href='/public/insert.html'">追加</button>
</body>
</html>
        `select device.name, device.type from company inner join device on company.company_id=device.company_id where company.id="` + req.params.id + `" AND device.type ="マウス";
 `