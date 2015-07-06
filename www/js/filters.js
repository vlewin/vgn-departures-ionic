var module = angular.module('vgn.filters', [])

module.filter('time', function() {
  return function(timestamp) {
    var departure_time = new Date(timestamp).getTime();
    var now = Date.now();
    var secs = Math.round((departure_time-now)/1000);

    var hours = Math.floor(secs / (60 * 60));
    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);
    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    if(hours >= 0 && minutes >= 0 && seconds >= 0) {
      hours = (hours < 10) ? '0' + hours : hours;
      minutes = (minutes < 10) ? '0' + minutes : minutes;
      seconds = (seconds < 10) ? '0' + seconds : seconds;
    } else {
      hours = '00';
      minutes = '00';
      seconds = '00';
    }

    // return [hours, minutes, seconds].join(':');
    return [minutes, seconds].join(':');
  };
});

module.filter('expired', function () {
  return function(items, now) {
    var filtered = [];
    for (var i = 0; i < items.length; i++) {
      if(items[i].time() > now) {
        filtered.push(items[i]);
      }
    }
    return filtered;
  };
});

module.filter('minutes', function() {
  return function(timestamp) {
    var now = Date.now() - 30000;
    var departure_time = new Date(timestamp).getTime();
    return Math.round((departure_time-now)/60000) + ' minute(s) left';
  };
});

module.filter('debug', function() {
  return function(input) {
    if (input === '') return 'empty string';
    return input ? input : ('' + input);
  };
});
