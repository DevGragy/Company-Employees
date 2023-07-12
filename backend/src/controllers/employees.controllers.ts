import { Request, Response } from "express";
import { Employees } from "../entities/Employees";

export const createEmployee = async (req: Request, res: Response) => {
    try {
        const {employeeName, date, punchIn, punchOut} = req.body;
        const employee = new Employees();

        employee.employeeName = employeeName;
        employee.date = date;
        employee.punchIn = punchIn;
        employee.punchOut = punchOut;

        await employee.save()

        return res.json(employee)
    } catch (error) {
        if ( error instanceof Error ) {
            return res.status(500).json({ message: error.message })
        }
    }
};

export const getEmployees = async (req: Request, res: Response) => {
    try {
        const employees = await Employees.find()
        return res.json(employees)
    } catch (error) {
        if ( error instanceof Error ) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export const getEmployee = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const employee = await Employees.findOneBy({ employeeID: parseInt(id) })

        if(!employee) return res.status(404).json({ message: "Employee not found"})
        
        return res.json(employee)
    } catch (error) {
        if ( error instanceof Error ) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export const updateEmployee = async (req: Request, res: Response) => {
    try {
        /*
         *  @param req.body - { employeeName, date, punchIn, punchOut }
         */
        const { id } = req.params
        const employee = await Employees.findOneBy({ employeeID: parseInt(id) })
    
        if(!employee) return res.status(404).json({ message: "Employee not found"})
    
        Employees.update( { employeeID: parseInt(id)}, req.body )
    
        return res.sendStatus(200) 
    } catch (error) {
        if ( error instanceof Error ) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export const deleteEmployee = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await Employees.delete( { employeeID: parseInt(id)} )
    
        if ( result.affected === 0 ) {
            return res.status(404).json({ message: 'Employee not found'})
        }
    
        return res.sendStatus(200) 
    } catch (error) {
        if ( error instanceof Error ) {
            return res.status(500).json({ message: error.message })
        }
    }
}