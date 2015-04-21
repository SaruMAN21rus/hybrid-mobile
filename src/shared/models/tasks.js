$data.Entity.extend("tasks", {
    id:                 {type: "int", key: true, computed: true },
    id_server:          {type: "int"},
    fake:               {type: "int", defaultValue: 0},
    parent:             {type: "tasks", inverseProperty: "childs", keys: ["parent"]}, //Родительская задача
    childs:             {type: Array, elementType:"tasks", inverseProperty: "parent"}, //Дочерние задачи
    id_user_initiator:  {type: "users", inverseProperty: "initiated_tasks", keys: ["id_user_initiator"]}, //Инициатор
    dt:                 {type: Date}, //Дата создания
    label:              {type: String}, //Текст задачи
    id_user_executor:   {type: "users", inverseProperty: "exected_tasks", keys: ["id_user_executor"]}, //Исполнитель
    id_user_inspector:  {type: "users", inverseProperty: "inspected_tasks", keys: ["id_user_inspector"]}, //Контролер
    dt_from_plan:       {type: Date}, //Дата начала плановая
    dt_to_plan:         {type: Date}, //Дата окончания плановая
    dt_from_fact:       {type: Date}, //Дата начала фактическая
    dt_to_fact:         {type: Date}, //Дата окончания фактическая
    //id_task_type:       {type: "task_types"}, //Тип
    id_task_status:     {type: "task_status", inverseProperty: "tasks", keys: ["id_task_status"]} //Статус
});