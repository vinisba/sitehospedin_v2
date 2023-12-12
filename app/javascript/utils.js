function setCarousel(carouselSelector, options, navSelector) {
  if (!carouselSelector || !$(carouselSelector).length) {
    return false
  }

  const nav = navSelector && $(navSelector).length ? $(navSelector) : null
  let prev, next
  
  if (nav) {
    prev = nav.find('.nav-prev')
    next = nav.find('.nav-next')
  }

  const carousel = $(carouselSelector).owlCarousel({
    ...options,
    onInitialized: function(e) {
      if (nav) {
        if ($(e.target).find('.owl-dot').length > 1) {
          prev.addClass('disabled')
        } else {
          nav.addClass('d-none')
        }
      }
    }
  })

  if (nav) {
    prev.on('click', () => carousel.trigger('prev.owl.carousel'))
    next.on('click', () => carousel.trigger('next.owl.carousel'))

    carousel.on('changed.owl.carousel', e => {
      if (e.item.index === 0) {
        prev.addClass('disabled')
        next.removeClass('disabled')
      } else if (e.item.index + e.page.size === e.item.count) {
        prev.removeClass('disabled')
        next.addClass('disabled')
      } else {
        prev.removeClass('disabled')
        next.removeClass('disabled')
      }
    })
  }

  return carousel
}

export { setCarousel }
