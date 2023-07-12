import axios from 'axios'

export const getEmployeesReq = async () => {
    return await axios.get('http://localhost:4000/employee')
}

export const createEmployeeReq = async (employee) => {
    return await axios.post('http://localhost:4000/employee', employee)
}

export const deleteEmployeeReq = async(employeeID) => {
    return await axios.delete(`http://localhost:4000/employee/${employeeID}`)
}