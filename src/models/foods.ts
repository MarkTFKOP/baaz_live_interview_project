import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const FoodSchema = new mongoose.Schema(
  {
    foodName: { type: String, required: true },
    price: { type: Number },
    categoryId: { type: ObjectId },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    createdBy: { type: ObjectId, Date: new Date(), required: true },
    updatedBy: { type: ObjectId, Date: new Date() },
    deletedBy: { type: ObjectId, Date: new Date() },
  },
  { timestamps: true }
);

export default mongoose.model("food", FoodSchema);
