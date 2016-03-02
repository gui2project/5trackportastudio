#!/bin/bash
#   @file   mongodb.sh
#   Manages windows network service for the application

#   VARIABLES
MSG="[ MONGODB.SH ]"                    # output header
CONFIG="F:\mean\5trackportastudio\ini\mongodb.cfg"
MONGO="C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe"
declare -A CONFIG_ARR=()                # configuration array
IFS="="                                 # configuration separator
SKIP=0                                  # multi value parameter skip
I=0                                     # parameter position

#   PARAMETER DEFAULTS
INSTALL=0                               # install the windows service
START=0                                 # start the windows service
STOP=0                                  # stop the windows service
RESTART=0                               # restart the windows service
CONFIRM=0                               # prompt for confirmation
REMOVE=0

#   FUNCTIONS

#   @name   start
#   start the mongodb service
#   @param  1   the service to start
function start {
    echo "${MSG} Starting service ${1}"
    net start ${1}
}

#   @name   stop
#   stops the mongodb service
#   @param  1   the service to stop
function stop {
    echo "${MSG} Stopping service ${1}"
    net stop ${1}
}

#   @name   restart
#   restarts the mongodb service
#   @param  1   the service to restart
function restart {
    echo "${MSG} Restarting service ${1}"
    stop $1
    start $1
}

#   @name   install
#   install and start the mongodb service
#   @param  1   the configuration file to use
#   @param  2   the service to install and start
function create {
    echo "${MSG} Installing service ${2}"
    echo ${1}
    sc.exe create "${2}" binPath="${MONGO} --service --config=\"${1}\"" DisplayName= "${2}" start= "auto"
    mongod.exe --config ${1} --install
    start $2
}

function remove {
    echo "${MSG} Removing service ${2}"
    net stop ${1}
    SC delete ${1}
}

function parse_yaml {
   local prefix=$2
   local s='[[:space:]]*' w='[a-zA-Z0-9_]*' fs=$(echo @|tr @ '\034')
   sed -ne "s|^\($s\):|\1|" \
        -e "s|^\($s\)\($w\)$s:$s[\"']\(.*\)[\"']$s\$|\1$fs\2$fs\3|p" \
        -e "s|^\($s\)\($w\)$s:$s\(.*\)$s\$|\1$fs\2$fs\3|p"  $1 |
   awk -F$fs '{
      indent = length($1)/2;
      vname[indent] = $2;
      for (i in vname) {if (i > indent) {delete vname[i]}}
      if (length($3) > 0) {
         vn=""; for (i=0; i<indent; i++) {vn=(vn)(vname[i])("_")}
         printf("%s%s%s=\"%s\"\n", "'$prefix'",vn, $2, $3);
      }
   }'
}

#   PARSE PARAMETERS
for I in "$@"
do
    if (( $SKIP == 1 )); then
        SKIP=0
    else
        case $I in
            --install|-i)
            INSTALL=1
            shift
            ;;
            --remove|-r)
            REMOVE=1
            shift
            ;;
            --start|-s)
            START=1
            shift
            ;;
            --stop|-t)
            STOP=1
            shift
            ;;
            --restart|-r)
            RESTART=1
            shift
            ;;
            --confirm|-c)
            CONFIRM=1
            shift
            ;;
            *)
            echo "${MSG} Unknown option given"     # unknown option do nothing
            ;;
        esac
    fi
done


#   EXTRACT CONFIG FILE KEY-PAIRS
tmpfile=$(mktemp abc-script.XXXXXX)
eval $(parse_yaml ${CONFIG} > ${tmpfile})
while read -r KEY VAL; do
    CLEAN_KEY=$(echo $KEY | tr -d ' ')
    CLEAN_VAL=$(echo $VAL | sed -e 's/^[ \t]*//')
    CLEAN_VAL=$(echo ${CLEAN_VAL} | tr -d '"')
    CONFIG_ARR[$CLEAN_KEY]=${CLEAN_VAL}
done < "${tmpfile}"
rm "$tmpfile"

#   EXECUTE OPTIONS
if (( "${INSTALL}" == 1 )); then
    create ${CONFIG} ${CONFIG_ARR[processManagement_windowsService_serviceName]}
elif (( "${REMOVE}" )); then
    remove ${CONFIG_ARR[processManagement_windowsService_serviceName]}
elif (( ( "${RESTART}" == 1 ) || ( "${START}" == 1 && "${STOP}" == 1 ) )); then
    restart ${CONFIG_ARR[processManagement_windowsService_serviceName]}
elif (( "${START}" == 1 )); then
    start ${CONFIG_ARR[processManagement_windowsService_serviceName]}
elif (( "${STOP}"  == 1 )); then
    stop ${CONFIG_ARR[processManagement_windowsService_serviceName]}
fi

#   TERMINATE
if (( ${CONFIRM} == 1 )); then
    read -n1 -r -p "${MSG} Press a key to continue..." tmp
fi