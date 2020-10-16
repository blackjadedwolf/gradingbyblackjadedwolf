#!/bin/sh

# starting in /var/www/bjwsubmissions/backend
# install pm2 manually if spinning up a new instance
pm2 stop all;
npm install --only=production;
pm2 start build/index.js;
