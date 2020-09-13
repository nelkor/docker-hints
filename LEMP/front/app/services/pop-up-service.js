let body_overflow = { y: 'auto' };

/**
 * Блокирует overflow и выводит popup
 *
 * @param {Element} popup
 */
const construct = popup => {
    body_overflow.y = document.body.style.overflowY;

    document.body.style.overflowY = 'hidden';
    document.body.appendChild(popup);
};

/**
 * Создаёт popup с обычным уведомлением
 *
 * @param {string} text
 */
export const notice = text => {
    const popup = document.createElement('pop-up');

    popup.notice(text);

    construct(popup);
};

/**
 * Создаёт popup с подтверждением удаления
 *
 * @param {function} rm_cb
 */
export const ask_deletion = rm_cb => {
    const popup = document.createElement('pop-up');

    popup.ask_deletion(rm_cb);

    construct(popup);
};

/**
 * Разблокирует overflow
 */
export const destruct = () => {
    document.body.style.overflowY = body_overflow.y;
};
