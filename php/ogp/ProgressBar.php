<?php

/**
 * ProgressBar Display Class
 */
class ProgressBar
{
    // Progress Symbols
    private const PROGRESS_SYMBOL = ['|', '/', '-', '\\'];

    /**
     * Progress Output
     *
     * @param integer $progress
     * @return void
     */
    public static function progress(int $progress): void
    {
        echo "\r";
        $block = str_repeat('#', floor($progress / 5));
        printf('Processing...  %s [%-20s]%3d%%', self::PROGRESS_SYMBOL[$progress % count(self::PROGRESS_SYMBOL)], $block, $progress);
        flush();

        if ($progress >= 100) {
            echo PHP_EOL;
        }
    }
}
