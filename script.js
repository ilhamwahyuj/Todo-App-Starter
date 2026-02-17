// Ambil elemen form
const form = document.getElementById('todo-form');

// Tambahkan event listener untuk submit
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah refresh halaman

    // Ambil nilai input
    const task = document.getElementById('task').value;
    const date = document.getElementById('date').value;

    // Buat objek todo
    const todo = {
        task: task,
        date: date,
        timestamp: new Date().toISOString()
    };

    // Tampilkan todo di console
    console.log('Todo baru:', todo);

    // Optional: reset form
    form.reset();
});