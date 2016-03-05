#!/bin/bash
#   @file   update.sh
#   Updates git

#   VARIABLES
MSG="[ UPDATE.SH ]"                     # output header
I=0                                     # parameter position
SKIP=0                                  # multi value parameter skip

#   PARAMETER DEFAULTS
CONFIRM=0                               # prompt for confirmation
MASTER=0
HEROKU=0
M=0
VAL=""

#   PARSE PARAMETERS
for I in "$@"
do
    if (( $SKIP == 1 )); then
        SKIP=0
    else
        case $I in
            --all|-a)
            MASTER=1
            HEROKU=1
            shift
            ;;
            --all-confirm|-ac|-ca)
            MASTER=1
            HEROKU=1
            CONFIRM=1
            shift
            ;;
            --confirm|-c)
            CONFIRM=1
            shift
            ;;
            --master|-m)
            MASTER=1
            shift
            ;;
            --message|-M)
            M=1
            VAL="$2"
            SKIP=1
            shift 2
            ;;
            --heroku|-h)
            HEROKU=1
            shift
            ;;
            *)
            echo -e "${MSG} Unknown option given"     # unknown option do nothing
            ;;
        esac
    fi
done

#   CLEANING DIRS
echo "${MSG} Cleaning directories."
find . -name ".goutputstream*" -type f -delete -print

#   EXECUTE OPTIONS
if (( ${M} == 1 )); then
    echo "${MSG} Commiting changes"
    git add -A
    git commit -m "${VAL}"

    echo "${MSG} Pulling master"
    git pull origin master

    if (( ${MASTER} == 1 )); then
    echo "${MSG} Updating master"
        git push origin master
    fi

    if (( ${HEROKU} == 1 )); then
    echo "${MSG} Updating heroku"
        git push origin master:heroku
    fi

fi

#   TERMINATE
if (( ${CONFIRM} == 1 )); then
    echo "CONFIRM"
fi

read -n1 -r -p "${MSG} Press a key to continue..." tmp
