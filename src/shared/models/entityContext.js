$data.EntityContext.extend("KetraDatabase", {
    tasks:          {type: $data.EntitySet, elementType: task},
    users:          {type: $data.EntitySet, elementType: user},
    task_statuses:  {type: $data.EntitySet, elementType: task_status},
    settings:       {type: $data.EntitySet, elementType: settings},

    Agents: { type: $data.EntitySet, elementType: Agent },
    Tests: { type: $data.EntitySet, elementType: Test }
});