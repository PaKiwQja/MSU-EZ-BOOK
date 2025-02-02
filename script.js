const categorySelect = document.getElementById('category');
const bookSelect = document.getElementById('book');
const bookImage = document.getElementById('book-image');

// ข้อมูลหนังสือพร้อมกับ URL ของภาพ
const books = {
    "นิยาย": [
        { title: "เทียบท้าปฐพี", image: "images/เทียบท้าปฐพี.jpg" },
        { title: "เจ็ดชาติภพ หนึ่งปรารถนา", image: "images/เจ็ดชาติภพ หนึ่งปรารถนา.jpg" }
    ],
    "สารคดี": [
        { title: "สัตว์ทะเลไทยใกล้สูญพันธุ์", image: "images/สัตว์ทะเลไทยใกล้สูญพันธุ์.jpg" },
        { title: "วาฬบรูด้ากับปริศนา 7 ประการ", image: "images/วาฬบรูด้ากับปริศนา 7 ประการ.jpg" }
    ],
    "การ์ตูน": [
        { title: "ครอบครัวตึ๋งหนืด", image: "images/ครอบครัวตึ๋งหนืด.jpg" },
        { title: "โคนันยอดนักสืบประวัติศาสตร์โลก 2", image: "images/โคนันยอดนักสืบประวัติศาสตร์โลก 2.jpg" }
    ],
    "วิทยาศาสตร์": [
        { title: "ชีววิทยา (หมึกดำ)", image: "images/ชีววิทยา (หมึกดำ).jpg" },
        { title: "ฟิสิกส์ขนมหวาน", image: "images/ฟิสิกส์ขนมหวาน.jpg" }
    ]
};

categorySelect.addEventListener('change', function() {
    const selectedCategory = categorySelect.value;
    const bookOptions = books[selectedCategory] || [];
    
    // Clear previous book options
    bookSelect.innerHTML = '<option value="">-- เลือกหนังสือ --</option>';
    bookImage.style.display = 'none'; // ซ่อนภาพก่อนเลือกหนังสือใหม่

    // Populate book options based on selected category
    bookOptions.forEach(function(book) {
        const option = document.createElement('option');
        option.value = book.title;
        option.textContent = book.title;
        bookSelect.appendChild(option);
    });
});

bookSelect.addEventListener('change', function() {
    const selectedBookTitle = bookSelect.value;
    let selectedBookImage = "";

    // ค้นหาภาพจากชื่อหนังสือที่เลือก
    for (const category in books) {
        const selectedBook = books[category].find(book => book.title === selectedBookTitle);
        if (selectedBook) {
            selectedBookImage = selectedBook.image;
            break;
        }
    }

    if (selectedBookImage) {
        bookImage.src = selectedBookImage;
        bookImage.style.display = 'inline'; // แสดงภาพ
    } else {
        bookImage.style.display = 'none'; // ซ่อนภาพถ้าไม่มีการเลือก
    }
});

const nextButton = document.querySelector('.submit-btn');
const card = document.querySelector('.card'); // ฟอร์มแรก
const personalInfoForm = document.querySelector('.personal-info-form'); // ฟอร์มใหม่

nextButton.addEventListener('click', function() {
    // ซ่อนฟอร์มแรก
    card.style.display = 'none';
    
    // แสดงฟอร์มใหม่
    personalInfoForm.style.display = 'block';
});

document.getElementById('submit-info').addEventListener('click', function() {
    // รับค่าจากฟอร์มข้อมูลส่วนตัว
    const name = document.getElementById('name').value;
    const studentId = document.getElementById('student-id').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const selectedBookTitle = bookSelect.value;
    const selectedCategory = categorySelect.value;
    const selectedBookImage = books[selectedCategory]?.find(book => book.title === selectedBookTitle)?.image;

    // รายงานการยืมคืน
    const reportDetails = `
        <strong>ชื่อ-สกุล:</strong> ${name}<br>
        <strong>รหัสนักศึกษา:</strong> ${studentId}<br>
        <strong>เบอร์โทร:</strong> ${phone}<br>
        <strong>อีเมล:</strong> ${email}<br><br>
        <strong>หนังสือที่ยืม:</strong> ${selectedBookTitle}<br>
        <strong>ประเภทหนังสือ:</strong> ${selectedCategory}<br>
        <strong>รูปภาพหนังสือ:</strong><br><img src="${selectedBookImage}" alt="Book Image" style="width: 100px;">
    `;
    
    document.getElementById('report-details').innerHTML = reportDetails;

    // แสดงรายงานการยืมคืน
    personalInfoForm.style.display = 'none';
    document.querySelector('.report').style.display = 'block';
});

