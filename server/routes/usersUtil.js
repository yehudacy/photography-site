const validateSignUpForm = (reqBody) => {
  const validatedForm = { ...reqBody };
  let isValid = true;
  let errMsg = "";
  const requiredFields = ["firstName", "lastName", "email", "password"];
  const NonRequiredFields = ["street", "buildingNumber", "city"];
  const fieldNames = Object.keys(validatedForm);
  fieldNames.forEach((fieldName) => {
    if (requiredFields.includes(fieldName) && !validatedForm[fieldName]) {
      (errMsg = `${fieldName} is required`), (isValid = false);
    } else if (fieldName === "password") {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
      if (!passwordRegex.test(validatedForm.password)) {
        errMsg = "Password must be at least 6 characters with at least one uppercase and one lowercase letter",
        isValid = false;
      }
    } else if (NonRequiredFields.includes(fieldName)) {
      validatedForm[fieldName] = null;
    }
  });
  return { validatedForm, isValid, errMsg };
};


const validateLogInForm = (loginReq) => {
    let valid = true;
    let errMsg = "";

    if (!loginReq.email) {
      errMsg = "email is required";
      valid = false;
    }
    // Password strength check
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!loginReq.password || !passwordRegex.test(loginReq.password)) {
      errMsg = "Password must be at least 6 characters with at least one uppercase and one lowercase letter";
      valid = false;
    }
    return {valid, errMsg};
  };
module.exports = {validateSignUpForm, validateLogInForm}
