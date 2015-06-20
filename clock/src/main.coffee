ClockView = require './clock-view'

document.addEventListener 'DOMContentLoaded', ->
  stage = document.querySelector '#stage'

  options = [
    {},
    { vsync: yes },
    {             wait: 100, pulse: 20 },
    { vsync: yes, wait: 100, pulse: 20 },
  ]

  clocks = []


  for opt, i in options
    c = new ClockView (35 + i * 150 % 300), (35 + (i / 2 | 0) * 150), stage, opt

    handler = ->
      @clock.internal()
      for slave, i in (clocks.filter (c) => c isnt @)
        slave.clock.external @clock
      @clock.start()

    c.dom.addEventListener 'click', handler.bind(c)

    clocks.push c


  c.start() for c in clocks
