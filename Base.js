const express = require('express');
const fs = require('fs')
const serverApp = express();
var allowCors = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // 新增加cors 运行的请求头
    res.header('Access-Control-Allow-Headers', 'Content-Type,lang,sfopenreferer ');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
};
serverApp.use(allowCors);//使用跨域中间件
serverApp.use(express.urlencoded());
serverApp.use(express.json());
serverApp.use(express.text());
var port = 8081;

function getLastInfo(res) {
    fs.readFile('./Record.txt', 'utf8', (err, result) => {
        if (err) { return console.log('历史记录读取失败！') }
        res.send(result);
    })
}
var addRecent = function (recordInfo) {
    fs.writeFile('./Record.txt', recordInfo, (err) => {
        if (err) {
            return console.log('写入失败！')
        }
        console.log('计算结果写入成功!');
    })
}
serverApp.get('/api/storage', (err, res) => {
    getLastInfo(res);
})
serverApp.post('/api/addStorage', (req, res) => {
    let recordInfo = req.body;
    addRecent(recordInfo);
    res.send('ok');
})
serverApp.listen(port, () => { console.log(`服务器开启成功！端口号:${port}.`) });
