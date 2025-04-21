import mongoose, { Document, Schema } from 'mongoose';

// schema of the Apartment
export interface IApartment extends Document {
  unitName: string;
  unitNumber: number;
  project: string;
  location: string;
  description: string;
  area: number;
  price: number;
  bedRooms: number;
  bathRooms: number;
  images: string[];
}

const ApartmentSchema: Schema = new Schema({
  unitName: {
    type: String,
    required: true,
  },
  unitNumber: {
    type: Number,
    required: true,
  },
  project: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  area: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  bedRooms: {
    type: Number,
    required: true,
  },
  bathRooms: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
});

export default mongoose.model<IApartment>('Apartment', ApartmentSchema);
