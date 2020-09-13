import Shadow from './Shadow.js';

import main_template from '../templates/main-template.js';
import list_template from '../templates/list-template.js';

import { ask_deletion } from '../services/pop-up-service.js';
import { load_list, rm_article } from '../services/main-service.js';
import { appear } from '../services/redirect-service.js';

/**
 * @param {object} article статья в формате object (из JSON)
 * @returns {string} статья в формате HTML
 */
const format = article =>
`
    <div class="item">
        <a class="item-title"
           href="/${article.name}">
        ${article.title}</a>

        <div class="item-controls">
            <a class="item-edit"
               href="/${article.name}/edit">
            </a>

            <div class="item-rm" data-id="${article.id}"></div>
        </div>
    </div>
`;

export default class WikiList extends Shadow
{
    /**
     * @callback при появлении в документе
     */
    async connectedCallback()
    {
        const list = await load_list();

        this.shadow_root.innerHTML = main_template
            + list_template
            + list.map(format).join('');

        appear();

        /**
         * @callback засекает и обрбатывает удаления
         * @param e событие клика
         */
        const clicked = async e => {
            const path = e.path || (e.composedPath && e.composedPath());
            const target = path[0];

            if ( ! target.classList.contains('item-rm')) return;

            const item = target.parentNode.parentNode;
            const items_parent = item.parentNode;

            const rm_cb = () => rm_article(+target.dataset.id)
                .then(() => items_parent.removeChild(item));

            ask_deletion(rm_cb);
        };

        this.addEventListener('click', clicked);
    }
}
