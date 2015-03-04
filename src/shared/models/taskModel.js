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
                        name: { type:"text", validation: { required: true } }
                    }
                }
            }
        }),

        read: function (db, callback) {
            app.db.transaction(function(tx) {
                tx.executeSql('SELECT id, name from taskModel', [], function(tx, result) {
                    callback(app.selectResultToArray(result));
                }, app.onDatabaseError);
            });
        },

        update: function (db, model, callback) {
            app.db.transaction(function(tx) {
                tx.executeSql('UPDATE taskModel SET name=? WHERE id=?', 
                    [model.name, model.id], function(tx, result) {
                    callback([]);
                }, app.onDatabaseError);
            });
        },

        create: function (db, model, callback) {
            app.db.transaction(function(tx) {
                tx.executeSql('INSERT INTO taskModel (name) VALUES(?)', 
                    [model.name], function(tx, result) {
                    callback([{ id: result.insertId, name: model.name }]);
                }, app.onDatabaseError);
            });
        },

        destroy: function (db, model, callback) {
            app.db.transaction(function(tx) {
                tx.executeSql('DELETE FROM taskModel WHERE id=?', 
                    [model.id], function(tx, result) {
                    callback([]);
                }, app.onDatabaseError);
            });
        },
        createTable: function() {
            app.db.transaction(function (tx) {
                tx.executeSql("CREATE TABLE IF NOT EXISTS taskModel(id INTEGER PRIMARY KEY ASC, name TEXT)", [],
                    app.onDatabaseSuccess, app.onDatabaseError);
            });
        }
    }

})(app); //pass in global namespace