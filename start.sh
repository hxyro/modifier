#!/bin/env bash

yarn workspace @modifier/app start 2> error/app.error &
yarn workspace @modifier/server start 2> error/server.error &
