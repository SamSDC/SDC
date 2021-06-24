import React, { useState }  from "react";
import Modal from './Modal.jsx'
import style from "./QuestionList.module.css";

const AnswerForm = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [charCountName, setCharCountName] = useState(60);
  const [charCountEmail, setCharCountEmail] = useState(60);
  const [charCountBody, setCharCountBody] = useState(1000);
  const [error, setError] = useState('');
  const [submitted, setsubmitted] = useState(false);

  const handleNameChange = (event) => {
    let input = event.target.value;

    setCharCountName(50 - input.length)
    setName(event.target.value);
    setError('');
  }

  const handleEmailChange = (event) => {
    let input = event.target.value;

    setCharCountEmail(50 - input.length);
    setEmail(event.target.value);
    setError('');
  }

  const handleBodyChange = (event) => {
    let input = event.target.value;

    setCharCountBody(1000 - input.length);
    setBody(input);
    setError('');
  }

  const validateForm = () => {
    let errors = {};

    if (!name) {
      errors.name = 'Name is required';
    }

    if (!email) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email address is invalid';
    }

    if (!body) {
      errors.body = 'Message body is required';
    }

    return errors;
  }

  const handleFormSubmit = async () => {
    const errors = validateForm();

    if (Object.keys(errors).length !== 0) {
      setError(errors);
    } else {
      let questionForm = {
        product_id: props.productId,
        name,
        email,
        body
      }

      props.addQuestion()

      try {
        const response = await fetch(`/api/qa/questions?product_id=${props.productId}`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(questionForm)
        })
        setsubmitted(true);

      } catch(err) {
        console.log("err", err)
      }
    }
  }

  const styleNameInput = error.name ? style.dangerOutline : style.formName;

  const styleEmailInput = error.email ? style.dangerOutline : style.formEmail;

  const styleBodyInput = error.body ? style.dangerBodyOutline : style.formBody;


  return (
    <div>
      <div className={style.form}>
        <h2 className={style.formWrapper}>Ask Your Question</h2>
        <div className={style.productNameWrapper}>About the {props.productName}</div>
        <div className={style.inputContainer}>
          <div className={style.labelForm}>What is your nickname</div>
          <div>
            <input
              className={styleNameInput}
              name="name"
              type="text"
              placeholder="Example: jack11!"
              value={name || ''}
              maxLength = "60"
              required
              onChange={handleNameChange}
            />
            <div>
              <p className={style.finePrint}>For privacy reasons, do not use your full name or email address
              </p>
              <div className={style.charCount}>Characters left <span className={style.charCountBold}>{charCountName}</span></div>
            </div>
             {error.name && (
                <p className={style.danger}>{error.name}</p>
             )}
          </div>
          <div className={style.labelForm}>Your email</div>
          <div>
            <input
              className={styleEmailInput}
              name="email"
              type="test"
              placeholder="Example: jack@email.com"
              value={email || ''}
              maxLength = "60"
              required aria-required="true"
              onChange={handleEmailChange}
            />
            <div>
              <p className={style.finePrint}>For authentication reasons, you will not be emailed</p>
              <div className={style.charCount}>Characters left <span className={style.charCountBold}>{charCountEmail}</span></div>
            </div>
             {error.email && (
                <p className={style.danger}>{error.email}</p>
             )}
          </div>
          <div className={style.labelForm}>Your Question</div>
          <div>
            <textarea
              className={styleBodyInput}
              name="body"
              type="test"
              placeholder="Why did you like the product or not?"
              value={body || ''}
              maxLength = "1000"
              required aria-required="true"
              onChange={handleBodyChange}
            />
            <div>
              <div className={style.charCount}>Characters left <span className={style.charCountBold}>{charCountBody}</span></div>
            </div>
             {error.body && (
                <p className={style.danger}>{error.body}</p>
             )}
          </div>
        </div>
      </div>
      <div
        className={style.formButton}>
        <button
          onClick={handleFormSubmit}>
            Submit
        </button>
        {submitted && (
                <p className={style.submittedForm}>Submitted!</p>
             )}
      </div>
    </div>
  );
}

export default AnswerForm;