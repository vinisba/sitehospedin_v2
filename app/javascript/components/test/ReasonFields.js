import React, { useEffect } from "react";

const ReasonFields = ({ values, handleChange, setValues }) => {
  useEffect(() => {
    setValues({
      ...values,
      reason: "",
      partner_code: "",
    });
  }, [values.coming_from]);

  if (
    values.coming_from === "recommendation" ||
    values.coming_from === "other_coming"
  ) {
    return (
      <div className="form-group">
        <label htmlFor="reason">
          {values.coming_from === "recommendation"
            ? "Por favor, escreva quem indicou você"
            : "Por favor, escreva como nos conheceu"}
        </label>
        <input
          id="reason"
          name="reason"
          type="text"
          className="form-control"
          onChange={handleChange}
          value={values.reason}
        />
      </div>
    );
  }

  if (values.coming_from === "hospedin_partner") {
    return (
      <div className="form-group">
        <label htmlFor="partner_code">Coloque aqui o nome do parceiro</label>
        <input
          id="partner_code"
          name="partner_code"
          type="text"
          className="form-control"
          placeholder="Ex: João da Silva"
          onChange={handleChange}
          value={values.partner_code}
        />
      </div>
    );
  }

  return null;
};

export default ReasonFields;
