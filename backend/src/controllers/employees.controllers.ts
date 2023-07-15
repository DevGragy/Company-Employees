import {Request, Response} from "express";
import {Employees} from "../entities/Employees";
import xlsx from "xlsx";

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
    const workbook = xlsx.read(req.file?.buffer, {type: "buffer"});
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet);

    function formatDate(value: any): string {
        if (typeof value === "number" && !isNaN(value)) {
            const date = xlsx.SSF.format("dd/mm/yyyy", value);
            return date;
        }
        return value;
    }

    function formatTime(decHour: number): string {
        const hours = Math.floor(decHour * 24);
        const minutes = Math.round((decHour * 24 - hours) * 60);
        const seconds = 0;
        const newTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        return newTime;
    }

    try {
        const excelEmployees = data.map((row: any) => {
            const employee = new Employees();
            employee.employeeName = row["Employee Name"];
            employee.date = formatDate(row["Date"]);
            employee.punchIn = formatTime(row["Punch In"]);
            employee.punchOut = formatTime(row["Punch Out"]);

            return employee;
        });
        await Employees.save(excelEmployees);
        res.status(200).send("Employees created succesfully! :)");
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
