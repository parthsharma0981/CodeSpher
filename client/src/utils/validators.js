export const validateEmail = (email) => {
 const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 return re.test(email);
};

export const validatePassword = (password) => {
 // Returns strength 0-4 and a message
 let strength = 0;
 if (password.length >= 8) strength += 1;
 if (/[A-Z]/.test(password)) strength += 1;
 if (/[0-9]/.test(password)) strength += 1;
 if (/[^A-Za-z0-9]/.test(password)) strength += 1;
 
 let message = '';
 switch (strength) {
 case 0:
 case 1: message = 'Weak'; break;
 case 2: message = 'Fair'; break;
 case 3: message = 'Good'; break;
 case 4: message = 'Strong'; break;
 default: message = '';
 }
 
 return {
 isValid: password.length >= 8,
 strength,
 message
 };
};

export const validateName = (name) => {
 return name && name.trim().length >= 2;
};

export const validateOTP = (otp) => {
 const re = /^[0-9]{6}$/;
 return re.test(otp);
};
