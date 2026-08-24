/* =========================================================
   DASHBOARD.JS
   Simple + Reliable Version
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       LOAD USER
    ===================================================== */

    loadUser();

    /* =====================================================
       SIDEBAR
    ===================================================== */

    setupSidebar();

    /* =====================================================
       PROFILE
    ===================================================== */

    setupProfile();

    /* =====================================================
       NOTIFICATIONS
    ===================================================== */

    setupNotifications();

    /* =====================================================
       SEARCH
    ===================================================== */

    setupSearch();

    /* =====================================================
       CHART
    ===================================================== */

    setupChart();

    /* =====================================================
       BUTTONS
    ===================================================== */

    setupButtons();

    /* =====================================================
       LOGOUT
    ===================================================== */

    setupLogout();

    /* =====================================================
       DATE
    ===================================================== */

    showCurrentDate();

    /* =====================================================
       DRAW CHART
    ===================================================== */

    drawChart();

});


/* =========================================================
   USER
========================================================= */

function getUser() {

    let user = localStorage.getItem("loggedInUser");

    if (!user) {
        return null;
    }

    try {
        return JSON.parse(user);
    } catch (error) {
        return null;
    }
}


function loadUser() {

    const user = getUser();

    if (!user) {
        return;
    }

    const name =
        user.name ||
        user.fullName ||
        user.username ||
        "User";

    const email =
        user.email ||
        "user@example.com";


    const firstName =
        name.split(" ")[0];


    const initials =
        getInitials(name);


    /* -----------------------------------------------------
       USER NAMES
    ----------------------------------------------------- */

    document.querySelectorAll(
        ".sidebar-user-info strong"
    ).forEach(function (element) {

        element.textContent = name;

    });


    document.querySelectorAll(
        ".header-profile-name"
    ).forEach(function (element) {

        element.textContent = name;

    });


    document.querySelectorAll(
        ".dropdown-user-info strong"
    ).forEach(function (element) {

        element.textContent = name;

    });


    /* -----------------------------------------------------
       EMAIL
    ----------------------------------------------------- */

    document.querySelectorAll(
        ".sidebar-user-info span"
    ).forEach(function (element) {

        element.textContent = email;

    });


    document.querySelectorAll(
        ".dropdown-user-info span"
    ).forEach(function (element) {

        element.textContent = email;

    });


    /* -----------------------------------------------------
       INITIALS
    ----------------------------------------------------- */

    document.querySelectorAll(
        ".user-avatar, .header-avatar, .dropdown-avatar"
    ).forEach(function (element) {

        element.textContent = initials;

    });


    /* -----------------------------------------------------
       GREETING
    ----------------------------------------------------- */

    const greeting =
        document.querySelector(
            ".page-heading h1 span"
        );

    if (greeting) {
        greeting.textContent = firstName;
    }

}


/* =========================================================
   INITIALS
========================================================= */

function getInitials(name) {

    if (!name) {
        return "U";
    }

    const parts =
        name.trim().split(/\s+/);

    if (parts.length === 1) {

        return parts[0]
            .substring(0, 2)
            .toUpperCase();

    }

    return (
        parts[0][0] +
        parts[parts.length - 1][0]
    ).toUpperCase();

}


/* =========================================================
   SIDEBAR
========================================================= */

function setupSidebar() {

    const sidebar =
        document.querySelector(".sidebar");

    const overlay =
        document.querySelector(".sidebar-overlay");

    const menuButton =
        document.querySelector(".mobile-menu-button");

    const closeButton =
        document.querySelector(".sidebar-close");


    if (menuButton) {

        menuButton.addEventListener(
            "click",
            function () {

                if (sidebar) {
                    sidebar.classList.add("open");
                }

                if (overlay) {
                    overlay.classList.add("show");
                }

                document.body.style.overflow =
                    "hidden";

            }
        );

    }


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeSidebar
        );

    }


    if (overlay) {

        overlay.addEventListener(
            "click",
            closeSidebar
        );

    }


    /* Navigation */

    document.querySelectorAll(
        ".nav-item"
    ).forEach(function (item) {

        item.addEventListener(
            "click",
            function (event) {

                const href =
                    item.getAttribute("href");


                if (
                    !href ||
                    href === "#"
                ) {

                    event.preventDefault();

                    document.querySelectorAll(
                        ".nav-item"
                    ).forEach(function (nav) {

                        nav.classList.remove(
                            "active"
                        );

                    });

                    item.classList.add("active");

                }


                if (
                    window.innerWidth <= 900
                ) {

                    closeSidebar();

                }

            }
        );

    });

}


/* =========================================================
   CLOSE SIDEBAR
========================================================= */

function closeSidebar() {

    const sidebar =
        document.querySelector(".sidebar");

    const overlay =
        document.querySelector(".sidebar-overlay");


    if (sidebar) {
        sidebar.classList.remove("open");
    }

    if (overlay) {
        overlay.classList.remove("show");
    }

    document.body.style.overflow = "";

}


/* =========================================================
   PROFILE
========================================================= */

function setupProfile() {

    const profile =
        document.querySelector(
            ".header-profile"
        );

    const dropdown =
        document.querySelector(
            ".user-dropdown"
        );


    if (!profile || !dropdown) {
        return;
    }


    profile.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            closeNotifications();

            dropdown.classList.toggle(
                "show"
            );

        }
    );


    dropdown.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

        }
    );


    document.addEventListener(
        "click",
        function () {

            dropdown.classList.remove(
                "show"
            );

        }
    );

}


/* =========================================================
   NOTIFICATIONS
========================================================= */

function setupNotifications() {

    const buttons =
        document.querySelectorAll(
            ".header-icon-button"
        );

    const panel =
        document.querySelector(
            ".notification-panel"
        );


    if (!panel || buttons.length === 0) {
        return;
    }


    const notificationButton =
        buttons[0];


    notificationButton.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            closeProfile();

            panel.classList.toggle("show");

        }
    );


    panel.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

        }
    );


    document.addEventListener(
        "click",
        function () {

            closeNotifications();

        }
    );


    /* Mark notifications read */

    document.querySelectorAll(
        ".notification-item"
    ).forEach(function (item) {

        item.addEventListener(
            "click",
            function () {

                item.classList.remove(
                    "unread"
                );

                updateNotificationDot();

            }
        );

    });


    const footer =
        document.querySelector(
            ".notification-footer"
        );


    if (footer) {

        footer.addEventListener(
            "click",
            function () {

                document.querySelectorAll(
                    ".notification-item"
                ).forEach(function (item) {

                    item.classList.remove(
                        "unread"
                    );

                });

                updateNotificationDot();

                showMessage(
                    "All notifications marked as read."
                );

            }
        );

    }

}


/* =========================================================
   CLOSE NOTIFICATIONS
========================================================= */

function closeNotifications() {

    const panel =
        document.querySelector(
            ".notification-panel"
        );

    if (panel) {
        panel.classList.remove("show");
    }

}


/* =========================================================
   CLOSE PROFILE
========================================================= */

function closeProfile() {

    const dropdown =
        document.querySelector(
            ".user-dropdown"
        );

    if (dropdown) {
        dropdown.classList.remove("show");
    }

}


/* =========================================================
   NOTIFICATION DOT
========================================================= */

function updateNotificationDot() {

    const unread =
        document.querySelectorAll(
            ".notification-item.unread"
        );

    const dot =
        document.querySelector(
            ".notification-dot"
        );


    if (!dot) {
        return;
    }


    if (unread.length > 0) {

        dot.style.display = "block";

    } else {

        dot.style.display = "none";

    }

}


/* =========================================================
   SEARCH
========================================================= */

function setupSearch() {

    const input =
        document.querySelector(
            ".global-search input"
        );


    if (!input) {
        return;
    }


    input.addEventListener(
        "input",
        function () {

            const value =
                input.value
                    .toLowerCase()
                    .trim();


            const rows =
                document.querySelectorAll(
                    ".transactions-card tbody tr"
                );


            rows.forEach(function (row) {

                const text =
                    row.textContent
                        .toLowerCase();


                if (
                    value === "" ||
                    text.includes(value)
                ) {

                    row.style.display = "";

                } else {

                    row.style.display = "none";

                }

            });

        }
    );


    /* Ctrl + K */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                (event.ctrlKey ||
                    event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();

                input.focus();

            }

        }
    );

}


/* =========================================================
   CHART
========================================================= */

function setupChart() {

    document.querySelectorAll(
        ".chart-period"
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                document.querySelectorAll(
                    ".chart-period"
                ).forEach(function (btn) {

                    btn.classList.remove(
                        "active"
                    );

                });


                button.classList.add(
                    "active"
                );


                const period =
                    button.textContent
                        .trim()
                        .toLowerCase();


                changeChart(period);

            }
        );

    });

}


/* =========================================================
   CHANGE CHART
========================================================= */

function changeChart(period) {

    let values;
    let labels;
    let amount;


    if (period === "week") {

        values =
            [30, 48, 40, 65, 55, 78, 72];

        labels =
            [
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun"
            ];

        amount = "₹18,450";

    }


    else if (period === "quarter") {

        values =
            [45, 60, 52, 70, 80, 94];

        labels =
            [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun"
            ];

        amount = "₹2,18,450";

    }


    else if (period === "year") {

        values =
            [30, 42, 50, 60, 55, 72, 84, 92];

        labels =
            [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug"
            ];

        amount = "₹8,94,650";

    }


    else {

        values =
            [35, 50, 43, 65, 57, 79, 72, 90];

        labels =
            [
                "Week 1",
                "Week 2",
                "Week 3",
                "Week 4",
                "Week 5",
                "Week 6",
                "Week 7",
                "Week 8"
            ];

        amount = "₹74,820";

    }


    const revenue =
        document.querySelector(
            ".revenue-summary strong"
        );


    if (revenue) {
        revenue.textContent = amount;
    }


    drawChart(
        values,
        labels
    );

}


/* =========================================================
   DRAW CHART
========================================================= */

function drawChart(
    values = [
        35,
        50,
        43,
        65,
        57,
        79,
        72,
        90
    ],
    labels = [
        "Week 1",
        "Week 2",
        "Week 3",
        "Week 4",
        "Week 5",
        "Week 6",
        "Week 7",
        "Week 8"
    ]
) {

    const svg =
        document.querySelector(
            ".revenue-svg"
        );


    if (!svg) {
        return;
    }


    const width =
        svg.clientWidth || 700;

    const height =
        svg.clientHeight || 190;


    svg.setAttribute(
        "viewBox",
        `0 0 ${width} ${height}`
    );


    svg.innerHTML = "";


    const padding = 8;


    const max =
        Math.max(
            ...values,
            100
        );


    const points =
        values.map(
            function (value, index) {

                const x =
                    padding +
                    (
                        index /
                        Math.max(
                            values.length - 1,
                            1
                        )
                    ) *
                    (
                        width -
                        padding * 2
                    );


                const y =
                    height -
                    padding -
                    (
                        value /
                        max
                    ) *
                    (
                        height -
                        padding * 2
                    );


                return {
                    x: x,
                    y: y
                };

            }
        );


    let linePath = "";


    points.forEach(
        function (point, index) {

            linePath +=
                index === 0
                    ? `M ${point.x} ${point.y}`
                    : ` L ${point.x} ${point.y}`;

        }
    );


    /* Area */

    const area =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );


    const first =
        points[0];

    const last =
        points[points.length - 1];


    area.setAttribute(
        "d",
        `${linePath}
         L ${last.x} ${height}
         L ${first.x} ${height}
         Z`
    );


    area.setAttribute(
        "fill",
        "rgba(112,88,232,0.10)"
    );


    svg.appendChild(area);


    /* Line */

    const line =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );


    line.setAttribute(
        "d",
        linePath
    );


    line.setAttribute(
        "fill",
        "none"
    );


    line.setAttribute(
        "stroke",
        "#7058e8"
    );


    line.setAttribute(
        "stroke-width",
        "3"
    );


    line.setAttribute(
        "stroke-linecap",
        "round"
    );


    line.setAttribute(
        "stroke-linejoin",
        "round"
    );


    svg.appendChild(line);


    /* Points */

    points.forEach(
        function (point) {

            const circle =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "circle"
                );


            circle.setAttribute(
                "cx",
                point.x
            );


            circle.setAttribute(
                "cy",
                point.y
            );


            circle.setAttribute(
                "r",
                "4"
            );


            circle.setAttribute(
                "fill",
                "#ffffff"
            );


            circle.setAttribute(
                "stroke",
                "#7058e8"
            );


            circle.setAttribute(
                "stroke-width",
                "2"
            );


            svg.appendChild(circle);

        }
    );


    /* X labels */

    const xAxis =
        document.querySelector(
            ".chart-x-axis"
        );


    if (xAxis) {

        xAxis.innerHTML = "";


        labels.forEach(
            function (label) {

                const span =
                    document.createElement(
                        "span"
                    );


                span.textContent =
                    label;


                xAxis.appendChild(
                    span
                );

            }
        );

    }

}


/* =========================================================
   BUTTONS
========================================================= */

function setupButtons() {

    /* Add Invoice */

    const primary =
        document.querySelector(
            ".heading-actions .primary-button"
        );


    if (primary) {

        primary.addEventListener(
            "click",
            function () {

                showMessage(
                    "Create Invoice button clicked."
                );

            }
        );

    }


    /* Export */

    const secondary =
        document.querySelector(
            ".heading-actions .secondary-button"
        );


    if (secondary) {

        secondary.addEventListener(
            "click",
            exportData
        );

    }


    /* Upgrade */

    const upgrade =
        document.querySelector(
            ".upgrade-card button"
        );


    if (upgrade) {

        upgrade.addEventListener(
            "click",
            function () {

                showMessage(
                    "Upgrade option selected."
                );

            }
        );

    }


    /* GST Report */

    const report =
        document.querySelector(
            ".view-report-button"
        );


    if (report) {

        report.addEventListener(
            "click",
            function () {

                showMessage(
                    "GST report opened."
                );

            }
        );

    }


    /* View all */

    const viewAll =
        document.querySelector(
            ".view-all-button"
        );


    if (viewAll) {

        viewAll.addEventListener(
            "click",
            function () {

                showMessage(
                    "All transactions selected."
                );

            }
        );

    }


    /* Insight */

    const insight =
        document.querySelector(
            ".insight-card > button"
        );


    if (insight) {

        insight.addEventListener(
            "click",
            function () {

                showMessage(
                    "Business insight opened."
                );

            }
        );

    }


    /* Quick actions */

    document.querySelectorAll(
        ".quick-action"
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const title =
                    button.querySelector(
                        "strong"
                    );


                if (title) {

                    showMessage(
                        title.textContent +
                        " selected."
                    );

                }

            }
        );

    });

}


/* =========================================================
   LOGOUT
========================================================= */

function setupLogout() {

    document.querySelectorAll(
        ".logout-item"
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                logoutUser();

            }
        );

    });

}


/* =========================================================
   LOGOUT USER
========================================================= */

function logoutUser() {

    /*
       Remove current login session
    */

    localStorage.removeItem(
        "loggedInUser"
    );


    /*
       Also remove old session
       if it exists
    */

    localStorage.removeItem(
        "loginSession"
    );


    /*
       Go to login page
    */

    window.location.href =
        "login.html";

}


/* =========================================================
   DATE
========================================================= */

function showCurrentDate() {

    const dateElement =
        document.querySelector(
            ".current-date"
        );


    if (!dateElement) {
        return;
    }


    const now =
        new Date();


    const date =
        now.toLocaleDateString(
            "en-IN",
            {
                weekday: "short",
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );


    const icon =
        dateElement.querySelector(
            ".date-icon"
        );


    dateElement.innerHTML = "";


    if (icon) {

        dateElement.appendChild(
            icon
        );

    }


    const text =
        document.createElement(
            "span"
        );


    text.textContent =
        date;


    dateElement.appendChild(
        text
    );

}


/* =========================================================
   EXPORT
========================================================= */

function exportData() {

    const data = [
        [
            "Dashboard Report"
        ],

        [
            ""
        ],

        [
            "Total Revenue",
            "₹8,94,650"
        ],

        [
            "Products",
            "1,248"
        ],

        [
            "GST Collected",
            "₹1,42,760"
        ],

        [
            "Pending Amount",
            "₹74,820"
        ]
    ];


    const csv =
        data
            .map(function (row) {

                return row
                    .map(function (value) {

                        return '"' +
                            String(value)
                                .replace(
                                    /"/g,
                                    '""'
                                ) +
                            '"';

                    })
                    .join(",");

            })
            .join("\n");


    const blob =
        new Blob(
            [csv],
            {
                type:
                    "text/csv;charset=utf-8;"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href = url;

    link.download =
        "dashboard-report.csv";


    document.body.appendChild(
        link
    );


    link.click();


    link.remove();


    URL.revokeObjectURL(
        url
    );


    showMessage(
        "Dashboard report downloaded."
    );

}


/* =========================================================
   MESSAGE
========================================================= */

function showMessage(message) {

    let toast =
        document.querySelector(
            ".dashboard-message"
        );


    if (!toast) {

        toast =
            document.createElement(
                "div"
            );


        toast.className =
            "dashboard-message";


        document.body.appendChild(
            toast
        );


        const style =
            document.createElement(
                "style"
            );


        style.textContent = `

            .dashboard-message {

                position: fixed;

                left: 50%;
                bottom: 25px;

                z-index: 9999;

                transform:
                    translate(-50%, 20px);

                opacity: 0;

                padding:
                    12px 20px;

                border-radius: 9px;

                background:
                    #27243d;

                color:
                    #ffffff;

                font-family:
                    Arial,
                    sans-serif;

                font-size:
                    13px;

                box-shadow:
                    0 10px 30px
                    rgba(0,0,0,.20);

                transition:
                    .25s ease;

                pointer-events:
                    none;

            }

            .dashboard-message.show {

                opacity: 1;

                transform:
                    translate(-50%, 0);

            }

        `;


        document.head.appendChild(
            style
        );

    }


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toast.timer
    );


    toast.timer =
        setTimeout(
            function () {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* =========================================================
   RESIZE CHART
========================================================= */

window.addEventListener(
    "resize",
    function () {

        clearTimeout(
            window.chartResizeTimer
        );


        window.chartResizeTimer =
            setTimeout(
                function () {

                    const active =
                        document.querySelector(
                            ".chart-period.active"
                        );


                    const period =
                        active
                            ? active.textContent
                                .trim()
                                .toLowerCase()
                            : "month";


                    changeChart(
                        period
                    );

                },
                200
            );

    }
);