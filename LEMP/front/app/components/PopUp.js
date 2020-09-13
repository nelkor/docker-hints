import Shadow from './Shadow.js';

import main_template from '../templates/main-template.js';

import {
    basic,
    notice,
    ask_deletion,
} from '../templates/pop-up-template.js'

import { destruct } from '../services/pop-up-service.js';

export default class PopUp extends Shadow
{
    /**
     * Уведомление, просто показывает сообщение
     *
     * @param {string} text уведомление
     */
    notice(text)
    {
        this.shadow_root.innerHTML = basic;
        this.find('.container').innerHTML = notice;
        this.find('.notice-text').innerHTML = text;

        const bg = this.find('.bg');

        /**
         * Удаляет popup из документа
         */
        const remove = () => {
            this.parentNode.removeChild(this);
            destruct();
        };

        /**
         * @callback закрывает уведомление
         */
        const clicked = () => {
            bg.removeEventListener('click', clicked);
            bg.addEventListener('animationend', remove);
            bg.classList.add('fly-up');
        };

        bg.addEventListener('click', clicked);
    }

    /**
     * Спрашивает пользователя об уверенности удалить
     *
     * @param {function} rm_cb колбэк удаления элемента
     */
    ask_deletion(rm_cb)
    {
        this.shadow_root.innerHTML = main_template + basic;
        this.find('.container').innerHTML = ask_deletion;

        const bg = this.find('.bg');

        /**
         * Удаляет popup из документа
         */
        const remove = () => {
            this.parentNode.removeChild(this);
            destruct();
        };

        /**
         * @callback закрывает уведомление
         * @param e событие клика
         */
        const clicked = e => {
            const path = e.path || (e.composedPath && e.composedPath());
            const class_list = path[0].classList;

            const is_close = class_list.contains('close');
            const is_delete = class_list.contains('delete');

            if ( ! is_close && ! is_delete) return;

            if (is_delete) rm_cb();

            bg.removeEventListener('click', clicked);
            bg.addEventListener('animationend', remove);
            bg.classList.add('fly-up');
        };

        bg.addEventListener('click', clicked);
    }
}
