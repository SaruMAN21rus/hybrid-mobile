$data.EntityContext.extend("KetraDatabase", {
    tasks:          {type: $data.EntitySet, elementType: task},
    users:          {type: $data.EntitySet, elementType: user},
    task_statuses:  {type: $data.EntitySet, elementType: task_status},

    Agents: { type: $data.EntitySet, elementType: Agent },
    Tests: { type: $data.EntitySet, elementType: Test }
});