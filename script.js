// Функция для копирования IP адреса
function copyIP() {
    // Находим текст IP
    const ipText = "ZHRLANDIA.WORLD";
    
    // Копируем в буфер обмена
    navigator.clipboard.writeText(ipText).then(() => {
        // Находим элемент подсказки
        const hint = document.querySelector('.copy-hint');
        
        // Меняем текст на подтверждение
        const originalText = hint.innerText;
        hint.innerText = "✅ IP СКОПИРОВАН!";
        hint.style.color = "#ffff00";
        hint.style.fontWeight = "bold";

        // Возвращаем текст назад через 2 секунды
        setTimeout(() => {
            hint.innerText = originalText;
            hint.style.color = "";
            hint.style.fontWeight = "";
        }, 2000);
    }).catch(err => {
        console.error('Ошибка копирования: ', err);
    });
}

// Динамическое приветствие (меняется само)
function updateGreeting() {
    const hour = new Date().getHours();
    const statusElement = document.querySelector('.status');
    let greeting = "";

    if (hour >= 5 && hour < 12) greeting = "Доброе утро! Жарландия уже проснулась.";
    else if (hour >= 12 && hour < 18) greeting = "Добрый день! Самое время для выживания.";
    else if (hour >= 18 && hour < 23) greeting = "Добрый вечер! Костры в Жарландии горят ярко.";
    else greeting = "Доброй ночи! Ночные монстры не спят...";

    // Добавляем приветствие перед версией
    const greetingDiv = document.createElement('div');
    greetingDiv.style.marginTop = "10px";
    greetingDiv.style.fontSize = "0.9rem";
    greetingDiv.style.color = "#ffa500";
    greetingDiv.innerText = greeting;
    statusElement.appendChild(greetingDiv);
}

// Запускаем приветствие при загрузке страницы
window.onload = updateGreeting;
