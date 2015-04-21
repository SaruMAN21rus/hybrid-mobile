$data.Entity.extend("task_status", {
    id:                 {type: "int", key: true, computed: true },
    id_server:          {type: "int"},
    fake:               {type: "int", defaultValue: 0},
    label:              {type: String}, //Наименование
    tasks:              {type: Array, elementType: tasks, inverseProperty: "id_task_status"}, //Задачи
});

task_status.readAll()
        .then(function (items) {
            if (items.length === 0) {
                alert(0);
                /*return task_status.addMany([
                    { id: 1, label: 'Взять в работу'},
                    { id: 2, label: 'Выполнить'},
                    { id: 3, label: 'Подтвердить выполнение'},
                    { id: 4, label: 'Завершена'},
                    { id: 5, label: 'Отменена'}
                ]);*/
            }
        });