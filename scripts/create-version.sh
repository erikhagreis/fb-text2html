#!/bin/bash

# Working dir must be clean
git diff-index --quiet HEAD --
if [ $? -ne 0 ]
  then
    echo "Working dir must be clean."
    exit 1
fi

# Tests must pass
# ...

# Compile to ES5
./node_modules/.bin/babel src --out-dir lib
git add ./lib
git commit -m "chore(lib): precompile to ES5"

# Create version with Yarn
yarn version --new-version $1

# Push!
git push --follow-tags