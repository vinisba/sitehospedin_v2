import React, { useState } from "react";
import TestForm from "./test/TestForm";

import { feedback } from "./test/types";

import FeedbackWrapper from "./test/FeedbackWrapper";
import TestValidation from "./test/TestValidation";

const Test = () => {
  const [status, setStatus] = useState(undefined);
  const [redirectURL, setRedirectURL] = useState(undefined);
  const [formValues, setFormValues] = useState();
  const [step, setStep] = useState(1);

  if (status === feedback.PENDING) {
    return (
      <FeedbackWrapper>
        <h2 className="dark-purple mb-4 text-center">
          Ops! Parece que você já esteve por aqui =)
        </h2>
        <p className="purple text-center">
          Se você já fez um teste, aguarde nosso contato.
        </p>
        <p className="purple text-center">
          Se já foi nosso cliente, recupere sua senha{" "}
          <a href="https://pms.hospedin.com/secret/new" target="_blank">
            clicando AQUI.
          </a>
        </p>

        <div className="mt-5 d-flex flex-column justify-content-center align-items-center">
          <a
            href="https://api.whatsapp.com/send/?phone=5548991350886&text=Oi,%20solicitei%20o%20teste%20agora%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.&type=phone_number&app_absent=0"
            target="_blank"
            className="btn btn-outline-icon d-flex align-items-center"
          >
            Fale com nossos consultores
          </a>
          <p className="purple text-center mt-3">
            Nosso atendimento funciona de segunda a sexta-feira das 09:00 às
            12:00 e das 13:30 às 18:00.
          </p>
        </div>
      </FeedbackWrapper>
    );
  }

  if (status === feedback.SUCCESS) {
    return (
      <FeedbackWrapper>
        <h2 className="dark-purple mb-4 text-center">
          Parabéns! Seu teste começa agora ;)
        </h2>
        {redirectURL && (
          <p className="purple text-center mb-3">
            Caso você não seja redirecionado automaticamente para o sistema,{" "}
            <a href={redirectURL} rel="noreferrer noopener">
              clique aqui.
            </a>
          </p>
        )}
        <p className="purple text-center">
          Você também receberá os dados de acesso por e-mail.
        </p>
      </FeedbackWrapper>
    );
  }

  return (
    <div>
      {step === 1 ? (
        <TestForm
          setStep={setStep}
          formValues={formValues}
          setFormValues={setFormValues}
          setFeedback={setStatus}
          setRedirectURL={setRedirectURL}
        />
      ) : (
        <TestValidation
          formValues={formValues}
          setFormValues={setFormValues}
          setFeedback={setStatus}
          setRedirectURL={setRedirectURL}
        />
      )}
    </div>
  );
};

export default Test;
