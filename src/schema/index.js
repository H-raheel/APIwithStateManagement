import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const RegisterSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter email"),
  name: yup.string().required("please enter name"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Please enter password"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please enter password"),
});

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter email"),

  password: yup
    .string()

    .required("Please enter password"),
});

export const EditSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter email"),
  name: yup.string().required("Please enter the name!"),
});

export const newDoctorSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter email"),
  name: yup.string().required("Please enter the name!"),
  contact: yup
    .string()
    .matches(/^[0-9]+$/, "Contact number must be digits only")
    .min(10, "Contact number must be at least 10 digits")
    .required("Please enter the contact number"),
  dc_id: yup.string().required("Please enter the ID"),
});

export const editDoctorSchema = yup.object().shape({
  id:yup
  .string()
  .matches(/^[0-9]+$/).required(),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter email"),
  name: yup.string().required("Please enter the name!"),
  contact: yup
    .string()
    .matches(/^[0-9]+$/, "Contact number must be digits only")
    .min(10, "Contact number must be at least 10 digits")
    .required("Please enter the contact number"),
  dc_id: yup.string().required("Please enter the ID"),
});
