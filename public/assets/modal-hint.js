$(document).ready(function () {
    const socket = io();
    let serverData = {};

    socket.on('initial data', (data) => {
        console.log('Initial data received:', data);
        serverData = data;

        socket.emit('quest update', { id: serverData.current_quest_index, value: "started" });
    });



    const modal = new bootstrap.Modal(document.querySelector("#hint-modal"));
    const myModalEl = document.getElementById("hint-modal");
    let pTag = $(".hint-text");
    let imgDiv = $(".hint-img");
    let imgTag = $("img");

    myModalEl.addEventListener("hidden.bs.modal", (event) => {
        pTag.addClass("fade");
        pTag.text("");
        imgDiv.addClass("fade");
        imgDiv.css("display", "none");
        imgTag.attr("src", "");
    });

    $(document).on("click", "#success", function () {
        let pTag = $(".modal-body p");
        pTag.removeClass("fade");

        imgTag.attr("src", `img/places/${serverData.current_quest_index}.jpg`);
        imgDiv.removeClass("fade");
        imgDiv.css("display", "block");

        modal.show();

        socket.emit('quest update', { id: serverData.current_quest_index, value: "finished" });
    });
});
