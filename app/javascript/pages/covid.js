import SweetScroll from 'sweet-scroll'

class Covid {
  constructor() {
    this.scrolling()
  }

  scrolling() {
    new SweetScroll({
      offset: -80
    })
  }
}

$(document).ready(() => {
  new Covid()
})
