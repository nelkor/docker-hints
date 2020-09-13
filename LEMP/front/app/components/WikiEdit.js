import Shadow from './Shadow.js';

import main_template from '../templates/main-template.js';
import edit_template from '../templates/edit-template.js';
import error from '../templates/error-template.js';

import {
    load_article,
    save_article,
} from '../services/main-service.js';

import { redirect, appear } from '../services/redirect-service.js';
import { notice } from '../services/pop-up-service.js';

/**
 * @param {object} article статья в формате object (из JSON)
 * @returns {string} статья в формате HTML
 */
const format = article =>
`
    <div class="btn backward">Вернуться</div>
    <div class="a-btn">Сохранить</div>
    <input
        type="text"
        id="title"
        value="${article.title}"
        placeholder="Заголовок статьи">
    <textarea
        id="content"
        placeholder="Текст статьи"
    >${article.content}</textarea>
`;

export default class WikiEdit extends Shadow
{
    /**
     * @callback при появлении в документе
     */
    async connectedCallback()
    {
        const article = await load_article();

        appear();

        if ( ! article) {
            this.shadow_root.innerHTML = main_template + error;
            return;
        }

        this.shadow_root.innerHTML = main_template
            + edit_template
            + format(article);

        const id = article.id;

        const title_input = this.find('#title');
        const content_area = this.find('#content');
        const save_button = this.find('.a-btn');

        /**
         * @callback сохраняет существующую статью
         * @async ждёт ответа от сервера
         */
        const save_clicked = async () => {
            const title = title_input.value.trim();
            const content = content_area.value.trim();

            if ( ! title || ! content) {
                notice('Все поля должны быть заполнены.');
                return;
            }

            const result = await save_article({ id, title, content });

            if (result.success) redirect('/' + article.name);
            else notice('Что-то пошло не так! Кто-то удалил эту статью?');
        };

        save_button.addEventListener('click', save_clicked);
    }
}
