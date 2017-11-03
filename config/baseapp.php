<?php
return [
    'appName' => 'BaseApp',
    'css' => 'app',
    'debug' => (env('BASEAPP_DEBUG') !== null ? env('BASEAPP_DEBUG') : 2),
    'fastUserSwitches' => [
        'admin' => [
            'name' => 'System Admin',
            'description' => ''
        ],
    ],
];
