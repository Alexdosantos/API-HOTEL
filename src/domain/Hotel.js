import mongoose from "mongoose";

const HotelSchema = mongoose.Schema(
  {
    name: { type: String },
    address: { type: String, required: [true, "O endereço é obrigatório"] },
    availablerooms: { type: Number },
  },
  { timestamps: true }
);

const Hotel = mongoose.model("Hotel", HotelSchema);

export { Hotel };
