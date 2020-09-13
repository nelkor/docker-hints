<?php

/**
 * @param string $name имя статьи
 * @return Closure фильтр по имени статьи
 */
function make_name_filter(string $name)
{
    return function ($article) use ($name) {
        return $article['name'] == $name;
    };
}

/**
 * @param string $name
 * @return int
 */
function hash_by_name(string $name)
{
    $hash = md5($name);
    $hash = substr($hash, 0, 10);

    return hexdec($hash);
}

/**
 * Список статей
 */
function list_action()
{
    load_model('articles');

    $list = list_articles();

    load_view('json');

    response($list);
}

/**
 * Все данные по имени статьи
 */
function get_action()
{
    $name = filter_input(INPUT_GET, 'name', FILTER_SANITIZE_STRING);

    $hash = hash_by_name($name);

    load_model('articles');

    $articles = articles_by_hash($hash);
    $filter = make_name_filter($name);
    $articles = array_filter($articles, $filter);

    load_view('json');

    if ( ! $articles) reject();

    response(array_pop($articles));
}

/**
 * Сохраняет существующую статью
 */
function save_action()
{
    $id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);
    $title = filter_input(INPUT_POST, 'title', FILTER_SANITIZE_SPECIAL_CHARS);
    $content = filter_input(INPUT_POST, 'content', FILTER_SANITIZE_SPECIAL_CHARS);

    $title = trim($title);
    $content = trim($content);

    load_view('json');

    if ( ! $title || ! $content) reject();

    load_model('articles');

    save_article($id, $title, $content);

    response();
}

/**
 * Добавляет новую статью
 */
function add_action()
{
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $title = filter_input(INPUT_POST, 'title', FILTER_SANITIZE_SPECIAL_CHARS);
    $content = filter_input(INPUT_POST, 'content', FILTER_SANITIZE_SPECIAL_CHARS);

    $name = trim($name);
    $title = trim($title);
    $content = trim($content);

    load_view('json');

    if ( ! $name || ! $title || ! $content) reject();
    if ( ! preg_match('/^[a-zA-Z0-9_]{2,100}$/', $name)) reject();

    $hash = hash_by_name($name);

    load_model('articles');

    $articles = articles_by_hash($hash);
    $filter = make_name_filter($name);
    $articles = array_filter($articles, $filter);

    if ($articles) reject();

    $article = [
        'name' => $name,
        'hash' => $hash,
        'title' => $title,
        'content' => $content,
    ];

    add_article($article);

    response();
}

/**
 * Удаляет существующую статью
 */
function remove_action()
{
    $id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);

    load_model('articles');

    remove_article($id);

    load_view('json');

    response();
}
