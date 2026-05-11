/* Общие стили для длинной страницы */
section {
    padding: 80px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 1200px;
    margin: 0 auto;
    gap: 40px;
}

.hero { height: 100vh; } /* Первый экран на всю высоту */

.info-section img {
    width: 45%;
    border-radius: 20px;
    border: 3px solid #ff8c00;
    box-shadow: 0 0 20px rgba(255, 140, 0, 0.4);
}

.text-block { width: 50%; }

.text-block h2 {
    color: #ffa500;
    font-size: 2.5rem;
    margin-bottom: 20px;
    text-transform: uppercase;
}

.text-block p {
    font-size: 1.2rem;
    line-height: 1.6;
    color: #ddd;
}

/* Чтобы блоки чередовались (картинка слева / картинка справа) */
.reverse { flex-direction: row-reverse; }

/* Адаптация для телефонов */
@media (max-width: 768px) {
    section { flex-direction: column; text-align: center; }
    .info-section img, .text-block { width: 100%; }
    h1 { font-size: 3rem; }
}
