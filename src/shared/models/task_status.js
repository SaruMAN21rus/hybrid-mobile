$data.Entity.extend("task_status", {
    id:                 {type: "int", key: true, computed: true },
    server_id:          {type: "int"},
    fake:               {type: "int", defaultValue: 0},
    label:              {type: String}, //Наименование
});