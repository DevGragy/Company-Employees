import {useEffect, useState} from "react";
import {getEmployeesReq} from "../api/employees.api";
import EmployeeCard from "../components/EmployeeCard";

const EmployeePage = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        async function getEmployees() {
            const response = await getEmployeesReq();
            setEmployees(response.data);
        }
        getEmployees();
    }, []);

    if (employees.length === 0) return <h2>No DATA Available!</h2>

    return (
        <div>
            <h1>Employees</h1>
            {employees.map(employee => (
                <EmployeeCard employee={employee} key={employee.employeeID} />
            ))}
        </div>
    );
};

export default EmployeePage;
