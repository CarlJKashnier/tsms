var http = require('http')
var sanitize = require('sanitize-caja')
var url = require('url')
var dateformat = require('dateformat')

var server = http.createServer(function (req, res) {

var urlObj = url.parse(req.url, true);
var dateString = urlObj.href
var dateString = dateString.replace(/%20/g,' ');
var dateStringSan = sanitize(dateString.substring(1))
var parsedDate = new Date(Date.parse(dateStringSan))
//date strhing should be MMMM DD, YYYY or #
if (isNaN(dateStringSan)){
  if (parsedDate == "Invalid Date"){
    parsedDate = null
    unixOut = null
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({"unix": unixOut, "natural": parsedDate}));
    res.end();
    return
  } else {
//Is a valid Date
var natDate = dateformat(parsedDate, "mmmm d, yyyy")
var unixOut = Date.parse(dateStringSan)/1000;
res.writeHead(200, { 'Content-Type': 'application/json' });
res.write(JSON.stringify({"unix": unixOut, "natural": natDate}));
res.end();
return
}
}  else {
//Is a unix date code
var t = new Date(dateStringSan * 1000);
var natDate = dateformat(t, "mmmm d, yyyy")
//var natDate = dateformat(parsedDate, "mmmm d, yyyy")
res.writeHead(200, { 'Content-Type': 'application/json' });
res.write(JSON.stringify({"unix": dateStringSan, "natural": natDate}));
res.end();
return
}

});
server.listen(process.env.PORT || 8888);
