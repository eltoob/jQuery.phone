$            = jQuery
$.telephone    = {}
$.telephone.fn = {}
$.fn.telephone = (method, args...) ->
  $.telephone.fn[method].apply(this, args)

# Utils

formatPhoneNumber = (e) ->
  e.preventDefault()

  $target = $(e.currentTarget)
  value   = $target.val()
  digit = String.fromCharCode(e.which)
  is_digit = /^\d+$/.test(digit)
  is_backspace = e.which is 8
  return if (!is_digit && !is_backspace)

  if e.which is 8 #handling backspacing
    unformatted_number = value.replace(/\D/g, '').replace('+', '')
    unformatted_number = unformatted_number.substring(0, unformatted_number.length - 1);
  else
    unformatted_number = value.replace(/\D/g, '') + digit
    length  = unformatted_number.length

  if unformatted_number is ''
    $target.val('')
  else if length <= 3
    $target.val('(' + unformatted_number + ')')
  else if length <= 10
    $target.val('(' + unformatted_number.slice(0,3) + ')' + ' ' + unformatted_number.slice(3,6) + ' ' + unformatted_number.slice(6,10))
  else
    $target.val("+"   + unformatted_number)

formatBackPhoneNumber = (e) ->
    $target = $(e.currentTarget)
    value   = $target.val()

    return if e.meta
    # Return if focus isn't at the end of the text
    return if $target.prop('selectionStart')? and
      $target.prop('selectionStart') isnt value.length

    # If we're backspacing, remove the trailing space
    if e.which is 8 and /\s\d?$/.test(value)
      e.preventDefault()
      $target.val(value.replace(/\s\d?$/, ''))

$.telephone.fn.formatPhoneNumber = ->
  @on('keypress', formatPhoneNumber)
  @on('paste', formatPhoneNumber)
  @on('keydown', formatBackPhoneNumber)
  this
