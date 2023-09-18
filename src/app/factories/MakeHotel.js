import { HotelRepositorie } from "../repositories/HotelRepositories.js";
import { HoteService } from "../services/HotelService.js";
import { HotelController } from "../controllers/HotelControllers.js";
import { Hotel } from "../../domain/Hotel.js";

class MakerHotel {
  static getInstance() {
    const repository = new HotelRepositorie(Hotel);
    const service = new HoteService(repository);
    const controllers = new HotelController(service);
    return controllers;
  }
}

export { MakerHotel };
