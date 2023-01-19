import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const CategorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, required: true },
    categoryId: { type: Number },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    parentId: { type: ObjectId },
    createdBy: { type: ObjectId, Date: new Date(), required: true },
    updatedBy: { type: ObjectId, Date: new Date() },
    deletedBy: { type: ObjectId, Date: new Date() },
  },
  { timestamps: true }
);

CategorySchema.pre("save", function (this, next, done) {
  next();
});
CategorySchema.post("save", function (this, next, done) {
  done();
});

export default mongoose.model("category", CategorySchema);
