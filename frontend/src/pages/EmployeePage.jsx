import {useEffect} from "react";
import EmployeeCard from "../components/EmployeeCard";
import {useEmployee} from '../context/EmployeeContext'

const EmployeePage = () => {
    const {employees, getEmployees} = useEmployee()

    useEffect(() => {
        getEmployees();
    }, []);

    if (employees.length === 0) return <h2>No DATA Available!</h2>

    return (
        <div>
            <h1 className="text-4xl font-bold text-center text-zinc-900 m-4">Employees</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-2">
            {employees.map(employee => (
                <EmployeeCard employee={employee} key={employee.employeeID} />
            ))}
            </div>
        </div>
    );
};

export default EmployeePage;
