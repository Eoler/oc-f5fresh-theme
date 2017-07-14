# F5fresh
Starter development template for building [Zurb Foundation 5](https://foundation.zurb.com/sites/docs/v/5.5.3/) themed [OctoberCMS](//octobercms.com/) sites.

Includes:
- latest Foundation 5 [source from official Bower repository](https://github.com/zurb/bower-foundation)
- style guide layout with most Foundation UI components
- GulpJS-based build system for development and production


## Installation
Add the theme to existing project while logged into OctoberCMS account online,
or interactively by searching it inside Settings/System/Updates/Themes in backend,
or with the following command-line instructions inside *project root*:
```
php artisan theme:install castus.f5fresh f5fresh
php artisan theme:use f5fresh
```

## One-time Development Environment Setup
Install [NodeJS and Node Package Manager](https://nodejs.org/en/) globally (LTS version required).
Run the following command-line instructions inside *theme root*:
```
npm install --global gulp bower
npm install
```
Alternative NPM-compatible package manager [Yarn](https://yarnpkg.com/en/) could be used:
```
yarn
```

## Using and Editing
Check [styleguide/default layout](https://github.com/Eoler/oc-f5fresh-theme/blob/master/layouts/styleguide/default.htm)
for example HTML page structure and mandatory includes.
Custom styles example source is in [assets/scss/styleguide SCSS](https://github.com/Eoler/oc-f5fresh-theme/blob/master/assets/scss/styleguide.scss),
scripts in [assets/es6/styleguide JS](https://github.com/Eoler/oc-f5fresh-theme/blob/master/assets/es6/styleguide.js).
Development changes can be automated with command-line instruction inside *theme root*:
```
gulp watch
```
Build versioned, optimized, minified, autoprefixed assets with command-line instruction inside *theme root*:
```
gulp upbuild --production
```

## Customizing Foundation
Global Foundation styling parameters should be modified in
[assets/scss/_settings553 SCSS](https://github.com/Eoler/oc-f5fresh-theme/blob/master/assets/scss/_settings553.scss).

Comment out unwanted styles and scripts for leaner and faster Foundation custom build:
- [assets/scss/foundation553 SCSS](https://github.com/Eoler/oc-f5fresh-theme/blob/master/assets/scss/foundation553.scss)
- [assets/es6/foundation553 JS](https://github.com/Eoler/oc-f5fresh-theme/blob/master/assets/es6/foundation553.js)

For in-depth customizations follow Zurb's guide: [How to Make Foundation 5 Your Own](https://zurb.com/university/lessons/how-to-make-foundation-5-your-own) (after unlocking lessons vault).
