import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import * as Yup from "yup";

import { feedback } from "./types";
import * as messages from "./formMessages";

const testValidationInitialValues = {
  validationCode: "",
};

const schema = Yup.object().shape({
  validationCode: Yup.string().required(messages.required),
});

const TestValidation = ({ formValues, setFeedback, setRedirectURL }) => {
  const [loadingResend, setLoadingResend] = useState(false);
  const [sucessResendCode, setSucessResendCode] = useState(false);
  const [showResendCode, setShowResendCode] = useState(false);

  const resendValidationCode = () => {
    setLoadingResend(true);
    axios
      .post("/test_requests/resend_code", {
        test_request_id: formValues.test_request_id,
      })
      .then(() => {
        setSucessResendCode(true);
        setLoadingResend(false);

        window.scrollTo(0, 0);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const {
    handleSubmit,
    handleChange,
    values,
    isSubmitting,
    isValidating,
    status,
    errors,
    touched,
  } = useFormik({
    initialValues: testValidationInitialValues,
    validationSchema: schema,
    onSubmit: (values, { setSubmitting, setStatus }) => {
      axios
        .post("/test_requests/validate", {
          test_request_id: formValues.test_request_id,
          code: values.validationCode,
        })
        .then((response) => {
          const { data } = response;
          setFeedback(feedback.SUCCESS);

          window.scrollTo(0, 0);

          if (data.sign_in_url) {
            setRedirectURL(data.sign_in_url);
            setTimeout(() => {
              window.location = data.sign_in_url;
            }, 4000);
          }
        })
        .catch((err) => {
          console.error(err);
          setStatus(err.response.data.message);
        })
        .finally(() => setSubmitting(false));
    },
  });

  useEffect(() => {
    const fields = Object.keys(errors);
    if (fields.length && isSubmitting && isValidating) {
      const field = document.querySelector(`[name="${fields[0]}"]`);
      if (field) {
        window.scrollTo({
          top: field.getBoundingClientRect().top + window.scrollY - 120,
          behavior: "smooth",
        });
      }
    }
  }, [isSubmitting]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowResendCode(true);
    }, 3 * 60 * 100);
    return () => clearTimeout(timeout);
  });

  return (
    <section className="padding-y-fixed">
      <div className="container">
        <h1 className="dark-purple mb-3 text-center h1">Estamos quase lá!</h1>
        <div className="row justify-content-center">
          <p className="purple mb-5 text-center col-12 col-lg-9">
            Enviamos um <b style={{ fontWeight: 600 }}>código de verificação</b>{" "}
            para o e-mail informado. Copie e cole no campo abaixo para acessar o
            Hospedin agora mesmo.
          </p>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-7 col-xl-6">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="validationCode">Código de verificação</label>
                <input
                  id="validationCode"
                  name="validationCode"
                  type="text"
                  className={`form-control ${
                    errors.validationCode &&
                    touched.validationCode &&
                    "is-invalid"
                  }`}
                  onChange={handleChange}
                  value={values.validationCode}
                />
                {errors.validationCode && touched.validationCode ? (
                  <div className="invalid-feedback d-block">
                    {errors.validationCode}
                  </div>
                ) : null}
              </div>

              {status ? (
                <div className="alert bg-danger white alert-icon-left h6 font-weight-normal">
                  {status}
                </div>
              ) : null}

              <button
                className="btn btn-block btn-yellow mt-4"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <React.Fragment>
                    <BeatLoader color="#29415E" size={10} />
                    <span className="d-inline-block ml-2">
                      Processando sua solicitação
                    </span>
                  </React.Fragment>
                ) : (
                  "Confirmar"
                )}
              </button>
            </form>
            {showResendCode ? (
              loadingResend ? (
                <p className="purple text-center col-12 col-lg-12 mt-3 small">
                  Enviando...
                </p>
              ) : !sucessResendCode ? (
                <p
                  className="blue-link text-center col-12 col-lg-12 mt-3 small"
                  onClick={() => resendValidationCode()}
                  style={{ cursor: "pointer" }}
                >
                  Reenviar código de verificação
                </p>
              ) : (
                <p className="purple text-center col-12 col-lg-12 mt-3 small">
                  Código reenviado com sucesso.
                </p>
              )
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestValidation;
