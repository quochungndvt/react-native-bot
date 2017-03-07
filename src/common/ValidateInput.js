
let emailReg = '';
//let inputMessage = '';

const validateEmail = (email) => {
    if (email === '') { return false; }
    const mail = email.toLowerCase();
    emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,3})?$/;
    if (!emailReg.test(mail)) return false;
    return true;
};
const validateInputTxt = (text) => {
  if (text === '') return false;
  return true;
};

const ValidateInput = ({ email, password, fullname }) => {
  if (validateEmail(email) === false) return 'Email không hợp lệ!';
  if (validateInputTxt(password) === false) return 'Mật khẩu không hợp lệ!';
  if (fullname && validateInputTxt(fullname) === false) return 'Họ tên không hợp lệ!';
  return true;
};
// ValidateInput(email, fullname, password) {
//     const { change } = this.props.registerActions;
//     temp = fullname.replace(/ /g, '');
//     if (temp.length) {
//       change('fullnameError', false);
//     } else {
//         change('fullnameError', true);
//         return false;
//     }
//     check = validateEmail(email);
//     if (check) {
//       change('emailError', false);
//     } else {
//       change('emailError', true);
//       return false;
//     }
//     if (password.length) {
//       change('passwordError', false);
//     } else {
//       change('passwordError', true);
//       return false;
//     }
//     return true;
// }
export { ValidateInput, validateEmail, validateInputTxt };
