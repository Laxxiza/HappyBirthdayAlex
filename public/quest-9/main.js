const memes = [
    "Ты категорически не прав",
    "Ну опять же, ты не прав",
    "Ты все равно не прав",
    "В Кургане у нас не так!",
    "В Питере у нас не так!",
    "УБРАТ! УБРАТ ТАКИЕ МЫСЛИ ИЗ ГОЛОВЫ",
    "Критический провал!",
    "Критический успех... А нет, все равно ПРОВАЛ!",
];

$(document).ready(function () {
    const modal = new bootstrap.Modal(document.querySelector('#modal'));

    $(document).on('click', '#fail', function(){
        $(".modal-body p").text(memes[Math.floor(Math.random() * memes.length)]);
        modal.show();
    });

});
