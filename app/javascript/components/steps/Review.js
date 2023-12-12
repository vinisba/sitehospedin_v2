import React from 'react'
import PropTypes from 'prop-types'

import { Badge } from 'reactstrap'
import CurrencyFormat from 'react-currency-format'

const Review = ({ quantity, prices, plan, modules, discounts }) => {
  return (
    <React.Fragment>
      <h2 className="dark-purple text-center mb-3">Resumo do seu plano</h2>
      <span className="modal-plan-resume purple py-3 mb-3 text-center">Plano {plan.title} ({quantity} quartos) {modules.length ? `+ ${modules}` : ''}</span>
      <span className="d-block text-center purple mb-3">Solicite seu teste grátis selecionando uma das opções abaixo!</span>
      <div className="row align-items-center justify-content-center size-default">
        <div className="col-12 col-md-4 col-lg-3 pr-md-0 mb-2">
          <div className="bg-gray-blue rounded rounded-lg-left py-5 px-3 text-center">
            <h4 className="dark-purple mb-0">Mensal</h4>
            <span className="d-block mb-3 small">(sem fidelidade)</span>
            <span className="d-block mb-3">
              R$&nbsp;
              <CurrencyFormat value={prices.monthly}
                className="text-value-md dark-purple"
                displayType="text"
                thousandSeparator="."
                decimalScale={2}
                decimalSeparator=","
                fixedDecimalScale
              />
              &nbsp;/mês
            </span>
            <span className="d-block mb-3"></span><br/>
            <a href="/teste-gratis" className="btn btn-outline-purple">Quero testar</a>
          </div>
        </div>
        <div className="col-12 col-md-4 col-lg-3 px-md-0 mb-2">
          <div className="position-relative bg-dark-blue white rounded py-5 px-3 text-center">
            <span className="tag-best-plan">Melhor Opção</span>
            <h3 className="h3 mb-0">Assinatura</h3>
            <span className="d-block mb-3 small">(com fidelidade)</span>
            <span className="d-block mb-3">
              R$&nbsp;
              <CurrencyFormat value={prices.subscription}
                className="text-value-lg"
                displayType="text"
                thousandSeparator="."
                decimalScale={2}
                decimalSeparator=","
                fixedDecimalScale
              />
              &nbsp;/mês
            </span>
            <Badge className="mb-3" color="warning">Você economiza:&nbsp;
              <CurrencyFormat value={discounts.subscription}
                displayType="text"
                prefix="R$ "
                thousandSeparator="."
                decimalScale={2}
                decimalSeparator=","
                fixedDecimalScale
              />
              &nbsp;/ano
            </Badge><br/>
            <a href="/teste-gratis" className="btn btn-yellow">Quero testar</a>
          </div>
        </div>
        <div className="col-12 col-md-4 col-lg-3 pl-md-0 mb-2">
          <div className="bg-gray-blue rounded rounded-lg-right py-5 px-3 text-center">
            <h4 className="dark-purple mb-0">Anual</h4>
            <span className="d-block mb-3 small">(pagamento único)</span>
            <span className="d-block mb-3">
              R$&nbsp;
              <CurrencyFormat value={prices.yearly}
                className="text-value-md dark-purple"
                displayType="text"
                thousandSeparator="."
                decimalScale={2}
                decimalSeparator=","
                fixedDecimalScale
              />
              &nbsp;/ano
            </span>
            <Badge className="mb-3" color="warning">Você economiza:&nbsp;
              <CurrencyFormat value={discounts.yearly}
                displayType="text"
                prefix="R$ "
                thousandSeparator="."
                decimalScale={2}
                decimalSeparator=","
                fixedDecimalScale
              />
              &nbsp;/ano
            </Badge><br/>
            <a href="/teste-gratis" className="btn btn-outline-purple">Quero testar</a>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

Review.propTypes = {
  quantity: PropTypes.number,
  prices: PropTypes.object,
  plan: PropTypes.object,
  modules: PropTypes.string
}

export default Review
