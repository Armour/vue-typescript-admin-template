#!/usr/bin/env sh

# Deploy script for Github Pages

# abort on errors
set -e

# build
yarn build

# navigate into the build output directory
cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:armour/vue-typescript-admin-template.git master:gh-pages

cd -
