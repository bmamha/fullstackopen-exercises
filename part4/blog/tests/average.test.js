const {test , describe} = require('node:test')
const assert = require('node:assert')

const average = require('../utils/for_testing').average


describe('average', () => {
    test('of one value is the value of itself', () => {
        assert.strictEqual(average([1]), 1)
    })
    test('of many calculate is right', () => {
        assert.strictEqual(average([1,2,3,4,5,6,7]), 4)
    })

    test('of empty array is zero', () => {
        assert.strictEqual(average([]), 0)
    })
}
)