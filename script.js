document.addEventListener('DOMContentLoaded', () => {
    const formTugas = document.getElementById('form-tugas');
    const namaTugasInput = document.getElementById('nama-matkul');
    const deadlineInput = document.getElementById('deadline');
    const tabelTugasBody = document.querySelector('#tabel-tugas tbody');

    // Memuat data dari localStorage saat halaman pertama kali dimuat
    loadTasks();

    // Menambahkan event listener saat formulir dikirim (submit)
    formTugas.addEventListener('submit', (e) => {
        e.preventDefault();

        const namaTugas = namaTugasInput.value;
        const deadline = deadlineInput.value;

        if (namaTugas.trim() === '' || deadline.trim() === '') {
            alert('Nama matkul dan deadline tidak boleh kosong!');
            return;
        }

        // Memanggil fungsi untuk menambahkan tugas
        addTask(namaTugas, deadline);

        // Mereset nilai formulir setelah data ditambahkan
        namaTugasInput.value = '';
        deadlineInput.value = '';
        namaTugasInput.focus();
    });

    // Fungsi untuk menambahkan baris tugas baru ke tabel dan menyimpannya
    function addTask(nama, deadline) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${nama}</td>
            <td>${deadline}</td>
            <td><button class="hapus-btn">Hapus</button></td>
        `;

        tabelTugasBody.appendChild(newRow);

        // Menambahkan event listener untuk tombol hapus pada baris baru
        newRow.querySelector('.hapus-btn').addEventListener('click', () => {
            newRow.remove();
            saveTasks(); // Menyimpan data setelah tugas dihapus
        });

        saveTasks(); // Menyimpan data setelah tugas baru ditambahkan
    }

    // Fungsi untuk menyimpan semua tugas ke localStorage
    function saveTasks() {
        const rows = tabelTugasBody.querySelectorAll('tr');
        const tasks = [];
        rows.forEach(row => {
            const nama = row.children[0].textContent;
            const deadline = row.children[1].textContent;
            tasks.push({ nama: nama, deadline: deadline });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Fungsi untuk memuat tugas dari localStorage dan menampilkannya
    function loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            const tasks = JSON.parse(storedTasks);
            tasks.forEach(task => {
                addTask(task.nama, task.deadline);
            });
        }
    }
});
