import mongoose from "mongoose";

export interface IService {
  name: string;
}

const serviceSchema = new mongoose.Schema<IService>({
  name: { type: String, required: true, trim: true },
});

export default mongoose.model<IService>("Service", serviceSchema);
