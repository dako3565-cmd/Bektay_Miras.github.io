const authForm = document.getElementById('authForm');
const authTitle = document.getElementById('authTitle');
const authSwitch = document.getElementById('authSwitch');

let isLogin = true;

// Переключение между Входом и Регистрацией
authSwitch.addEventListener('click', () => {
    isLogin = !isLogin;
    authTitle.innerText = isLogin ? "Login" : "Sign Up";
    authSwitch.innerText = isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login";
});

authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (isLogin) {
        // ЛОГИКА ВХОДА
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.email === email && user.password === password) {
            localStorage.setItem('isAuth', 'true');
            alert('Welcome back!');
            window.location.href = 'Index.html';
        } else {
            alert('Invalid email or password');
        }
    } else {
        // ЛОГИКА РЕГИСТРАЦИИ
        const newUser = { email, password };
        localStorage.setItem('user', JSON.stringify(newUser));
        localStorage.setItem('isAuth', 'true');
        alert('Account created!');
        window.location.href = 'Index.html';
    }
});