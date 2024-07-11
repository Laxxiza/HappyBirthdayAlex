$(document).ready(function () {
    $(document).on('click', '#fail', function(){
        const sucBut = $("#hidebut");
        let opacity = sucBut.css("opacity");
        console.log(opacity);
        opacity = (parseFloat(opacity)+0.05).toFixed(10);
        console.log(opacity);
        sucBut.css("opacity", opacity);
    });
});