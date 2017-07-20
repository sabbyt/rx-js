var button = document.querySelector('button');
var label = document.querySelector('h4');

var clickStream = Rx.Observable.fromEvent(button, 'click');

var doubleClickStream = clickStream
  // Waited for 250ms for event silence to happen and accumulate everything into an array
  .buffer(() => clickStream.throttle(250))
  // Gets length of array
  .map(arr => arr.length)
  // Filtering for only double clicks
  .filter(len => len === 2);

doubleClickStream.subscribe(event => {
  label.textContent = 'Double Click';
});

doubleClickStream
  .throttle(1000)
  .subscribe(suggestion => {
    label.textContent = 'Button';
  });
