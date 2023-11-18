#!/bin/bash

echo "Compiler 0.12"

rm -rf ./node_modules/bayrell-lang-nodejs
rm -rf ./node_modules/bayrell-runtime-nodejs

bay-lang-nodejs make Runtime nodejs
bay-lang-nodejs make Bayrell.Lang nodejs

yes | cp -rT ./lib/Runtime/nodejs/ ./node_modules/bayrell-runtime-nodejs/
yes | cp -rT ./lib/Runtime.Console/nodejs/ ./node_modules/bayrell-runtime-console-nodejs/
yes | cp -rT ./lib/Bayrell.Lang/nodejs/ ./node_modules/bayrell-lang-nodejs/
