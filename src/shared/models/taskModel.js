(function(app){

    'use strict';

    var task = $data.define("task", {
        name: String,
        checkbox: Boolean,
        radio: String
    })

   app.taskModel = task.asKendoDataSource({ provider: 'webSql', databaseName:'KendoDB' });

})(app); //pass in global namespace