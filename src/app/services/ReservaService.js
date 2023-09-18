class ReservaService {
  constructor(userRepository, hotelRepository, reservaRepository) {
    this.userRepository = userRepository;
    this.reservaRepository = reservaRepository;
    this.hotelRepository = hotelRepository;
  }

  async create(usuarioId, hotelId,  data) {
    try {
      const userExiste = await this.userRepository.findById(usuarioId);

      if (!userExiste) {
        return {
          error: true,
          message: "Usuário não encontrado",
          status: 404,
        };
      }

      const hotelExiste = await this.hotelRepository.findById(hotelId);

      if (!hotelExiste) {
        return {
          error: true,
          message: "Hotel não encontrado",
          status: 404,
        };
      }

      const entrada = new Date(data.dataEntrada);
      const saida = new Date(data.dataSaida);
      console.log("data entrada",entrada)
      console.log("data saida",saida)

      if (isNaN(entrada) || isNaN(saida) || entrada >= saida) {
        return {
          error: true,
          message: "Datas de entrada ou saída inválidas",
          status: 400,
        };
      }

      const reservasExiste = await this.reservaRepository.findReservasByHotelAndData(
        hotelId,
        entrada,
        saida
      );

      if (reservasExiste.length > 0) {
        return {
          error: true,
          message: "Datas não disponíveis para reserva",
          status: 404,
        };
      }

      const reserva = {
        usuario: usuarioId, // Usando o objeto completo de usuário
        hotel: hotelId, // Usando o objeto completo de hotel
        dataEntrada: entrada,
        dataSaida: saida,
        status: "Reservado",
      };

      const novaReserva = await this.reservaRepository.create(reserva);

      // // Adicione a nova reserva ao campo reserva do usuário
      userExiste.reserva.push(novaReserva);

      // // Salve o usuário para atualizar as reservas
      await userExiste.save();

      // Agora retorne o objeto completo de reserva
      return novaReserva;
    } catch (error) {
      return {
        error: true,
        message: "Erro ao criar reserva",
        status: 500,
        details: error.message,
      };
    }
  }
}

export { ReservaService };
