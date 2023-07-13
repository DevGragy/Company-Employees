import axios from 'axios'

export const createEmployeeReq = async (employee) => {
    return await axios.post('http://localhost:4000/employee', employee)
}

export const getEmployeesReq = async () => {
    return await axios.get('http://localhost:4000/employee')
}

export const getEmployeeReq = async (employeeID) => {
    return await axios.get(`http://localhost:4000/employee/${employeeID}`)
}

export const updateEmployeeReq = async (employeeID, payload) => {
    return await axios.put(`http://localhost:4000/employee/${employeeID}`, payload)
}

export const deleteEmployeeReq = async(employeeID) => {
    return await axios.delete(`http://localhost:4000/employee/${employeeID}`)
}