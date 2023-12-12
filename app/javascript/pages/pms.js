class Pms {
  constructor() {
    this.plans()
  }

  plans() {
    $('[data-plan]').on('click', e => {
      e.preventDefault()
      $('[data-plan]').not(e.target).removeClass('plan-selected')
      $(e.target).addClass('plan-selected')
      $('.plan-wrap').removeClass('active')
      $($(e.target).data('plan')).addClass('active').scrollTop(0)
    })
  }
}

$(document).ready(() => {
  new Pms()
})