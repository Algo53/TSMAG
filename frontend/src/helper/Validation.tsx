export const validateName = (name: string) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name) && name.length >= 3 && name.length <= 20;
};

export const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePassword = (password: string) => {
    // Password should be at least 5 characters long and contain a special character
    return password.length >= 5 && /[!@#$%^&*(),.?":{}|<>]/.test(password);
};