import * as yup from "yup";
import { CommoError } from "../../utils/commoError.js";

class HotelController {
  constructor(service) {
    this.service = service;
  }

  async create(req, res) {
    const { body } = req;
    const hotelSchema = yup.object({
      name: yup
        .string()
        .required("O nome do Hotel a ser cadastro é obrigatório"),
      address: yup.string().required("O endereço é obrigatório"),
      availablerooms: yup.number(),
    });
    try {
      await hotelSchema.validate(body);
    } catch (error) {
      return res
        .status(400)
        .json(CommoError.build("Erro ao cadastrar o Hotel", 400));
    }

    const result = await this.service.create(body);
    if ("error" in result) {
      return res.status(result.status).json(result);
    }
    return res.status(201).json({ result });
  }

  async searchHotels(req, res) {
    const { address } = req.query; // Obtenha o endereço da consulta de URL

    try {
      // Chame o serviço para buscar hotéis por endereço
      const hotels = await this.service.searchHotelByAddress(
        address,       
      );

      return res.status(200).json(hotels);
    } catch (error) {
      return res
        .status(400)
        .json(CommoError.build("Erro ao buscar o Hotel por endereço", 400));
    }
  }
}

export { HotelController };
