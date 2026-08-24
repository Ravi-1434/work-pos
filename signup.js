/* =========================================
   NEXUS SIGNUP PAGE
   signup.js
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       ELEMENTS
    ====================================== */

    const signupForm =
        document.getElementById("signupForm");

    const steps =
        document.querySelectorAll(".form-step");

    const progressFill =
        document.getElementById("progressFill");

    const progressText =
        document.getElementById("progressText");

    const progressPercent =
        document.getElementById("progressPercent");


    /* =====================================
       INPUTS
    ====================================== */

    const fullName =
        document.getElementById("fullName");

    const signupEmail =
        document.getElementById("signupEmail");

    const mobileNumber =
        document.getElementById("mobileNumber");

    const signupPassword =
        document.getElementById("signupPassword");

    const confirmPassword =
        document.getElementById("confirmPassword");

    const termsCheckbox =
        document.getElementById("termsCheckbox");


    /* =====================================
       ERRORS
    ====================================== */

    const nameError =
        document.getElementById("nameError");

    const signupEmailError =
        document.getElementById("signupEmailError");

    const mobileError =
        document.getElementById("mobileError");

    const signupPasswordError =
        document.getElementById("signupPasswordError");

    const confirmPasswordError =
        document.getElementById("confirmPasswordError");

    const termsError =
        document.getElementById("termsError");


    /* =====================================
       BUTTONS
    ====================================== */

    const nextButtons =
        document.querySelectorAll(".next-button");

    const backButtons =
        document.querySelectorAll(".back-button");

    const signupButton =
        document.getElementById("signupButton");

    const buttonLoader =
        document.getElementById("buttonLoader");


    /* =====================================
       PASSWORD ELEMENTS
    ====================================== */

    const passwordToggle =
        document.getElementById("passwordToggle");

    const confirmPasswordToggle =
        document.getElementById(
            "confirmPasswordToggle"
        );

    const strengthText =
        document.getElementById("strengthText");

    const strengthFill =
        document.getElementById("strengthFill");


    /* =====================================
       PASSWORD RULES
    ====================================== */

    const ruleLength =
        document.getElementById("ruleLength");

    const ruleUppercase =
        document.getElementById("ruleUppercase");

    const ruleLowercase =
        document.getElementById("ruleLowercase");

    const ruleNumber =
        document.getElementById("ruleNumber");

    const ruleSpecial =
        document.getElementById("ruleSpecial");


    /* =====================================
       SUMMARY
    ====================================== */

    const summaryName =
        document.getElementById("summaryName");

    const summaryEmail =
        document.getElementById("summaryEmail");

    const summaryMobile =
        document.getElementById("summaryMobile");


    /* =====================================
       NOTIFICATION
    ====================================== */

    const notification =
        document.getElementById("notification");

    const notificationIcon =
        document.getElementById(
            "notificationIcon"
        );

    const notificationTitle =
        document.getElementById(
            "notificationTitle"
        );

    const notificationMessage =
        document.getElementById(
            "notificationMessage"
        );

    const notificationClose =
        document.getElementById(
            "notificationClose"
        );


    /* =====================================
       CURRENT STEP
    ====================================== */

    let currentStep = 1;

    const totalSteps = 5;

    let notificationTimer;


    /* =====================================
       REGEX
    ====================================== */

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const mobileRegex =
        /^[6-9]\d{9}$/;

    const nameRegex =
        /^[A-Za-zÀ-ÿ]+(?:[\s'-][A-Za-zÀ-ÿ]+)*$/;


    /* =====================================
       PASSWORD RULE CHECK
    ====================================== */

    function getPasswordRules(password) {

        return {

            length:
                password.length >= 8,

            uppercase:
                /[A-Z]/.test(password),

            lowercase:
                /[a-z]/.test(password),

            number:
                /\d/.test(password),

            special:
                /[^A-Za-z0-9]/.test(password)

        };

    }


    /* =====================================
       PASSWORD VALIDATION
    ===================================== */

    function isValidPassword(password) {

        const rules =
            getPasswordRules(password);

        return (
            rules.length &&
            rules.uppercase &&
            rules.lowercase &&
            rules.number &&
            rules.special
        );

    }


    /* =====================================
       NOTIFICATION
    ===================================== */

    function showNotification(
        type,
        title,
        message
    ) {

        clearTimeout(notificationTimer);

        notification.classList.remove(
            "success"
        );

        if (type === "success") {

            notification.classList.add(
                "success"
            );

            notificationIcon.textContent =
                "✓";

        } else {

            notificationIcon.textContent =
                "!";

        }

        notificationTitle.textContent =
            title;

        notificationMessage.textContent =
            message;

        notification.classList.add("show");

        notificationTimer =
            setTimeout(() => {

                notification.classList.remove(
                    "show"
                );

            }, 4500);
    }


    /* =====================================
       CLOSE NOTIFICATION
    ====================================== */

    notificationClose.addEventListener(
        "click",
        () => {

            notification.classList.remove(
                "show"
            );

        }
    );


    /* =====================================
       FIELD ERROR HELPERS
    ====================================== */

    function getInputWrapper(input) {

        return input.closest(
            ".input-wrapper"
        );

    }


    function clearError(
        input,
        errorElement
    ) {

        const wrapper =
            getInputWrapper(input);

        if (wrapper) {

            wrapper.classList.remove(
                "input-error"
            );

            wrapper.classList.remove(
                "input-success"
            );

        }

        errorElement.textContent = "";

    }


    function setError(
        input,
        errorElement,
        message
    ) {

        const wrapper =
            getInputWrapper(input);

        if (wrapper) {

            wrapper.classList.remove(
                "input-success"
            );

            wrapper.classList.add(
                "input-error"
            );

        }

        errorElement.textContent =
            message;

    }


    function setSuccess(input) {

        const wrapper =
            getInputWrapper(input);

        if (wrapper) {

            wrapper.classList.remove(
                "input-error"
            );

            wrapper.classList.add(
                "input-success"
            );

        }

    }


    /* =====================================
       STEP 1 VALIDATION
       NAME
    ====================================== */

    function validateName() {

        const value =
            fullName.value.trim();

        clearError(
            fullName,
            nameError
        );


        if (!value) {

            setError(
                fullName,
                nameError,
                "Please enter your full name."
            );

            return false;
        }


        if (value.length < 3) {

            setError(
                fullName,
                nameError,
                "Name must contain at least 3 characters."
            );

            return false;
        }


        if (value.length > 60) {

            setError(
                fullName,
                nameError,
                "Name cannot exceed 60 characters."
            );

            return false;
        }


        if (!nameRegex.test(value)) {

            setError(
                fullName,
                nameError,
                "Please enter a valid name."
            );

            return false;
        }


        setSuccess(fullName);

        return true;
    }


    /* =====================================
       STEP 2 VALIDATION
       EMAIL
    ====================================== */

    function validateEmail() {

        const value =
            signupEmail.value
                .trim()
                .toLowerCase();

        clearError(
            signupEmail,
            signupEmailError
        );


        if (!value) {

            setError(
                signupEmail,
                signupEmailError,
                "Please enter your email address."
            );

            return false;
        }


        if (!emailRegex.test(value)) {

            setError(
                signupEmail,
                signupEmailError,
                "Please enter a valid email address."
            );

            return false;
        }


        const users =
            JSON.parse(
                localStorage.getItem(
                    "nexusUsers"
                )
            ) || [];


        const existingUser =
            users.find(
                user =>
                    user.email === value
            );


        if (existingUser) {

            setError(
                signupEmail,
                signupEmailError,
                "An account with this email already exists."
            );

            return false;
        }


        setSuccess(signupEmail);

        return true;
    }


    /* =====================================
       STEP 3 VALIDATION
       MOBILE
    ====================================== */

    function validateMobile() {

        const value =
            mobileNumber.value.trim();

        clearError(
            mobileNumber,
            mobileError
        );


        if (!value) {

            setError(
                mobileNumber,
                mobileError,
                "Please enter your mobile number."
            );

            return false;
        }


        if (!mobileRegex.test(value)) {

            setError(
                mobileNumber,
                mobileError,
                "Enter a valid 10-digit Indian mobile number."
            );

            return false;
        }


        const users =
            JSON.parse(
                localStorage.getItem(
                    "nexusUsers"
                )
            ) || [];


        const existingUser =
            users.find(
                user =>
                    user.mobile === value
            );


        if (existingUser) {

            setError(
                mobileNumber,
                mobileError,
                "This mobile number is already registered."
            );

            return false;
        }


        setSuccess(mobileNumber);

        return true;
    }


    /* =====================================
       STEP 4 VALIDATION
       PASSWORD
    ====================================== */

    function validatePassword() {

        const password =
            signupPassword.value;

        clearError(
            signupPassword,
            signupPasswordError
        );


        if (!password) {

            setError(
                signupPassword,
                signupPasswordError,
                "Please create a password."
            );

            return false;
        }


        if (!isValidPassword(password)) {

            setError(
                signupPassword,
                signupPasswordError,
                "Please satisfy all password requirements."
            );

            return false;
        }


        setSuccess(signupPassword);

        return true;
    }


    /* =====================================
       STEP 5 VALIDATION
       CONFIRM PASSWORD
    ====================================== */

    function validateConfirmPassword() {

        const password =
            signupPassword.value;

        const confirm =
            confirmPassword.value;

        clearError(
            confirmPassword,
            confirmPasswordError
        );


        if (!confirm) {

            setError(
                confirmPassword,
                confirmPasswordError,
                "Please confirm your password."
            );

            return false;
        }


        if (password !== confirm) {

            setError(
                confirmPassword,
                confirmPasswordError,
                "Passwords do not match."
            );

            return false;
        }


        setSuccess(confirmPassword);

        return true;
    }


    /* =====================================
       TERMS VALIDATION
    ====================================== */

    function validateTerms() {

        termsError.textContent = "";


        if (!termsCheckbox.checked) {

            termsError.textContent =
                "Please accept the Terms & Conditions and Privacy Policy.";

            return false;
        }


        return true;
    }


    /* =====================================
       SHOW STEP
    ====================================== */

    function showStep(stepNumber) {

        if (
            stepNumber < 1 ||
            stepNumber > totalSteps
        ) {
            return;
        }


        steps.forEach(step => {

            const stepValue =
                Number(
                    step.dataset.step
                );

            step.classList.toggle(
                "active",
                stepValue === stepNumber
            );

        });


        currentStep =
            stepNumber;


        /* ================================
           UPDATE PROGRESS
        ================================= */

        const percentage =
            Math.round(
                (stepNumber / totalSteps) * 100
            );


        progressFill.style.width =
            `${percentage}%`;

        progressText.textContent =
            `Step ${stepNumber} of ${totalSteps}`;

        progressPercent.textContent =
            `${percentage}%`;


        /* ================================
           UPDATE SUMMARY
        ================================= */

        updateSummary();


        /* ================================
           SCROLL TOP
        ================================= */

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    /* =====================================
       UPDATE SUMMARY
    ====================================== */

    function updateSummary() {

        summaryName.textContent =
            fullName.value.trim() || "—";

        summaryEmail.textContent =
            signupEmail.value.trim() || "—";

        summaryMobile.textContent =
            mobileNumber.value.trim()
                ? `+91 ${mobileNumber.value.trim()}`
                : "—";

    }


    /* =====================================
       NEXT BUTTONS
    ====================================== */

    nextButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const nextStep =
                    Number(
                        button.dataset.next
                    );


                let isValid = false;


                /* ==========================
                   VALIDATE CURRENT STEP
                =========================== */

                if (currentStep === 1) {

                    isValid =
                        validateName();

                }

                else if (currentStep === 2) {

                    isValid =
                        validateEmail();

                }

                else if (currentStep === 3) {

                    isValid =
                        validateMobile();

                }

                else if (currentStep === 4) {

                    isValid =
                        validatePassword();

                }


                if (!isValid) {

                    showNotification(
                        "error",
                        "Check Your Information",
                        "Please correct the highlighted field before continuing."
                    );

                    return;
                }


                showStep(nextStep);

            }
        );

    });


    /* =====================================
       BACK BUTTONS
    ====================================== */

    backButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const previousStep =
                    Number(
                        button.dataset.back
                    );

                showStep(previousStep);

            }
        );

    });


    /* =====================================
       NAME INPUT
    ====================================== */

    fullName.addEventListener(
        "input",
        () => {

            /* Remove numbers and unsupported
               characters while typing */

            fullName.value =
                fullName.value.replace(
                    /[^A-Za-zÀ-ÿ\s'-]/g,
                    ""
                );


            if (nameError.textContent) {

                validateName();

            }

        }
    );


    fullName.addEventListener(
        "blur",
        () => {

            if (fullName.value.trim()) {

                validateName();

            }

        }
    );


    /* =====================================
       EMAIL INPUT
    ====================================== */

    signupEmail.addEventListener(
        "input",
        () => {

            signupEmail.value =
                signupEmail.value
                    .toLowerCase()
                    .replace(/\s/g, "");


            if (signupEmailError.textContent) {

                validateEmail();

            }

        }
    );


    signupEmail.addEventListener(
        "blur",
        () => {

            if (signupEmail.value.trim()) {

                validateEmail();

            }

        }
    );


    /* =====================================
       MOBILE INPUT
    ====================================== */

    mobileNumber.addEventListener(
        "input",
        () => {

            mobileNumber.value =
                mobileNumber.value
                    .replace(/\D/g, "")
                    .slice(0, 10);


            if (mobileError.textContent) {

                validateMobile();

            }

        }
    );


    mobileNumber.addEventListener(
        "blur",
        () => {

            if (mobileNumber.value.trim()) {

                validateMobile();

            }

        }
    );


    /* =====================================
       PASSWORD STRENGTH
    ====================================== */

    function updatePasswordStrength() {

        const password =
            signupPassword.value;

        const rules =
            getPasswordRules(password);


        /* ================================
           UPDATE RULES
        ================================= */

        updateRule(
            ruleLength,
            rules.length
        );

        updateRule(
            ruleUppercase,
            rules.uppercase
        );

        updateRule(
            ruleLowercase,
            rules.lowercase
        );

        updateRule(
            ruleNumber,
            rules.number
        );

        updateRule(
            ruleSpecial,
            rules.special
        );


        /* ================================
           CALCULATE SCORE
        ================================= */

        let score = 0;

        if (rules.length) score++;
        if (rules.uppercase) score++;
        if (rules.lowercase) score++;
        if (rules.number) score++;
        if (rules.special) score++;


        /* ================================
           STRENGTH DISPLAY
        ================================= */

        const percentage =
            score * 20;


        strengthFill.style.width =
            `${percentage}%`;


        if (!password) {

            strengthText.textContent =
                "—";

            strengthFill.style.width =
                "0%";

            strengthFill.style.background =
                "#d9dce5";

            strengthText.style.color =
                "#999eaf";

            return;
        }


        if (score <= 2) {

            strengthText.textContent =
                "Weak";

            strengthText.style.color =
                "#ef476f";

            strengthFill.style.background =
                "#ef476f";

        }

        else if (score === 3) {

            strengthText.textContent =
                "Medium";

            strengthText.style.color =
                "#f4a340";

            strengthFill.style.background =
                "#f4a340";

        }

        else if (score === 4) {

            strengthText.textContent =
                "Good";

            strengthText.style.color =
                "#6d70ed";

            strengthFill.style.background =
                "#6d70ed";

        }

        else {

            strengthText.textContent =
                "Strong";

            strengthText.style.color =
                "#19b889";

            strengthFill.style.background =
                "#19b889";

        }

    }


    /* =====================================
       UPDATE PASSWORD RULE
    ====================================== */

    function updateRule(
        element,
        valid
    ) {

        if (!element) {
            return;
        }


        const icon =
            element.querySelector(
                "span:first-child"
            );


        if (valid) {

            element.classList.add(
                "valid"
            );

            icon.textContent =
                "✓";

        } else {

            element.classList.remove(
                "valid"
            );

            icon.textContent =
                "○";

        }

    }


    /* =====================================
       PASSWORD INPUT
    ====================================== */

    signupPassword.addEventListener(
        "input",
        () => {

            updatePasswordStrength();


            if (
                signupPasswordError.textContent
            ) {

                validatePassword();

            }


            if (
                confirmPassword.value
            ) {

                validateConfirmPassword();

            }

        }
    );


    signupPassword.addEventListener(
        "blur",
        () => {

            if (signupPassword.value) {

                validatePassword();

            }

        }
    );


    /* =====================================
       CONFIRM PASSWORD INPUT
    ====================================== */

    confirmPassword.addEventListener(
        "input",
        () => {

            if (
                confirmPasswordError.textContent
            ) {

                validateConfirmPassword();

            }

        }
    );


    confirmPassword.addEventListener(
        "blur",
        () => {

            if (confirmPassword.value) {

                validateConfirmPassword();

            }

        }
    );


    /* =====================================
       PASSWORD SHOW / HIDE
    ====================================== */

    function togglePassword(
        input,
        button
    ) {

        if (input.type === "password") {

            input.type = "text";

            button.textContent =
                "🙈";

        } else {

            input.type = "password";

            button.textContent =
                "👁";

        }

    }


    passwordToggle.addEventListener(
        "click",
        () => {

            togglePassword(
                signupPassword,
                passwordToggle
            );

        }
    );


    confirmPasswordToggle.addEventListener(
        "click",
        () => {

            togglePassword(
                confirmPassword,
                confirmPasswordToggle
            );

        }
    );


    /* =====================================
       TERMS CHECKBOX
    ====================================== */

    termsCheckbox.addEventListener(
        "change",
        () => {

            if (termsCheckbox.checked) {

                termsError.textContent =
                    "";

            }

        }
    );


    /* =====================================
       TERMS LINKS
    ====================================== */

    document
        .getElementById("termsLink")
        .addEventListener(
            "click",
            event => {

                event.preventDefault();

                showNotification(
                    "error",
                    "Terms & Conditions",
                    "Terms and Conditions will be available when the legal pages are added."
                );

            }
        );


    document
        .getElementById("privacyLink")
        .addEventListener(
            "click",
            event => {

                event.preventDefault();

                showNotification(
                    "error",
                    "Privacy Policy",
                    "Privacy Policy will be available when the legal pages are added."
                );

            }
        );


    /* =====================================
       FORM SUBMISSION
    ====================================== */

    signupForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            /* ==============================
               VALIDATE EVERYTHING
            =============================== */

            const validName =
                validateName();

            const validEmail =
                validateEmail();

            const validMobile =
                validateMobile();

            const validPassword =
                validatePassword();

            const validConfirmPassword =
                validateConfirmPassword();

            const validTerms =
                validateTerms();


            if (
                !validName ||
                !validEmail ||
                !validMobile ||
                !validPassword ||
                !validConfirmPassword ||
                !validTerms
            ) {

                showNotification(
                    "error",
                    "Registration Failed",
                    "Please complete all required information correctly."
                );

                return;
            }


            /* ==============================
               GET EXISTING USERS
            =============================== */

            const users =
                JSON.parse(
                    localStorage.getItem(
                        "nexusUsers"
                    )
                ) || [];


            const email =
                signupEmail.value
                    .trim()
                    .toLowerCase();

            const mobile =
                mobileNumber.value.trim();


            /* ==============================
               FINAL DUPLICATE CHECK
            =============================== */

            const emailExists =
                users.some(
                    user =>
                        user.email === email
                );


            if (emailExists) {

                showNotification(
                    "error",
                    "Email Already Registered",
                    "An account already exists with this email address."
                );

                showStep(2);

                return;
            }


            const mobileExists =
                users.some(
                    user =>
                        user.mobile === mobile
                );


            if (mobileExists) {

                showNotification(
                    "error",
                    "Mobile Already Registered",
                    "This mobile number is already associated with an account."
                );

                showStep(3);

                return;
            }


            /* ==============================
               CREATE USER
            =============================== */

            const newUser = {

                id:
                    generateUserId(),

                name:
                    fullName.value.trim(),

                email:
                    email,

                mobile:
                    mobile,

                password:
                    signupPassword.value,

                createdAt:
                    new Date().toISOString()

            };


            /* ==============================
               SAVE USER
            =============================== */

            users.push(newUser);


            localStorage.setItem(
                "nexusUsers",
                JSON.stringify(users)
            );


            /* ==============================
               LOADING STATE
            =============================== */

            signupButton.disabled =
                true;

            signupButton.classList.add(
                "loading"
            );


            /* ==============================
               SUCCESS MESSAGE
            =============================== */

            showNotification(
                "success",
                "Account Created Successfully",
                "Your Nexus account has been created. Redirecting to login..."
            );


            /* ==============================
               REDIRECT
            =============================== */

            setTimeout(
                () => {

                    window.location.href =
                        "login.html";

                },
                1800
            );

        }
    );


    /* =====================================
       GENERATE USER ID
    ====================================== */

    function generateUserId() {

        return (
            "USR-" +
            Date.now().toString(36).toUpperCase() +
            "-" +
            Math.random()
                .toString(36)
                .substring(2, 7)
                .toUpperCase()
        );

    }


    /* =====================================
       KEYBOARD ENTER SUPPORT
    ====================================== */

    [
        fullName,
        signupEmail,
        mobileNumber
    ].forEach(input => {

        input.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    const currentButton =
                        document.querySelector(
                            `.form-step[data-step="${currentStep}"] .next-button`
                        );


                    if (currentButton) {

                        currentButton.click();

                    }

                }

            }
        );

    });


    /* =====================================
       INITIAL STATE
    ====================================== */

    showStep(1);

    updatePasswordStrength();

});
localStorage.setItem(
    "registeredUser",
    JSON.stringify({
        name: fullName,
        email: email,
        mobile: mobile,
        password: password
    })
);

showSuccess("Account created successfully! Redirecting to login...");

setTimeout(function () {
    window.location.href = "login.html";
}, 1500);