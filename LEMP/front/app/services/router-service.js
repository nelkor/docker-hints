import { set_article } from './main-service.js';
import { fade } from './redirect-service.js';

const routes = [
    {
        regexp: /^\/$/,
        attr: 'wiki-list',
    },
    {
        regexp: /^\/add\/?$/,
        attr: 'wiki-add',
    },
    {
        regexp: /^\/([a-zA-Z0-9_]+?)\/?$/,
        attr: 'wiki-read',
    },
    {
        regexp: /^\/([a-zA-Z0-9_]+?)\/edit\/?$/,
        attr: 'wiki-edit',
    },
];

export default class Router
{
    /**
     * @param {Element} outlet
     */
    constructor(outlet)
    {
        this.outlet = outlet;
        this.prev_link = '/';
    }

    /**
     * Переводит outlet на подстраницу
     *
     * @param {string} link
     */
    follow(link)
    {
        let route = routes.find(route => link.search(route.regexp) != -1);

        if ( ! route) {
            link = '/';
            route = routes[0];
        }

        const matches = link.match(route.regexp);
        const match = !! matches ? matches[1] : null;

        set_article(match);

        const go_to_route = () => {
            this.prev_link = location.pathname;
            this.outlet.setAttribute('route', route.attr);

            history.pushState(null, null, link);
        };

        fade().then(go_to_route);
    }

    /**
     * Переводит outlet на шаг назад
     */
    back()
    {
        const target = this.prev_link;

        this.prev_link = location.pathname;
        this.follow(target);
    }
}
