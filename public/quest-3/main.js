$(document).ready(function () {
    //const rollButton = $('#rollButton');
    let countRolls = 0;
    const modal = new bootstrap.Modal(document.querySelector('#modal'));
    const myModalEl = document.getElementById('modal');
    const rollNum = $("#roll-num");
    const rollText = $("#roll-text");

    myModalEl.addEventListener("hidden.bs.modal", (event) => {
        rollText.text("Не повезло, не повезло");;
    });

    const succ = $("#success");
    const fail = $("#fail");

    let scene, camera, renderer, icosaedr;

    function init() {
        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0x1D1F20 );
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        const geometry = new THREE.IcosahedronGeometry(1, 0);
        const material = new THREE.MeshNormalMaterial({ wireframe: true });
        icosaedr = new THREE.Mesh(geometry, material);
        scene.add(icosaedr);

        camera.position.z = 5;

        animate();
    }

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    function getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    document.getElementById('rollButton').addEventListener('click', function() {
        anime({
            targets: icosaedr.rotation,
            y: [icosaedr.rotation.y, icosaedr.rotation.y + getRandomNumber(Math.PI / 2, Math.PI * 4)],
            x: [icosaedr.rotation.x, icosaedr.rotation.x + getRandomNumber(Math.PI / 2, Math.PI * 4)],
            duration: 3000,
            easing: 'easeInOutQuad',
            complete: function() {
                countRolls++;
                let faceIndex = Math.floor(Math.random() * 20) + 1;
                rollNum.text(faceIndex);

                if(countRolls > 10){
                    faceIndex = 20;
                    rollNum.text(faceIndex);
                    rollText.text("Критический успех!!!");
                    succ.css("display", "block");
                    fail.css("display", "none");
                }

                if(faceIndex == 20 && countRolls < 10){
                    rollNum.text(faceIndex);
                    rollText.text("А тебе везет, давай ка еще разок!");
                }

                if(faceIndex == 1){
                    rollNum.text(faceIndex);
                    rollText.text("Ну... это - Критический провал!");
                }

                modal.show();
                console.log(`Икосаэдр остановился. Цифра на видимой грани: ${faceIndex}`);
            }
        });
    });

    init();
});


