$data.Entity.extend("user", {
    id:         {type: 'int'}, //Идентификатор     
    label:      {type: String}, //ФИО
    short_label:{type: String}, //Фамилия И. О.
    dt_log:     {type: Date}, //Дата изменения записи
    uuid:       {type: "guid", key: true, computed: true }
});