const socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('initial data', (data) => {
    var mes = data;
    console.log('Initial data received:', data);
    // Обработка данных при загрузке страницы
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

// Пример отправки события на сервер
function emitCustomEvent(eventName, data) {
    socket.emit(eventName, data);
}

// Пример обработки события с сервера
socket.on('custom event', (data) => {
    console.log('Custom event received:', data);
});
