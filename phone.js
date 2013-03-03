//compiled with coffeescript
(function() {
  var $, formatBackPhoneNumber, formatPhoneNumber,
    __slice = [].slice;

  $ = jQuery;

  $.telephone = {};

  $.telephone.fn = {};

  $.fn.telephone = function() {
    var args, method;
    method = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    return $.telephone.fn[method].apply(this, args);
  };

  formatPhoneNumber = function(e) {
    var $target, digit, is_backspace, is_digit, length, unformatted_number, value;
    e.preventDefault();
    $target = $(e.currentTarget);
    value = $target.val();
    digit = String.fromCharCode(e.which);
    is_digit = /^\d+$/.test(digit);
    is_backspace = e.which === 8;
    if (!is_digit && !is_backspace) {
      return;
    }
    if (e.which === 8) {
      unformatted_number = value.replace(/\D/g, '').replace('+', '');
      unformatted_number = unformatted_number.substring(0, unformatted_number.length - 1);
    } else {
      unformatted_number = value.replace(/\D/g, '') + digit;
      length = unformatted_number.length;
    }
    if (unformatted_number === '') {
      return $target.val('');
    } else if (length <= 3) {
      return $target.val('(' + unformatted_number + ')');
    } else if (length <= 10) {
      return $target.val('(' + unformatted_number.slice(0, 3) + ')' + ' ' + unformatted_number.slice(3, 6) + ' ' + unformatted_number.slice(6, 10));
    } else {
      return $target.val("+" + unformatted_number);
    }
  };

  formatBackPhoneNumber = function(e) {
    var $target, value;
    $target = $(e.currentTarget);
    value = $target.val();
    if (e.meta) {
      return;
    }
    if (($target.prop('selectionStart') != null) && $target.prop('selectionStart') !== value.length) {
      return;
    }
    if (e.which === 8 && /\s\d?$/.test(value)) {
      e.preventDefault();
      return $target.val(value.replace(/\s\d?$/, ''));
    }
  };

  $.telephone.fn.formatPhoneNumber = function() {
    this.on('keypress', formatPhoneNumber);
    this.on('paste', formatPhoneNumber);
    this.on('keydown', formatBackPhoneNumber);
    return this;
  };

}).call(this);