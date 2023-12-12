import { setCarousel } from '../utils'

class About {
  constructor() {
    this.carousels()
  }

  carousels() {
    setCarousel('.midia-carousel', {
      margin: 20,
      dots: true,
      responsive:{
        0:    { items: 1 },
        576:  { items: 2 },
        1200:  { items: 3 }
      }
    }, '.midia-nav')
  }
}

$(document).ready(() => {
  new About()
})