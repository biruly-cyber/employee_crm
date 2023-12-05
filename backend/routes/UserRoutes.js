import express from "express"
import { registration } from "../controller/User.js"

const router  =  express.Router()


//routes for registration
router.post("/signup", registration)