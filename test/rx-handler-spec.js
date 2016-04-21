/* global describe, it */
import { Subject } from 'rxjs/Subject';
import { map } from 'rxjs/operator/map';
import { rxHandler } from '../';
import { expect } from 'chai';

describe('rx-handler', () => {
  it('should convert a Subject property into a function-subject', () => {
    class Foo {
      @rxHandler
      test = new Subject();

      send(value) {
        this.test(value);
      }
    }

    let foo = new Foo();
    let results = [];

    foo.test
      ::map(x => x + '!')
      .subscribe((x) => results.push(x));

    foo.send('this');
    foo.send('is');
    foo.send('bananas');

    expect(results).to.deep.equal(['this!', 'is!', 'bananas!']);
  });
});
