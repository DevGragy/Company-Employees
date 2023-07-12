import {deleteEmployeeReq} from "../api/employees.api";

const EmployeeCard = ({employee}) => {
    const handleDelete = async (employeeID) => {
        try {
            const response = await deleteEmployeeReq(employeeID);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h3>{employee.employeeName}</h3>
            <h4>{employee.date}</h4>
            <div>
                <p>Punch In: {employee.punchIn}</p>
                <p>Punch Out: {employee.punchOut}</p>
            </div>
            <button>Edit</button>
            <button
                onClick={() => {
                    handleDelete(employee.employeeID);
                }}
            >
                Delete
            </button>
        </div>
    );
};

export default EmployeeCard;
