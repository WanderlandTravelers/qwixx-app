#!/bin/sh

npm run build
git checkout gh-pages
cp -rf build/* docs/
git add docs
git commit -m 'gh-pages build'
git push wt gh-pages
git checkout feature/mvp-app
