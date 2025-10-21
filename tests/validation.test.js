const { isValidUsername, getUsernameFeedback, isValidNumberInput } = require('../js/validation');

describe('Username validation', () => {
    test('valid username passes all checks', () => {
        const username = 'Test@123'; // Has uppercase, special, number, length 8
        expect(isValidUsername(username)).toBe(true);
        expect(getUsernameFeedback(username)).toBe("");
    });

    test('username missing uppercase fails', () => {
        const username = 'test@1234';
        expect(isValidUsername(username)).toBe(false);
        expect(getUsernameFeedback(username)).not.toBe("");
    });

    test('username missing special char fails', () => {
        const username = 'Test12345';
        expect(isValidUsername(username)).toBe(false);
    });

    test('username missing number fails', () => {
        const username = 'Test@abcd';
        expect(isValidUsername(username)).toBe(false);
    });

    test('username too short fails', () => {
        const username = 'T@1aB';
        expect(isValidUsername(username)).toBe(false);
    });
});

describe('Number input validation', () => {
    test('empty string is valid', () => {
        expect(isValidNumberInput('')).toBe(true);
    });

    test('valid number string is valid', () => {
        expect(isValidNumberInput('123.45')).toBe(true);
    });

    test('non-numeric string is invalid', () => {
        expect(isValidNumberInput('12abc')).toBe(false);
    });
});
