(function(app){

    'use strict';

    app.selectResultToArray = function (result) {
        var length = result.rows.length;
       
        var data = new Array(length);
  
        for (var i = 0; i < length; i++) {
            data[i] = result.rows.item(i);
        }
  
        return data;
    }
})(app);