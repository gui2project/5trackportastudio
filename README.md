# 5 Track Portastudio
## About
A University of Massachusetts: Lowell class project for Graphical User
Interfaces II under proffer Jesse Heines during the Spring 2015 semester.
### Members
- Glen Anderson
- Dominic Cabral
- Jose Flores
- Ramon Meza

## Requirements
### Dependencies
- Git
- Node.js
- npm
- MongoDB
- Capability of running `.sh` files from Terminal or Powershell

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

3. Change into the project directory.  
```
cd 5trackportastudio
```

4. Run the install script.  
```
./bin/install.sh
```

## Deployment
### Local
To start run:  
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

- To push the master branch to https://portastudio.heroku.com run: 
```
git push origin master:heroku
```


