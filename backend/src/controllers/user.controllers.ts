import {Request, Response} from "express";
import {User} from "../entities/User";

export const createUser = async (req: Request, res: Response) => {
    try {
        const {employeeName, date, punchIn, punchOut} = req.body;
        const user = new User();

        user.employeeName = employeeName;
        user.date = date;
        user.punchIn = punchIn;
        user.punchOut = punchOut;

        await user.save()

        return res.json(user)
    } catch (error) {
        if ( error instanceof Error ) {
            return res.status(500).json({ message: error.message })
        }
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find()
        return res.json(users)
    } catch (error) {
        if ( error instanceof Error ) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const user = await User.findOneBy({ employeeID: parseInt(req.params.id) })

        if(!user) return res.status(404).json({ message: "User not found"})
        
        return res.json(user)
    } catch (error) {
        if ( error instanceof Error ) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        /*
         *  @param req.body - { employeeName, date, punchIn, punchOut }
         */
        const { id } = req.params
        const user = await User.findOneBy({ employeeID: parseInt(req.params.id) })
    
        if(!user) return res.status(404).json({ message: "User not found"})
    
        User.update( { employeeID: parseInt(id)}, req.body )
    
        return res.sendStatus(200) 
    } catch (error) {
        if ( error instanceof Error ) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await User.delete( { employeeID: parseInt(id)} )
    
        if ( result.affected === 0 ) {
            return res.status(404).json({ message: 'User not found'})
        }
    
        return res.sendStatus(200) 
    } catch (error) {
        if ( error instanceof Error ) {
            return res.status(500).json({ message: error.message })
        }
    }
}