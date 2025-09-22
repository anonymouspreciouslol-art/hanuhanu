document.addEventListener('DOMContentLoaded', () => {
    const formTugas = document.getElementById('form-tugas');
    const namaTugasInput = document.getElementById('nama-matkul');
    const deadlineInput = document.getElementById('deadline');
    const tabelTugasBody = document.querySelector('#tabel-tugas tbody');
    const tabelSelesaiBody = document.querySelector('#tabel-selesai tbody');

    loadTasks();
    loadCompletedTasks();

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

    function completeTask(nama, deadline, row) {
        row.remove();
        
        const completedRow = document.createElement('tr');
        completedRow.innerHTML = `
            <td>${nama}</td>
            <td>${deadline}</td>
            <td><button class="hapus-btn">Hapus</button></td>
        `;
        tabelSelesaiBody.appendChild(completedRow);

        completedRow.querySelector('.hapus-btn').addEventListener('click', () => {
            completedRow.remove();
            saveCompletedTasks();
        });

        saveTasks();
        saveCompletedTasks();
    }

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

    function saveCompletedTasks() {
        const rows = tabelSelesaiBody.querySelectorAll('tr');
        const completedTasks = [];
        rows.forEach(row => {
            const nama = row.children[0].textContent;
            const deadline = row.children[1].textContent;
            completedTasks.push({ nama: nama, deadline: deadline });
        });
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    }

    function loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            const tasks = JSON.parse(storedTasks);
            tasks.forEach(task => {
                addTask(task.nama, task.deadline);
            });
        }
    }

    function loadCompletedTasks() {
        const storedTasks = localStorage.getItem('completedTasks');
        if (storedTasks) {
            const tasks = JSON.parse(storedTasks);
            tasks.forEach(task => {
                const completedRow = document.createElement('tr');
                completedRow.innerHTML = `
                    <td>${task.nama}</td>
                    <td>${task.deadline}</td>
                    <td><button class="hapus-btn">Hapus</button></td>
                `;
                tabelSelesaiBody.appendChild(completedRow);
                
                completedRow.querySelector('.hapus-btn').addEventListener('click', () => {
                    completedRow.remove();
                    saveCompletedTasks();
                });
            });
        }
    }
});
    function loadCompletedTasks() {
        const storedTasks = localStorage.getItem('completedTasks');
        if (storedTasks) {
            const tasks = JSON.parse(storedTasks);
            tasks.forEach(task => {
                const completedRow = document.createElement('tr');
                completedRow.innerHTML = `
                    <td>${task.nama}</td>
                    <td>${task.deadline}</td>
