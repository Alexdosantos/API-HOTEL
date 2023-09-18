class HotelRepositorie {
  constructor(model) {
    this.model = model;
  }

  async find(data) {
    const result = await this.model.create(data);
    console.log("hotel criado");
    return result;
  }
  async findHotels(data) {
    try {
      const hotels = await this.model.find(data);
      return hotels;
    } catch (error) {
      return {error:true , message:"Erro ao buscar hotéis por endereço no repositório" , status:401, details: error.message}
      
    }
  }
  async findById(id) {
    return this.model.findById(id);
  }

  async pushHotel( hotelId,novaReserva) {
    return await this.model.findOneAndUpdate(
      { _id: hotelId },
      { $push: {reservas: novaReserva } },// supondo que "reservas" seja um array no modelo do usuário
      { new: true } //procura pelo id do hotel que está sendo atualizado
    );
  }
}
export { HotelRepositorie };
