const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .js('resources/js/admin/categorias/app.js', 'public/js/admin/categorias/')
    .js('resources/js/admin/produtos/app.js', 'public/js/admin/produtos/')
    .js('resources/js/admin/clientes/app.js', 'public/js/admin/clientes/')
    .js('resources/js/admin/usuarios/app.js', 'public/js/admin/usuarios/')
    .js('resources/js/admin/pedidos/app.js', 'public/js/admin/pedidos/')
    .js('resources/js/admin/papeis/app.js', 'public/js/admin/papeis/')
    .sass('resources/sass/app.scss', 'public/css');

mix.vue();

mix.disableNotifications();

if (mix.inProduction()) {
    mix.version();
}
