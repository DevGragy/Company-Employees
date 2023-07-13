import {Routes, Route} from "react-router-dom";
import EmployeePage from "./pages/EmployeePage.jsx";
import EmployeeForm from "./pages/EmployeeForm.jsx";
import NotFound from "./pages/NotFound.jsx";
import Navbar from "./components/Navbar.jsx";
import {EmployeeContextProvider} from "./context/EmployeeContext.jsx";

const App = () => {
    return (
        <div className="bg-white h-screen">
            <Navbar />
            <div className="container mx-auto py-4">
                <EmployeeContextProvider>
                    <Routes>
                        <Route path="/" element={<EmployeePage />} />
                        <Route path="/create" element={<EmployeeForm />} />
                        <Route path="/update/:id" element={<EmployeeForm />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </EmployeeContextProvider>
            </div>
        </div>
    );
};

export default App;
