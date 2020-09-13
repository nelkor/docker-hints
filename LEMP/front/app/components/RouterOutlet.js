import Shadow from './Shadow.js';

/**
 * @param {string} tag имя тэга
 * @returns {string} открывающий и закрывающий тэги
 */
const tags = tag => `<${tag}></${tag}>`;

export default class RouterOutlet extends Shadow
{
    /**
     * @returns {string[]} имена прослушиваемых атрибутов
     */
    static get observedAttributes() {
        return ['route'];
    }

    /**
     * @callback при смене прослушиваемого атрибута
     * @param name не используется (прослушивается один)
     * @param oldValue не используется
     * @param newValue имя тэга
     */
    attributeChangedCallback(name, oldValue, newValue)
    {
        this.shadow_root.innerHTML = tags(newValue);
    }
}
