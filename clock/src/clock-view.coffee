Clock = require '../node_modules/uupaa.clock.js/lib/Clock'

_face    =
_hand    =
_mode    =
_counter =
_span    = null


_transformProp    = null
_genTransformProp = ->
  b = document.body.style
  r = 'ransform'
  p = null

  b[p = 't'       + r ] ?
  b[p = 'webkitT' + r ] ?
  b[p = 'mozT'    + r ] ?
  b[p = 'msT'     + r ] ?
  b[p = 'oT'      + r ]

  return p


document.addEventListener 'DOMContentLoaded', ->
  _face     = document.createElement 'div'
  _hand     = document.createElement 'div'
  _mode     = document.createElement 'div'
  _counter  = document.createElement 'div'
  _span     = document.createElement 'span'
  faceStyle = _face.style
  handStyle = _hand.style
  modeStyle = _mode.style
  cntStyle  = _counter.style
  spanStyle = _span.style

  # display: block;
  faceStyle.display =
  handStyle.display =
  modeStyle.display =
  cntStyle.display  = 'block'

  # position: absolute;
  faceStyle.position =
  handStyle.position =
  modeStyle.position =
  cntStyle.position  = 'absolute'

  # width height
  faceStyle.width  =
  faceStyle.height =
  handStyle.height = '80px'

  handStyle.width  = '5px'

  # --- master slave mode display ---
  modeStyle.width      =
  modeStyle.height     =
  modeStyle.lineHeight = '80px'

  modeStyle.fontSize   = '50px'
  modeStyle.textAlign  = 'center'
  modeStyle.fontFamily = 'sans-serif'
  modeStyle.opacity    = '.3'
  modeStyle.zIndex     = '100'

  # --- counter and caption ---
  cntStyle.width  =
  spanStyle.width = '140px'

  cntStyle.left   =
  cntStyle.right  = '-1000px'

  cntStyle.margin     = '0 auto'
  cntStyle.height     = 'auto'
  cntStyle.lineHeight = '16px'
  cntStyle.bottom     = '-56px'
  cntStyle.textAlign  = 'center'

  spanStyle.height     =
  spanStyle.lineHeight = '12px'

  spanStyle.fontSize   = '10px'
  spanStyle.fontFamily = 'Courier, "Courier New", monospace'
  spanStyle.color      = 'black'
  spanStyle.background = 'white'
  spanStyle.display    = 'inline-block'
  spanStyle.position   = 'relative'

  _counter.appendChild _span.cloneNode() for _ in [0..2]

  _counter.firstChild.style.color = '#f20'


  # clock hand.
  handStyle.left   =
  handStyle.right  = 0

  handStyle.margin = '0 auto'
  handStyle.zIndex = '200'

  faceStyle.background = 'url(clock_scale.png) no-repeat'
  handStyle.background = 'url(clock_hand.png) no-repeat'

  faceStyle.backgroundSize = '80px 80px'
  handStyle.backgroundSize = '5px 80px'

  faceStyle.cursor = 'pointer'

  _face.appendChild _hand
  _face.appendChild _mode
  _face.appendChild _counter



_constructDOM = (x, y) ->
  face = _face.cloneNode(yes) # deep
  cnt  = face.lastChild

  # pos
  face.style.left = x + 'px'
  face.style.top  = y + 'px'

  @dom        = face
  @_handStyle = face.firstChild.style
  @_caption   = cnt.firstChild
  @_txt1      = cnt.children[1]
  @_txt2      = cnt.lastChild
  @_mode      = face.children[1]



_update = (info) ->
  @_handStyle[_transformProp] = "rotate3d(0,0,1,#{ info.totalCoefficient % info.goalFPS * (@_APS / info.goalFPS) }deg)"
  _sec = "00000000#{ @clock.lastTimeStamp | 0 }".slice(-8)
  @_txt1.textContent = 'sec: ' + _sec.slice(0, 5) + '.' + _sec.slice(-3)
  _fps = "00000000#{ (info.FPS * 1000 | 0) }".slice(-8)
  @_txt2.textContent = 'fps: ' + _fps.slice(0, 5) + '.' + _fps.slice(-3)



class ClockView
  constructor: (APS, x, y, stage, clockOptions, caption) -> # APS - angle per second
    _transformProp ?= _genTransformProp()

    @clock = new Clock [], clockOptions
    @stage = stage

    @update = _update.bind @
    @_APS   = APS

    _constructDOM.call @, x, y
    @_caption.textContent = caption
    @stage.appendChild @dom


  start: ->
    @clock.on @update
    @clock.start()

  stop: ->
    @clock.off @update
    @clock.stop()


module.exports = ClockView
