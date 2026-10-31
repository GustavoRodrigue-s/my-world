#!/bin/sh
# Renders banner.html to the 1584 × 396 PNGs LinkedIn asks for.
set -e
cd "$(dirname "$0")"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

shot() {
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=2 \
    --window-size=792,198 --virtual-time-budget=8000 \
    --screenshot="$PWD/$1" "file://$PWD/banner.html?$2" 2>/dev/null
}

shot linkedin-banner-pt.png "locale=pt"
shot linkedin-banner-en.png "locale=en"
shot linkedin-banner-pt-night.png "locale=pt&theme=dark"
shot linkedin-banner-en-night.png "locale=en&theme=dark"
