// script.js
const STORAGE_KEY = 'TODO_APPS';
const SAVED_EVENT = 'saved-todo';

// Elemen DOM
const form = document.getElementById('todo-form');
const taskInput = document.getElementById('task');
const dateInput = document.getElementById('date');
const incompleteList = document.getElementById('incomplete-tasks');
const completeList = document.getElementById('complete-tasks');
const notification = document.getElementById('notification');
const notifMessage = document.getElementById('notification-message');

// Tampilkan notifikasi
function showNotification(message) {
    notifMessage.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2500);
}

// Ubah format yyyy-mm-dd ke dd/mm/yyyy
function formatDate(isoDate) {
    if (!isoDate) return '';
    const [year, month, day] = isoDate.split('-');
    return `${day}/${month}/${year}`;
}

// Ubah dd/mm/yyyy ke yyyy-mm-dd (untuk penyimpanan konsisten)
function parseDate(ddmmyyyy) {
    const [day, month, year] = ddmmyyyy.split('/');
    return `${year}-${month}-${day}`;
}

// Simpan data ke localStorage
function saveData() {
    const todos = [];
    // Ambil dari incomplete
    incompleteList.querySelectorAll('.todo-item').forEach(item => {
        const text = item.querySelector('.task-text').textContent;
        const [task, date] = text.split(' — ');
        todos.push({
            task: task,
            date: parseDate(date), // simpan dalam format ISO
            completed: false
        });
    });
    // Ambil dari complete
    completeList.querySelectorAll('.todo-item').forEach(item => {
        const text = item.querySelector('.task-text').textContent;
        const [task, date] = text.split(' — ');
        todos.push({
            task: task,
            date: parseDate(date),
            completed: true
        });
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    // Kirim event
    document.dispatchEvent(new Event(SAVED_EVENT));
}

// Muat data dari localStorage
function loadData() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return;
    try {
        const todos = JSON.parse(data);
        todos.forEach(todo => {
            addTodoToDOM(todo.task, formatDate(todo.date), todo.completed);
        });
    } catch (e) {
        console.error('Gagal memuat data', e);
    }
}

// Buat elemen todo item
function createTodoItem(task, date, isCompleted = false) {
    const li = document.createElement('li');
    li.className = 'todo-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isCompleted;

    const span = document.createElement('span');
    span.className = 'task-text';
    if (isCompleted) span.classList.add('checked');
    span.textContent = `${task} — ${date}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
    deleteBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        li.remove();
        saveData(); // simpan setelah hapus
        showNotification('Todo dihapus ✨');
    });

    // Event pindah daftar saat checkbox berubah
    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            span.classList.add('checked');
            completeList.appendChild(li);
        } else {
            span.classList.remove('checked');
            incompleteList.appendChild(li);
        }
        saveData(); // simpan setelah pindah
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    return li;
}

// Tambah todo ke DOM
function addTodoToDOM(task, date, isCompleted = false) {
    const li = createTodoItem(task, date, isCompleted);
    if (isCompleted) {
        completeList.appendChild(li);
    } else {
        incompleteList.appendChild(li);
    }
}

// Submit form
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const task = taskInput.value.trim();
    const rawDate = dateInput.value;

    if (!task || !rawDate) {
        showNotification('Isi task dan tanggal dulu ya!');
        return;
    }

    const formattedDate = formatDate(rawDate);
    addTodoToDOM(task, formattedDate, false);
    saveData(); // simpan setelah tambah
    showNotification('Todo berhasil ditambahkan!');
    form.reset();
    console.log('Todo baru:', { task, date: formattedDate });
});

// Event listener untuk SAVED_EVENT
document.addEventListener(SAVED_EVENT, function() {
    console.log('Data tersimpan:', localStorage.getItem(STORAGE_KEY));
    // Tampilkan toast khusus jika ingin (opsional, karena kita sudah pakai showNotification di aksi)
    // Bisa juga menambahkan toast "Perubahan tersimpan"
    showNotification('Perubahan tersimpan!');
});

// Inisialisasi: muat data dari localStorage
loadData();

// Jika tidak ada data, tambahkan contoh
if (incompleteList.children.length === 0 && completeList.children.length === 0) {
    addTodoToDOM('Makan di Restoran', formatDate('2021-12-27'), false);
    addTodoToDOM('Belajar JavaScript', formatDate('2026-02-19'), true);
    saveData(); // simpan contoh ke localStorage
}