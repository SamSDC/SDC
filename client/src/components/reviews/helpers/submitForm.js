var submitForm = (form) => {
  fetch(`/api/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  }).catch((err) => {
    console.log("err", err);
  });
};

export default submitForm;