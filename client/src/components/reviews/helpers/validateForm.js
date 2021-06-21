var validateCharacteristics = (ratings, meta) => {
  if (meta) {
    for (var key in meta.characteristics) {
      var id = meta.characteristics[key].id
      if (!ratings[id]) {
        return false;
      }
    }
    return true;
  }
};

var validateForm = (form, meta) => {
  var errors = [];

  if (form.body === "") {
    errors.push("You must enter a review body");
  }
  if (form.body.length < 50) {
    errors.push("Review body must be longer than 50 characters");
  }
  if (form.rating === 0) {
    errors.push("You must provide an overall rating");
  }
  if (form.recommend === null) {
    errors.push("You must select whether or not you recommend the product");
  }
  if (!validateCharacteristics(form.characteristics, meta)) {
    errors.push("You must rate the product on each characteristic");
  }
  if (form.name === "") {
    errors.push("You must enter a nickname");
  }
  if (form.email === "" || !/\S+@\S+\.\S+/.test(form.email)) {
    errors.push("You must enter a valid email address");
  }

  return errors;
};

export default validateForm;
