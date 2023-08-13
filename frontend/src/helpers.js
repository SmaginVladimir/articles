export const checkValue = (name, value) => {
    let re = null;
    let check = ''
    if (name === 'email') {
        check = String(value).toLowerCase();
        re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    } else {
        check = String(value);
        re = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[\x20-\x7E]{6,}$/;
    }
    if (!re.test(check)) {
        return name === 'email' ? "Некоректный емейл" : "Пароль должен содержать символы в разных регистрах, цифры";
    } else {
        return "";
    }
}
