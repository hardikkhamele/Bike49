import mongoose, { Schema, Document } from 'mongoose';

export interface IVehicle extends Document {
  name: string;
  variant?: string;
  price: number;
  year: number;
  driven: number;
  rc: string;
  ownership: string;
  rto: string;
  city: string;
  image: string;
  type: string;
  emission?: string;
  verified?: boolean;
  status: 'pending' | 'approved' | 'rejected';
}

const VehicleSchema: Schema = new Schema({
  name: { type: String, required: true },
  variant: { type: String },
  price: { type: Number, required: true },
  year: { type: Number, required: true },
  driven: { type: Number, required: true },
  rc: { type: String, required: true },
  ownership: { type: String, required: true },
  rto: { type: String, required: true },
  city: { type: String, required: true },
  image: { type: String, required: true },
  type: { type: String, required: true },
  emission: { type: String },
  verified: { type: Boolean, default: false },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
}, {
  timestamps: true
});

export default mongoose.models.Vehicle || mongoose.model<IVehicle>('Vehicle', VehicleSchema);
