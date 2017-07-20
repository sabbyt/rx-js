var requestStream = Rx.Observable.just('https://api.github.com/users');

var responseStream = requestStream
// Map from a string to something that will happen later in time
// Here mapping to an Observable - creating a metastream - that is flat
// Flattens the metastream (from .map) from branches to main flat map
  .flatMap(requestUrl => {
    Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
  })

responseStream.subscribe(response => {
  console.log(response);
});
