# rx-handler-decorator
A decorator for making an RxJS 5 Subject into a handler for user events

## Installation

```sh
npm i -S rx-handler-decorator
```

## Usage

By decorating any property that returns a `Subject` (or `BehaviorSubject`, et al)
with `@rxHandler`, it converts that property into a handler function, that also has all of the
methods of the original subject reference.

This can be used in **any** framework or environment that might require this behavior.
It also automatically binds the handler function to the reference, so there's no
need to use something like `.bind()` or [core-decorators](http://github.com/jayphelps/core-decorators.js)
[autobind](https://github.com/jayphelps/core-decorators.js#autobind) on the resulting
handler method.

### Angular 2 Basic Example

```TypeScript
import { Component } from 'angular/core';
import { rxHandler } from 'rx-handler-decorator';
import * as Rx from 'rxjs';

@Component({
    selector: 'my-app',
    template: `<div>
      <button (click)="clicks()">Click Me</button>
      <div>count: {{count | async}}</div>
    </div>`
})
class MyComponent {
  @rxHandler
  clicks = new Rx.Subject();

  get count() {
    return this.clicks
      .scan(x => x + 1, 0);
  }
}
```

### React.js Basic Example

```js
import * as React from 'react';
import * as Rx from 'rxjs';
import { rxHandler } from 'rx-handler-decorator';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    this.sub = this.clicks
      .scan(x => x + 1, 0)
      .subscribe(count => this.setState({ count }));
  }

  componentWillUnmount() {
    this.sub.unsubscribe();
  }

  // convert the `clicks` property to a function-subject!
  @rxHandler
  clicks = new Rx.Subject();

  render() {
    // now we can use `{this.clicks}` directly as a handler
    return (<div>
      <button onClick={this.clicks}>Click Me</button>
      <div>count: {this.state.count}</div>
    </div>);
  }
}
```
