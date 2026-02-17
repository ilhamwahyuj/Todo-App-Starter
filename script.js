const form = document.getElementById('todo-form');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const task = document.getElementById('task').value;
    const dateInput = document.getElementById('date').value; // yyyy-mm-dd

    // Konversi ke dd/mm/yyyy untuk ditampilkan
    let formattedDate = dateInput;
    if (dateInput) {
        const [year, month, day] = dateInput.split('-');
        formattedDate = `${day}/${month}/${year}`; // dd/mm/yyyy
    }

    const todo = {
        task: task,
        date: formattedDate,
        rawDate: dateInput,
        timestamp: new Date().toISOString()
    };

    console.log('Todo baru:', todo);

    // Tampilkan alert sukses
    alert('✅ Data berhasil ditambahkan!');

    // Reset form
    form.reset();
});