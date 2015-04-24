$data.Entity.extend("task", {
    id:                 {type: "int", key: true, computed: true },
    server_id:          {type: "int"},
    fake:               {type: "int", defaultValue: 0},
    parent_id:          {type: "int"}, //Родительская задача
    user_initiator_id:  {type: "int"}, //Инициатор
    dt:                 {type: Date}, //Дата создания
    label:              {type: String}, //Текст задачи
    user_executor_id:   {type: "int"}, //Исполнитель
    user_inspector_id:  {type: "int"}, //Контролер
    dt_from_plan:       {type: Date}, //Дата начала плановая
    dt_to_plan:         {type: Date}, //Дата окончания плановая
    dt_from_fact:       {type: Date}, //Дата начала фактическая
    dt_to_fact:         {type: Date}, //Дата окончания фактическая
    task_type_id:       {type: "int"}, //Тип
    task_status_id:     {type: "int"}, //Статус
    synchronized:       {type: Boolean, defaultValue: true}
});