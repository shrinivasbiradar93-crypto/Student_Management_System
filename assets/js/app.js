const addStudentBtn = document.getElementById("addStudentBtn");
const addBtn = document.getElementById("addBtn");
const studentModal = document.getElementById("studentModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const cancelBtn = document.getElementById("cancelBtn");
const studentForm = document.getElementById("studentForm");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const contact = document.getElementById("contact");
const course = document.getElementById("course");
const updateBtn = document.getElementById("updateBtn");
const studentTableBody = document.getElementById("studentTableBody");
const searchStudent = document.getElementById("searchStudent");

let studentArr = [
    {
        id: "1",
        fname: "Shri",
        lname: "Biradar",
        email: "sb9209389305@gmail.com",
        contact: "9356967560",
        course: "Angular"
    },
    {
        id: "2",
        fname: "Abhishek",
        lname: "Birajdar",
        email: "abhibiradar93@gmail.com",
        contact: "7896967560",
        course: "React"
    },
    {
        id: "3",
        fname: "Akash",
        lname: "Jadhav",
        email: "akash@gmail.com",
        contact: "9012345678",
        course: "Angular"
    },
    {
        id: "4",
        fname: "Rohit",
        lname: "Deshmukh",
        email: "rohit@gmail.com",
        contact: "9090909090",
        course: "React"
    },
    {
        id: "5",
        fname: "Vikas",
        lname: "Pawar",
        email: "vikas@gmail.com",
        contact: "9345678901",
        course: "JavaScript"
    },
    {
        id: "15",
        fname: "Rahul",
        lname: "Patil",
        email: "rahul@gmail.com",
        contact: "9876543210",
        course: "JavaScript"
    }
];

// function onAddStudent() {
//     addBtn.classList.remove("d-none");
//     updateBtn.classList.add("d-none");
//     studentForm.reset();
//     studentModal.classList.remove("d-none");
// }

// function onCloseModal() {
//     studentModal.classList.add("d-none");
//     addBtn.classList.remove("d-none");
//     updateBtn.classList.add("d-none");
// }

// function onCancel() {
//     studentModal.classList.add("d-none");
//     addBtn.classList.remove("d-none");
//     updateBtn.classList.add("d-none");
// }

function onToggle(){
    studentModal.classList.toggle('d-none')
}



function onStudentAdd(eve) {
    eve.preventDefault();

    let studentObj = {
        id: Date.now().toString(),
        fname: fname.value,
        lname: lname.value,
        email: email.value,
        contact: contact.value,
        course: course.value
    };

    studentArr.push(studentObj);

    let tr = document.createElement("tr");
    tr.id = studentObj.id;

    tr.innerHTML = `
        <td>${studentArr.length}</td>
        <td>${studentObj.fname} ${studentObj.lname}</td>
        <td>${studentObj.email}</td>
        <td>${studentObj.contact}</td>
        <td>${studentObj.course}</td>
        <td>
            <button onclick="onEdit(this)" class="edit-btn btn-secondary">
                Edit
            </button>
            <button onclick="onDelete(this)" class="delete-btn remove btn-danger">
                Delete
            </button>
        </td>
    `;

    studentTableBody.appendChild(tr);

    studentForm.reset();
    studentModal.classList.add("d-none");
}

function showStudents() {
    studentTableBody.innerHTML = "";

    studentArr.forEach(function onShowStudent(student, index) {
        let tr = document.createElement("tr");
        tr.id = student.id;

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.fname} ${student.lname}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>${student.course}</td>
            <td>
                <button onclick="onEdit(this)" class="edit-btn btn-secondary">
                    Edit
                </button>
                <button onclick="onDelete(this)" class="delete-btn remove btn-danger">
                    Delete
                </button>
            </td>
        `;

        studentTableBody.appendChild(tr);
    });

}


function onEdit(ele) {
    let tr = ele.closest("tr");
    let editId = tr.id;

    updateBtn.setAttribute("data-id", editId);

    let student = studentArr.find(student => student.id === editId);

    fname.value = student.fname;
    lname.value = student.lname;
    email.value = student.email;
    contact.value = student.contact;
    course.value = student.course;

    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");

    studentModal.classList.remove("d-none");
}

function onUpdate() {
    let editId = updateBtn.getAttribute("data-id");

    let index = studentArr.findIndex(student => student.id === editId);

    if (index === -1) {
        return;
    }

    studentArr[index].fname = fname.value;
    studentArr[index].lname = lname.value;
    studentArr[index].email = email.value;
    studentArr[index].contact = contact.value;
    studentArr[index].course = course.value;

    showStudents();

    studentForm.reset();
    studentModal.classList.add("d-none");

    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");

}

function onDelete(ele) {
    if (!confirm("Are you sure you want to delete this student?")) {
        return;
    }

    let tr = ele.closest("tr");
    let id = tr.id;

    let index = studentArr.findIndex(student => student.id === id);

    if (index === -1) {
        return;
    }

    studentArr.splice(index, 1);

    showStudents();
}

function onSearchStudent(eve) {
    let searchValue = searchStudent.value.toLowerCase();
    let rows = studentTableBody.querySelectorAll("tr");

    rows.forEach(row =>  {
        let studentName = row.children[1].innerText.toLowerCase();
        let studentEmail = row.children[2].innerText.toLowerCase();

        if (
            studentName.includes(searchValue) ||
            studentEmail.includes(searchValue) 
        ) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

// addStudentBtn.addEventListener("click", onAddStudent);
// closeModalBtn.addEventListener("click", onCloseModal);
// cancelBtn.addEventListener("click", onCancel);

studentForm.addEventListener("submit", onStudentAdd);
updateBtn.addEventListener("click", onUpdate);
searchStudent.addEventListener("input", onSearchStudent);

addStudentBtn.addEventListener("click", onToggle);
closeModalBtn.addEventListener("click", onToggle);
cancelBtn.addEventListener("click", onToggle);


showStudents();