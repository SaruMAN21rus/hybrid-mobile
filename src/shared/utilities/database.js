(function(app){

    'use strict';

    app.openDatabase = function () {
        var dbSize = 20 * 1024 * 1024; // 20MB
        // open database
        app.db = openDatabase("EludiaDb", "1.0", "Eludia DataBase", dbSize);
    },

    app.onDatabaseError = function (transaction, error) {
        alert('Ошибка: ' + error.message);
    },

    app.onDatabaseSuccess = function (transaction, resultSet) {
        console.log('Operation completed successfully');
    }
})(app);