Messenger = function(window, document) {

    var DURATION = 250;
    var THROTTLE_TIME = 250;

    var _currentAnimationArgs;
    var _debounceTimeoutId
    var _logEl = document.getElementById('log');

    return {
        log: _log
    }

    function _log(msg) {
        var pEl = document.createElement('p');

        pEl.innerText = msg;
        _logEl.appendChild(pEl);

        if(_logEl.clientHeight >= _logEl.scrollHeight || _debounceTimeoutId) return;

        _debounceTimeoutId = setTimeout(function() {
            _debounceTimeoutId = null;

            if(_currentAnimationArgs) {
                _logEl.scrollTop = _currentAnimationArgs.startVal + _currentAnimationArgs.distance
            }
            _currentAnimationArgs = {
                distance: _logEl.scrollHeight - (_logEl.scrollTop + _logEl.clientHeight),
                startTimestamp: performance.now(),
                startVal: _logEl.scrollTop
            }
            _startTimestamp = performance.now();
            _startVal = _logEl.scrollTop;
            window.requestAnimationFrame(_stepTo.bind({
                duration: DURATION,
                el: _logEl
            }));
        }, THROTTLE_TIME);
    }

    function _stepTo(timestamp) {
        if(!_currentAnimationArgs) return;

        var currentTime = performance.now() - _currentAnimationArgs.startTimestamp;
        var stepValue = currentTime / this.duration;
        _logEl.scrollTop =  _currentAnimationArgs.startVal + ((1 + Math.sin(Math.PI * stepValue - Math.PI / 2)) / 2) * _currentAnimationArgs.distance;

        if(currentTime < this.duration) window.requestAnimationFrame(_stepTo.bind(this));
        else _currentAnimationArgs = null;
    }

    function _getScrollDistanceVal() {

    }

}(window, window.document);