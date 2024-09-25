import mongoose from "mongoose";
export const validatorId = (Id) => {
  const valor = mongoose.Types.ObjectId.isValid(Id);
  return { valor };
};
