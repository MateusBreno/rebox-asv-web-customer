#!/bin/bash

git checkout main
git merge develop
git push origin main
yarn build
git checkout develop