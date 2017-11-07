# ExampleApp

An example/reference Laravel application 
using [WeinbergIT/BaseAppLaravelPacakge](https://github.com/WeinbergIT/BaseAppLaravelPackage) (BaseApp 3.0),
a private package for Northwestern University.



## Local BaseApp

composer.json and composer.lock assume BaseApp is installed in ../BaseAppLaravelPackage/.  This allows you to develop in that directory and update this app without too much hassle.

`./baseapp-update.sh` will enter ../BaseAppLaravelPackage, run `gulp` to compile JavaScript and SCSS, then copy the compiled files and the Blade layout in to this directory.



## License

&copy; Northwestern University.  All rights reserved.

Any unauthorized use of this package 
without the express written consent of Morty Schapiro 
is strictly prohibited.
