import { EMAIL_REGEX, MAX_NAME_LENGTH } from "../../constants";
import { passwordValidate } from "./password";

export const registerValidate = (user) => {
  const errors = [];

  const {
    name = "",
    email = "",
    password = "",
    confirmPassword = "",
  } = {
    name: user.name?.trim(),
    email: user.email?.trim(),
    password: user.password?.trim(),
    confirmPassword: user.confirmPassword?.trim(),
  };

  if (!name) {
    errors.push({ field: "name", message: "Name is required" });
  } else if (name.length > MAX_NAME_LENGTH) {
    errors.push({
      field: "name",
      message: `Name must be less than ${MAX_NAME_LENGTH} characters`,
    });
  }

  if (!email) {
    errors.push({ field: "email", message: "Email is required" });
  } else if (!EMAIL_REGEX.test(email)) {
    errors.push({ field: "email", message: "A valid email is required" });
  }

  const passwordError = passwordValidate(password, confirmPassword);

  if (passwordError.length) {
    errors.push(...passwordError);
  }

  return errors;
};
