# keyence technical test

### Make sure you run the following command on both 
- npm i

## FrontEnd
Handle url local or prod
- PROD: https://keyence-production.up.railway.app/employee
- LOCAL: http://localhost:4000/employee

## Backend
To make a correct POST from curl, dont change "file" word on the next line
- curl -X POST -F "file=@D:\datos.xlsx" https://keyence-production.up.railway.app/employees

Again we can handle on Local
- curl -X POST -F "file=@D:\datos.xlsx" http://localhost:4000/employees
