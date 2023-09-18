class UserRepository {
  constructor(model) {
    this.model = model;
  }

  async findByEmail(email) {
    return await this.model.findOne({ $or: [{ email: email }] });
  }
  async create(data) {
    return this.model.create(data);
  }

  async findById(usuarioId) {
    return this.model.findById(usuarioId)
  }

  
  async pushUser(usuarioId, novaReserva) {
    return await this.model.findOneAndUpdate(
      { _id: usuarioId },
      { $push: { reserva: novaReserva} }, // supondo que "reservas" seja um array no modelo do usuário
      { new: true } // procura pelo id do hotel que está sendo atualizado
    );
  }
  
  async findAll(){
    return  await this.model.find().populate("reserva");
  }
}

export { UserRepository };
