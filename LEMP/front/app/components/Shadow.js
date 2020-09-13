/**
 * @class базовый для веб-компонентов
 */
export default class Shadow extends HTMLElement
{
    constructor()
    {
        super();
        this.shadow_root = this.attachShadow({ mode: 'open' });
    }

    find(selector)
    {
        return this.shadow_root.querySelector(selector);
    }
}
