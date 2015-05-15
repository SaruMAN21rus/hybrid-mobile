$data.Entity.extend("task", {
    id:                     {type: "int"},
    parent:                 {type: "int"}, //Родительская задача
    id_user_initiator:      {type: "int"}, //Инициатор
    user_initiator_label:   {type: String}, //Инициатор
    dt:                     {type: Date}, //Дата создания
    label:                  {type: String}, //Текст задачи
    id_user_executor:       {type: "int"}, 
    user_executor_label:    {type: String}, //Исполнитель
    id_user_inspector:      {type: "int"},
    user_inspector_label:   {type: String}, //Контролер
    dt_from_plan:           {type: Date}, //Дата начала плановая
    dt_to_plan:             {type: Date}, //Дата окончания плановая
    dt_from_fact:           {type: Date}, //Дата начала фактическая
    dt_to_fact:             {type: Date}, //Дата окончания фактическая
    task_type_label:        {type: String}, //Тип
    id_task_status:         {type: "int"},
    task_status_label:      {type: String}, //Статус
    dt_log:                 {type: Date}, //Дата изменения записи
    uuid:                   {type: "guid", /*key: true,*/ computed: true }
});