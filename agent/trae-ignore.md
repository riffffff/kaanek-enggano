# File dan folder yang tidak perlu diindex oleh Trae agent
# Ini menghemat token karena agent tidak perlu baca file yang tidak relevan

# Dependencies
node_modules/
vendor/

# Build output
public/build/
public/hot

# Storage & cache
storage/framework/
storage/logs/
bootstrap/cache/

# Media uploads (terlalu besar, tidak relevan untuk coding)
public/storage/
storage/app/public/

# Video hero (binary, tidak bisa dibaca agent)
public/videos/

# Environment
.env
.env.backup

# IDE & OS
.idea/
.vscode/
.DS_Store
Thumbs.db

# Test coverage
coverage/
.phpunit.cache/

# Lock files (biarkan ada tapi tidak perlu diindex agent)
package-lock.json
composer.lock
