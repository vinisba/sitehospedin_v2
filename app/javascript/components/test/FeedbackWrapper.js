import React from "react";

import SuccessFeedbackIcon from "./svg/success-illustration.svg";

const FeedbackWrapper = ({ children }) => {
  return (
    <section className="padding-y-fixed success-page">
      <div className="container">
        <img
          src={SuccessFeedbackIcon}
          alt={"Ícone sucesso"}
          className="mb-5 mx-auto"
        />
        {children}
      </div>
    </section>
  );
};

export default FeedbackWrapper;
