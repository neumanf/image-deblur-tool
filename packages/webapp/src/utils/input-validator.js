export default function isValidInput(value) {
    if (isNaN(value) || value < 0 || value > 9999999) {
        return false;
    }
    return true;
}
