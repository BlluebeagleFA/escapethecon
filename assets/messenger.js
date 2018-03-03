Messenger = function(window, document) {

    var DEBOUNCE_TIME = 750;
    var DURATION = 750;

    var _currentAnimationArgs;
    var _debounceTimeoutId
    var _logEl;

    return {
        log: _log
    }

    function _log(msg) {
        if(!_logEl) _logEl = document.getElementById('log');
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
        }, DEBOUNCE_TIME);
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