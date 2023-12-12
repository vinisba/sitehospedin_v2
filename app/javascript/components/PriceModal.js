import React, { Component } from "react"

import ModalBar from './shared/ModalBar'
import Rooms from './steps/Rooms'
import Modules from './steps/Modules'
import Review from './steps/Review'

import plans from '../plans'
import modules from '../modules'

import { ArrowLeft, X } from 'react-feather'

class PriceModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
      rooms: 1,
      modules: []
    }
  }

  handleRoomsChange = value => this.setState({ rooms: parseInt(value) })

  handleModuleClick = id => {
    let items = this.state.modules.slice(0)
    if(items.includes(id)) {
      items = items.filter(item => item != id)
    } else {
      items.push(id)
    }

    this.setState({ modules: items })
  }

  getModulesNames = () => this.state.modules.map(id => modules.filter(module => id === module.id)[0].title).join(' + ')

  getPlan = () => {
    const plan = plans.filter(plan => plan.places >= this.state.rooms)
    return plan.length ? plan[0] : {}
  }

  getPlanPrices = () => {
    const plan = this.getPlan()
    let modulesPrice = this.state.modules.map(id => modules.filter(module => id === module.id)[0].price)
    modulesPrice = modulesPrice.length ? modulesPrice.reduce((acc, value) => acc + value) : 0

    return {
      monthly: plan.price + modulesPrice,
      subscription: plan.monthly + modulesPrice,
      yearly: plan.yearly_price + (modulesPrice * 12)
    }
  }

  getPlanDiscounts = () => {
    const plan = this.getPlan()

    return {
      subscription: (plan.price * 12) - (plan.monthly * 12),
      yearly: (plan.price * 12) - plan.yearly_price
    }
  }

  nextStep = () => {
    this.setState({ step: this.state.step + 1 }, () => {
      document.getElementById("priceModal").scrollTop = 0
    })
  }

  backStep = () => this.setState({ step: this.state.step - 1 })

  reset = () => this.setState({ step: 1, rooms: 0, modules: [] })

  render () {
    return (
      <div className="modal-content">
        <ModalBar total={3} step={this.state.step} />

        <button className="modal-back" disabled={this.state.step === 1} onClick={this.backStep}>
          <ArrowLeft size={30} />
        </button>

        <button className="modal-close" data-dismiss="modal" onClick={this.reset}>
          <X size={30} />
        </button>

        <div className="container">
          {this.renderSteps()}
        </div>
      </div>
    )
  }

  renderSteps = () => {
    switch(this.state.step) {
      case 2:
        return <Modules quantity={this.state.rooms} plan={this.getPlan()} next={this.nextStep} actives={this.state.modules} onModuleClick={this.handleModuleClick} />
      case 3:
        return <Review quantity={this.state.rooms} prices={this.getPlanPrices()} plan={this.getPlan()} modules={this.getModulesNames()} discounts={this.getPlanDiscounts()} />
      default:
        return <Rooms quantity={this.state.rooms} onRoomsChange={this.handleRoomsChange} plan={this.getPlan()} next={this.nextStep} />
    }
  }
}

export default PriceModal
