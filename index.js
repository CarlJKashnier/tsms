var http = require('http')
var sanitize = require('sanitize-caja')
var url = require('url')
var dateformat = require('dateformat')

var server = http.createServer(function (req, res) {

var urlObj = url.parse(req.url, true);
var dateString = urlObj.href
var dateString = dateString.replace(/%20/g,' ');
var dateStringSan = sanitize(dateString.substring(1))
var parsedDate = new Date(Date.parse(dateStringSan));
var unixOut = Date.parse(dateStringSan)


if (isNaN(dateStringSan)) {
if (parsedDate == "Invalid Date" || unixOut === "NaN"){
  parsedDate = null
  unixOut = null
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify({"unix": unixOut, "natural": parsedDate}));
  res.end();
  return
}else{
  var natDate = dateformat(unixOut, "mmmm d, yyyy")
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify({"unix": unixOut, "natural": natDate}));
  res.end();
  return
}
} else {
  var natDate = dateformat(unixOut, "mmmm d, yyyy")
unixOut = dateStringSan
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify({"unix": unixOut, "natural": natDate}));
  res.end();
  return
}
});
server.listen(process.env.PORT || 8888);
