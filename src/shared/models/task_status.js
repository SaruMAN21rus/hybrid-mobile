$data.Entity.extend("task_status", {
    id:                 {type: "int", key: true, computed: true },
    id_server:          {type: "int"},
    fake:               {type: "int", defaultValue: 0},
    label:              {type: String}, //������������
    tasks:              {type: Array, elementType: tasks, inverseProperty: "id_task_status"}, //������
});

task_status.readAll()
        .then(function (items) {
            if (items.length === 0) {
                alert(0);
                /*return task_status.addMany([
                    { id: 1, label: '����� � ������'},
                    { id: 2, label: '���������'},
                    { id: 3, label: '����������� ����������'},
                    { id: 4, label: '���������'},
                    { id: 5, label: '��������'}
                ]);*/
            }
        });