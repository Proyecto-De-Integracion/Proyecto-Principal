import mongoose from "mongoose";
const validatorId = (Id) => {
  const valor = mongoose.Types.ObjectId.isValid(Id);
  return { valor };
};
