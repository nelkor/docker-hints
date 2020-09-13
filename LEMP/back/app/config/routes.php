<?php

return $routes = [
    'list' => [
        'controller' => 'articles',
        'action' => 'list',
    ],
    'article' => [
        'controller' => 'articles',
        'action' => 'get',
    ],
    'save' => [
        'controller' => 'articles',
        'action' => 'save',
    ],
    'add' => [
        'controller' => 'articles',
        'action' => 'add',
    ],
    'rm' => [
        'controller' => 'articles',
        'action' => 'remove',
    ],
];
