// ============================================
// ADMIN PANEL JAVASCRIPT
// ============================================

const API_URL = 'http://localhost:5000/api';
let token = localStorage.getItem('adminToken');

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    initLogin();
    initTabs();
    initModal();
    initLogout();
});

// Check Authentication
function checkAuth() {
    if (token) {
        verifyToken();
    }
}

async function verifyToken() {
    try {
        const res = await fetch(`${API_URL}/auth/verify`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
            showDashboard();
            loadProjects();
            loadCertifications();
        } else {
            localStorage.removeItem('adminToken');
            token = null;
        }
    } catch (error) {
        console.error('Auth error:', error);
    }
}

// Login
function initLogin() {
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                token = data.token;
                localStorage.setItem('adminToken', token);
                showDashboard();
                loadProjects();
                loadCertifications();
            } else {
                document.getElementById('loginError').textContent = data.message || 'Login failed';
            }
        } catch (error) {
            document.getElementById('loginError').textContent = 'Server error. Please try again.';
        }
    });
}

function showDashboard() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('dashboardSection').style.display = 'block';
}

// Logout
function initLogout() {
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('adminToken');
        token = null;
        location.reload();
    });
}

// Tabs
function initTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(`${btn.dataset.tab}-tab`).classList.add('active');
        });
    });
}

// Modal
function initModal() {
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementById('closeModal');
    const form = document.getElementById('itemForm');

    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    document.getElementById('addProjectBtn').addEventListener('click', () => openModal('project'));
    document.getElementById('addCertBtn').addEventListener('click', () => openModal('certification'));

    form.addEventListener('submit', handleFormSubmit);
}

function openModal(type, item = null) {
    const modal = document.getElementById('modal');
    const form = document.getElementById('itemForm');
    const title = document.getElementById('modalTitle');

    form.reset();
    document.getElementById('itemId').value = item?._id || '';
    document.getElementById('itemType').value = type;

    title.textContent = item ? `Edit ${type}` : `Add ${type}`;

    // Show/hide fields
    document.querySelectorAll('.project-field').forEach(f => f.style.display = type === 'project' ? 'block' : 'none');
    document.querySelectorAll('.cert-field').forEach(f => f.style.display = type === 'certification' ? 'block' : 'none');

    if (item) {
        document.getElementById('title').value = item.title || '';
        document.getElementById('description').value = item.description || '';
        document.getElementById('image').value = item.image || '';
        if (type === 'project') {
            document.getElementById('category').value = item.category || '';
            document.getElementById('link').value = item.link || '';
        } else {
            document.getElementById('issuer').value = item.issuer || '';
            document.getElementById('date').value = item.date ? item.date.split('T')[0] : '';
            document.getElementById('credentialId').value = item.credentialId || '';
        }
    }

    modal.classList.add('active');
}

async function handleFormSubmit(e) {
    e.preventDefault();

    const type = document.getElementById('itemType').value;
    const id = document.getElementById('itemId').value;
    const endpoint = type === 'project' ? 'projects' : 'certifications';

    const data = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        image: document.getElementById('image').value
    };

    if (type === 'project') {
        data.category = document.getElementById('category').value;
        data.link = document.getElementById('link').value;
    } else {
        data.issuer = document.getElementById('issuer').value;
        data.date = document.getElementById('date').value;
        data.credentialId = document.getElementById('credentialId').value;
    }

    try {
        const url = id ? `${API_URL}/${endpoint}/${id}` : `${API_URL}/${endpoint}`;
        const method = id ? 'PUT' : 'POST';

        const res = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            document.getElementById('modal').classList.remove('active');
            type === 'project' ? loadProjects() : loadCertifications();
        } else {
            alert('Error saving item');
        }
    } catch (error) {
        alert('Server error');
    }
}

// Load Projects
async function loadProjects() {
    try {
        const res = await fetch(`${API_URL}/projects`);
        const projects = await res.json();
        renderItems(projects, 'projectsGrid', 'project');
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

// Load Certifications
async function loadCertifications() {
    try {
        const res = await fetch(`${API_URL}/certifications`);
        const certs = await res.json();
        renderItems(certs, 'certificationsGrid', 'certification');
    } catch (error) {
        console.error('Error loading certifications:', error);
    }
}

// Render Items
function renderItems(items, gridId, type) {
    const grid = document.getElementById(gridId);

    if (!items.length) {
        grid.innerHTML = '<p style="color:#666;">No items yet. Add your first one!</p>';
        return;
    }

    grid.innerHTML = items.map(item => `
        <div class="item-card">
            ${item.image ? `<img src="${item.image}" alt="${item.title}">` : ''}
            <div class="item-content">
                <h3>${item.title}</h3>
                <p>${item.description || item.category || item.issuer || ''}</p>
                <div class="item-actions">
                    <button class="btn btn-outline" onclick='editItem(${JSON.stringify(item).replace(/'/g, "&#39;")}, "${type}")'>Edit</button>
                    <button class="btn btn-danger" onclick="deleteItem('${item._id}', '${type}')">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Edit Item
function editItem(item, type) {
    openModal(type, item);
}

// Delete Item
async function deleteItem(id, type) {
    if (!confirm('Are you sure you want to delete this item?')) return;

    const endpoint = type === 'project' ? 'projects' : 'certifications';

    try {
        const res = await fetch(`${API_URL}/${endpoint}/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (res.ok) {
            type === 'project' ? loadProjects() : loadCertifications();
        } else {
            alert('Error deleting item');
        }
    } catch (error) {
        alert('Server error');
    }
}
