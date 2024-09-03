const validateForm = (formData) => {
  return (
    formData.name && formData.phoneNumber && formData.email && formData.message
  );
};
module.exports = {validateForm}