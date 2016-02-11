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
├───bin/                 Executable files.
├───doc/                 Documents.
├───ini/                 Configurations.
│   ├───common/          Common configurations to all application modes.
│   ├───development.js   Default application configuration for development.
│   └───production.js    Default application configuration for production.
│
├───node_modules/        npm dependencies.
│
├───server/              Private server.
│   ├───controllers/     Output controllers.
│   ├───routes/          URL routing.
│   └───views/           Jade layouts.
│       ├───layout/      Full page layouts.
│       └───partial/     Block layouts.
│
├───www/                 Public static content.
│   ├───api/             API directory.
│   ├───app/             Application files.
│   │   ├───css/         Cascading style sheets.
│   │   ├───doc/         Document files.
│   │   ├───img/         Image files.
│   │   └───js/          JavaScript files.
│   └───dep/             Dependency files.
│
├───app.js               Application controller.
├───global.js            Global object file. Determines root path and configuration file to use.
├───package.json         npm package files.
├───Procfile             Heroku instructions for deployment.
└───README.md            Installation instructions.
```

## Requirements
### Dependencies
#### Installation
- Git
- Node.js
- npm
- MongoDB
- Capability of running `.sh` files from Terminal or Powershell
#### Runtime
- Web audio compatible browser, for a full list see https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API

## Install
### Dependencies
1. Install the appropriate version of Git for your system.
    https://git-scm.com/downloads

2. Install the appropriate version of Node.js for your system. This installs npm as well.
    https://nodejs.org/en/download/

3. Install the appropriate version of MongoDB for your system.
    https://www.mongodb.org/downloads#production

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
    ./bin/kex node.exe
    ```

### Heroku
- To push to https://portastudio.heroku.com run:
    ```
    git push origin heroku
    ```

- To push the master branch to https://trackstudio.heroku.com run:
    ```
    git push origin master:heroku
    ```
