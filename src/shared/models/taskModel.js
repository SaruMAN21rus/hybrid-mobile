(function(app){

    'use strict';

    var task = $data.define("task", {
        name: String,
        checkbox: Boolean,
        radio: String
    });

   app.taskModel = task.asKendoDataSource({databaseName:'KendoDB' });

   task.readAll()
        .then(function (items) {
            if (items.length === 0) {
                return task.addMany([{ name: 'наименование 1', checkbox: true, radio: 'Свойство 1'}, 
                                     { name: 'наименование 2', checkbox: true, radio: 'Свойство 3'}, 
                                     { name: 'наименование 3', checkbox: false, radio: 'Свойство 1'},
                                     { name: 'наименование 4', checkbox: true, radio: 'Свойство 2'},
                                     { name: 'наименование 5', checkbox: false, radio: 'Свойство 1'}, 
                                     { name: 'наименование 6', checkbox: false, radio: 'Свойство 3'},
                                     { name: 'наименование 7', checkbox: false, radio: 'Свойство 3'}]);
            }
        });

})(app); //pass in global namespace