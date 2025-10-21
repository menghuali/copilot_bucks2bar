// Validation helpers for username and numeric inputs
function isValidUsername(username) {
    const hasUpperCase = /[A-Z]/.test(username);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(username);
    const hasNumber = /\d/.test(username);
    const isValidLength = username.length >= 8;

    return hasUpperCase && hasSpecialChar && hasNumber && isValidLength;
}

function getUsernameFeedback(username) {
    if (isValidUsername(username)) return "";
    return "Username must have at least 1 uppercase letter, 1 special character, 1 number, and be at least 8 characters long.";
}

function isValidNumberInput(value) {
    const v = value.trim();
    return v === "" || !isNaN(v);
}

module.exports = {
    isValidUsername,
    getUsernameFeedback,
    isValidNumberInput,
};
