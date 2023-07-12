import {Form, Formik} from "formik";
import {createEmployeeReq} from "../api/employees.api";

const EmployeeForm = () => {
    return (
        <div>
            <Formik
                initialValues={{
                    employeeName: "",
                    date: "",
                    punchIn: "",
                    punchOut: "",
                }}
                onSubmit={async (values, actions) => {
                    console.log(values);
                    try {
                        const response = await createEmployeeReq(values);
                        console.log(response);
                        actions.resetForm();
                    } catch (error) {
                        console.error(error);
                    }
                }}
            >
                {({values, isSubmitting, handleChange, handleSubmit}) => (
                    <Form onSubmit={handleSubmit}>
                        <label>Employee Name</label>
                        <input
                            type="text"
                            name="employeeName"
                            placeholder="Enter a name"
                            onChange={handleChange}
                            value={values.employeeName}
                        />

                        <label>Date</label>
                        <input
                            type="date"
                            name="date"
                            onChange={handleChange}
                            value={values.date}
                        />

                        <label>Punch In</label>
                        <input
                            type="time"
                            name="punchIn"
                            onChange={handleChange}
                            value={values.punchIn}
                        />

                        <label>Punch Out</label>
                        <input
                            type="time"
                            name="punchOut"
                            onChange={handleChange}
                            value={values.punchOut}
                        />

                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Saving" : "Save"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EmployeeForm;
