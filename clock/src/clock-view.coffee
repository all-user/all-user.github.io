Clock = require '../../Clock.js/lib/Clock'


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



_constructDOM = (x, y) ->
  face      = document.createElement 'div'
  hand      = document.createElement 'div'
  faceStyle = face.style
  handStyle = hand.style

  faceStyle.display  = handStyle.display  = 'block'
  faceStyle.position = handStyle.position = 'absolute'

  faceStyle.width = faceStyle.height = handStyle.height = '80px'; handStyle.width = '5px'
  faceStyle.left = x + 'px'; faceStyle.top = y + 'px'

  handStyle.left = handStyle.right = 0
  handStyle.margin = '0 auto'

  faceStyle.background = 'url(clock_scale.png) no-repeat'
  handStyle.background = 'url(clock_hand.png) no-repeat'

  faceStyle.backgroundSize = '80px 80px'
  handStyle.backgroundSize = '5px 80px'

  face.appendChild hand

  @dom = face
  @_handStyle  = handStyle



_update = ->
  @_angle = (@_angle + 2) % 360
  @_handStyle[_transformProp] = "rotate3d(0,0,1,#{ @_angle }deg)"



class ClockView
  constructor: (x, y, stage, clockOptions) ->
    _transformProp ?= _genTransformProp()

    @clock = new Clock [], clockOptions
    @stage = stage

    @update = _update.bind @
    @_angle = 0

    _constructDOM.call @, x, y
    @stage.appendChild @dom


  start: ->
    @clock.on @update
    @clock.start()

  stop: ->
    @clock.off @update
    @clock.stop()


module.exports = ClockView
