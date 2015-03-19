(function(app){

    'use strict';

    var agent = $data.define("agent", {
        name: String,
        delay: Number,
        sum: Number,
        status: String
    })

    app.agentModel = agent.asKendoDataSource({ provider: 'webSql', databaseName:'KendoDB' });

    agent.readAll()
        .then(function (items) {
            if (items.length == 0) {
                return agent.addMany([{ name: 'наименование 1', delay: 1, sum: 123.22, status: 1 }, 
                                      { name: 'наименование 2', delay: 2, sum: 123.22, status: 2 }, 
                                      { name: 'наименование 3', delay: 3, sum: 123.22, status: 1 }, 
                                      { name: 'наименование 4', delay: 4, sum: 123.22, status: 2 },
                                      { name: 'наименование 5', delay: 5, sum: 123.22, status: 3 }, 
                                      { name: 'наименование 6', delay: 6, sum: 123.22, status: 3 }, 
                                      { name: 'наименование 7', delay: 7, sum: 123.22, status: 1 }, 
                                      { name: 'наименование 8', delay: 10, sum: 123.22, status: 2 }, 
                                      { name: 'наименование 9', delay: 10, sum: 123.22, status: 2 }, 
                                      { name: 'наименование 10', delay: 1, sum: 123.22, status: 3 }, 
                                      { name: 'наименование 11', delay: 2, sum: 123.22, status: 1 }, 
                                      { name: 'наименование 12', delay: 18, sum: 123.22, status: 1 }, 
                                      { name: 'наименование 13', delay: 1999, sum: 123.22, status: 3 }, 
                                      { name: 'наименование 14', delay: 12, sum: 123.22, status: 3 }, 
                                      { name: 'наименование 15', delay: 188, sum: 123.22, status: 1 }, 
                                      { name: 'наименование 16', delay: 178, sum: 123.22, status: 2 }, 
                                      { name: 'наименование 17', delay: 22, sum: 123.22, status: 3 }, 
                                      { name: 'наименование 18', delay: 69, sum: 123.22, status: 2 }, 
                                      { name: 'наименование 19', delay: 4444444, sum: 123.22, status: 2 }, 
                                      { name: 'наименование 20', delay: 2222, sum: 123.22, status: 1 }]);
            }
        });

})(app);