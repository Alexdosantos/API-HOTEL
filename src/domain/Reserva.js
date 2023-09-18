import mongoose from "mongoose";

const ReservaSchema = mongoose.Schema({
  usuario: [{ type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }],
  hotel: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hotel" }],
  dataEntrada: Date,
  dataSaida: Date,
  status: { type: String, enum: ["Reservado", "Livre"], default: "Livre" }, // Defina um valor padrão se necessário
});
const Reserva = mongoose.model("Reservas", ReservaSchema);
export { Reserva };
