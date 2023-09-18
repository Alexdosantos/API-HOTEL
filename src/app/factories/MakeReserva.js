import { ReservaRepositorie } from "../repositories/ReservaRepositories.js";
import { ReservaService } from "../services/ReservaService.js";
import { ReservaController } from "../controllers/ReservasControllers.js";
import { HotelRepositorie } from "../repositories/HotelRepositories.js";
import { UserRepository } from "../repositories/UserRepositories.js";
import { User } from "../../domain/User.js";
import { Reserva } from "../../domain/Reserva.js";
import { Hotel } from "../../domain/Hotel.js";

class MakerReserva {
  static getInstance() {
    const repositorie = new ReservaRepositorie(Reserva);
    const hotelRepository = new HotelRepositorie(Hotel) 
 
    const userRepository=  new UserRepository(User)
    console.log(userRepository)
    const service = new ReservaService(userRepository,hotelRepository,repositorie  );
    const controllers = new ReservaController(service);
    return controllers;
  }
}

export { MakerReserva };
