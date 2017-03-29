# to clean up az install
/Users/josef/lib/azure-cli

# to install
curl -L https://aka.ms/InstallAzureCli | bash

# restart the shell
exec -l $SHELL

# login
az login -u josef@armorpath.com

# create rg
az group create -n ActorServiceCLI -l WestUS

# logout
az logout

===================================

# login
az login -u josef@armorpath.com

# create app service plan
az appservice plan create -n ActorServicePlan -g ActorServiceCLI -l WestUS --sku SHARED

# create web app
az appservice web create -n ActorService -g ActorServiceCLI -p ActorServicePlan

# create custom host entry
az appservice web config hostname add -g ActorServiceCLI --webapp-name ActorService -n actorservice.echefjosef.com

# logout
az logout josef@armorpath.com
