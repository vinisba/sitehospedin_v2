import { setCarousel } from '../utils'

class Library {
  constructor() {
    this.carousels()
  }

  carousels() {
    setCarousel('.books-carousel', {
      margin: 20,
      dots: true,
      responsive:{
        0:    { items: 2 },
        576:  { items: 4 },
        992:  { items: 6 }
      }
    }, '.books-nav')

    setCarousel('.documents-carousel', {
      margin: 20,
      dots: true,
      responsive:{
        0:    { items: 1 },
        576:  { items: 3 },
        992:  { items: 4 }
      }
    }, '.documents-nav')

    setCarousel('.videos-carousel', {
      margin: 20,
      dots: true,
      responsive:{
        0:    { items: 1 },
        576:  { items: 2 },
        992:  { items: 3 }
      }
    }, '.videos-nav')
  }
}

$(document).ready(() => {
  new Library()
})