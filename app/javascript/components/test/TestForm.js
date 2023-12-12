import { useFormik } from "formik";
import React, { useEffect } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import * as Yup from "yup";

import { companyTypeOptions, comingFromOptions, feedback } from "./types";
import * as messages from "./formMessages";
import { RECAPTCHA_TOKEN } from "./recaptchaToken";

const testFormInitialValues = {
  name: "",
  email: "",
  company: "",
  type: "",
  room: "",
  phone: "",
  coming_from: "",
  reason: "",
  partner_code: "",
};

const schema = Yup.object().shape({
  name: Yup.string().required(messages.required),
  email: Yup.string().email(messages.email).required(messages.required),
  company: Yup.string().required(messages.required),
  type: Yup.string()
    .oneOf(companyTypeOptions.map((opt) => opt[0]))
    .required(messages.required),
  room: Yup.number()
    .min(1, messages.min)
    .max(200, messages.max)
    .required(messages.required),
  phone: Yup.string().required(messages.required),
  coming_from: Yup.string().oneOf(comingFromOptions.map((opt) => opt[0])),
});

const TestForm = ({ setFormValues, setStep, setFeedback }) => {
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
    initialValues: testFormInitialValues,
    validationSchema: schema,
    onSubmit: (values, { setSubmitting, setStatus }) => {
      grecaptcha.ready(() => {
        grecaptcha
          .execute(RECAPTCHA_TOKEN, { action: "create" })
          .then((token) => {
            axios
              .post("/test_requests", {
                recaptcha_token: token,
                ...values,
              })
              .then((response) => {
                if (response.status === 200) {
                  const { data } = response;
                  setFormValues({ ...values, test_request_id: data.id });
                  setStep(2);
                } else {
                  setFeedback(feedback.PENDING);
                }
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                  event: "test_form_submited",
                  ...values,
                });
                window.scrollTo(0, 0);
              })
              .catch((err) => {
                console.error(err);

                setStatus(err.response.data.message);
              })
              .finally(() => setSubmitting(false));
          });
      });
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

  return (
    <section className="padding-y-fixed">
      <div className="container">
        <h1 className="dark-purple mb-3 text-center h1">
          Solicite seu acesso grátis!
        </h1>
        <div className="row justify-content-center">
          <p className="purple mb-5 text-center col-12 col-lg-9">
            Preencha corretamente as informações do estabelecimento para testar
            o sistema durante 10 dias. Caso já tenha usado o Hospedin, recupere
            sua senha{" "}
            <a href="https://pms.hospedin.com/secret/new" target="_blank">
              clicando AQUI.
            </a>
          </p>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-7 col-xl-6">
            <form id="test-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nome do Responsável *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={`form-control ${
                    errors.name && touched.name && "is-invalid"
                  }`}
                  onChange={handleChange}
                  value={values.name}
                />
                {errors.name && touched.name ? (
                  <div className="invalid-feedback d-block">{errors.name}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="email">E-mail *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Use o seu melhor e-mail"
                  className={`form-control ${
                    errors.email && touched.email && "is-invalid"
                  }`}
                  onChange={handleChange}
                  value={values.email}
                />
                {errors.email && touched.email ? (
                  <div className="invalid-feedback d-block">{errors.email}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="company">Nome do estabelecimento *</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  className={`form-control ${
                    errors.company && touched.company && "is-invalid"
                  }`}
                  onChange={handleChange}
                  value={values.company}
                />
                {errors.company && touched.company ? (
                  <div className="invalid-feedback d-block">
                    {errors.company}
                  </div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="type">Tipo de estabelecimento *</label>
                <select
                  id="type"
                  name="type"
                  className={`form-control ${
                    errors.type && touched.type && "is-invalid"
                  }`}
                  onChange={handleChange}
                  value={values.type}
                >
                  {companyTypeOptions.map((opt, index) => (
                    <option key={index} value={opt[0]}>
                      {opt[1]}
                    </option>
                  ))}
                </select>
                {errors.type && touched.type ? (
                  <div className="invalid-feedback d-block">{errors.type}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="room">
                  Nº de quartos * <i>(camas se for um hostel)</i>
                </label>
                <input
                  id="room"
                  name="room"
                  type="number"
                  className={`form-control ${
                    errors.room && touched.room && "is-invalid"
                  }`}
                  onChange={handleChange}
                  value={values.room}
                />
                {errors.room && touched.room ? (
                  <div className="invalid-feedback d-block">{errors.room}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="phone">Telefone de contato com DDD *</label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  className={`form-control ${
                    errors.phone && touched.phone && "is-invalid"
                  }`}
                  placeholder="Ex: (48) 3354-1750"
                  onChange={handleChange}
                  value={values.phone}
                />
                {errors.phone && touched.phone ? (
                  <div className="invalid-feedback d-block">{errors.phone}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="coming_from">Por onde nos conheceu? *</label>
                <div name="coming_from">
                  {comingFromOptions.map((opt, index) => (
                    <div key={index} className="hs--radio form-check-inline">
                      <label>
                        <input
                          type="radio"
                          name="coming_from"
                          value={opt[0]}
                          onChange={handleChange}
                        />
                        {opt[1]}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.coming_from && touched.coming_from ? (
                  <div className="invalid-feedback d-block">
                    {errors.coming_from}
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
                  "Solicitar teste grátis"
                )}
              </button>
            </form>

            <p className="purple text-center col-12 col-lg-12 mt-3 small">
              Teste gratuito por 10 dias
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestForm;
