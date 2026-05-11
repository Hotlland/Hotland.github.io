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
