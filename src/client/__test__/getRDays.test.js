const {getRdays} = require ("../scripts/utils.js");

const date = new Date("2023-11-02");

test('The remaining days from now is correct', () => {
    expect(getRdays(date)).toBe(0);
});