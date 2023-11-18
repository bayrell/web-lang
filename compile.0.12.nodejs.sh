#!/bin/bash

echo "Compiler 0.12 nodejs"

./bay-lang/cli.js make Runtime nodejs
./bay-lang/cli.js make Bayrell.Lang nodejs

yes | cp -rT ./lib/Runtime/nodejs/ ./node_modules/bayrell-runtime-nodejs/
yes | cp -rT ./lib/Bayrell.Lang/nodejs/ ./node_modules/bayrell-lang-nodejs/

#ln -s ../lib/Bayrell.Lang/nodejs bayrell-lang-nodejs
#ln -s ../lib/Runtime/nodejs bayrell-runtime-nodejs
