var refreshButton = document.querySelector('.refresh');
var closeButton1 = document.querySelector('.close1');
var closeButton2 = document.querySelector('.close2');
var closeButton3 = document.querySelector('.close3');

var refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');
var close1Clicks = Rx.Observable.fromEvent(closeButton1, 'click');
var close2Clicks = Rx.Observable.fromEvent(closeButton2, 'click');
var close3Clicks = Rx.Observable.fromEvent(closeButton3, 'click');

var startupRequestStream = Rx.Observable.just('https://api.github.com/users');

var requestOnRefreshStream = refreshClickStream
  .map(ev => {
    var randomOffset = Math.floor(Math.random() * 500);
    return 'https://api.github.com/users?since=' + randomOffset;
  });

var requestStream = startupRequestStream.merge(requestOnRefreshStream);

var responseStream = requestStream
  .flatMap(requestUrl => {
    Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
  })
  .shareReplay(1);

// refreshClickStream:  ------f------------>
// requestStream:       r-----r------------>
// responseStream:      ---R-----R--------->
// closeClickStream:    ------------x------>
// suggestion1Stream:   N--u--N--u--------->

function createSuggestionStream(responseStream, closeClickStream) {
  closeClickStream.map(ev => getRandomUser(listUser));

  return responseStream
  .map(listUser =>
    listUser[Math.floor(Math.random() * listUser.length)];)
  .startWith(null)
  .merge(refreshClickStream.map(ev => null));
}

var suggestion1Stream = createSuggestionStream(responseStream, close1Clicks);
var suggestion2Stream = createSuggestionStream(responseStream, close2Clicks);
var suggestion3Stream = createSuggestionStream(responseStream, close3Clicks);

function renderSuggestion(suggestedUser, selector) {
  var suggestionEl = document.querySelector(selector);
  if (suggestedUser === null) {
    suggestionEl.style.visibility = 'hidden';
  } else {
    suggestionEl.style.visibility = 'visible';
    var usernameEl = suggestionEl.querySelector.('.username');
    usernameEl.href = suggestedUser.html_url;
    usernameEl.textContent = suggestedUser.login;
    var imgEl = suggestionEl.querySelector('img');
    imgEl.src = '';
    imgEl.src = suggestedUser.avatar_url;
  }
}

suggestion1Stream.subscribe(user => {
  renderSuggestion(user, '.suggestion1');
});
suggestion2Stream.subscribe(user => {
  renderSuggestion(user, '.suggestion1');
});
suggestion3Stream.subscribe(user => {
  renderSuggestion(user, '.suggestion1');
});
