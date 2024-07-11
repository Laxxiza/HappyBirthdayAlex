const memes = [
    "Ты категорически не прав",
    "Ну опять же, ты не прав",
    "Ты все равно не прав",
    "В Кургане у нас не так!",
    "В Питере у нас не так!",
    "УБРАТ! УБРАТ ТАКИЕ МЫСЛИ ИЗ ГОЛОВЫ",
    "Критический провал!",
    "Критический успех... А нет, все равно ПРОВАЛ!",
    "ГЛУБОКО",
    "ПОВЕРХНОСТНО",
    "Одна голова хорошо, а вот сиамские близнецы ЛУЧШЕ",
];

const imgmeme = ["img/memes/1.jpg","img/memes/2.jpg","img/memes/3.jpg"];

$(document).ready(function () {
    const modal = new bootstrap.Modal(document.querySelector("#meme-modal"));
    const myModalEl = document.getElementById('meme-modal');
    let pTag = $(".meme-text");
    let imgDiv = $(".meme-img");
    let imgTag = $("img");

    myModalEl.addEventListener("hidden.bs.modal", (event) => {
        pTag.addClass("fade");
        pTag.text("");
        imgDiv.addClass("fade");
        imgDiv.css("display", "none");
        imgTag.attr("src", "");
    });

    $(document).on("click", "#fail", function () {
        if (Math.floor(Math.random() * 2) == 0) {
            pTag.text(memes[Math.floor(Math.random() * memes.length)]);
            pTag.removeClass("fade");
        } else {
            imgTag.attr("src", imgmeme[Math.floor(Math.random() * imgmeme.length)]);
            imgDiv.removeClass("fade");
            imgDiv.css("display", "block");
        }
        modal.show();
    });
});
