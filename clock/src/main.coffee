ClockView = require './clock-view'
TimeInfo  = require './time-info'

document.addEventListener 'DOMContentLoaded', ->
  stage = document.querySelector '#stage'

  aps = 360
  fps = 180

  spike = (ts, pulse, cnt) ->
    if cnt % 10 is 0
      pulse * 2
    else
      pulse

#   spike = (ts, pulse, cnt) ->
#     cnt % 10 * ts % 100 + pulse

  options = [
    {                                                 transform: (t0 = new TimeInfo(fps)).getInfo.bind(t0) }
    { vsync: yes,                                     transform: (t1 = new TimeInfo(fps)).getInfo.bind(t1) }
    {             wait: 100,                          transform: (t2 = new TimeInfo(fps)).getInfo.bind(t2) }
    { vsync: yes,            pulse:  4,               transform: (t3 = new TimeInfo(fps)).getInfo.bind(t3) }
    {             wait: 100, pulse: 20, spike: spike, transform: (t4 = new TimeInfo(fps)).getInfo.bind(t4) }
    {             wait:   4,                          transform: (t5 = new TimeInfo(fps)).getInfo.bind(t5) }
  ]

  captions = [
    'no options'
    'vsync'
    'wait=100'
    'vsync,pulse=4'
    'wait=100,pulse=20,spike'
    'wait=4'
  ]

  _date = performance ? Date
  _now = _date.now()

  t0.getInfo _now
  t1.getInfo _now
  t2.getInfo _now
  t3.getInfo _now
  t4.getInfo _now
  t5.getInfo _now

  clocks = []
  m_c = '#f20'
  s_c = '#3d4'


  for opt, i in options
    c = new ClockView aps, (35 + i * 150 % 300), (35 + (i / 2 | 0) * 150), stage, opt, captions[i]

    handler = ->
      @clock.internal()
      @_mode.textContent = 'M'
      @_mode.style.color = m_c

      for slave, i in (clocks.filter (c) => c isnt @)
        slave.clock.external @clock
        slave._mode.textContent = 'S'
        slave._mode.style.color = s_c
      @clock.start()

    c.dom.addEventListener 'click', handler.bind(c)

    clocks.push c


  $internal = document.querySelector '#internal'

  $internal.addEventListener 'click', ->
    for c in clocks
      c.clock.internal()
      c.clock.start()
      c._mode.textContent = ''


  c.start() for c in clocks
