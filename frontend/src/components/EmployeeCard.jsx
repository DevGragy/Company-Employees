import {useEmployee} from "../context/EmployeeContext";
import {useNavigate} from "react-router-dom";

const EmployeeCard = ({employee}) => {
    const {deleteEmployee} = useEmployee();
    const navigate = useNavigate();
    return (
        <div className="bg-slate-100 shadow rounded-md p-4">
            <h2 className="font-bold text-2xl">{employee.employeeName}</h2>
            <h4 className="italic">{employee.date}</h4>
            <div className="flex justify-between">
                <p>
                    <span className="font-bold">Punch In:</span>{" "}
                    {employee.punchIn}
                </p>
                <p>
                    <span className="font-bold">Punch Out:</span>{" "}
                    {employee.punchOut}
                </p>
            </div>
            <footer className="flex justify-between">
                <button
                    className="roundes-xs bg-indigo-500 p-2 m-2 text-white w-full"
                    onClick={() => {
                        navigate(`/update/${employee.employeeID}`);
                    }}
                >
                    Edit
                </button>
                <button
                    className="roundes-xs bg-red-500 p-2 m-2 text-white w-full"
                    onClick={() => {
                        deleteEmployee(employee.employeeID);
                    }}
                >
                    Delete
                </button>
            </footer>
        </div>
    );
};

export default EmployeeCard;
