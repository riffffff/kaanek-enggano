#!/bin/bash
cd "$(dirname "$0")"
export PHPRC="$(pwd)/php-cli.ini"
echo "🚀 Starting server with PHP config:"
php -r "echo 'upload_max_filesize='.ini_get('upload_max_filesize').' post_max_size='.ini_get('post_max_size').PHP_EOL;"
echo ""
php artisan serve --host=0.0.0.0 --port=8000
