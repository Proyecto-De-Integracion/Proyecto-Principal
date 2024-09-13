import { publications } from "../models/publications.model.js";
import color from "chalk";

export const getPublications = (req, res) => {
  const { files } = req.body;
  console.log(files);
  console.log(req.body);
};

export const createPublications = async (req, res) => {
  console.log(req);
};
