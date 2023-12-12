import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { debounce } from 'lodash'
import wNumb from 'wnumb'

import Nouislider from "nouislider-react"
import "nouislider/distribute/nouislider.css"

class Rooms extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rooms: props.quantity
    }
  }

  handleRoomsInputChange = event => {
    let value = event.target.value

    if (parseInt(value) > 200) {
      value = 200
    }
    
    this.setState({ rooms: value })

    if (value && value.length) {
      this.props.onRoomsChange(value)
    }
  }

  render() {
    const { quantity, onRoomsChange, plan, next } = this.props

    return (
      <React.Fragment>
        <h2 className="dark-purple text-center">Quantos quartos você gerencia?</h2>
        <div className="padding-y text-center">
          <div className="small">
            <div className="d-block d-md-inline-block mr-md-5">
              <span className="d-inline-block mr-1">Nº de quartos:</span>
              <strong>{quantity}</strong>
            </div>
            <div className="d-inline-block">
              <span className="d-inline-block mr-1">Plano Hospedin:</span>
              <strong>{plan.title}</strong>
            </div>
            <div className="my-5 d-none d-md-block">
              <Nouislider
                range={{ min: 1, max: 200 }}
                step={1}
                start={quantity}
                connect={[true, false]}
                tooltips={wNumb({decimals: 0})}
                clickablePips
                pips={{
                  mode: 'steps',
                  filter: (value, type) => {
                    return [10, 20, 30, 50, 80, 100, 130, 150, 200].includes(value) ? 1 : -1
                  },
                  density: 3
                }}
                onUpdate={debounce((render, handle, value) => onRoomsChange(value[0].toFixed(0)), 300)}
              />
            </div>
            <div className="row my-5 d-block d-md-none">
              <div className="col-12">
                <input type="number" className="form-control" value={this.state.rooms} onChange={this.handleRoomsInputChange} max={200} />
              </div>
            </div>
            <div>
              <b>OBS:</b> Se você gerencia um hostel ou espaços compartilhados, selecione o número de leitos ou espaços.
            </div>
          </div>
        </div>
        <div className="text-center">
          <button className="btn btn-yellow" disabled={quantity === 0} onClick={next}>Próximo passo</button>
        </div>
      </React.Fragment>
    )
  }
}

Rooms.propTypes = {
  quantity: PropTypes.number,
  onRoomsChange: PropTypes.func,
  plan: PropTypes.object,
  next: PropTypes.func
}

export default Rooms
