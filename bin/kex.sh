#!/bin/bash
#   @file   kex.sh
#   Terminates all instances of an executable on windows, made to deal with
#   hanging Node.JS instances on CygWin.

#   VARIABLES
MSG="[ KEX.SH ]"                        # output header
I=0                                     # parameter position
SKIP=0                                  # multi value parameter skip

#   PARAMETER DEFAULTS
CONFIRM=0                               # prompt for confirmation
EXE=""                                  # whether an executable was given
VAL=""                                  # the value of the executable

#   PARSE PARAMETERS
for I in "$@"
do
    if (( $SKIP == 1 )); then
        SKIP=0
    else
        case $I in
            --exe|-e)
            EXE=1
            VAL="$2"
            SKIP=1
            shift 2
            ;;
            --confirm|-c)
            CONFIRM=1
            shift
            ;;
            *)
            echo "${MSG} Unknown option given ${1}"     # unknown option do nothing
            ;;
        esac
    fi
done

#   EXECUTE OPTIONS
if [ ! -z "$EXE" ]; then
    PID=$(ps -Wef | grep $VAL | awk '{print $2}')

    if [ -z "${PID}" ] ; then
        echo -e "${MSG} Nothing to terminate."
    else
        echo -e "${MSG} Terminating ${PID}."
    fi

    for P in $PID
    do
        RET=$(taskkill /F /PID $P)
        if [ $? ] ; then
            echo -e "${MSG} ${VAL} with PID ${P} was terminated."
        fi
    done
fi

#   TERMINATE
if (( ${CONFIRM} == 1 )); then
    read -n1 -r -p "${MSG} Press a key to continue..." tmp
fi
