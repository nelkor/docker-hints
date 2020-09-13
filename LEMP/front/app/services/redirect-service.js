let router = null;
let is_just_loaded = true;

/**
 * Растворяет экран
 *
 * @returns {Promise<*>} экран растворился
 */
export const fade = () => {
    const cb = resolve => {
        if (is_just_loaded) {
            is_just_loaded = false;
            resolve();
        }

        document.documentElement.classList.remove('appearing');
        document.documentElement.classList.add('fading');
        document.documentElement.addEventListener('animationend', resolve);
    };

    return new Promise(cb);
};

/**
 * Проявляет экран
 */
export const appear = () => {
    document.documentElement.classList.remove('fading');
    document.documentElement.classList.add('appearing');
};

/**
 * Инициирует роутер
 *
 * @param {Router} r
 */
export const set_router = r => router = r;

/**
 * Инициирует переход на подстраницу
 *
 * @param link
 */
export const redirect = link => router.follow(link);
