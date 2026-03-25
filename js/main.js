document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.getElementById('toggle-password');
    const figures = document.querySelectorAll('.figure');
    
    let isPasswordVisible = false;

    // 1. Mouse Tracking for Eyes
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        document.querySelectorAll('.eye').forEach(eye => {
            const rect = eye.getBoundingClientRect();
            const eyeX = rect.left + rect.width / 2;
            const eyeY = rect.top + rect.height / 2;
            
            const angle = Math.atan2(mouseY - eyeY, mouseX - eyeX);
            const distance = Math.min(rect.width / 4, Math.hypot(mouseX - eyeX, mouseY - eyeY) / 10);
            
            const moveX = Math.cos(angle) * distance;
            const moveY = Math.sin(angle) * distance;
            
            const pupil = eye.querySelector('.pupil');
            if (pupil) {
                pupil.style.transform = `translate(${moveX - 1.5}px, ${moveY - 1.5}px)`; // -1.5 is half of pupil width
            }
        });
    });

    // 2. Interaction Logic
    const updateFigures = () => {
        const isAccountFocused = document.activeElement === usernameInput;
        const isPasswordFocused = document.activeElement === passwordInput;

        // Peeking Logic
        if (isAccountFocused) {
            figures[0].classList.add('peek');
            figures[1].classList.remove('peek');
            figures[2].classList.remove('peek');
        } else if (isPasswordFocused) {
            figures.forEach(f => f.classList.add('peek'));
        } else {
            figures.forEach(f => f.classList.remove('peek'));
        }

        // Turning Away Logic (only if password is not visible)
        if (!isPasswordVisible) {
            figures.forEach(f => f.classList.add('turn-away'));
        } else {
            figures.forEach(f => f.classList.remove('turn-away'));
        }
    };

    usernameInput.addEventListener('focus', updateFigures);
    usernameInput.addEventListener('blur', updateFigures);
    passwordInput.addEventListener('focus', updateFigures);
    passwordInput.addEventListener('blur', updateFigures);

    toggleBtn.addEventListener('click', () => {
        isPasswordVisible = !isPasswordVisible;
        if (isPasswordVisible) {
            passwordInput.type = 'text';
            toggleBtn.textContent = '隐藏';
        } else {
            passwordInput.type = 'password';
            toggleBtn.textContent = '显示';
        }
        updateFigures();
    });

    // Prevent default form submission for demo
    document.querySelector('.login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('登录演示：任务完成！');
    });

    // Initial state
    updateFigures();
});
