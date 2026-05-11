// Функция для копирования IP (оставляем старую)
function copyIP() {
    const ip = "ZHRLANDIA.WORLD";
    navigator.clipboard.writeText(ip);
    alert("IP сервера скопирован: " + ip);
}

// Магия появления при скролле
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show'); // Добавляем класс, когда блок в кадре
        }
    });
}, {
    threshold: 0.2 // Блок появится, когда 20% его высоты будет видно
});

// Запускаем слежку за всеми секциями
document.querySelectorAll('.info-section').forEach((section) => {
    observer.observe(section);
});
function updateOnline() {
    // Используем бесплатное API для проверки статуса сервера
    fetch('https://api.mcstatus.io/v2/status/java/hotland.falix.pro')
        .then(response => response.json())
        .then(data => {
            const countElement = document.getElementById('player-count');
            const dot = document.querySelector('.status-dot');
            
            if (data.online) {
                countElement.innerText = data.players.online + " / " + data.players.max;
                dot.style.background = "#00ff00"; // Зеленый, если в сети
            } else {
                countElement.innerText = "Оффлайн";
                dot.style.background = "#ff0000"; // Красный, если выключен
            }
        })
        .catch(err => {
            console.log("Ошибка API");
            document.getElementById('player-count').innerText = "недоступен";
        });
}

// Обновляем при загрузке и каждые 30 секунд
updateOnline();
setInterval(updateOnline, 30000);
