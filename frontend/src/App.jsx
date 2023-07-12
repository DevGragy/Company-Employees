import {Routes, Route} from "react-router-dom";
import EmployeePage from "./pages/EmployeePage.jsx";
import EmployeeForm from "./pages/EmployeeForm.jsx";
import NotFound from "./pages/NotFound.jsx";
import Navbar from "./components/Navbar.jsx";

const App = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<EmployeePage />} />
                <Route path="/create" element={<EmployeeForm />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default App;
