#!/bin/bash
#   @file   install.sh
#   Installs dependencies for the application

#   VARIABLES
MSG="[ INSTALL.SH ]"                    # output header
I=0                                     # parameter position

#   PARAMETER DEFAULTS
CONFIRM=0                               # prompt for confirmation

#   PARSE PARAMETERS
for I in "$@"
do
    case $I in
        --confirm|-c)
        CONFIRM=1
        shift
        ;;
        *)
        echo "unknown option given"     # unknown option do nothing
        ;;
    esac
done

# Commands for environment setup
npm install -g express-generator
npm install -g nodemon

#   EXECUTE OPTIONS

#   TERMINATE
if (( ${CONFIRM} == 1 )); then
    read -n1 -r -p "${MSG} Press a key to continue..." tmp
fi
