import { body } from "express-validator";
export const loginValidations = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("You must enter an email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be longer than 6 characters")
    .isLength({ max: 25 })
    .withMessage("Password must be less than 25 characters"),
];
export const registerValidations = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be longer than 3 characters"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("You must enter an email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be longer than 6 characters")
    .isLength({ max: 25 })
    .withMessage("Password must be less than 25 characters"),
];
