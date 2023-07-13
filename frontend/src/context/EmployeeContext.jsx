import {useState, createContext, useContext} from "react";
import {
    createEmployeeReq,
    getEmployeesReq,
    getEmployeeReq,
    updateEmployeeReq,
    deleteEmployeeReq
} from "../api/employees.api";

export const EmployeeContext = createContext();

export const useEmployee = () => {
    const context = useContext(EmployeeContext);
    if (!context) {
        throw new Error(
            "useEmployee should be mount on EmployeeContextProvider"
        );
    }
    return context;
};

export const EmployeeContextProvider = ({children}) => {
    const [employees, setEmployees] = useState([]);

    const createEmployee = async (values) => {
        try {
            const response = await createEmployeeReq(values);
            console.log(response);
            setEmployees([...employees, response.data]);
        } catch (error) {
            console.error(error);
        }
    };

    const getEmployees = async () => {
        try {
            const response = await getEmployeesReq();
            setEmployees(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getEmployee = async (employeeID) => {
        try {
            const response = await getEmployeeReq(employeeID);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    const updateEmployee = async (employeeID, payload) => {
        try {
            const response = await updateEmployeeReq(employeeID, payload)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    const deleteEmployee = async (employeeID) => {
        try {
            const response = await deleteEmployeeReq(employeeID);
            setEmployees(
                employees.filter(
                    (employee) => employee.employeeID !== employeeID
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <EmployeeContext.Provider
            value={{
                employees,
                createEmployee,
                getEmployees,
                getEmployee,
                updateEmployee,
                deleteEmployee
            }}
        >
            {children}
        </EmployeeContext.Provider>
    );
};
