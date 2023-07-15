import {Router} from "express";
import {
    createEmployee,
    getEmployees,
    getEmployee,
    updateEmployee,
    deleteEmployee, 
    createEmployeeByExcel
} from "../controllers/employees.controllers";
import multer from 'multer'


const router = Router();
const storage = multer.memoryStorage()
const upload = multer({storage})
router.post("/employee", createEmployee);
router.get("/employee", getEmployees);
router.get("/employee/:id", getEmployee);
router.put("/employee/:id", updateEmployee);
router.delete("/employee/:id", deleteEmployee);
router.post("/employees", upload.single('file'), createEmployeeByExcel);

export default router;
