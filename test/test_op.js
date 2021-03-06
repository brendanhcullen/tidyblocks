'use strict'

const assert = require('assert')

const util = require('../libs/util')
const Value = require('../libs/value')
const Op = require('../libs/op')

const fixture = require('./fixture')
const getLeft = new Value.column('left')
const getRight = new Value.column('right')
const getNum = new Value.column('num')
const getStr = new Value.column('str')
const getDate = new Value.column('date')
const getBool = new Value.column('bool')
const threeDates = [
  {date: new Date(1)},
  {date: new Date(20)},
  {date: new Date(300)}
]

describe('arithmetic operations', () => {
  it('adds', (done) => {
    const expected = [4, 3, 2, util.MISSING, util.MISSING, util.MISSING]
    const op = new Op.add(getLeft, getRight)
    const actual = fixture.NUMBER.map((r, i, d) => op.run(r, i, d))
    assert.deepEqual(expected, actual,
                     `Wrong value(s) for add`)
    done()
  })

  it('divides', (done) => {
    const expected = [1.0, -2.5, util.MISSING, util.MISSING, util.MISSING, util.MISSING]
    const op = new Op.divide(getLeft, getRight)
    const actual = fixture.NUMBER.map((r, i, d) => op.run(r, i, d))
    assert.deepEqual(expected, actual,
                     `Wrong value(s) for divide`)
    done()
  })

  it('exponentiates', (done) => {
    const expected = [4, 0.04, 1, util.MISSING, util.MISSING, util.MISSING]
    const op = new Op.power(getLeft, getRight)
    const actual = fixture.NUMBER.map((r, i, d) => op.run(r, i, d))
    assert.deepEqual(expected, actual,
                     `Wrong value(s) for power`)
    done()
  })

  it('multiplies', (done) => {
    const expected = [4, -10, 0, util.MISSING, util.MISSING, util.MISSING]
    const op = new Op.multiply(getLeft, getRight)
    const actual = fixture.NUMBER.map((r, i, d) => op.run(r, i, d))
    assert.deepEqual(expected, actual,
                     `Wrong value(s) for multiply`)
    done()
  })

  it('negates', (done) => {
    const expected = [-2, 2, 0, -3, util.MISSING, util.MISSING]
    const op = new Op.negate(getRight)
    const actual = fixture.NUMBER.map((r, i, d) => op.run(r, i, d))
    assert.deepEqual(expected, actual,
                     `Wrong value(s) for negate`)
    done()
  })

  it('absolute value', (done) => {
    const expected = [2, 2, 0, 3, util.MISSING, util.MISSING]
    const op = new Op.abs(getRight)
    const actual = fixture.NUMBER.map((r, i, d) => op.run(r, i, d))
    assert.deepEqual(expected, actual,
                     `Wrong value(s) for absolute value`)
    done()
  })

  it('remainders', (done) => {
    const expected = [0, 1, util.MISSING, util.MISSING, util.MISSING, util.MISSING]
    const op = new Op.remainder(getLeft, getRight)
    const actual = fixture.NUMBER.map((r, i, d) => op.run(r, i, d))
    assert.deepEqual(expected, actual,
                     `Wrong value(s) for power`)
    done()
  })

  it('subtracts', (done) => {
    const expected = [0, 7, 2, util.MISSING, util.MISSING, util.MISSING]
    const op = new Op.subtract(getLeft, getRight)
    const actual = fixture.NUMBER.map((r, i, d) => op.run(r, i, d))
    assert.deepEqual(expected, actual,
                     `Wrong value(s) for subtract`)
    done()
  })
})

describe('logical operations', () => {
  it('ands', (done) => {
    const expected = [true, false, false, false, util.MISSING, false, util.MISSING]
    const op = new Op.and(getLeft, getRight)
    const actual = fixture.BOOL.map((r, i, d) => op.run(r, i, d))
    assert.deepEqual(expected, actual,
                     `Wrong value(s) for and`)
    done()
  })

  it('nots', (done) => {
    const expected = [false, false, true, true, util.MISSING, true, util.MISSING]
    const op = new Op.not(getLeft)
    const actual = fixture.BOOL.map((r, i, d) => op.run(r, i, d))
    assert.deepEqual(expected, actual,
                     `Wrong value(s) for not`)
    done()
  })

  it('ors', (done) => {
    const expected = [true, true, true, false, false, util.MISSING, util.MISSING]
    const op = new Op.or(getLeft, getRight)
    const actual = fixture.BOOL.map((r, i, d) => op.run(r, i, d))
    assert.deepEqual(expected, actual,
                     `Wrong value(s) for or`)
    done()
  })
})

describe('extrema', () => {
  it('finds maximum numbers', (done) => {
    const expected = [2, 5, 2, util.MISSING, util.MISSING, util.MISSING]
    const op = new Op.maximum(getLeft, getRight)
    const actual = fixture.NUMBER.map((r, i, d) => op.run(r, i, d))
    assert.deepEqual(expected, actual,
                     `Wrong value(s) for maximum numbers`)
    done()
  })

  it('finds minimum numbers', (done) => {
    const expected = [2, -2, 0, util.MISSING, util.MISSING, util.MISSING]
    const op = new Op.minimum(getLeft, getRight)
    const actual = fixture.NUMBER.map((r, i, d) => op.run(r, i, d))
    assert.deepEqual(expected, actual,
                     `Wrong value(s) for minimum numbers`)
    done()
  })

  it('finds maximum strings', (done) => {
    const expected = ['pqr', 'def', 'def', 'abc', util.MISSING, util.MISSING, util.MISSING]
    const op = new Op.maximum(getLeft, getRight)
    const actual = fixture.STRING.map((r, i, d) => op.run(r, i, d))
    assert.deepEqual(expected, actual,
                     `Wrong value(s) for maximum strings`)
    done()
  })

  it('finds minimum strings', (done) => {
    const expected = ['pqr', 'abc', 'abc', '', util.MISSING, util.MISSING, util.MISSING]
    const op = new Op.minimum(getLeft, getRight)
    const actual = fixture.STRING.map((r, i, d) => op.run(r, i, d))
    assert.deepEqual(expected, actual,
                     `Wrong value(s) for minimum strings`)
    done()
  })
})

describe('comparison on numbers', () => {
  it('greater numbers', (done) => {
    const expected = [false, true, true, util.MISSING, util.MISSING, util.MISSING]
    const op = new Op.greater(getLeft, getRight)
    const actual = fixture.NUMBER.map((r, i, d) => op.run(r, i, d))
    assert.deepEqual(expected, actual,
                     `Wrong value(s) for greater numbers`)
    done()
  })

  it('greater equals numbers', (done) => {
    const expected = [true, true, true, util.MISSING, util.MISSING, util.MISSING]
    const op = new Op.greaterEqual(getLeft, getRight)
    const actual = fixture.NUMBER.map((r, i, d) => op.run(r, i, d))
    assert.deepEqual(expected, actual,
                     `Wrong value(s) for greater equal numbers`)
    done()
  })

  it('equals numbers', (done) => {
    const expected = [true, false, false, util.MISSING, util.MISSING, util.MISSING]
    const op = new Op.equal(getLeft, getRight)
    const actual = fixture.NUMBER.map((r, i, d) => op.run(r, i, d))
    assert.deepEqual(expected, actual,
                     `Wrong value(s) for equal numbers`)
    done()
  })

  it('not equals numbers', (done) => {
    const expected = [false, true, true, util.MISSING, util.MISSING, util.MISSING]
    const op = new Op.notEqual(getLeft, getRight)
    const actual = fixture.NUMBER.map((r, i, d) => op.run(r, i, d))
    assert.deepEqual(expected, actual,
                     `Wrong value(s) for not equal numbers`)
    done()
  })

  it('less equals numbers', (done) => {
    const expected = [true, false, false, util.MISSING, util.MISSING, util.MISSING]
    const op = new Op.lessEqual(getLeft, getRight)
    const actual = fixture.NUMBER.map((r, i, d) => op.run(r, i, d))
    assert.deepEqual(expected, actual,
                     `Wrong value(s) for less equal numbers`)
    done()
  })

  it('less numbers', (done) => {
    const expected = [false, false, false, util.MISSING, util.MISSING, util.MISSING]
    const op = new Op.less(getLeft, getRight)
    const actual = fixture.NUMBER.map((r, i, d) => op.run(r, i, d))
    assert.deepEqual(expected, actual,
                     `Wrong value(s) for less numbers`)
    done()
  })
})

describe('comparison on strings', () => {
  it('greater strings', (done) => {
    const expected = [false, false, true, true, util.MISSING, util.MISSING, util.MISSING]
    const op = new Op.greater(getLeft, getRight)
    const actual = fixture.STRING.map((r, i, d) => op.run(r, i, d))
    assert.deepEqual(expected, actual,
                     `Wrong value(s) for greater strings`)
    done()
  })

  it('greater equals strings', (done) => {
    const expected = [true, false, true, true, util.MISSING, util.MISSING, util.MISSING]
    const op = new Op.greaterEqual(getLeft, getRight)
    const actual = fixture.STRING.map((r, i, d) => op.run(r, i, d))
    assert.deepEqual(expected, actual,
                     `Wrong value(s) for greater equal strings`)
    done()
  })

  it('equals strings', (done) => {
    const expected = [true, false, false, false, util.MISSING, util.MISSING, util.MISSING]
    const op = new Op.equal(getLeft, getRight)
    const actual = fixture.STRING.map((r, i, d) => op.run(r, i, d))
    assert.deepEqual(expected, actual,
                     `Wrong value(s) for equal strings`)
    done()
  })

  it('not equals strings', (done) => {
    const expected = [false, true, true, true, util.MISSING, util.MISSING, util.MISSING]
    const op = new Op.notEqual(getLeft, getRight)
    const actual = fixture.STRING.map((r, i, d) => op.run(r, i, d))
    assert.deepEqual(expected, actual,
                     `Wrong value(s) for not equal strings`)
    done()
  })

  it('less equals strings', (done) => {
    const expected = [true, true, false, false, util.MISSING, util.MISSING, util.MISSING]
    const op = new Op.lessEqual(getLeft, getRight)
    const actual = fixture.STRING.map((r, i, d) => op.run(r, i, d))
    assert.deepEqual(expected, actual,
                     `Wrong value(s) for less equal strings`)
    done()
  })

  it('less strings', (done) => {
    const expected = [false, true, false, false, util.MISSING, util.MISSING, util.MISSING]
    const op = new Op.less(getLeft, getRight)
    const actual = fixture.STRING.map((r, i, d) => op.run(r, i, d))
    assert.deepEqual(expected, actual,
                     `Wrong value(s) for less strings`)
    done()
  })
})

describe('comparison on dates', () => {
  it('greater dates', (done) => {
    const test = new Value.datetime(new Date(4000))
    const op = new Op.greater(test, getDate)
    const expected = [true, true, true]
    const actual = threeDates.map((r, i, d) => op.run(r, i, d))
    assert.deepEqual(expected, actual,
                     `Wrong result(s) for greater dates`)
    done()
  })

  it('greater equals dates', (done) => {
    const test = new Value.datetime(new Date(20))
    const op = new Op.greaterEqual(test, getDate)
    const expected = [true, true, false]
    const actual = threeDates.map((r, i, d) => op.run(r, i, d))
    assert.deepEqual(expected, actual,
                     `Wrong result(s) for greater equal dates`)
    done()
  })

  it('equals dates', (done) => {
    const test = new Value.datetime(new Date(20))
    const op = new Op.equal(test, getDate)
    const expected = [false, true, false]
    const actual = threeDates.map((r, i, d) => op.run(r, i, d))
    assert.deepEqual(expected, actual,
                     `Wrong result(s) for equal dates`)
    done()
  })

  it('not equals dates', (done) => {
    const test = new Value.datetime(new Date(20))
    const op = new Op.notEqual(test, getDate)
    const expected = [true, false, true]
    const actual = threeDates.map((r, i, d) => op.run(r, i, d))
    assert.deepEqual(expected, actual,
                     `Wrong result(s) for not equal dates`)
    done()
  })

  it('less equals dates', (done) => {
    const test = new Value.datetime(new Date(20))
    const op = new Op.lessEqual(test, getDate)
    const expected = [false, true, true]
    const actual = threeDates.map((r, i, d) => op.run(r, i, d))
    assert.deepEqual(expected, actual,
                     `Wrong result(s) for less equal dates`)
    done()
  })

  it('less dates', (done) => {
    const test = new Value.datetime(new Date(1))
    const op = new Op.less(test, getDate)
    const expected = [false, true, true]
    const actual = threeDates.map((r, i, d) => op.run(r, i, d))
    assert.deepEqual(expected, actual,
                     `Wrong result(s) for less dates`)
    done()
  })
})

describe('conditional', () => {
  it('pulls values conditionally', (done) => {
    const expected = [2, 5, 0, util.MISSING, util.MISSING, util.MISSING]
    const op = new Op.ifElse(getRight, getLeft, getRight)
    const actual = fixture.NUMBER.map((r, i, d) => op.run(r, i, d))
    assert.deepEqual(expected, actual,
                     `Wrong value(s) for conditional`)
    done()
  })
})

describe('shift', () => {
  it('shifts up', (done) => {
    const expected = [util.MISSING, 2, 5, 2, util.MISSING, 4]
    const op = new Op.shift('left', 1)
    const data = fixture.NUMBER
    const actual = data.map((r, i, d) => op.run(r, i, d))
    assert.deepEqual(expected, actual,
                     `Wrong value(s) when shifting up`)
    done()
  })

  it('shifts by zero', (done) => {
    const expected = [2, 5, 2, util.MISSING, 4, util.MISSING]
    const op = new Op.shift('left', 0)
    const data = fixture.NUMBER
    const actual = data.map((r, i, d) => op.run(r, i, d))
    assert.deepEqual(expected, actual,
                     `Wrong value(s) when shifting by zero`)
    done()
  })

  it('shifts down', (done) => {
    const expected = [5, 2, util.MISSING, 4, util.MISSING, util.MISSING]
    const op = new Op.shift('left', -1)
    const data = fixture.NUMBER
    const actual = data.map((r, i, d) => op.run(r, i, d))
    assert.deepEqual(expected, actual,
                     `Wrong value(s) when shifting down`)
    done()
  })
})

describe('type checks', () => {
  it('correctly identifies wrong types', (done) => {
    const allChecks = [
      [new Op.isDatetime(getBool), 'datetime', 'bool'],
      [new Op.isNumber(getBool), 'num', 'bool'],
      [new Op.isText(getBool), 'text', 'bool'],
      [new Op.isLogical(getDate), 'bool', 'datetime'],
      [new Op.isNumber(getDate), 'num', 'datetime'],
      [new Op.isText(getDate), 'text', 'datetime'],
      [new Op.isLogical(getNum), 'bool', 'num'],
      [new Op.isDatetime(getNum), 'datetime', 'num'],
      [new Op.isText(getNum), 'text', 'num'],
      [new Op.isLogical(getStr), 'bool', 'str'],
      [new Op.isDatetime(getStr), 'datetime', 'str'],
      [new Op.isNumber(getStr), 'num', 'str']
    ]
    for (const [check, tested, actual] of allChecks) {
      assert.deepEqual(fixture.MIXED.map((r, i, d) => check.run(r, i, d)),
                       [false, util.MISSING],
                       `Should not think ${actual} is ${tested}`)
    }
    done()
  })

  it('correctly identifies right types', (done) => {
    const allChecks = [
      [new Op.isLogical(getBool), 'bool'],
      [new Op.isDatetime(getDate), 'datetime'],
      [new Op.isNumber(getNum), 'num'],
      [new Op.isText(getStr), 'text']
    ]
    for (const [check, name] of allChecks) {
      assert.deepEqual(fixture.MIXED.map((r, i, d) => check.run(r, i, d)),
                       [true, util.MISSING],
                       `Incorrect result(s) for ${name}`)
    }
    done()
  })

  it('correctly identifies missing values', (done) => {
    const allChecks = [
      [getBool, 'bool'],
      [getDate, 'datetime'],
      [getNum, 'num'],
      [getStr, 'text']
    ]
    for (const [get, name] of allChecks) {
      const check = new Op.isMissing(get)
      assert.deepEqual(fixture.MIXED.map((r, i, d) => check.run(r, i, d)),
                       [false, true],
                       `Incorrect result(s) for ${name}`)
    }
    done()
  })
})

describe('type conversions', () => {
  it('converts basic types correctly', (done) => {
    const checks = [
      [new Value.logical(util.MISSING), Op.toLogical, util.MISSING],
      [new Value.logical(false), Op.toLogical, false],
      [new Value.logical(true), Op.toLogical, true],
      [new Value.text(''), Op.toLogical, false],
      [new Value.text('abc'), Op.toLogical, true],
      [new Value.number(0), Op.toLogical, false],
      [new Value.number(-3), Op.toLogical, true],
      [new Value.number(9.5), Op.toLogical, true],
      [new Value.number(util.MISSING), Op.toNumber, util.MISSING],
      [new Value.logical(false), Op.toNumber, 0],
      [new Value.logical(true), Op.toNumber, 1],
      [new Value.number(123.4), Op.toNumber, 123.4],
      [new Value.text('abc'), Op.toNumber, util.MISSING],
      [new Value.text('678'), Op.toNumber, 678],
      [new Value.datetime(new Date(0)), Op.toNumber, 0],
      [new Value.text(util.MISSING), Op.toText, util.MISSING],
      [new Value.logical(false), Op.toText, 'false'],
      [new Value.logical(true), Op.toText, 'true'],
      [new Value.number(-123), Op.toText, '-123'],
      [new Value.text('abc'), Op.toText, 'abc'],
      [new Value.datetime(new Date(0)), Op.toText, `${new Date(0)}`]
    ]
    for (const [value, convert, expected] of checks) {
      const op = new convert(value)
      const actual = op.run(fixture.SINGLE[0], 0, fixture.SINGLE)
      assert.equal(actual, expected,
                   `Wrong result for ${value} and ${convert}: expected ${expected}, got ${actual}`)
    }
    done()
  })

  it('converts non-datetimes correctly', (done) => {
    const checks = [new Value.text(''),
                    new Value.text('abc')]
    for (const input of checks) {
      const op = new Op.toDatetime(input)
      assert.throws(() => op.run(fixture.SINGLE[0], 0, fixture.SINGLE),
                    Error,
                    `Should not be able to convert "${input}"`)
    }
    done()
  })

  it('converts valid datetimes correctly', (done) => {
    const checks = [
      [new Value.text('1983-12-02'), new Date('1983-12-02')],
      [new Value.number(123), new Date(123)]
    ]
    for (const [expr, expected] of checks) {
      const op = new Op.toDatetime(expr)
      const actual = op.run(fixture.SINGLE[0], 0, fixture.SINGLE)
      assert(actual instanceof Date,
             `Wrong result type for ${expected}`)
      assert.equal(actual.getTime(), expected.getTime(),
                   `Wrong result for ${expected}`)
    }
    const op = new Op.toDatetime(new Value.number(util.MISSING))
    const actual = op.run(fixture.SINGLE[0], 0, fixture.SINGLE)
    assert.equal(actual, util.MISSING,
                 `Should have MISSING`)
    done()
  })
})

describe('extract values from datetimes', () => {
  it('extracts components of datetimes', (done) => {
    // Zero-based month in constructor *sigh*.
    const value = new Value.datetime(new Date(1983, 11, 2, 7, 55, 19, 0))
    assert.equal((new Op.toYear(value)).run(fixture.SINGLE[0], 0, fixture.SINGLE), 1983,
                 `Wrong year`)
    assert.equal((new Op.toMonth(value)).run(fixture.SINGLE[0], 0, fixture.SINGLE), 12,
                 `Wrong month`)
    assert.equal((new Op.toDay(value)).run(fixture.SINGLE[0], 0, fixture.SINGLE), 2,
                 `Wrong day`)
    assert.equal((new Op.toWeekday(value)).run(fixture.SINGLE[0], 0, fixture.SINGLE), 5,
                 `Wrong weekday`)
    assert.equal((new Op.toHours(value)).run(fixture.SINGLE[0], 0, fixture.SINGLE), 7,
                 `Wrong hours`)
    assert.equal((new Op.toMinutes(value)).run(fixture.SINGLE[0], 0, fixture.SINGLE), 55,
                 `Wrong minutes`)
    assert.equal((new Op.toSeconds(value)).run(fixture.SINGLE[0], 0, fixture.SINGLE), 19,
                 `Wrong seconds`)
    done()
  })

  it('manages missing values when extracting from datetimes', (done) => {
    const converters = [
      ['year', Op.toYear],
      ['month', Op.toMonth],
      ['day', Op.toDay],
      ['weekday', Op.toWeekday],
      ['hours', Op.toHours],
      ['minutes', Op.toMinutes],
      ['seconds', Op.toSeconds]
    ]
    const value = new Value.datetime(util.MISSING)
    for (const [name, conv] of converters) {
      const op = new conv(value)
      const result = op.run(fixture.SINGLE[0], 0, fixture.SINGLE)
      assert.equal(result, util.MISSING,
                   `Wrong result for ${name}`)
    }
    done()
  })
})

describe('expression equality tests', () => {
  it('compares unary expressions', (done) => {
    const const_one = new Value.text('one')
    const negate_one = new Op.negate(const_one)
    assert(negate_one.equal(negate_one),
           `Same should equal`)
    const negate_two = new Op.negate(new Value.text('two'))
    assert(!negate_one.equal(negate_two),
           `Different nested should not equal`)
    const not_one = new Op.not(const_one)
    assert(!negate_one.equal(not_one),
           `Different operators should not equal`)
    done()
  })

  it('compares binary expressions', (done) => {
    const const_1 = new Value.number(1)
    const const_2 = new Value.number(2)
    const add_1_2 = new Op.add(const_1, const_2)
    const add_1_2_also = new Op.add(const_1, const_2)
    assert(add_1_2.equal(add_1_2_also),
           `Equal addition`)
    const add_2_2 = new Op.add(const_2, const_2)
    assert(!add_2_2.equal(add_1_2),
           `Unequal sub-expressions`)
    done()
  })

  it('compares ternary expressions', (done) => {
    const cond_1 = new Op.greater(new Value.column('left'),
                                    new Value.number(0))
    const val_1_true = new Op.add(new Value.column('left'),
                                    new Value.number(3))
    const val_1_false = new Value.number(-1)
    const if_1 = new Op.ifElse(cond_1, val_1_true, val_1_false)
    const val_2_false = new Value.number(-2)
    const if_2 = new Op.ifElse(cond_1, val_1_true, val_2_false)
    assert(!if_2.equal(if_1),
           `Unequal nested expressions`)
    done()
  })

  it('compares shift expressons', (done) => {
    const original = new Op.shift('pink', 3)
    const duplicate = new Op.shift('pink', 3)
    assert(original.equal(duplicate),
           `Should be equal`)
    const others = [
      new Op.shift('magenta', 3),
      new Op.shift('pink', 5),
      new Value.column('pink')
    ]
    for (const o of others) {
      assert(!original.equal(o),
             `Should not be equal`)
    }
    done()
  })
})
