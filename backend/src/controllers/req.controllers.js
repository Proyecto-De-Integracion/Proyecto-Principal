import request from "../models/req.model.js";

export const creatorRequest = async (req, res) => {
  const { description } = req.body;
  const { emails, usernames } = req.user;

  console.log(emails);
  console.log(usernames);
  console.log(description);
  const  =  new request;
};
