(function(app){

    'use strict';

    app.currentDate = kendo.toString(new Date(), "dd.MM.yyyy");
    app.genetiveMonths = ["Января","Февраля","Марта","Апреля","Мая","Июня","Июля","Августа","Сентября","Октября","Ноября","Декабря",""];

})(app); //pass in global namespace