import {omitProperties} from './utils';

describe(`utils`, () => {
  it(`omitProperties`, () => {
    const source = {
      a: `a`,
      b: `b`,
      c: `c`,
      d: `d`
    };

    const reference = {
      a: `a`,
      d: `d`
    };

    expect(omitProperties(source, [`b`, `c`])).toEqual(reference);
    expect(omitProperties(source, [`b`])).not.toEqual(reference);
  });
});
