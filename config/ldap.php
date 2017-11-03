<?php
return [
    "rdn"       => env('ldap_rdn', null),
    "password"  => env('ldap_pass', null),
    "host"      => env('ldap_host', 'directory.northwestern.edu'),
    "port"      => env('ldap_port', 389),
    "fake"		=> env('ldap_fake', false)
];