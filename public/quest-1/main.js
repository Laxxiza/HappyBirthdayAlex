$(document).ready(function () {
    $(document).on('click', '#fail', function(){
        const sucBut = $("#success");
        let opacity = parseFloat(sucBut.css("opacity"));
        console.log(opacity);
        opacity = opacity + 0.05;
        console.log(opacity.toFixed(10));
        sucBut.css("opacity", opacity);
    });
});
