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

// ================= OWNERSHIP: owner-added PGs =================
const PROPS_KEY = 'roomzyOwnerProperties';
let nextId = 1000;

function getOwnerProperties() {
    return JSON.parse(localStorage.getItem(PROPS_KEY) || '[]');
}
function saveOwnerProperties(list) {
    localStorage.setItem(PROPS_KEY, JSON.stringify(list));
}
// Demo PGs + owner-added PGs, combined for display
function getAllProperties() {
    return [...properties, ...getOwnerProperties()];
}
function addOwnerProperty(pg) {
    const list = getOwnerProperties();
    pg.id = nextId++;
    list.push(pg);
    saveOwnerProperties(list);
    return pg;
}
function updateOwnerProperty(id, updates) {
    const list = getOwnerProperties();
    const idx = list.findIndex(p => p.id === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...updates };
    saveOwnerProperties(list);
    return list[idx];
}
function deleteOwnerProperty(id) {
    const list = getOwnerProperties().filter(p => p.id !== id);
    saveOwnerProperties(list);
}

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
    updateHeaderAccount();
    alert('You have been logged out.');
}

// Restore session on load
window.addEventListener('load', () => {
    const user = getCurrentUser();
    updateHeaderAccount();
    if (user) {
        document.getElementById('homePage').style.display = 'none';
        const loginPage = document.getElementById('loginPage');
        if (loginPage) loginPage.classList.add('show');
        const footer = document.getElementById('footer');
        if (footer) footer.style.display = 'none';
        showAccountDashboard(user);
    } else {
        // Render PGs on the home page
        displayProperties(properties);
        populatePopularGrid();
    }
});

// Show the signed-in user in the header instead of "Sign in"
function updateHeaderAccount() {
    const btn = document.querySelector('.student-login-btn');
    if (!btn) return;
    const user = getCurrentUser();
    if (user) {
        btn.innerHTML = `<i class="fa-regular fa-circle-user"></i> ${user.name.split(' ')[0]}`;
        btn.setAttribute('onclick', 'openAccount()');
        btn.title = 'Open my account';
    } else {
        btn.innerHTML = 'Sign in';
        btn.setAttribute('onclick', 'openLogin()');
        btn.removeAttribute('title');
    }
}

function openAccount() {
    const user = getCurrentUser();
    if (!user) { openLogin(); return; }
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('loginPage').classList.add('show');
    document.getElementById('footer').style.display = 'none';
    document.getElementById('menuDropdown').classList.remove('show');
    showAccountDashboard(user);
    window.scrollTo(0, 0);
}

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

function displayProperties(data) {

    const grid = document.getElementById("pgGrid");

    grid.innerHTML = "";

    document.getElementById("noResults").hidden = data.length !== 0;

    data.forEach(pg => {

        const card = document.createElement("div");

        card.className = "pg-card";

        // Owner-added PGs get a "New" badge
        const ownerAdded = getOwnerProperties().some(p => p.id === pg.id);

        card.innerHTML = `
            <div class="pg-image" onclick="openPgDetail(${pg.id})" style="cursor:pointer" title="View details">

                <img src="${pg.image}" alt="${pg.name}" loading="lazy"
                     onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'260\\'><rect width=\\'100%\\' height=\\'100%\\' fill=\\'%23eef2f7\\'/><text x=\\'50%\\' y=\\'50%\\' dominant-baseline=\\'middle\\' text-anchor=\\'middle\\' font-family=\\'sans-serif\\' font-size=\\'14\\' fill=\\'%2394a3b8\\'>No image available</text></svg>'">

                <div class="rating">
                    ★ ${pg.rating} (${pg.reviews})
                </div>

                ${pg.verified ?
                    `<div class="verified">✓ Verified</div>` : ""}

                ${ownerAdded ?
                    `<div class="verified" style="background:var(--purple)">🆕 New</div>` : ""}

                <button class="favorite-btn" data-id="${pg.id}"
                    onclick="toggleFavorite(event, ${pg.id})"
                    title="Save to favorites">
                    <i class="fa-regular fa-heart"></i>
                </button>

            </div>

            <div class="pg-info" onclick="openPgDetail(${pg.id})" style="cursor:pointer" title="View details">

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

    let result = [...getAllProperties()];

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

    const occupancyEl = document.getElementById("occupancy");
    const occupancy = occupancyEl ? occupancyEl.value : "All";

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

    document.querySelectorAll(".category-pill, .category").forEach(c =>
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

    const searchInput = document.getElementById("headerSearch");
    if (searchInput) searchInput.value = "";

    const occupancySelect = document.getElementById("occupancy");
    if (occupancySelect) occupancySelect.value = "All";

    document.querySelectorAll(".category-pill, .category").forEach(c =>
        c.classList.remove("active")
    );

    const allPill = document.querySelector('[data-category="All"]');
    if (allPill) allPill.classList.add("active");

    displayProperties(properties);

}


// ================= HEADER SEARCH =================

const headerSearchInput = document.getElementById("headerSearch");
if (headerSearchInput) {
    headerSearchInput.addEventListener("input", function() {
        currentSearch = this.value.trim().toLowerCase();
        filterProperties();
    });
}


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

    

    document.getElementById("footer").style.display = "none";

    document.getElementById("menuDropdown").classList.remove("show");

    backToRoles();

    window.scrollTo(0, 0);

}


// CLOSE LOGIN PAGE

function closeLogin() {

    document.getElementById("loginPage").classList.remove("show");

    document.getElementById("homePage").style.display = "block";

    

    document.getElementById("footer").style.display = "";

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

    const iconEl = document.getElementById("registerIcon");
    if (iconEl) {
        iconEl.innerHTML =
            owner
            ? '<i class="fa-solid fa-building"></i>'
            : '<i class="fa-solid fa-graduation-cap"></i>';
        iconEl.className =
            "form-icon " + (owner ? "owner-icon" : "student-icon");
    }
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
        updateHeaderAccount();
        showAccountDashboard(user);
    } else {
        alert("Invalid email or password!");
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
    updateHeaderAccount();
}

function showAccountDashboard(user) {
    document.getElementById('roleSelection').hidden = true;
    document.getElementById('studentForm').hidden = true;
    document.getElementById('ownerForm').hidden = true;
    document.getElementById('registerForm').hidden = true;

    const container = document.querySelector('.login-container');

    if (user.role === 'owner') {
        // Owner dashboard with PG management
        const ownerProps = getOwnerProperties().filter(p => p.ownerEmail === user.email);
        container.innerHTML = `
            <button class="back-btn" onclick="closeLogin()">← Back to Home</button>
            <div class="login-brand">
                <h1>Welcome, ${user.name}</h1>
                <p>PG OWNER DASHBOARD</p>
            </div>
            <div class="dashboard">
                <div class="dashboard-header">
                    <h3>Your PG Listings</h3>
                    <button class="submit-btn owner-submit" onclick="openAddPgForm()">
                        <i class="fa-solid fa-plus"></i> Add New PG
                    </button>
                </div>
                <div id="ownerPgList" class="owner-pg-list">
                    ${ownerProps.length === 0 ?
                        '<p style="text-align:center;color:var(--gray);padding:20px;">No PGs listed yet. Click "Add New PG" to get started.</p>' :
                        ownerProps.map(pg => `
                            <div class="owner-pg-card">
                                <img src="${pg.image}" alt="${pg.name}" onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100\\' height=\\'75\\'><rect width=\\'100%\\' height=\\'100%\\' fill=\\'%23eef2f7\\'/><text x=\\'50%\\' y=\\'50%\\' dominant-baseline=\\'middle\\' text-anchor=\\'middle\\' font-family=\\'sans-serif\\' font-size=\\'11\\' fill=\\'%2394a3b8\\'>No img</text></svg>'">
                                <div class="owner-pg-info">
                                    <h4>${pg.name}</h4>
                                    <p>${pg.location} • ${pg.category} • ${pg.occupancy}</p>
                                    <p><strong>₹ ${pg.price.toLocaleString("en-IN")}/month</strong></p>
                                </div>
                                <div class="owner-pg-actions">
                                    <button class="edit-btn" onclick="openEditPgForm(${pg.id})"><i class="fa-solid fa-pen"></i></button>
                                    <button class="delete-btn" onclick="deleteOwnerPg(${pg.id})"><i class="fa-solid fa-trash"></i></button>
                                </div>
                            </div>
                        `).join('')}
                </div>
                <button class="submit-btn" style="margin-top:20px;background:#667085" onclick="logout()">Logout</button>
            </div>
        `;
    } else {
        // Student dashboard
        container.innerHTML = `
            <button class="back-btn" onclick="closeLogin()">← Back to Home</button>
            <div class="login-brand">
                <h1>Welcome, ${user.name}</h1>
                <p>STUDENT ACCOUNT</p>
            </div>
            <div class="dashboard">
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <button class="submit-btn" onclick="logout()">Logout</button>
            </div>
        `;
    }
}

let editingPgId = null;

function openAddPgForm() {
    editingPgId = null;
    const container = document.querySelector('.login-container');
    container.innerHTML = `
        <button class="back-btn" onclick="showAccountDashboard(getCurrentUser())">← Back</button>
        <div class="login-brand">
            <h1>Add New PG Listing</h1>
        </div>
        <div class="auth-form">
            <form id="pgForm" onsubmit="savePg(event)">
                <label>PG Name</label>
                <input type="text" id="pgName" placeholder="e.g., Sunshine PG" required>

                <label>Category</label>
                <select id="pgCategory" required>
                    <option value="Boys">Boys PG</option>
                    <option value="Girls">Girls PG</option>
                    <option value="Co-living">Co-living</option>
                    <option value="Single">Single Room</option>
                    <option value="Double">Double Sharing</option>
                    <option value="Luxury">Luxury PG</option>
                </select>

                <label>Occupancy</label>
                <select id="pgOccupancy" required>
                    <option value="Single">Single</option>
                    <option value="Double">Double</option>
                    <option value="Triple">Triple</option>
                </select>

                <label>Location</label>
                <input type="text" id="pgLocation" placeholder="e.g., Malviya Nagar, Jaipur" required>

                <label>Price per Month (₹)</label>
                <input type="number" id="pgPrice" min="1000" max="100000" placeholder="12000" required>

                <label>Rating (0-5)</label>
                <input type="number" id="pgRating" min="0" max="5" step="0.1" placeholder="4.5" required>

                <label>Image URL</label>
                <input type="url" id="pgImage" placeholder="https://example.com/image.jpg" required>

                <label>Amenities (comma separated)</label>
                <input type="text" id="pgAmenities" placeholder="Wi-Fi, AC, Meals, Laundry" required>

                <label>Description</label>
                <textarea id="pgDescription" rows="4" placeholder="Describe your PG..."></textarea>

                <button type="submit" class="submit-btn owner-submit">Save PG</button>
            </form>
        </div>
    `;
}

function openEditPgForm(id) {
    const pg = getOwnerProperties().find(p => p.id === id);
    if (!pg) return;
    editingPgId = id;
    const container = document.querySelector('.login-container');
    container.innerHTML = `
        <button class="back-btn" onclick="showAccountDashboard(getCurrentUser())">← Back</button>
        <div class="login-brand">
            <h1>Edit PG Listing</h1>
        </div>
        <div class="auth-form">
            <form id="pgForm" onsubmit="savePg(event)">
                <label>PG Name</label>
                <input type="text" id="pgName" value="${pg.name}" required>

                <label>Category</label>
                <select id="pgCategory" required>
                    <option value="Boys" ${pg.category==='Boys'?'selected':''}>Boys PG</option>
                    <option value="Girls" ${pg.category==='Girls'?'selected':''}>Girls PG</option>
                    <option value="Co-living" ${pg.category==='Co-living'?'selected':''}>Co-living</option>
                    <option value="Single" ${pg.category==='Single'?'selected':''}>Single Room</option>
                    <option value="Double" ${pg.category==='Double'?'selected':''}>Double Sharing</option>
                    <option value="Luxury" ${pg.category==='Luxury'?'selected':''}>Luxury PG</option>
                </select>

                <label>Occupancy</label>
                <select id="pgOccupancy" required>
                    <option value="Single" ${pg.occupancy==='Single'?'selected':''}>Single</option>
                    <option value="Double" ${pg.occupancy==='Double'?'selected':''}>Double</option>
                    <option value="Triple" ${pg.occupancy==='Triple'?'selected':''}>Triple</option>
                </select>

                <label>Location</label>
                <input type="text" id="pgLocation" value="${pg.location}" required>

                <label>Price per Month (₹)</label>
                <input type="number" id="pgPrice" value="${pg.price}" min="1000" max="100000" required>

                <label>Rating (0-5)</label>
                <input type="number" id="pgRating" value="${pg.rating}" min="0" max="5" step="0.1" required>

                <label>Image URL</label>
                <input type="url" id="pgImage" value="${pg.image}" required>

                <label>Amenities (comma separated)</label>
                <input type="text" id="pgAmenities" value="${pg.amenities.join(', ')}" required>

                <label>Description</label>
                <textarea id="pgDescription" rows="4">${pg.description || ''}</textarea>

                <button type="submit" class="submit-btn owner-submit">Update PG</button>
            </form>
        </div>
    `;
}

function savePg(event) {
    event.preventDefault();
    const user = getCurrentUser();
    if (!user || user.role !== 'owner') return;

    const pgData = {
        name: document.getElementById('pgName').value,
        category: document.getElementById('pgCategory').value,
        occupancy: document.getElementById('pgOccupancy').value,
        location: document.getElementById('pgLocation').value,
        price: parseInt(document.getElementById('pgPrice').value),
        rating: parseFloat(document.getElementById('pgRating').value),
        image: document.getElementById('pgImage').value,
        amenities: document.getElementById('pgAmenities').value.split(',').map(a => a.trim()),
        description: document.getElementById('pgDescription').value,
        verified: false,
        reviews: "0",
        photos: [document.getElementById('pgImage').value],
        video: "",
        image360: "",
        ownerEmail: user.email
    };

    if (editingPgId) {
        pgData.id = editingPgId;
        updateOwnerProperty(editingPgId, pgData);
        showToast('PG updated successfully!');
    } else {
        addOwnerProperty(pgData);
        showToast('PG added successfully!');
    }
    editingPgId = null;
    showAccountDashboard(user);
}

function deleteOwnerPg(id) {
    if (!confirm('Delete this PG listing?')) return;
    deleteOwnerProperty(id);
    showToast('PG deleted.');
    showAccountDashboard(getCurrentUser());
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

function scrollToWhyChoose() {

    const section = document.getElementById("whyChooseSection") || document.querySelector(".why-choose-section");
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }

}

function scrollToTestimonials() {

    const section = document.getElementById("testimonialsSection") || document.querySelector(".testimonials-section");
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }

}


// ================= BOOKING LOGIC =================

function openBookModal(id) {
    const pg = [...getAllProperties()].find(p => p.id === id);
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

    const pg = [...getAllProperties()].find(p => p.id === id);

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

// PG Detail Page (replaces modal)
function openPgDetail(id) {
    const pg = [...getAllProperties()].find(p => p.id === id);
    if (!pg) return;

    const content = document.getElementById('pgDetailContent');
    const ownerAdded = getOwnerProperties().some(p => p.id === pg.id);
    const reviews = generateReviews(pg.id);

    content.innerHTML = `
        <div class="pg-detail-full">
            <div class="detail-gallery-section">
                <div class="detail-gallery-main">
                    <img id="mainImg" src="${pg.image}" class="detail-main-img" alt="${pg.name}"
                         onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'800\\' height=\\'500\\'><rect width=\\'100%\\' height=\\'100%\\' fill=\\'%23eef2f7\\'/><text x=\\'50%\\' y=\\'50%\\' dominant-baseline=\\'middle\\' text-anchor=\\'middle\\' font-family=\\'sans-serif\\' font-size=\\'18\\' fill=\\'%2394a3b8\\'>No image available</text></svg>'">
                    ${pg.video ? `<button class="video-btn" onclick="playVideo('${pg.video}')"><i class="fa-solid fa-play"></i></button>` : ''}
                </div>
                <div class="detail-thumbs">
                    ${pg.photos.map((photo, i) => `
                        <img src="${photo}" class="thumb${i===0?' active':''}" alt="${pg.name} ${i+1}"
                             onclick="switchMainImg(this, '${photo}')"
                             onerror="this.style.display='none'">
                    `).join('')}
                </div>
            </div>

            <div class="detail-info-section">
                <div class="detail-header">
                    <h1>${pg.name}</h1>
                    ${ownerAdded ? '<span class="new-badge">🆕 New Listing</span>' : ''}
                    ${pg.verified ? '<span class="verified-badge"><i class="fa-solid fa-shield-check"></i> Verified</span>' : ''}
                </div>
                <p class="detail-location"><i class="fa-solid fa-location-dot"></i> ${pg.location}</p>

                <div class="detail-meta">
                    <div class="meta-item">
                        <i class="fa-solid fa-bed"></i>
                        <span>${pg.category} • ${pg.occupancy}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fa-solid fa-star"></i>
                        <span>${pg.rating} (${pg.reviews} reviews)</span>
                    </div>
                </div>

                <div class="detail-amenities">
                    ${pg.amenities.map(a => `<span class="amenity-tag">${a}</span>`).join('')}
                </div>

                <div class="detail-description">
                    <h3>About this PG</h3>
                    <p>${pg.description || `Experience a comfortable stay with all essential amenities at ${pg.name}. Located in ${pg.location}, this property offers a safe and welcoming environment perfect for students and working professionals.`}</p>
                </div>

                <div class="detail-reviews">
                    <h3><i class="fa-solid fa-star"></i> Reviews (${reviews.length})</h3>
                    ${reviews.map(r => `
                        <div class="review-card">
                            <div class="review-header">
                                <strong>${r.name}</strong>
                                <span class="review-date">${r.date}</span>
                            </div>
                            <div class="review-rating">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
                            <p class="review-text">${r.text}</p>
                        </div>
                    `).join('')}
                </div>

                <div class="detail-price-bar">
                    <div class="price-info">
                        <span class="price-label">Starting from</span>
                        <span class="price-value">₹ ${pg.price.toLocaleString("en-IN")}<small>/month</small></span>
                    </div>
                    <button class="confirm-btn detail-book-btn" onclick="openBookModal(${pg.id}); closePgDetail();">Book Now</button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('pgDetailPage').hidden = false;
    document.getElementById('homePage').style.display = 'none';
    
    document.getElementById('footer').style.display = 'none';
    window.scrollTo(0, 0);
}

function closePgDetail() {
    document.getElementById('pgDetailPage').hidden = true;
    document.getElementById('homePage').style.display = 'block';
    
    document.getElementById('footer').style.display = '';
    window.scrollTo(0, 0);
}

function switchMainImg(thumb, src) {
    document.getElementById('mainImg').src = src;
    document.querySelectorAll('.detail-thumbs .thumb').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
}

function playVideo(src) {
    const modal = document.createElement('div');
    modal.className = 'modal show';
    modal.innerHTML = `
        <div class="modal-content detail-modal" style="max-width:800px;">
            <button class="close-modal" onclick="this.closest('.modal').remove()">&times;</button>
            <video controls autoplay style="width:100%;border-radius:12px;">
                <source src="${src}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
    `;
    document.body.appendChild(modal);
}

// Generate deterministic fake reviews per PG
function generateReviews(pgId) {
    const names = ["Priya S.", "Rahul K.", "Anjali M.", "Vikram P.", "Sneha R.", "Arjun T.", "Kavya N.", "Rohit D."];
    const texts = [
        "Great place, very clean and safe. The food is decent and the staff is helpful.",
        "Good location near my college. WiFi works well. Would recommend for students.",
        "Spacious rooms and good amenities. AC works perfectly. Value for money.",
        "Staff is responsive. Minor maintenance issues were fixed quickly. Overall satisfied.",
        "Nice community vibe. Made good friends here. Security is good.",
        "Clean rooms, good food, and close to metro. Best PG in this area.",
        "Well maintained property. The common areas are always clean. Recommended.",
        "Affordable and comfortable. The warden is friendly and cooperative."
    ];
    return texts.map((t, i) => ({
        name: names[(pgId + i) % names.length],
        rating: 4 + (pgId + i) % 2,
        date: new Date(Date.now() - (i + 1) * 86400000 * 7).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
        text: t
    })).slice(0, 4);
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

// ================= FOOTER MODALS & HANDLERS =================

function openLegalModal(id) { closeLogin(); document.getElementById(id).classList.add('show'); }
const openAboutModal = () => openLegalModal('aboutModal');
const openContactModal = () => openLegalModal('contactModal');
const openTermsModal = () => openLegalModal('termsModal');
const openPrivacyModal = () => openLegalModal('privacyModal');
const openRefundModal = () => openLegalModal('refundModal');
const openCookiesModal = () => openLegalModal('cookiesModal');
const closeLegalModal = id => document.getElementById(id).classList.remove('show');

// Newsletter handler (works with form's input)
function handleNewsletter(e) {
    e.preventDefault();
    const input = e.target.querySelector('input[type="email"]');
    const email = input?.value?.trim();
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        input.value = '';
        input.blur();
        // Show success toast
        showToast('Thanks for subscribing! 🎉');
    }
}

// Simple toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Close modals on outside click / Escape
document.querySelectorAll('.modal').forEach(m => m.addEventListener('click', e => { if(e.target===m) m.classList.remove('show'); }));
document.addEventListener('keydown', e => { if(e.key==='Escape') document.querySelectorAll('.modal.show').forEach(m=>m.classList.remove('show')); });

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
populatePopularGrid();

// Populate Popular PGs grid
function populatePopularGrid() {
    const grid = document.getElementById('popularGrid');
    if (!grid) return;
    const popularProps = properties.filter(p => [2, 5, 6, 1, 3, 4].includes(p.id));
    grid.innerHTML = popularProps.map(pg => `
        <div class="pg-card" onclick="openPgDetail(${pg.id})">
            <div class="pg-image" onclick="openPgDetail(${pg.id})" style="cursor:pointer" title="View details">
                <img src="${pg.image}" alt="${pg.name}" loading="lazy"
                     onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'260\\'><rect width=\\'100%\\' height=\\'100%\\' fill=\\'%23eef2f7\\'/><text x=\\'50%\\' y=\\'50%\\' dominant-baseline=\\'middle\\' text-anchor=\\'middle\\' font-family=\\'sans-serif\\' font-size=\\'14\\' fill=\\'%2394a3b8\\'>No image available</text></svg>'">
                <div class="rating">★ ${pg.rating} (${pg.reviews})</div>
                ${pg.verified ? `<div class="verified">✓ Verified</div>` : ''}
                <button class="favorite-btn" data-id="${pg.id}"
                    onclick="toggleFavorite(event, ${pg.id})"
                    title="Save to favorites">
                    <i class="fa-regular fa-heart"></i>
                </button>
            </div>
            <div class="pg-info" onclick="openPgDetail(${pg.id})" style="cursor:pointer" title="View details">
                <h3>${pg.name}</h3>
                <div class="pg-location"><i class="fa-solid fa-location-dot"></i> ${pg.location}</div>
                <div class="pg-amenities">${pg.amenities.map(a => `<span>✓ ${a}</span>`).join('')}</div>
                <div class="pg-bottom">
                    <div class="price">₹${pg.price.toLocaleString()}<span style="font-size:11px;color:var(--gray)">/mo</span></div>
                    <div class="pg-occupancy">${pg.occupancy}</div>
                </div>
            </div>
        </div>
    `).join('');
}