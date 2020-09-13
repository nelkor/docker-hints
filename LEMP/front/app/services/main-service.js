import { get, post } from './http-service.js';

let article = '';

// Колбэки для deploy_text
const bolder = (_, p1) => `<b>${p1}</b>`;
const italer = (_, p1) => `<i>${p1}</i>`;
const linker = (_, p1, p2) => `<a href="/${p1}">${p2}</a>`;

/**
 * @param {string} str в режиме редактирования
 * @returns {string} в режиме чтения
 */
export const deploy_text = str =>
    str.replace(/\*\*\[(.+?)]\*\*/g, bolder)
       .replace(/\\\\\[(.+?)]\\\\/g, italer)
       .replace(/\(\((.+?)\s\[(.+?)]\)\)/g, linker);

/**
 * Устанавливает имя текущей статьи
 *
 * @param {string} name
 */
export const set_article = name => article = name;

/**
 * @returns {Promise<*>} список статей с сервера
 */
export const load_list = async () => {
    const response = await get('list', null);

    return response.content;
};

/**
 * @returns {Promise<*>} статья: { id, title, content }
 */
export const load_article = async () => {
    const response = await get('article', { name: article });

    if ( ! response.success) return null;

    return response.content;
};

/**
 * Сохраняет уже существующую статью
 *
 * @param data
 * @returns {Promise<*>}
 */
export const save_article = async data => post('save', data);

/**
 * Создаёт новую статью
 *
 * @param data
 * @returns {Promise<*>}
 */
export const add_article = async data => post('add', data);

/**
 * Удаляет статью по её ID
 *
 * @param {number} id
 * @returns {Promise<*>}
 */
export const rm_article = async id => post('rm', { id });
