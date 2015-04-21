$data.Entity.extend("users", {
    id:                 {type: "int", key: true, computed: true },
    id_server:          {type: "int"},
    fake:               {type: "int", defaultValue: 0},
    tab_number:         {type: String}, //Табельный номер
    label:              {type: String}, //ФИО
    short_label:        {type: String}, //Фамилия И. О.
    f:                  {type: String}, //Фамилия
    i:                  {type: String}, //Имя
    o:                  {type: String}, //Отчество
    phone:              {type: String}, //Телефон
    phone_dig:          {type: String}, //Цифры телефона
    mobile_phone:       {type: String}, //Сотовый телефон
    mobile_phone_dig:   {type: String}, //Цифры сотового телефона
    mail:               {type: String}, //e-mail
    is_fired:           {type: Boolean}, //Пользователь уволен на данный момент
    login:              {type: String}, //Логин
    password:           {type: String}, //Пароль
    initiated_tasks:    {type: Array, elementType:"tasks", inverseProperty: "id_user_initiator"}, //Инициированные пользователем задачи
    exected_tasks:      {type: Array, elementType:"tasks", inverseProperty: "id_user_executor"}, //Исполняемые пользователдем задачи
    inspected_tasks:    {type: Array, elementType:"tasks", inverseProperty: "id_user_inspector"} //Контролируемые пользователем задачи
});