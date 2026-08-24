/* =========================================
   LOGIN PAGE JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("loginForm");

    const emailInput = document.getElementById("loginEmail");
    const passwordInput = document.getElementById("loginPassword");

    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    const passwordToggle = document.getElementById("passwordToggle");

    const loginButton = document.getElementById("loginButton");

    const notification = document.getElementById("notification");
    const notificationIcon = document.getElementById("notificationIcon");
    const notificationTitle = document.getElementById("notificationTitle");
    const notificationMessage = document.getElementById("notificationMessage");
    const notificationClose = document.getElementById("notificationClose");

    const forgotPassword = document.getElementById("forgotPassword");


    /* =========================================
       EMAIL REGEX
    ========================================= */

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


    /* =========================================
       PASSWORD VALIDATION
       
       Requirements:
       - 8 characters minimum
       - Uppercase
       - Lowercase
       - Number
       - Special character
    ========================================= */

    function isValidPassword(password) {

        const passwordRegex =
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

        return passwordRegex.test(password);
    }


    /* =========================================
       NOTIFICATION
    ========================================= */

    let notificationTimer;

    function showNotification(
        type,
        title,
        message
    ) {

        clearTimeout(notificationTimer);

        notification.classList.remove("success");

        if (type === "success") {
            notification.classList.add("success");

            notificationIcon.textContent = "✓";
        } else {
            notificationIcon.textContent = "!";
        }

        notificationTitle.textContent = title;
        notificationMessage.textContent = message;

        notification.classList.add("show");

        notificationTimer = setTimeout(() => {

            notification.classList.remove("show");

        }, 4000);
    }


    /* =========================================
       CLOSE NOTIFICATION
    ========================================= */

    notificationClose.addEventListener("click", () => {

        notification.classList.remove("show");

    });


    /* =========================================
       SHOW / HIDE PASSWORD
    ========================================= */

    passwordToggle.addEventListener("click", () => {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            passwordToggle.textContent = "🙈";

            passwordToggle.setAttribute(
                "aria-label",
                "Hide password"
            );

        } else {

            passwordInput.type = "password";

            passwordToggle.textContent = "👁";

            passwordToggle.setAttribute(
                "aria-label",
                "Show password"
            );
        }

    });


    /* =========================================
       CLEAR FIELD ERROR
    ========================================= */

    function clearFieldError(input, errorElement) {

        input.closest(".input-wrapper")
            .classList.remove("input-error");

        errorElement.textContent = "";

    }


    /* =========================================
       SET FIELD ERROR
    ========================================= */

    function setFieldError(
        input,
        errorElement,
        message
    ) {

        input.closest(".input-wrapper")
            .classList.add("input-error");

        errorElement.textContent = message;

    }


    /* =========================================
       VALIDATE EMAIL
    ========================================= */

    function validateEmail() {

        const email =
            emailInput.value.trim();

        clearFieldError(
            emailInput,
            emailError
        );

        if (!email) {

            setFieldError(
                emailInput,
                emailError,
                "Email address is required."
            );

            return false;
        }

        if (!emailRegex.test(email)) {

            setFieldError(
                emailInput,
                emailError,
                "Please enter a valid email address."
            );

            return false;
        }

        return true;
    }


    /* =========================================
       VALIDATE PASSWORD
    ========================================= */

    function validatePassword() {

        const password =
            passwordInput.value;

        clearFieldError(
            passwordInput,
            passwordError
        );

        if (!password) {

            setFieldError(
                passwordInput,
                passwordError,
                "Password is required."
            );

            return false;
        }

        if (!isValidPassword(password)) {

            setFieldError(
                passwordInput,
                passwordError,
                "Password must contain 8+ characters, uppercase, lowercase, number and special character."
            );

            return false;
        }

        return true;
    }


    /* =========================================
       LIVE VALIDATION
    ========================================= */

    emailInput.addEventListener("blur", () => {

        if (emailInput.value.trim()) {
            validateEmail();
        }

    });


    passwordInput.addEventListener("blur", () => {

        if (passwordInput.value) {
            validatePassword();
        }

    });


    emailInput.addEventListener("input", () => {

        if (
            emailInput.classList.contains("input-error") ||
            emailError.textContent
        ) {

            validateEmail();

        }

    });


    passwordInput.addEventListener("input", () => {

        if (
            passwordError.textContent
        ) {

            validatePassword();

        }

    });


    /* =========================================
       LOGIN
    ========================================= */

    loginForm.addEventListener("submit", async (event) => {

        event.preventDefault();


        const validEmail =
            validateEmail();

        const validPassword =
            validatePassword();


        if (!validEmail || !validPassword) {

            showNotification(
                "error",
                "Login Failed",
                "Please correct the highlighted fields."
            );

            return;
        }


        const email =
            emailInput.value
                .trim()
                .toLowerCase();

        const password =
            passwordInput.value;


        /* =====================================
           GET USERS FROM LOCAL STORAGE
        ===================================== */

        const users =
            JSON.parse(
                localStorage.getItem("nexusUsers")
            ) || [];


        /* =====================================
           FIND USER
        ===================================== */

        const user =
            users.find(
                storedUser =>
                    storedUser.email === email
            );


        if (!user) {

            showNotification(
                "error",
                "Account Not Found",
                "No account exists with this email. Please sign up first."
            );

            return;
        }


        /* =====================================
           CHECK PASSWORD
        ===================================== */

        if (user.password !== password) {

            showNotification(
                "error",
                "Incorrect Password",
                "The password you entered is incorrect."
            );

            return;
        }


        /* =====================================
           BUTTON LOADING
        ===================================== */

        loginButton.disabled = true;

        loginButton.classList.add("loading");


        /* =====================================
           SAVE SESSION
        ===================================== */

        const sessionUser = {

            id: user.id,

            name: user.name,

            email: user.email,

            mobile: user.mobile,

            loginTime: new Date().toISOString()

        };


        sessionStorage.setItem(
            "nexusCurrentUser",
            JSON.stringify(sessionUser)
        );


        /* =====================================
           REMEMBER ME
        ===================================== */

        const rememberMe =
            document.getElementById("rememberMe").checked;


        if (rememberMe) {

            localStorage.setItem(
                "nexusRememberedEmail",
                email
            );

        } else {

            localStorage.removeItem(
                "nexusRememberedEmail"
            );

        }


        /* =====================================
           SUCCESS
        ===================================== */

        showNotification(
            "success",
            "Login Successful",
            "Welcome back! Opening your dashboard..."
        );


        /* =====================================
           REDIRECT
        ===================================== */

        setTimeout(() => {

            window.location.href =
                "dashboard.html";

        }, 1200);

    });


    /* =========================================
       FORGOT PASSWORD
    ========================================= */

    forgotPassword.addEventListener("click", (event) => {

        event.preventDefault();

        showNotification(
            "error",
            "Password Recovery",
            "Password recovery will be added in the next step."
        );

    });


    /* =========================================
       LOAD REMEMBERED EMAIL
    ========================================= */

    const rememberedEmail =
        localStorage.getItem(
            "nexusRememberedEmail"
        );


    if (rememberedEmail) {

        emailInput.value =
            rememberedEmail;

        document.getElementById(
            "rememberMe"
        ).checked = true;

    }


    /* =========================================
       REDIRECT IF ALREADY LOGGED IN
    ========================================= */

    const currentUser =
        sessionStorage.getItem(
            "nexusCurrentUser"
        );


    if (currentUser) {

        // Uncomment this if you want
        // already logged-in users to automatically
        // go to the dashboard.

        // window.location.href = "dashboard.html";

    }

});