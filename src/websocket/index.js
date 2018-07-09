const config = require('config');
const ws = require('nodejs-websocket');


module.exports = ()=>{
    console.log("0000")
    console.log(config.app);
    let server = ws.createServer(function(conn){
        console.log("一个新的连接！！");
        conn.on("text",function(str){
            console.log("接收到："+str);
            conn.sendText("已经接收到信息！！！");
        })
        conn.on("close",function(code,reason){
            console.log("连接已经断开！！")
        })
        conn.on("error",function(){
            console.log("发生错误！！！")
        })
    }).listen(9091)
  
};