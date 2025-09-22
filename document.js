document.addEventListener('DOMContentLoaded', () => {
    const formTugas = document.getElementById('form-tugas');
    const namaTugasInput = document.getElementById('nama-matkul'); // Perhatikan perubahan ID di sini
    const deadlineInput = document.getElementById('deadline');
    const tabelTugasBody = document.querySelector('#tabel-tugas tbody');

    // Menambahkan event listener saat formulir dikirim (submit)
    formTugas.addEventListener('submit', (e) => {
        e.preventDefault(); // Mencegah halaman reload

        const namaTugas = namaTugasInput.value;
        const deadline = deadlineInput.value;

        // Memastikan input tidak kosong
        if (namaTugas.trim() === '' || deadline.trim() === '') {
            alert('Nama matkul dan deadline tidak boleh kosong!');
            return;
        }

        // Membuat baris baru untuk tabel
        const newRow = document.createElement('tr');

        // Menambahkan sel (kolom) untuk nama tugas dan deadline
        newRow.innerHTML = `
            <td>${namaTugas}</td>
            <td>${deadline}</td>
            <td><button class="hapus-btn">Hapus</button></td>
        `;

        // Menambahkan baris baru ke dalam tabel
        tabelTugasBody.appendChild(newRow);

        // Menambahkan event listener untuk tombol hapus pada baris baru
        newRow.querySelector('.hapus-btn').addEventListener('click', () => {
            newRow.remove();
        });

        // Mereset nilai formulir setelah data ditambahkan
        namaTugasInput.value = '';
        deadlineInput.value = '';
        namaTugasInput.focus();
    });
});