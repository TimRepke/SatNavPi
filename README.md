
# Install

## NodeJS stuff

```
sudo pacman -S nodejs npm
npm install tileserver-gl-light yaml log4js

```

# Software

## Music

## Navi

### Map data
To stay offline, we need map files and a server to serve them. Map files are needed either way and are stored in `maps/tiles/`.

Download MapBox tiles, i.e. from https://openmaptiles.org

Below is some code to only try serving maps, which can be savely ignored.

```
npm install tileserver-gl-light tileserver-gl-styles
$(npm bin)/tileserver-gl-light germany.mbtiles -V
open http://localhost:8080/styles/osm-bright/?vector#15.06/52.5497/13.4336
```

## Phone Connectivity

### Relevant Bluetooth protocols
- Message Access Profile (MAP), send and receive SMS
- Phone Book Access Profile (PBAP, PBA), display names, download phonebook, issue calls
- Advanced Audio Distribution Profile (A2DP), Bluetooth Audio Streaming
