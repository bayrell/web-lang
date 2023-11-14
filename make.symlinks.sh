#!/bin/bash

rm -rf node_modules/bayrell-lang-nodejs
rm -rf node_modules/bayrell-runtime-nodejs

ln -s ../lib/Bayrell.Lang/nodejs ./node_modules/bayrell-lang-nodejs
ln -s ../lib/Runtime/nodejs ./node_modules/bayrell-runtime-nodejs
