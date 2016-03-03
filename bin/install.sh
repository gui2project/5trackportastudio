#!/bin/bash
#   @file   install.sh
#   Installs dependencies for the application

#   VARIABLES
MSG="[ INSTALL.SH ]"                    # output header
I=0                                     # parameter position
SKIP=0                                  # multi value parameter skip

#   PARAMETER DEFAULTS
CONFIRM=0                               # prompt for confirmation

#   PARSE PARAMETERS
for I in "$@"
do
    if (( $SKIP == 1 )); then
        SKIP=0
    else
        case $I in
            --confirm|-c)
            CONFIRM=1
            shift
            ;;
            *)
            echo -e "${MSG} Unknown option given"     # unknown option do nothing
            ;;
        esac
    fi
done

echo -e "${MSG} Installing"
# Commands for environment setup
npm install -g npm
npm install -g express-generator
npm install -g nodemon
npm install

#   EXECUTE OPTIONS

#   TERMINATE
if (( ${CONFIRM} == 1 )); then
    read -n1 -r -p "${MSG} Press a key to continue..." tmp
fi
