(function(app){

    'use strict';

    app.taskModel = {

        dataSource: new kendo.data.DataSource({
            transport: {
                read: function(options) {
                    app.taskModel.read(app.db, options.success);
                },
                create: function(options) {
                    app.taskModel.create(app.db, options.data, options.success);
                },
                update: function(options) {
                    app.taskModel.update(app.db, options.data, options.success);
                },
                destroy: function(options) {
                    app.taskModel.destroy(app.db, options.data, options.success);
                }
            },
            schema: {
                model: {
                    id: "id",
                    fields: {
                        id: { editable: false },
                        name: { type:"text", validation: { required: true } },
                        checkbox: {type:"boolean"},
                        radio: {type:"text"}
                    }
                }
            },
            //pageSize: 10,
            //serverPaging: true
        }),

        read: function (db, callback) {
            app.db.transaction(function(tx) {
                tx.executeSql('SELECT id, name, checkbox, radio from taskModel', [], function(tx, result) {
                    callback(app.selectResultToArray(result));
                }, app.onDatabaseError);
            });
        },

        update: function (db, model, callback) {
            app.db.transaction(function(tx) {
                tx.executeSql('UPDATE taskModel SET name=? , checkbox=?, radio = ? WHERE id=?', 
                    [model.name, model.checkbox, model.radio, model.id], function() {
                    callback([]);
                }, app.onDatabaseError);
            });
        },

        create: function (db, model, callback) {
            app.db.transaction(function(tx) {
                tx.executeSql('INSERT INTO taskModel (name, checkbox, radio) VALUES(?, ?, ?)', 
                    [model.name, model.checkbox, model.radio], function(tx, result) {
                    callback([{ id: result.insertId, name: model.name, checkbox: model.checkbox, radio: model.radio}]);
                }, app.onDatabaseError);
            });
        },

        destroy: function (db, model, callback) {
            app.db.transaction(function(tx) {
                tx.executeSql('DELETE FROM taskModel WHERE id=?', 
                    [model.id], function() {
                    callback([]);
                }, app.onDatabaseError);
            });
        },
        createTable: function() {
            app.db.transaction(function (tx) {
                tx.executeSql("CREATE TABLE IF NOT EXISTS taskModel(id INTEGER PRIMARY KEY ASC, name TEXT, checkbox TEXT, radio TEXT)", [],
                    app.onDatabaseSuccess, app.onDatabaseError);
            });
        },
        dropTable: function() {
            app.db.transaction(function (tx) {
                tx.executeSql("DROP TABLE IF EXISTS taskModel", [],
                    app.onDatabaseSuccess, app.onDatabaseError);
            });
        }
    };

})(app); //pass in global namespace