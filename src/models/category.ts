import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const CategorySchema = new mongoose.Schema(
  {
    categoryName: { type: String },
    categoryId: { type: Number },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    parentId: { type: ObjectId },
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
