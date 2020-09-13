<?php

ini_set('display_errors', true);

$path = explode('?', $_SERVER['REQUEST_URI'])[0];
$path = trim($path, '/');

preg_match('/api\/(.+)/', $path, $matches);

$path = $matches[1];

$routes = require 'config/routes.php';

if (array_key_exists($path, $routes)) {
    $route = $routes[$path];
    $controller = $route['controller'];

    require_once "tools/functions.php";
    require_once "controllers/$controller.php";

    call_user_func($route['action'] . '_action');

    exit;
}

require_once 'controllers/error.php';

not_found();
