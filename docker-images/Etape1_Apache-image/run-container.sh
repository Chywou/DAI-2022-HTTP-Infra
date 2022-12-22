#!/bin/bash

# mapping local/container and run container in background
docker run -p 9090:80 -d http_centeno_guidetti/http_server
