class HoteService {
  constructor(repositorie) {
    this.repository = repositorie;
  }

  async create(data) {
    const result = await this.repository.find(data);
    return { result };
  }

  async searchHotelByAddress(address) {
    try {
      const hotels = await this.repository.findHotels({ address: { $regex: new RegExp(address, "i") } });
  
      return hotels;
    } catch (error) {

      return {error:true , message:"Erro ao buscar hotéis por endereço no repositório" , status:401, details: error.message}
      
    }
  }
  
  
  
}
export { HoteService };
