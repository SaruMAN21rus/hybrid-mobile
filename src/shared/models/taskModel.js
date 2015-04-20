$data.Entity.extend("Task", {
    id: { type: "int", key: true, computed: true },
    name: {type: String},
    datePlan: {type: Date},
    dateFact: {type: Date},
    status: {type: String}
});