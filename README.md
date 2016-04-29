# trackstudio

## About Project
trackstudio is A University of Massachusetts: Lowell class capstone project for Graphical User Interfaces II under professor Jesse Heines during the Spring 2015 semester.

- Glen Anderson
- Dominic Cabral
- Jose Flores
- Ramon Meza

Our goal is to create a simplified sound recording application that works in modern web browsers through the Web Audio API. We will differentiate our application by presenting the user with "creative constraints". This will help them focus on their music ans not the technicalities associated with other sound recording applications. We will achieve this by not including visual waveforms and limiting the amount of recordable tracks to four, reducing the interface and indirectly setting a goal for the artist.

Our target audience consists of musicians and songwriters, of both genders ages 13 and older, who like to record demos or music without having to download software. The user must have access to a modern web browser and a microphone. Our target audience is able to navigate a website and is familiar with how knobs, buttons, and sliders function. Users do not necessarily have prior sound recording experience, as a tutorial is provided.

### Reports
- [Proposal](https://trackstudio.herokuapp.com/api/get/doc/report-proposal)
- [Alpha Memo](https://trackstudio.herokuapp.com/api/get/doc/report-memo)
- [Beta and Usability](https://trackstudio.herokuapp.com/api/get/doc/report-usability)

## Application
### File Structure
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

### Clientside Libraries
- [bootstrap](http://getbootstrap.com)
- [bootstrap-slider](https://github.com/seiyria/bootstrap-slider)
- [jQuery](http://jquery.com)
- [jQuery-color](https://github.com/jquery/jquery-color)
- [jQuery-knob](https://github.com/aterrien/jQuery-Knob)
- [jQuery-pulse](https://github.com/jsoverson/jquery.pulse.js)
- [jQuery-qtip](http://qtip2.com/download)
- [jQuery-validation](https://github.com/jzaefferer/jquery-validation)
- [js-cookie](https://github.com/js-cookie/js-cookie)
- [Recorder.js](https://github.com/mattdiamond/Recorderjs)
- [Trip.js](https://github.com/EragonJ/Trip.js)
- [Tuna.js](https://github.com/Theodeus/tuna)
- [volume-meter](https://github.com/cwilso/volume-meter)

## Requirements

### Software
- `Git`
- `Node.js`
- `npm`
- `MongoDB`

### Environment Variables
- `MONGO_DB_USER` - Holds an administrator username to the `MongoDB`
- `MONGO_DB_PASS` - Holds the password to the `MongoDB` for the administrator `MONGO_DB_USER`
- `TS_RUN_MODE` - development | production
- `NODE_ENV` - development | production

### Runtime
- `Web Audio API` compatible browser, for a full list see
    https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API

## Installation
1. Install `Git` for your system.
    https://git-scm.com/downloads

2. Install `Node.js` for your system. This installs `npm` as well.
    https://nodejs.org/en/download/

3. Install `MongoDB` on your database server.
    https://www.mongodb.org/downloads#production

4. Clone the repository.
    ```
    git clone https://github.com/gui2project/5trackportastudio.git
    ```

5. Run the install script.
    ```
    cd 5trackportastudio && npm install
    ```

## Configuration (Windows)
1. Verify the contents of `ini\mongodb.cfg` match your installation by running
    ```
    gulp mongodb.config
    ```

2. To create and start a windows service with the configuration run:
    ```
    gulp mongodb.create
    ```
3. You will then need to manually add a user that matches `MONGO_DB_USER`:`MONGO_DB_PASS`, with administrative read write to a collection `trackstudio`.

## Deployment
Deployments through `Gulp` will format, check syntax and extract documentation.

- For a full list of commands available run:

    ```
    gulp help
    ```

### Development
trackstudio by default uses [Nodemon](https://www.npmjs.com/package/nodemon) to run our application on port `3000`.
We also use the `master` branch as a development branch, and to quickly save changes to the `master` branch we recommend to ...

- run (Only the first time):

    ```
    gulp git.cred.store
    ```
    ```
    gulp git.master --m="commit message"
    ```
    
- run (Everytime):

    ```
    gulp git.master --m="commit message"
    ```

### Production
We have integrated `Github` with `Heroku` and to deploy directly to the production server at [https://trackstudio.heroku.com](https://trackstudio.heroku.com) through `Gulp`.
- run:

    ```
    gulp git.heroku
    ```
