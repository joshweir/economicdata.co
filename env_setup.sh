#!/bin/bash
##############################################
# setup the application bash environment
#
# TODO: This code should be DRY
##############################################

if [ "$1" == "production" ]; then
  env="production"
elif [ "$1" == "development" ]
  env="development"
elif [ "$1" == "" ]
  env="development"
else
    echo "Invalid argument supplied: $1. Expecting production or development."
    exit 1
fi

read -p "Google Analytics Id (UA): " google_analytics_id && \
read -p "Production Root URL (default: https://economicdata.co): " prod_root_url && \
prod_root_url=${prod_root_url:-https://economicdata.co} && \
read -s -p "Application Secret Token (between 24 to 32 random characters): " session_secret && \
read -p "Google OAuth Client Id: " google_client_id && \
read -s -p "Google OAuth Secret: " google_secret && \
read -p "Google OAuth Callback (default: /auth/google/callback): " google_callback && \
google_callback=${google_callback:-/auth/google/callback} && \
read -p "MongoDB URI (format: mongodb://[username:password@]host1[:port1][,host2[:port2]" \
  ",...[,hostN[:portN]]][/[database][?options]] If MongoDB URI is entered, then all " \
  "remaining MongoDB parameters such as Hostname, Port, etc will be ignored, otherwise " \
  "leave this blank): " mongodb_uri && \
read -p "MongoDB database: " mongodb_name && \
read -p "MongoDB hostname / ip (default: localhost): " mongodb_host && \
mongodb_host=${mongodb_host:-localhost} && \
read -p "MongoDB port (default: 27017): " mongodb_port && \
mongodb_port=${mongodb_port:-27017} && \
read -p "MongoDB username: " mongodb_user && \
read -s -p "MongoDB password: " mongodb_pass && \
(
if [ "$session_secret" == "" ]; then
  echo "The Application Secret Token is required! exiting.."
  exit 1
fi
) && \
(
tee -a ~/.bash_profile ~/.bashrc <<EOM
export NODE_ENV=$env
export DB_TYPE=MONGO
export PROD_ROOT_URL=$prod_root_url
export SESSION_SECRET=$session_secret
EOM
) && \
(
if [ "$google_analytics_id" != "" ]; then
  echo 'export GOOGLE_ANALYTICS_ID=$google_analytics_id' | \
    tee -a ~/.bash_profile ~/.bashrc
fi
) && \
(
if [ "$google_client_id" != "" ]; then
  tee -a ~/.bash_profile ~/.bashrc <<EOM
export GOOGLE_CLIENTID=$google_client_id
export GOOGLE_SECRET=$google_secret
export GOOGLE_CALLBACK=$google_callback
EOM
fi
) && \
(
if [ "$mongodb_uri" != "" ]; then
  echo 'export MONGODB_URI=$mongodb_uri' | \
    tee -a ~/.bash_profile ~/.bashrc
else
  if [ "$mongodb_name" != "" ]; then
    echo 'export MONGODB_NAME=$mongodb_name' | \
      tee -a ~/.bash_profile ~/.bashrc
  fi && \
  if [ "$mongodb_host" != "" ]; then
    echo 'export MONGODB_HOST=$mongodb_host' | \
      tee -a ~/.bash_profile ~/.bashrc
  fi && \
  if [ "$mongodb_port" != "" ]; then
    echo 'export MONGODB_PORT=$mongodb_port' | \
      tee -a ~/.bash_profile ~/.bashrc
  fi && \
  if [ "$mongodb_user" != "" ]; then
    echo 'export MONGODB_USER=$mongodb_user' | \
      tee -a ~/.bash_profile ~/.bashrc
  fi && \
  if [ "$mongodb_pass" != "" ]; then
    echo 'export MONGODB_PASS=$mongodb_pass' | \
      tee -a ~/.bash_profile ~/.bashrc
  fi
fi
)
