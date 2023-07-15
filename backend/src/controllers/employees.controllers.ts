import {Request, Response} from "express";
import {Employees} from "../entities/Employees";
import xlsx from "xlsx";
import { format } from "path";

export const createEmployee = async (req: Request, res: Response) => {
    try {
        const {employeeName, date, punchIn, punchOut} = req.body;
        const employee = new Employees();

        employee.employeeName = employeeName;
        employee.date = date;
        employee.punchIn = punchIn;
        employee.punchOut = punchOut;

        await employee.save();

        return res.json(employee);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
};

export const createEmployeeByExcel = async (req: Request, res: Response) => {
    function formatDate ( value:any ):Date {
        if (typeof value === 'number' && !isNaN(value)) {
            if(Number.isInteger(value)) {
                const date = xlsx.SSF.format('dd/mm/yyyy', value)
                return new Date(date)
            } else {
                const hours = Math.floor(value)
                const minutesToDecimal = value % 1;
                const minutes = Math.floor(minutesToDecimal * 60)
                const dateFromTime = new Date()
                dateFromTime.setHours(hours, minutes,0)
                return dateFromTime
            }
        } 
        return value
    }

    const workbook = xlsx.read(req.file?.buffer, {type: "buffer"});
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet);
    
    try {
        const excelEmployees = data.map((row: any) => {
            const employee = new Employees();
            employee.employeeName = row.employeeName;
            employee.date = formatDate(row.date);
            employee.punchIn = formatDate(row.punchIn);
            employee.punchOut = formatDate(row.punchOut);

            return employee;
        });
        await Employees.save(excelEmployees);
        res.status(200).send('Employees created succesfully! :)')
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
};

export const getEmployees = async (req: Request, res: Response) => {
    try {
        const employees = await Employees.find();
        return res.json(employees);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
};

export const getEmployee = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const employee = await Employees.findOneBy({employeeID: parseInt(id)});

        if (!employee)
            return res.status(404).json({message: "Employee not found"});

        return res.json(employee);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
};

export const updateEmployee = async (req: Request, res: Response) => {
    try {
        /*
         *  @param req.body - { employeeName, date, punchIn, punchOut }
         */
        const {id} = req.params;
        const employee = await Employees.findOneBy({employeeID: parseInt(id)});

        if (!employee)
            return res.status(404).json({message: "Employee not found"});

        Employees.update({employeeID: parseInt(id)}, req.body);

        return res.sendStatus(200);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
};

export const deleteEmployee = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const result = await Employees.delete({employeeID: parseInt(id)});

        if (result.affected === 0) {
            return res.status(404).json({message: "Employee not found"});
        }

        return res.sendStatus(200);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
};
