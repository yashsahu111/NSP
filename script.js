// ================= PG DATABASE (DEMO) =================

const properties = [
    {
        id: 1,
        name: "Zolo HSR Living",
        location: "Sitapura, Jaipur",
        price: 12000,
        rating: "4.6",
        reviews: "1.2k",
        category: "Boys",
        occupancy: "Single",
        amenities: ["Wi-Fi", "AC", "Meals"],
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
        photos: [
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
            "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800",
            "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800"
        ],
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
        image360: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=1600",
        verified: true
    },
    {
        id: 2,
        name: "The Nest PG",
        location: "Jagatpura, Jaipur",
        price: 10500,
        rating: "4.4",
        reviews: "856",
        category: "Girls",
        occupancy: "Double",
        amenities: ["Wi-Fi", "AC", "Laundry"],
        image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
        photos: [
            "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
            "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800",
            "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800"
        ],
        video: "https://www.w3schools.com/html/movie.mp4",
        image360: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1600",
        verified: true
    },
    {
        id: 3,
        name: "Stanza Living Sigma",
        location: "Malviya Nagar, Jaipur",
        price: 14000,
        rating: "4.5",
        reviews: "742",
        category: "Co-living",
        occupancy: "Single",
        amenities: ["Wi-Fi", "AC", "Meals"],
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
        photos: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
            "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800"
        ],
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
        image360: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600",
        verified: true
    },
    {
        id: 4,
        name: "PG Life Residency",
        location: "Vaishali Nagar, Jaipur",
        price: 9500,
        rating: "4.3",
        reviews: "621",
        category: "Boys",
        occupancy: "Double",
        amenities: ["Wi-Fi", "AC", "Laundry"],
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
        photos: [
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
            "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800",
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800"
        ],
        video: "https://www.w3schools.com/html/movie.mp4",
        image360: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1600",
        verified: true
    },
    {
        id: 5,
        name: "Royal Girls Residence",
        location: "Mansarovar, Jaipur",
        price: 11000,
        rating: "4.8",
        reviews: "520",
        category: "Girls",
        occupancy: "Double",
        amenities: ["Wi-Fi", "Meals", "Laundry"],
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800",
        photos: [
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"
        ],
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
        image360: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1600",
        verified: true
    },
    {
        id: 6,
        name: "Luxury Urban Homes",
        location: "Jagatpura, Jaipur",
        price: 18000,
        rating: "4.9",
        reviews: "380",
        category: "Luxury",
        occupancy: "Single",
        amenities: ["Wi-Fi", "AC", "Meals"],
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
        photos: [
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
            "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800"
        ],
        video: "https://www.w3schools.com/html/movie.mp4",
        image360: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1600",
        verified: true
    }
];

let selectedCategory = "All";
let currentRole = "";
let currentSearch = "";

// ================= USER ACCOUNT SYSTEM =================

const USERS_KEY = 'roomzyUsers';
const SESSION_KEY = 'roomzySession';

function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
}
function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
function getCurrentUser() {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
}
function setCurrentUser(user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}
function logout() {
    localStorage.removeItem(SESSION_KEY);
    closeLogin();
    alert('You have been logged out.');
}

// Restore session on load
window.addEventListener('load', () => {
    const user = getCurrentUser();
    if (user) {
        document.getElementById('homePage').style.display = 'none';
        document.getElementById('loginPage').classList.add('show');
        document.getElementById('bottomNav').style.display = 'none';
        showAccountDashboard(user);
    }
});

// ================= STORAGE =================

const STORAGE_KEY = 'roomzyBookings';
const FAV_KEY = 'roomzyFavs';

function getBookings() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}
function saveBookings(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

const favorites = new Set(JSON.parse(localStorage.getItem(FAV_KEY) || '[]'));

// ================= DISPLAY PGs =================


// ================= DISPLAY PGs =================

function displayProperties(data) {

    const grid = document.getElementById("pgGrid");

    grid.innerHTML = "";

    document.getElementById("noResults").hidden = data.length !== 0;

    data.forEach(pg => {

        const card = document.createElement("div");

        card.className = "pg-card";

        card.innerHTML = `
            <div class="pg-image" onclick="openDetail(${pg.id})" style="cursor:pointer" title="View details">

                <img src="${pg.image}" alt="${pg.name}" loading="lazy">

                <div class="rating">
                    ★ ${pg.rating} (${pg.reviews})
                </div>

                ${pg.verified ?
                    `<div class="verified">✓ Verified</div>` : ""}

                <button class="favorite-btn" data-id="${pg.id}"
                    onclick="toggleFavorite(event, ${pg.id})"
                    title="Save to favorites">
                    <i class="fa-regular fa-heart"></i>
                </button>

            </div>

            <div class="pg-info" onclick="openDetail(${pg.id})" style="cursor:pointer" title="View details">

                <h3>${pg.name}</h3>

                <div class="pg-location">
                    <i class="fa-solid fa-location-dot"></i>
                    ${pg.location}
                </div>

                <div class="pg-amenities">
                    ${pg.amenities.map(a =>
                        `<span>✓ ${a}</span>`
                    ).join("")}
                </div>

                <div class="pg-bottom">

                    <div class="price">
                        ₹ ${pg.price.toLocaleString("en-IN")}
                        <small>/month</small>
                    </div>

                    <button class="book-now-btn"
                        onclick="event.stopPropagation(); openBookModal(${pg.id})">
                        Book Now
                    </button>

                </div>

            </div>
        `;

        grid.appendChild(card);

    });

}


// ================= FILTER =================

function filterProperties() {

    let result = [...properties];

    if (selectedCategory === "Single" ||
        selectedCategory === "Double") {

        result = result.filter(
            p => p.occupancy === selectedCategory
        );

    } else if (selectedCategory !== "All") {

        result = result.filter(
            p => p.category === selectedCategory
        );

    }

    const occupancy = document.getElementById("occupancy").value;

    if (occupancy !== "All") {
        result = result.filter(
            p => p.occupancy === occupancy
        );
    }

    if (currentSearch) {

        result = result.filter(p =>
            p.name.toLowerCase().includes(currentSearch) ||
            p.location.toLowerCase().includes(currentSearch) ||
            p.category.toLowerCase().includes(currentSearch)
        );

    }

    displayProperties(result);
}


function selectCategory(element) {

    document.querySelectorAll(".category").forEach(c =>
        c.classList.remove("active")
    );

    element.classList.add("active");

    selectedCategory = element.dataset.category;

    filterProperties();
}


function searchPG() {
    filterProperties();
    scrollToPG();
}


function showAll() {

    selectedCategory = "All";
    currentSearch = "";

    document.getElementById("headerSearch").value = "";

    document.getElementById("occupancy").value = "All";

    document.querySelectorAll(".category").forEach(c =>
        c.classList.remove("active")
    );

    document.querySelector('[data-category="All"]')
        .classList.add("active");

    displayProperties(properties);

}


// ================= HEADER SEARCH =================

document.getElementById("headerSearch")
.addEventListener("input", function() {

    currentSearch = this.value.trim().toLowerCase();

    filterProperties();

});


// ================= CITY CHANGE =================

function changeCity() {

    const city = prompt("Enter your city:");

    if (!city || !city.trim()) return;

    const name = city.trim();

    document.getElementById("cityName").textContent = name;
    document.getElementById("searchCity").textContent = name;
    document.getElementById("headingCity").textContent = name;

}


// ================= SIGN IN PAGE =================

// OPEN LOGIN PAGE

function openLogin() {

    document.getElementById("homePage").style.display = "none";

    document.getElementById("loginPage").classList.add("show");

    document.getElementById("bottomNav").style.display = "none";

    document.getElementById("menuDropdown").classList.remove("show");

    backToRoles();

    window.scrollTo(0, 0);

}


// CLOSE LOGIN PAGE

function closeLogin() {

    document.getElementById("loginPage").classList.remove("show");

    document.getElementById("homePage").style.display = "block";

    document.getElementById("bottomNav").style.display = "flex";

    window.scrollTo(0, 0);

}


// BACK TO HOMEPAGE

function goHome() {

    closeLogin();

}


// ================= ROLE SELECTION =================

function selectRole(role) {

    currentRole = role;

    document.getElementById("roleSelection").hidden = true;

    document.getElementById("studentForm").hidden = true;

    document.getElementById("ownerForm").hidden = true;

    document.getElementById("registerForm").hidden = true;

    if (role === "student") {

        document.getElementById("studentForm").hidden = false;

    } else {

        document.getElementById("ownerForm").hidden = false;

    }

}


// BACK TO ROLE SELECTION

function backToRoles() {

    document.getElementById("roleSelection").hidden = false;

    document.getElementById("studentForm").hidden = true;

    document.getElementById("ownerForm").hidden = true;

    document.getElementById("registerForm").hidden = true;

    currentRole = "";

}


// ================= REGISTRATION =================

function showRegister(role) {
    currentRole = role;

    document.getElementById("studentForm").hidden = true;
    document.getElementById("ownerForm").hidden = true;
    document.getElementById("roleSelection").hidden = true;
    document.getElementById("registerForm").hidden = false;

    const owner = role === "owner";

    document.getElementById("registerTitle").textContent =
        owner ? "PG Owner Registration" : "Student Registration";

    document.getElementById("registerSubtitle").textContent =
        owner
        ? "Register your PG business with ROOMZY."
        : "Create your student account on ROOMZY.";

    document.getElementById("ownerExtra").hidden = !owner;

    document.getElementById("registerIcon").innerHTML =
        owner
        ? '<i class="fa-solid fa-building"></i>'
        : '<i class="fa-solid fa-graduation-cap"></i>';

    document.getElementById("registerIcon").className =
        "form-icon " + (owner ? "owner-icon" : "student-icon");
}

function backToLoginForm() {
    document.getElementById("registerForm").hidden = true;
    if (currentRole === "owner") {
        document.getElementById("ownerForm").hidden = false;
    } else {
        document.getElementById("studentForm").hidden = false;
    }
}

function handleRegister(event) {
    event.preventDefault();

    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const phone = document.getElementById("registerPhone").value;
    const password = document.getElementById("registerPassword").value;

    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Enter a valid 10-digit mobile number.");
        return;
    }

    if (password.length < 6) {
        alert("Password must contain at least 6 characters.");
        return;
    }

    const users = getUsers();
    if (users[email]) {
        alert("User already exists with this email!");
        return;
    }

    const userData = {
        name,
        email,
        phone,
        password,
        role: currentRole,
        propertyName: document.getElementById("propertyName").value,
        propertyCity: document.getElementById("propertyCity").value,
        timestamp: new Date().toISOString()
    };

    users[email] = userData;
    saveUsers(users);

    alert("Registration successful! Please login.");
    backToRoles();
}

// ================= LOGIN =================

function handleLogin(event, role) {
    event.preventDefault();

    const email = document.getElementById(`${role}Email`).value;
    const password = document.getElementById(`${role}Password`).value;

    const users = getUsers();
    const user = users[email];

    if (user && user.password === password && user.role === role) {
        setCurrentUser(user);
        alert(`Welcome back, ${user.name}!`);
        closeLogin();
        // UI updates for logged-in state
    } else {
        alert("Invalid email or password!");
    }
}

function showAccountDashboard(user) {
    document.getElementById('roleSelection').hidden = true;
    document.getElementById('studentForm').hidden = true;
    document.getElementById('ownerForm').hidden = true;
    document.getElementById('registerForm').hidden = true;

    const container = document.querySelector('.login-container');
    container.innerHTML = `
        <button class="back-btn" onclick="closeLogin()">← Back to Home</button>
        <div class="login-brand">
            <h1>Welcome, ${user.name}</h1>
            <p>${user.role.toUpperCase()} ACCOUNT</p>
        </div>
        <div class="dashboard">
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            ${user.role === 'owner' ? `<p><strong>Property:</strong> ${user.propertyName} (${user.propertyCity})</p>` : ''}
            <button class="submit-btn" onclick="logout()">Logout</button>
        </div>
    `;
}


// ================= MENU =================

function toggleMenu() {

    document.getElementById("menuDropdown")
    .classList.toggle("show");

}


document.addEventListener("click", function(event) {

    const menu = document.getElementById("menuDropdown");

    const button = document.querySelector(".menu-btn");

    if (!menu.contains(event.target) &&
        !button.contains(event.target)) {

        menu.classList.remove("show");

    }

});


// ================= SCROLL =================

function scrollToPG() {

    closeLogin();

    document.getElementById("pgSection").scrollIntoView({
        behavior: "smooth"
    });

}


// ================= BOOKING LOGIC =================

function openBookModal(id) {
    const pg = properties.find(p => p.id === id);
    if (!pg) return;

    document.getElementById('bookPgId').value = id;
    document.getElementById('modalTitle').textContent = `Book ${pg.name}`;
    document.getElementById('bookingModal').classList.add('show');
}

function closeBookModal() {
    document.getElementById('bookingModal').classList.remove('show');
    document.getElementById('bookingForm').reset();
}

function handleBooking(event) {
    event.preventDefault();

    const id = parseInt(document.getElementById('bookPgId').value);
    const date = document.getElementById('bookDate').value;
    const months = document.getElementById('bookMonths').value;
    const notes = document.getElementById('bookNotes').value;

    const pg = properties.find(p => p.id === id);

    const booking = {
        id: Date.now(),
        pgId: id,
        pgName: pg.name,
        pgImage: pg.image,
        date: date,
        months: months,
        notes: notes,
        status: 'Confirmed',
        timestamp: new Date().toISOString()
    };

    const bookings = getBookings();
    bookings.push(booking);
    saveBookings(bookings);

    alert(`Successfully booked ${pg.name}!`);
    closeBookModal();
    openMyBookings();
}

function openMyBookings() {
    const page = document.getElementById('bookingsPage');
    const list = document.getElementById('bookingsList');
    const bookings = getBookings();

    list.innerHTML = '';

    if (bookings.length === 0) {
        list.innerHTML = '<p style="text-align:center; padding: 40px; color:#999;">No bookings found. Start exploring!</p>';
    } else {
        bookings.reverse().forEach(b => {
            const item = document.createElement('div');
            item.className = 'booking-item';
            item.innerHTML = `
                <img src="${b.pgImage}" class="booking-img">
                <div class="booking-details">
                    <h3>${b.pgName}</h3>
                    <p><i class="fa-regular fa-calendar"></i> Check-in: ${new Date(b.date).toLocaleDateString()}</p>
                    <p><i class="fa-regular fa-clock"></i> Duration: ${b.months} Months</p>
                    <button class="cancel-booking" onclick="cancelBooking(${b.id})">Cancel Booking</button>
                </div>
                <div class="booking-status">${b.status}</div>
            `;
            list.appendChild(item);
        });
    }

    page.hidden = false;
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('loginPage').classList.remove('show');

    // Update bottom nav
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('selected'));
    document.querySelector('[onclick="openLogin()"] i').parentElement.classList.add('selected');
}

function cancelBooking(id) {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    const bookings = getBookings().filter(b => b.id !== id);
    saveBookings(bookings);
    openMyBookings();
}


// Update bottom nav for My Bookings click
function setupBottomNav() {
    const bookingBtn = document.querySelector('[onclick="openLogin()"]');
    if (bookingBtn) {
        bookingBtn.setAttribute('onclick', 'openMyBookings()');
        bookingBtn.querySelector('span').textContent = 'My Bookings';
    }
}

// Update Detail logic
function openDetail(id) {
    const pg = properties.find(p => p.id === id);
    if (!pg) return;

    const content = document.getElementById('detailContent');
    content.innerHTML = `
        <div class="pg-detail-view">
            <img src="${pg.image}" class="detail-main-img">
            <div class="detail-body">
                <h2>${pg.name}</h2>
                <p><i class="fa-solid fa-location-dot"></i> ${pg.location}</p>
                <div class="detail-amenities">
                    ${pg.amenities.map(a => `<span class="amenity-tag">${a}</span>`).join('')}
                </div>
                <p class="detail-desc">Experience a comfortable stay with all essential amenities. ${pg.name} offers a safe environment perfect for students and working professionals.</p>
                <div class="detail-price">₹ ${pg.price.toLocaleString("en-IN")} <small>/month</small></div>
                <button class="confirm-btn" onclick="openBookModal(${pg.id}); closeDetailModal();">Book Now</button>
            </div>
        </div>
    `;

    document.getElementById('detailModal').classList.add('show');
}

function closeDetailModal() {
    document.getElementById('detailModal').classList.remove('show');
}


// ================= FAVORITES =================

function toggleFavorite(event, id) {
    event.stopPropagation();
    if (favorites.has(id)) {
        favorites.delete(id);
    } else {
        favorites.add(id);
    }
    localStorage.setItem(FAV_KEY, JSON.stringify([...favorites]));
    filterProperties();
}

// Update heart icon state and animations
const _origDisplay = displayProperties;
displayProperties = function(data) {
    _origDisplay(data);

    // Animate cards
    setTimeout(animateCards, 50);

    // Update hearts
    setTimeout(() => {
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            const id = parseInt(btn.dataset.id);
            btn.querySelector('i').className = favorites.has(id)
                ? 'fa-solid fa-heart'
                : 'fa-regular fa-heart';
        });
    }, 50);
};

// ================= INITIALIZE =================

// Fade-in cards on load
function animateCards() {
    const cards = document.querySelectorAll('.pg-card');
    cards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity .5s ease, transform .5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, i * 80);
    });
}

// Hero entrance
window.addEventListener('load', () => {
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(30px)';
        setTimeout(() => {
            hero.style.transition = 'opacity .8s ease, transform .8s ease';
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 100);
    }
});

displayProperties(properties);