(function(app){

    app.addVocData = function() {
        //Статусы задач
        task_status.readAll()
            .then(function (items) {
                if (items.length === 0) {
                    return task_status.addMany([
                        { id: 1, label: 'Взять в работу'},
                        { id: 2, label: 'Выполнить'},
                        { id: 3, label: 'Подтвердить выполнение'},
                        { id: 4, label: 'Завершена'},
                        { id: 5, label: 'Отменена'}
                    ]);
                }
            });
    }       
})(app);