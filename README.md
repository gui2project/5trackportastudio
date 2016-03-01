# 5 Track Portastudio
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
5trackportastudio
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
│   │   ├───model/          Data files
│   │   └───views/          Jade layouts.
│   │       ├───layout/     Full page layouts.
│   │       └───partial/    Block layouts.
│   │
│   └───routes/             URL routing.
│
├───www/                    Public static content.
│   ├───api/                API directory.
│   ├───app/                Application files.
│   │   ├───css/            Cascading style sheets.
│   │   ├───doc/            Document files. Linked back to /doc
│   │   ├───img/            Image files.
│   │   └───js/             JavaScript files.
│   └───dep/                Dependency files.
│
├───app.js                  Application controller.
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
    cd 5trackportastudio
    ./bin/install.sh
    ```

## Deployment
### Databse (Windows System)
- To install
-- verify the data and log directory exist on your system as given in the configuration file in `ini\mongodb.cfg`
-- verify the contents of `ini\common\db.js` match your installation
-- run:
    ```
    ./bin/mongodb.sh --install
    ```

- To Remove
    ```
    ./bin/mongodb.sh --remove
    ```

- To start the service run:
    ```
    ./bin/mongodb.sh --start
    ```

- To restart the service run:
    ```
    ./bin/mongodb.sh --restart
    ```

- To stop the service run:
    ```
    ./bin/mongodb.sh --stop
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

- To kill all instance of the server on cygwin run:
    ```
    ./bin/kex.sh -e node.exe
    ```

### Heroku
- To push to https://trackstudio.heroku.com run:
    ```
    git push origin heroku
    ```

- To push the master branch to https://trackstudio.heroku.com run:
    ```
    git push origin master:heroku
    ```
