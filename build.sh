#!/bin/bash

# Clean previous build
rm -rf dist

# Build the project
npm run build

# Create directories if they don't exist
mkdir -p dist/icons
mkdir -p dist/360

# Copy GPX file
cp public/Hoenderloo.gpx dist/

# Copy manifest
cp public/manifest.json dist/

# Create a .htaccess file for Apache servers
echo "
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>

# Cache control for static assets
<FilesMatch \"\.(ico|pdf|jpg|jpeg|png|webp|gif|html|htm|xml|txt|xsl|css|js)$\">
  Header set Cache-Control \"max-age=31536000, public\"
</FilesMatch>

# CORS headers for map tiles
<IfModule mod_headers.c>
  Header set Access-Control-Allow-Origin \"*\"
</IfModule>
" > dist/.htaccess

echo "Build completed! The contents of the dist directory are ready for deployment."
