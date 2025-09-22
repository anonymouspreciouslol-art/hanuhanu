document.addEventListener('DOMContentLoaded', () => {
    const formTugas = document.getElementById('form-tugas');
    const namaTugasInput = document.getElementById('nama-matkul');
    const deadlineInput = document.getElementById('deadline');
    const tabelTugasBody = document.querySelector('#tabel-tugas tbody');
    const tabelSelesaiBody = document.querySelector('#tabel-selesai tbody');

    // Memuat data dari localStorage saat halaman pertama kali dimuat
    loadTasks();
    loadCompletedTasks(); // Pastikan baris ini ada

    // Menambahkan event listener saat formulir dikirim (submit)
    formTugas.addEventListener('submit', (e) => {
        e.preventDefault();
        const namaTugas = namaTugasInput.value;
        const deadline = deadlineInput.value;

        if (namaTugas.trim() === '' || deadline.trim() === '') {
            alert('Nama matkul dan deadline tidak boleh kosong!');
            return;
        }

        addTask(namaTugas, deadline);

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
            <td>
                <button class="selesai-btn">Selesai</button>
                <button class="hapus-btn">Hapus</button>
            </td>
        `;

        tabelTugasBody.appendChild(newRow);

        newRow.querySelector('.selesai-btn').addEventListener('click', () => {
            completeTask(nama, deadline, newRow);
        });

        newRow.querySelector('.hapus-btn').addEventListener('click', () => {
            newRow.remove();
            saveTasks();
        });

        saveTasks();
    }

    // Fungsi baru: memindahkan tugas ke tabel selesai
    function completeTask(nama, deadline, row) {
        const completedRow = document.createElement('tr');
        completedRow.innerHTML = `
            <td>${nama}</td>
            <td>${deadline}</td>
        `;
        tabelSelesaiBody.appendChild(completedRow);

        row.remove();
        saveTasks();
        saveCompletedTasks();
    }

    // Fungsi untuk menyimpan semua tugas yang belum selesai ke localStorage
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

    // Fungsi untuk menyimpan tugas yang sudah selesai ke localStorage
    function saveCompletedTasks() {
        const rows = tabelSelesaiBody.querySelectorAll('tr');
        const tasks = [];
        rows.forEach(row => {
            const nama = row.children[0].textContent;
            const deadline = row.children[1].textContent;
            tasks.push({ nama: nama, deadline: deadline });
        });
        localStorage.setItem('completedTasks', JSON.stringify(tasks));
    }

    // Fungsi untuk memuat tugas yang belum selesai dari localStorage
    function loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            const tasks = JSON.parse(storedTasks);
            tasks.forEach(task => {
                addTask(task.nama, task.deadline);
            });
        }
    }

    // Fungsi untuk memuat tugas yang sudah selesai dari localStorage
    function loadCompletedTasks() {
        const storedTasks = localStorage.getItem('completedTasks');
        if (storedTasks) {
            const tasks = JSON.parse(storedTasks);
            tasks.forEach(task => {
                const completedRow = document.createElement('tr');
                completedRow.innerHTML = `
                    <td>${task.nama}</td>
                    <td>${task.deadline}</td>
                `;
                tabelSelesaiBody.appendChild(completedRow);
            });
        }
    }
});
