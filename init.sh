#!/bin/bash

line="--------------------------------------"
form="%s\n%s:\n%s\n"

#install backend modules
printf "$form" "$line" "Installing modules for backend" "$line"
cd backend
npm install

#install frontend modules
echo ""
printf "$form" "$line" "Installing modules for frontend" "$line"
cd ../frontend
npm install

#build react
echo ""
printf "$form" "$line" "Building React" "$line"
npm run build
echo "Done."

#quit on user input
echo ""
read -n 1 -s -r -p "Press any key to quit"