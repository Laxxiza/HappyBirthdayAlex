$(document).ready(function () {
    var timeline = anime.timeline({
        easing: "linear",
        duration: 1000,
    });

    timeline.add({
        targets: "#name",
        opacity: [1, 0],
        duration: 2500,
    });

    timeline.add({
        targets: "#titles p",
        translateY: [
            { value: "100vh", duration: 0 }, // Начальная позиция за пределами экрана
            { value: "-100vh", duration: 10000, easing: "linear" }, // Конечная позиция за пределами экрана
        ],
        delay: anime.stagger(5000), // Задержка между анимациями абзацев
        offset: "-=500", // Начинает на 500мс раньше конца предыдущей анимации
        rotate: {
            duration: 5000,
            value: function (el, i, total) {
                if ($(el).attr("id") == "rotatible") {
                    return 360 * 6;
                }
            },
        },
        update: (anim) => {
            var progress = anim.progress; // Прогресс анимации от 0 до 1
            // Обновление масштаба только для элементов с классом .scale
            anim.animatables.forEach(function(animatable) {
                var targetElement = animatable.target;
                if ($(targetElement).attr("id") == "scalable" || $(targetElement).attr("id") == "rotatible") {
                    var currentScale = 1 + (2 * Math.sin(progress * Math.PI)); // Текущий масштаб
                    anime({
                        targets: targetElement,
                        scale: currentScale
                    });
                }
            });
        }
    });

    timeline.add({
        targets: "#success",
        translateY: [
            { value: "0vh", duration: 0 }, // Начальная позиция за пределами экрана
            { value: "0vh", duration: 2000, easing: 'spring(1, 80, 10, 0)' }, // Остановиться по середине экрана
        ],
        opacity: [
            { value: 1, duration: 1000, easing: "linear" }, // Появиться к концу движения
        ],
        offset: "-=10000", // Начинает одновременно с движением титров
    });
});
