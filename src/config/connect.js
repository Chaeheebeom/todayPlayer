const connect = (function(){

    class dbConnect{

        constructor () {
            console.log('construtor');
            this.neo4j = require('neo4j-driver');
            this.uri = 'neo4j+s://0ace627b.databases.neo4j.io';
            this.user = 'neo4j';
            this.password = 'E-ew1WYf3RmRyd4Su-DjjCTSMql1_VlESvVxiXZ-Zzc';
            this.driver = this.neo4j.driver(this.uri, this.neo4j.auth.basic(this.user, this.password));
            this.session = this.driver.session({ database: 'neo4j' });
        }
    }

    const instance = new dbConnect();

    function init(){ 
        return instance
    }

    return {getInstacne:init}

})()

module.exports = connect;