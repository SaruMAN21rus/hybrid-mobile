$data.Entity.extend("Task", {
    id: { type: "int", key: true, computed: true },
    name: {type: String},
    checkbox: {type: Boolean},
    radio: {type: String}
});