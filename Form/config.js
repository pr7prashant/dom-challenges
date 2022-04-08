const submitForm = (e) => {
  e.preventDefault();

  const data = new FormData(e.target);
  const formJSON = Object.fromEntries(data.entries());
  console.log(formJSON);
};

const config = {
  id: "form",
  submitHandler: submitForm,
  elements: [
    {
      id: "first_name",
      type: "input",
      inputType: "text",
      placeholder: "First Name",
      required: true,
      label: "First Name",
      name: "first_name",
    },
    {
      id: "last_name",
      type: "input",
      inputType: "text",
      placeholder: "Last Name",
      required: true,
      label: "Last Name",
      name: "last_name",
    },
    {
      id: "profession",
      type: "dropdown",
      label: "Profession",
      name: "profession",
      options: [
        {
          label: "Job",
          value: "job",
        },
        {
          label: "Student",
          value: "student",
        },
      ],
    },
    {
      id: "gender",
      type: "radio",
      name: "gender",
      label: "Gender",
      options: [
        {
          id: "male",
          label: "Male",
          value: "male",
        },
        {
          id: "female",
          label: "Female",
          value: "female",
        },
      ],
    },
    {
      id: "btn-submit",
      type: "button",
      text: "Submit",
    },
  ],
};

export default config;
