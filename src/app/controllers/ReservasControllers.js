import * as yup from "yup";
import { CommoError } from "../../utils/commoError.js";

class ReservaController {
  constructor(servise) {
    this.servise = servise;
  }

  async create(req, res) {
    const {
      body,
      params: { usuarioId, hotelId },
    } = req;

    // Define o schema de validação usando Yup
    const reservaSchema = yup.object({
      dataEntrada: yup
        .date()
        .required("Data de entrada obrigatória")
        .min(new Date(), "A data de entrada deve ser no futuro"), // Garante que a data de entrada seja no futuro
      dataSaida: yup
        .date()
        .required("Data de saída obrigatória")
        .min(yup.ref("dataEntrada"), "A data de saída deve ser posterior à data de entrada"), // Garante que a data de saída seja posterior à data de entrada
      status: yup.string().required("Status de reserva obrigatório"),
    });

    try {
      // Valida o corpo da solicitação com o schema Yup
      await reservaSchema.validate(body);

      const result = await this.servise.create(usuarioId, hotelId, body);

      console.log("Procurando dados", result);

      if ("error" in result) {
        return res.status(result.status).json(result);
      }

      return res.status(201).json({ result });
    } catch (error) {
      return res.status(400).json(CommoError.build("Erro na reserva", 400));
    }
  }
}

export { ReservaController };
