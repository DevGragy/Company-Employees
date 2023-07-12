import { Router } from 'express'
import { createEmployee, getEmployees, getEmployee, updateEmployee, deleteEmployee } from '../controllers/employees.controllers'

const router = Router()

router.post('/employee', createEmployee)
router.get ('/employee', getEmployees)
router.get('/employee/:id', getEmployee)
router.put('/employee/:id', updateEmployee)
router.delete('/employee/:id', deleteEmployee)

export default router