Messenger = function(document) {

    return {
        log: _log
    }

    function _log(msg) {
        var logEl = document.getElementById('log');

        var pEl = document.createElement('p');
        pEl.innerText = msg;
        logEl.appendChild(pEl);

        logEl.scrollTop = logEl.scrollHeight;
    }

}(window.document);