class ReservaRepositorie {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      console.log(data);
      const result = await this.model.create(data);
      console.log("Reserva criada");
      return result;
    } catch (error) {
      return { error: `Erro ao criar reserva: ${error.message}`, status: 400 };
    }
  }

  async findReservasByHotelAndData(hotelId, dataEntrada, dataSaida) {
    try {
      const reservas = await this.model.find({
        hotel: hotelId,
        dataEntrada: { $lte: dataSaida }, // Verifica se a data de entrada é menor ou igual à data de saída
        dataSaida: { $gte: dataEntrada },   // Verifica se a data de saída é maior ou igual à data de entrada
      })
      
      return reservas;
    } catch (error) {
      return { error: `Erro ao buscar reservas: ${error.message}`, status: 500 };
    }
  }
}

export { ReservaRepositorie };
