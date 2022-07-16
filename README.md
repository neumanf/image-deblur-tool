# Image Deblur Tool

## Requirements

-   Node.js
-   Npm
-   Python 3
-   Pip

## Development

First clone the repository and navigate to it, then:

```sh
# navigate to the API directory
$ cd packages/api

# install the dependencies
$ pip install -r requirements.txt

# start the API
$ uvicorn main:app --reload

# navigate to the webapp directory
$ cd ../webapp

# install the dependencies
$ npm install

# Copy the .env example to a new file
$ cp .env.example .env

# start the webapp
$ npm run dev
```
