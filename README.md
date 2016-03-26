# trackstudio
## About
A University of Massachusetts: Lowell class project for Graphical User
Interfaces II under proffer Jesse Heines during the Spring 2015 semester.
### Members
- Glen Anderson
- Dominic Cabral
- Jose Flores
- Ramon Meza

### File structure
```
trackstudio
├───bin/                    Executable files.
├───doc/                    Documents.
├───ini/                    Configurations.
│   ├───common/             Common configurations to all application modes.
│   ├───development.js      Default application configuration for development.
│   ├───mongodb.cfg         MongoDB service configuration.
│   └───production.js       Default application configuration for production.
│
├───node_modules/           NPM dependencies.
├───server/                 Private server.
│   ├───lib/                Application library.
│   ├───mvc/                Model View Controller directory.
│   │   ├───controllers/    Output controllers.
│   │   ├───models/         Data files
│   │   └───views/          Jade layouts.
│   │       ├───layout/     Full page layouts.
│   │       ├───mixin/      Jade mixins.
│   │       └───content/    page content.
│   │
│   └───routes/             URL routing.
│
├───www/                    Public static content.
│   ├───api/                API directory.
│   ├───app/                Application files.
│   │   ├───css/            Cascading style sheets.
│   │   ├───img/            Image files.
│   │   └───js/             JavaScript files.
│   └───dep/                Dependency files.
│       ├───css/            Cascading style sheets.
│       ├───img/            Image files.
│       └───js/             JavaScript files.
│
├───app.js                  Application controller.
├───gulpfile.js             Gulp scripts.
├───package.json            npm package file.
├───Procfile                Heroku instructions for deployment.
└───README.md               Installation instructions.
```

## Requirements
### Dependencies
#### Installation
- python 2.7 (for mongoose)
- Git
- Node.js
- npm
- MongoDB
- Capability of running `.sh` files from Terminal or Powershell

#### Environment Variables
- MONGO_DB_USER - Holds an admin username to the MongoDB
- MONGO_DB_PASS - Holds the password to the MongoDB for the admin MONGO_DB_USER
- TS_COOKIE_SECRET - Holds the cookie secret value (Security).
- TS_SSL_CERT - Holds the SSL certificate
- TS_SSL_KEY - Holds the SSL key
- NODE_ENV - development | production

#### Runtime
- Web audio compatible browser, for a full list see
    https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API

## Install
### Dependencies
1. Install the appropriate version of Git for your system.
    https://git-scm.com/downloads

2. Install the appropriate version of Node.js for your system. This installs npm as well.
    https://nodejs.org/en/download/

3. Install the appropriate version of MongoDB for your system.
    https://www.mongodb.org/downloads#production

4. Install version 2.7 of Python.
    https://www.python.org/download/releases/2.7/

### Source
1. Open a bash capable Terminal or Powershell.

2. Clone the repository.
    ```
    git clone https://github.com/gui2project/5trackportastudio.git
    ```

3. Run the install script.
    ```
    cd 5trackportastudio && npm install
    ```

## Deployment
### Databse (Windows System)
- To install
-- verify the contents of `ini\mongodb.cfg` and `ini\common\db.js` match your installation and then run:
    ```
    gulp mongodb.create
    ```

- To Remove (leaves data and logs intact)
    ```
    gulp mongodb.remove
    ```

- To start the service run:
    ```
    gulp mongodb.start
    ```

- To restart the service run:
    ```
    gulp mongodb.restart
    ```

- To stop the service run:
    ```
    gulp mongodb.stop
    ```

### Local
- To start run:
    ```
    nodemon
    ```

- To restart type:
    ```
    rs
    ```

- To stop type:
    ```
    ctrl-c
    ```

### Git
- To push to https://trackstudio.heroku.com run:
    ```
    gulp git.master
    ```

- To push the master branch to https://trackstudio.heroku.com run:
    ```
    gulp git.heroku
    ```
