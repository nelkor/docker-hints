<?php

/**
 * Возвращает ответ клиенту в случае успеха
 *
 * @param null $content
 */
function response($content = null)
{
    $res = [
        'success' => true,
        'content' => $content,
    ];

    echo json_encode($res);
    exit;
}

/**
 * Возвращает ответ клиенту в случае провала
 */
function reject()
{
    echo '{}';
    exit;
}
