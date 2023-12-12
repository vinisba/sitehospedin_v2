import React from 'react'
import PropTypes from 'prop-types'

import { Button, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import CurrencyFormat from 'react-currency-format'

import modules from '../../modules'
import { features } from '../../plans'

const Modules = ({ plan, quantity, next, actives, onModuleClick }) => {
  return (
    <React.Fragment>
      <h2 className="dark-purple text-center mb-3">Deseja adicionar módulos extras?</h2>
      <span className="d-block text-center">Clique no módulo para adicioná-lo ao seu <strong>Plano {plan.title}</strong> ou se preferir clique no botão próximo passo para seguir.</span>
      <div className="padding-y">
        <div className="row align-items-center">
          <div className="col-12 col-md-3 col-lg-2">
            <div className="position-relative bg-dark-blue rounded px-4 py-5 white text-center">
              <h4 className="mb-3">Plano {plan.title}</h4>
              <span className="d-block small mb-4">({quantity} quartos)</span>
              <CurrencyFormat value={plan.monthly}
                className="text-value"
                displayType="text"
                prefix="R$ "
                thousandSeparator="."
                decimalScale={2}
                decimalSeparator=","
                fixedDecimalScale
              />
              <span className="d-block small">(Assinatura)</span>
              <Button id="planPopover" className="btn-modal-hint">?</Button>
              <UncontrolledPopover trigger="hover" placement="auto" target="planPopover">
                <PopoverHeader tag="div">Plano {plan.title}</PopoverHeader>
                <PopoverBody>
                  <ul className="m-0 pl-3">
                    {features.map((feature, index) => <li key={index}>{feature}</li>)}
                  </ul>
                </PopoverBody>
              </UncontrolledPopover>
            </div>
          </div>
          <div className="col-12 col-md-1 col-lg-2 text-center my-4 my-md-0">
            <span className="modal-plus-icon" />
          </div>
          <div className="col-12 col-md-8">
            <div className="row">
              {modules.map(module => (
                <div key={module.id} className="col-12 col-md-6 col-lg-4 mb-3">
                  <div
                    className={`module-card rounded purple text-center px-3 py-4 ${actives.includes(module.id) ? 'module-active' : ''}`}
                    onClick={() => onModuleClick(module.id)}
                  >
                    <span className="d-block mb-2 module-title">{module.title}</span>
                    <span>
                      +&nbsp;
                      <CurrencyFormat value={module.price}
                        displayType="text"
                        prefix="R$ "
                        thousandSeparator="."
                        decimalScale={2}
                        decimalSeparator=","
                        fixedDecimalScale
                      />
                    </span>
                    {actives.includes(module.id) ? <span className="module-active-icon" /> : null}
                    <Button id={`planModule${module.id}`} className="btn-modal-hint">?</Button>
                    <UncontrolledPopover trigger="hover" placement="auto" target={`planModule${module.id}`}>
                      <PopoverHeader tag="div">{module.title}</PopoverHeader>
                      <PopoverBody>
                        <ul className="m-0 pl-3">
                          {module.features.map((feature, index) => <li key={index}>{feature}</li>)}
                        </ul>
                      </PopoverBody>
                    </UncontrolledPopover>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <button className="btn btn-yellow" onClick={next}>Próximo passo</button>
      </div>
    </React.Fragment>
  )
}

Modules.propTypes = {
  quantity: PropTypes.number,
  plan: PropTypes.object,
  next: PropTypes.func,
  actives: PropTypes.array,
  onModuleClick: PropTypes.func
}

export default Modules
