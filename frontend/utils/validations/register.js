import {
  EMAIL_REGEX,
  MAX_NAME_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  PASSWORD_REGEX,
} from "../../constants";

export default function registerValidate(user) {
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
    return "Name is required";
  } else if (name.length > MAX_NAME_LENGTH) {
    return `Name must be less than ${MAX_NAME_LENGTH} characters`;
  }

  if (!email) {
    return "Email is required";
  } else if (!EMAIL_REGEX.test(email)) {
    return "A valid email is required";
  }

  if (!password) {
    return "Password is required";
  } else if (!PASSWORD_REGEX.test(password)) {
    return `Password must be ${MIN_PASSWORD_LENGTH}-${MAX_PASSWORD_LENGTH} characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character`;
  }

  if (password !== confirmPassword) {
    return "Password and confirm password do not match";
  }
}
