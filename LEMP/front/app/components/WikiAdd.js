import Shadow from './Shadow.js';

import main_template from '../templates/main-template.js';
import edit_template from '../templates/edit-template.js';

import { notice } from '../services/pop-up-service.js';
import { add_article } from '../services/main-service.js';
import { redirect, appear } from '../services/redirect-service.js';

const template =
`
    <div class="btn backward">Вернуться</div>
    <div class="a-btn">Сохранить</div>
    <input
        type="text"
        id="name"
        placeholder="Имя статьи (a-zA-Z0-9_)">
    <input
        type="text"
        id="title"
        placeholder="Заголовок статьи">
    <textarea id="content" placeholder="Текст статьи"></textarea>
`;

export default class WikiAdd extends Shadow
{
    /**
     * @callback при появлении в документе
     */
    connectedCallback()
    {
        this.shadow_root.innerHTML = main_template
            + edit_template
            + template;

        appear();

        const name_input = this.find('#name');
        const title_input = this.find('#title');
        const content_area = this.find('#content');
        const save_button = this.find('.a-btn');

        /**
         * @callback заливает новую статью на сервер
         * @async ждёт ответа от сервера
         */
        const save_clicked = async () => {
            const name = name_input.value.trim();
            const title = title_input.value.trim();
            const content = content_area.value.trim();

            if ( ! name || ! title || ! content) {
                notice('Все поля должны быть заполнены.');
                return;
            }

            const result = await add_article({ name, title, content });

            if (result.success) redirect('/' + name);
            else {
                const message = 'Что-то пошло не так!'
                    + ' Недопустимое имя? А может быть,'
                    + ' оно уже занято?';

                notice(message);
            }
        };

        save_button.addEventListener('click', save_clicked);
    }
}
