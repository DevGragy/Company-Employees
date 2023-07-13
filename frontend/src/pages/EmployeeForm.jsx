import {Form, Formik} from "formik";
import {useEmployee} from "../context/EmployeeContext";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const EmployeeForm = () => {
    const {createEmployee, getEmployee, updateEmployee} = useEmployee();
    const navigate = useNavigate();
    const params = useParams();
    const [employee, setEmployee] = useState({
        employeeName: "",
        date: "",
        punchIn: "",
        punchOut: "",
    });

    useEffect(() => {
        const loadEmployee = async () => {
            if (params.id) {
                const response = await getEmployee(params.id);
                console.log(response);
                setEmployee({
                    employeeName: response.employeeName,
                    date: response.date,
                    punchIn: response.punchIn,
                    punchOut: response.punchOut,
                });
            }
        };
        loadEmployee();
    }, []);

    return (
        <div>
            <h1 className="text-4xl font-bold text-center text-zinc-900 m-4">
                {!params.id ? "Create Employee" : "Update Employee"}
            </h1>
            <Formik
                initialValues={employee}
                enableReinitialize={true}
                onSubmit={async (values) => {
                    if (params.id) {
                        await updateEmployee(params.id, values);
                    } else {
                        await createEmployee(values);
                    }
                    navigate("/");
                    setEmployee({
                        employeeName: "",
                        date: "",
                        punchIn: "",
                        punchOut: "",
                    });
                }}
            >
                {({values, isSubmitting, handleChange, handleSubmit}) => (
                    <Form
                        onSubmit={handleSubmit}
                        className="bg-slate-100 shadow rounded-md p-4 flex flex-col max-w-sm mx-auto text-zinc-900"
                    >
                        <label className="font-bold m-1">Employee Name</label>
                        <input
                            type="text"
                            name="employeeName"
                            placeholder="Enter a name"
                            onChange={handleChange}
                            value={values.employeeName}
                            className="p-2 rounded-sm mb-3"
                        />

                        <label className="font-bold m-1">Date</label>
                        <input
                            type="date"
                            name="date"
                            onChange={handleChange}
                            value={values.date}
                            className="p-2 rounded-sm mb-3"
                        />

                        <label className="font-bold m-1">Punch In</label>
                        <input
                            type="time"
                            name="punchIn"
                            onChange={handleChange}
                            value={values.punchIn}
                            className="p-2 rounded-sm mb-3"
                        />

                        <label className="font-bold m-1">Punch Out</label>
                        <input
                            type="time"
                            name="punchOut"
                            onChange={handleChange}
                            value={values.punchOut}
                            className="p-2 rounded-sm mb-3"
                        />

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-indigo-500 py-2 m-4 rounded-md text-slate-100"
                        >
                            {isSubmitting ? "Saving" : "Save"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EmployeeForm;
