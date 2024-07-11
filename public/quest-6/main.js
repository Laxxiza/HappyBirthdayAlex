$(document).ready(function () {
    const modal = new bootstrap.Modal(document.querySelector('#modal'));

    var textWrappers = document.querySelectorAll(".txt");
        textWrappers.forEach((textWrapper, idx) => {
        if (textWrapper.textContent) {
            textWrapper.innerHTML = textWrapper.textContent.replace(
            /([^\x00-\x80]|\w)/g,
            `<span class='letters'>$&</span>`,
            );
        }
        });

    $(".container-cigarette").click(function () {
        let txt = $(".txt");
        let txtLen = $(txt[0]).children().length
        console.log(txtLen);
        if(txtLen < 3){
            modal.show();
        }
        txt.each((i,e) => {
            let last = $(e).children().last();
            last.attr('hidden', true).animate({width: 0}, 300, function(){
                last.remove();
            })}
        )
    });
});


