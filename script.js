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
    showNotification('Todo berhasil ditambahkan!');
    form.reset();
    console.log('Todo baru:', { task, date: formattedDate });
});

// Contoh awal sesuai gambar
(function initExample() {
    // Yang harus dilakukan
    addTodoToDOM('Makan di Restoran', formatDate('2021-12-27'), false);
    // Yang sudah dilakukan (contoh)
    addTodoToDOM('Belajar JavaScript', formatDate('2026-02-19'), true);
})();