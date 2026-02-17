// Ambil elemen form
const form = document.getElementById('todo-form');

// Tambahkan event listener untuk submit
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah refresh halaman

    // Ambil nilai input
    const task = document.getElementById('task').value;
    const dateInput = document.getElementById('date').value; // Format: yyyy-mm-dd

    // Jika ingin mengubah format ke mm/dd/yyyy, lakukan konversi
    let formattedDate = dateInput;
    if (dateInput) {
        const [year, month, day] = dateInput.split('-');
        formattedDate = `${month}/${day}/${year}`; // mm/dd/yyyy
    }

    // Buat objek todo
    const todo = {
        task: task,
        date: formattedDate, // Tampilkan dalam format mm/dd/yyyy di console
        rawDate: dateInput,  // (Opsional) Simpan juga format asli jika diperlukan
        timestamp: new Date().toISOString()
    };

    // Tampilkan todo di console
    console.log('Todo baru:', todo);

    // Reset form
    form.reset();
});