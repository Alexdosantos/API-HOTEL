import { Router } from "express";
import { MakerUsers } from "../app/factories/MakeUser.js";
import { MakerHotel } from "../app/factories/MakeHotel.js";
import { MakerReserva } from "../app/factories/MakeReserva.js";
import { Authentication } from "../app/authentication/Authentication.js";

const router = Router();
const controller = MakerUsers.getInstance();
const controllerHotel = MakerHotel.getInstance()
const controllerReserva = MakerReserva.getInstance()

router.post("/user", controller.create.bind(controller));
router.post("/login", controller.loginUser.bind(controller));
router.post("/hotel" , controllerHotel.create.bind(controllerHotel))
router.get("/userlist",controller.getUsers.bind(controller))

router.post("/user/:usuarioId/hotel/:hotelId/reserva", controllerReserva.create.bind(controllerReserva));


router.use(Authentication.authentic); 

const routerUser = router
export { routerUser };
