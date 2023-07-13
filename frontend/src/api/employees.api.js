import axios from 'axios'

export const createEmployeeReq = async (employee) => {
    return await axios.post('https://keyence-production.up.railway.app/employee', employee)
}

export const getEmployeesReq = async () => {
    return await axios.get('https://keyence-production.up.railway.app/employee')
}

export const getEmployeeReq = async (employeeID) => {
    return await axios.get(`https://keyence-production.up.railway.app/employee/${employeeID}`)
}

export const updateEmployeeReq = async (employeeID, payload) => {
    return await axios.put(`https://keyence-production.up.railway.app/employee/${employeeID}`, payload)
}

export const deleteEmployeeReq = async(employeeID) => {
    return await axios.delete(`https://keyence-production.up.railway.app/employee/${employeeID}`)
}