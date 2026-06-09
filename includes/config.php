<?php
declare(strict_types=1);

const SITE_NAME = 'Mailcraft Studio';
const SITE_TAGLINE = 'Production-ready HTML email templates for modern teams';

/** Base URL path when served from document root (adjust if in subdirectory). */
const BASE_PATH = '';

function url(string $path = ''): string
{
    $path = ltrim($path, '/');
    return BASE_PATH . ($path !== '' ? '/' . $path : '');
}

function e(?string $value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
}

function is_active(string $page): bool
{
    $current = basename($_SERVER['PHP_SELF'] ?? 'index.php');
    return $current === $page;
}
