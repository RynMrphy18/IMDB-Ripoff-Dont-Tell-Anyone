$("#trash").droppable({
    accept: "  ",
    tolerance: "touch",
    drop: function(event, ui) {
    ui.draggable.remove();
    },
    // over: function(event, ui) {

    // },
    // out: function(event, ui) {

    // }
});