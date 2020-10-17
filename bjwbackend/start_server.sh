#!/bin/sh

# starting in /var/www/bjwsubmissions/backend
# install pm2 manually if spinning up a new instance
pm2 list
pm2 kill
yarn install --production
pm2 start build/index.js
