#!/bin/bash

# Save the working directory
WORKING_DIRECTORY=`pwd`

# Enter the BaseApp package
cd ../BaseAppLaravelPackage

# Compile
gulp

# Copy the resources
cp public/css/app.css $WORKING_DIRECTORY/public/vendor/baseapp/css/app.css
cp public/css/app.css.map $WORKING_DIRECTORY/public/vendor/baseapp/css/app.css.map
cp public/js/app.js $WORKING_DIRECTORY/public/vendor/baseapp/js/app.js
cp resources/views/app.blade.php $WORKING_DIRECTORY/vendor/weinbergit/baseapp-laravel-package/resources/views/app.blade.php

# Return to the working directory
cd $WORKING_DIRECTORY
#echo $WORKING_DIRECTORY
