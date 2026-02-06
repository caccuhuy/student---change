class Student {
    constructor(maSV, hoTen, ngaySinh, lopHoc, gpa) {
        this.maSV = maSV;
        this.hoTen = hoTen;
        this.ngaySinh = ngaySinh;
        this.lopHoc = lopHoc;
        this.gpa = parseFloat(gpa).toFixed(2);
    }

    updateInfo(maSV, hoTen, ngaySinh, lopHoc, gpa) {
        this.maSV = maSV;
        this.hoTen = hoTen;
        this.ngaySinh = ngaySinh;
        this.lopHoc = lopHoc;
        this.gpa = parseFloat(gpa).toFixed(2);
    }
}

let studentList = [];
let editingIndex = -1;

function handleSave() {
    const maSV = document.getElementById('maSV').value.trim();
    const hoTen = document.getElementById('hoTen').value.trim();
    const ngaySinh = document.getElementById('ngaySinh').value;
    const lopHoc = document.getElementById('lopHoc').value.trim();
    const gpa = document.getElementById('gpa').value;

    if (!maSV || !hoTen || !ngaySinh || !lopHoc || !gpa) {
        alert("Vui lòng nhập đầy đủ tất cả các trường!");
        return;
    }

    if (editingIndex === -1) {
        const newStudent = new Student(maSV, hoTen, ngaySinh, lopHoc, gpa);
        studentList.push(newStudent);
    } else {
        studentList[editingIndex].updateInfo(maSV, hoTen, ngaySinh, lopHoc, gpa);
        editingIndex = -1;
    }

    resetForm();
    renderTable();
}

function renderTable() {
    const tbody = document.getElementById('studentTableBody');
    const noData = document.getElementById('noData');
    tbody.innerHTML = "";

    if (studentList.length === 0) {
        noData.style.display = "block";
        return;
    }
    noData.style.display = "none";

    studentList.forEach((st, index) => {
        tbody.innerHTML += `<tr>
            <td><b>${st.maSV}</b></td>
            <td>${st.hoTen}</td>
            <td>${st.ngaySinh}</td>
            <td>${st.lopHoc}</td>
            <td>${st.gpa}</td>
            <td><button class="btn-edit" onclick="prepareEdit(${index})">Sửa</button></td>
        </tr>`;
    });
}

function prepareEdit(index) {
    const st = studentList[index];
    document.getElementById('maSV').value = st.maSV;
    document.getElementById('hoTen').value = st.hoTen;
    document.getElementById('ngaySinh').value = st.ngaySinh;
    document.getElementById('lopHoc').value = st.lopHoc;
    document.getElementById('gpa').value = st.gpa;

    editingIndex = index;
    const btn = document.getElementById('mainBtn');
    btn.innerText = "Xác nhận Cập nhật";
    btn.style.background = "#f39c12";
}

function resetForm() {
    document.querySelectorAll('input').forEach(i => i.value = "");
    editingIndex = -1;
    const btn = document.getElementById('mainBtn');
    btn.innerText = "Thêm Sinh Viên Mới";
    btn.style.background = "#4a90e2";
}