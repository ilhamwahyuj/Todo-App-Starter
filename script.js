// Ambil elemen
const form = document.getElementById('todo-form');
const taskInput = document.getElementById('task');
const dateInput = document.getElementById('date');
const taskContainer = document.getElementById('task-container');
const notification = document.getElementById('notification');
const notifMessage = document.getElementById('notification-message');

// Fungsi menampilkan notifikasi
function showNotification(message) {
    notifMessage.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2500);
}

// Fungsi mengubah format tanggal dari yyyy-mm-dd ke dd/mm/yyyy
function formatDate(isoDate) {
    if (!isoDate) return '';
    const [year, month, day] = isoDate.split('-');
    return `${day}/${month}/${year}`;
}

// Fungsi menambah todo ke daftar
function addTodoToDOM(task, date) {
    const li = document.createElement('li');
    li.className = 'todo-item';

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', function() {
        span.classList.toggle('checked', checkbox.checked);
    });

    // Span teks
    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = `${task} — ${date}`; // date sudah dd/mm/yyyy

    // Tombol hapus
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
    deleteBtn.addEventListener('click', function() {
        li.remove();
        showNotification('Todo dihapus ✨');
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskContainer.appendChild(li);
}

// Event submit form
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const task = taskInput.value.trim();
    const rawDate = dateInput.value; // yyyy-mm-dd

    if (!task || !rawDate) {
        showNotification('Isi task dan tanggal dulu ya!');
        return;
    }

    // Format tanggal ke dd/mm/yyyy
    const formattedDate = formatDate(rawDate);

    // Tambahkan ke daftar
    addTodoToDOM(task, formattedDate);

    // Tampilkan notifikasi sukses
    showNotification('Todo berhasil ditambahkan!');

    // Reset form
    form.reset();

    // Opsional: console log
    console.log('Todo baru:', { task, date: formattedDate });
});

// (Opsional) Muat contoh awal biar tidak kosong
(function initExample() {
    addTodoToDOM('Belajar JavaScript', '17/02/2026');
    addTodoToDOM('Nonton anime', '18/02/2026');
})();