(function(app){

    'use strict';
    
    var date = new Date();

    app.currentDate = ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear();

})(app); //pass in global namespace