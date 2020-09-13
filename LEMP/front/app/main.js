import Router from './services/router-service.js';
import { set_router } from './services/redirect-service.js';

import RouterOutlet from './components/RouterOutlet.js';
import WikiList from './components/WikiList.js';
import WikiRead from './components/WikiRead.js';
import WikiEdit from './components/WikiEdit.js';
import WikiAdd from './components/WikiAdd.js';
import PopUp from './components/PopUp.js';

customElements.define('router-outlet', RouterOutlet);
customElements.define('wiki-list', WikiList);
customElements.define('wiki-read', WikiRead);
customElements.define('wiki-edit', WikiEdit);
customElements.define('wiki-add', WikiAdd);
customElements.define('pop-up', PopUp);

const init = () => {
    const outlet = document.querySelector('router-outlet');
    const router = new Router(outlet);

    set_router(router);

    router.follow(location.pathname);

    /**
     * @param {{path, composedPath, preventDefault}} e
     */
    const link_listener = e => {
        const path = e.path || (e.composedPath && e.composedPath());
        const target = path[0];

        if (target.tagName == 'A') {
            e.preventDefault();
            router.follow(target.pathname);
        }

        if (target.classList.contains('backward')) {
            e.preventDefault();
            router.back();
        }
    };

    document.addEventListener('click', link_listener);
};

document.addEventListener('DOMContentLoaded', init);
