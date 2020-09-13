import Shadow from './Shadow.js';

import main_template from '../templates/main-template.js';
import error from '../templates/error-template.js';

import { load_article, deploy_text } from '../services/main-service.js';
import { appear } from '../services/redirect-service.js';

/**
 * @param {object} article статья в формате object (из JSON)
 * @returns {string} статья в формате HTML
 */
const format = article =>
`
    <div class="btn backward">Вернуться</div>
    <a class="a-btn" href="/${article.name}/edit">Редактировать</a>
    <h1>${article.title}</h1>
    <p>${deploy_text(article.content)}</p>
`;

export default class WikiRead extends Shadow
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
            + format(article);
    }
}
