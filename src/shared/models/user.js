$data.Entity.extend("user", {
    id:                 {type: "int", key: true, computed: true },
    label:              {type: String}, //ФИО
    short_label:        {type: String}, //Фамилия И. О.
    dt_sync:            {type: Date} //Дата синхронизации
});