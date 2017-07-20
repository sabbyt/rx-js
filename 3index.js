// It allows you to specify the dynamic behavior fo a value completely at the time of declaration.
// Need to specify all behaviour of the stream.
// Cannot change streams later.

var streamA = Rx.Observable.of(3, 4);
var streamB = streamA.map(a => 10 * a);

streamB.subscribe(b => console.log(b));
