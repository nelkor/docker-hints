<?php

/**
 * Добавляет статью в таблицу
 *
 * @param array $article новая статья
 */
function add_article(array $article)
{
    $pdo = pdo();

    $query = "
        INSERT INTO `articles`
        (`name`, `hash`, `title`, `content`)
        VALUES
        (
            :name,
            :hash,
            :title,
            :content
        )
    ";

    try {
        $state = $pdo->prepare($query);
        $state->execute($article);
    } catch (PDOException $e) {}
}

/**
 * Изменяет статью в таблице
 *
 * @param int $id
 * @param string $title
 * @param string $content
 */
function save_article(int $id, string $title, string $content)
{
    $pdo = pdo();

    $query = "
        UPDATE `articles`
        SET
            `title` = :title,
            `content` = :content
        WHERE `id` = $id
    ";

    $article = [
        'title' => $title,
        'content' => $content,
    ];

    try {
        $state = $pdo->prepare($query);
        $state->execute($article);
    } catch (PDOException $e) {}
}

/**
 * Удаляет статью по ID
 *
 * @param int $id
 */
function remove_article(int $id)
{
    $pdo = pdo();
    $now = time();

    $pdo->query("UPDATE `articles` SET `deletedAt` = $now WHERE `id` = $id");
}

/**
 * @return array все статьи из таблицы
 */
function list_articles()
{
    $pdo = pdo();

    $query = "
        SELECT
            `id`,
            `name`,
            `title`
        FROM
            `articles`
        WHERE `deletedAt` = 0
    ";

    $state = $pdo->query($query);

    return $state->fetchAll(PDO::FETCH_ASSOC);
}

/**
 * @param int $hash
 * @return array все статьи с таким hash
 */
function articles_by_hash(int $hash)
{
    $pdo = pdo();

    $query = "
        SELECT
            `id`,
            `name`,
            `title`,
            `content`
        FROM
            `articles`
        WHERE
              `hash` = $hash
          AND `deletedAt` = 0
    ";

    $state = $pdo->query($query);

    return $state->fetchAll(PDO::FETCH_ASSOC);
}
