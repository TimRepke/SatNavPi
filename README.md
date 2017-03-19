
# Install

## NodeJS stuff

```
sudo pacman -S nodejs npm
npm install tileserver-gl-light yaml log4js

```

# Install Dependencies

## Music

## Maps and Routing
We want a fully offline system.
Therefore all map data is locally and needs software to render and serve it as well as find routes on the map.
Also we want to be able to easily query for locations.

### Download and Build OSRM

Change into project root, retrieve [OSRM](http://project-osrm.org/) and compile it.
If you run into trouble, check out their [build instructions](https://github.com/Project-OSRM/osrm-backend/wiki/Building-OSRM).
Same for [the stxxl library](https://github.com/stxxl/stxxl/).

```
# fetch dependencies via pacman
sudo pacman -S boost intel-tbb

# stxxl via pacman or yaourt not really working, compile from source
git clone https://github.com/stxxl/stxxl
git checkout tags/v1.4.1
cd stxxl
mkdir build
cd build
cmake ..
make
sudo make install

# get and compile OSRM from source
git clone https://github.com/Project-OSRM/osrm-backend.git
git checkout tags/v5.6.3
cd osrm-backend
mkdir -p build
cd build
cmake .. -DCMAKE_BUILD_TYPE=Release
cmake --build .
sudo cmake --build . --target install
```

### Get and Prepare Map Data
Here comes the part that is key to offline usage. Data!
Download as much as you like, OSRM claims to be able to handle "continent scale routing", but that also means you need lots of storage.

[Pick a region of your preference and download](http://download.geofabrik.de/) it to the `maps/tiles` folder. 

Next we need to prepare the data. Again, if you run into problems, check [their wiki](https://github.com/Project-OSRM/osrm-backend/wiki/Running-OSRM).
```
cd maps/tiles
# replace with absolute path
echo "disk=<path-to-project>/satnavpi/maps/tiles/stxxl,20000,syscall" > .stxxl
../../osrm-backend/build/osrm-extract germany-latest.osm.pbf -p ../../osrm-backend/profiles/car.lua
../../osrm-backend/build/osrm-contract germany-latest.osrm
```

You can test this (why not):
```
../../osrm-backend/build/osrm-routed
open: http://localhost:5000/route/v1/driving/13.388860,52.517037;13.385983,52.496891?steps=true
```

TL;DR Execute this stuff on a powerful machine with lots of RAM!

Just for reference, the the raw file for Germany is 2.8GB and extracts to around 6GB.
For processing, a 20GB temporary file (see the .stxxl config) was sufficient, it took almost an hour to run on a 12GB RAM (started swapping sometimes) machine with an i7.

## Phone Connectivity

### Relevant Bluetooth protocols
- Message Access Profile (MAP), send and receive SMS
- Phone Book Access Profile (PBAP, PBA), display names, download phonebook, issue calls
- Advanced Audio Distribution Profile (A2DP), Bluetooth Audio Streaming

# Some Bookmarks
- [Mapbox GL offline](https://www.mapbox.com/blog/vector-tiles/)
- [Leaflet Routing Machine](http://www.liedman.net/leaflet-routing-machine/)
- [TileserverGL for offline Vector rendering](https://github.com/klokantech/tileserver-gl)
