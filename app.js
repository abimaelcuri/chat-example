const http = require("./init/http.js");

module.exports = {
    start: function(){

        console.log("starting http");
        http(3000);
        console.log("http started.");

        
    },
    end: function(){
        process.end(0);
    }

}