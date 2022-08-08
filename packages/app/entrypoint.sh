#!/bin/sh

test -n "$NEXT_PUBLIC_SERVER_URL"

find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_SERVER_URL#$NEXT_PUBLIC_SERVER_URL#g"

echo "Starting Nextjs"
exec "$@"

