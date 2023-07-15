# Keyence Technical Test

### Make sure you run the following command on both 
- npm i

## FrontEnd
Handle url local or prod, you can see 
- PROD: https://keyence-test.netlify.app
- LOCAL: http://localhost:4000/employee

## Backend
To make a correct POST from curl, dont change "file" word on the next line. My file was on D: Disk, choose the rigth path were you have the file.
- curl -X POST -F "file=@D:\datos.xlsx" https://keyence-production.up.railway.app/employees

Again we can handle on Local
- curl -X POST -F "file=@D:\datos.xlsx" http://localhost:4000/employees
