document.addEventListener("DOMContentLoaded", function () {
  const inputBoxes = document.querySelectorAll(".input-box");
  const modal = document.getElementById("modal");
  const modalContent = document.querySelector(".modal-content");
  const errorModal = document.getElementById("error-modal");
  const loadingScreen = document.getElementById("loading-screen");
  const progressBar = document.querySelector(".progress");
  const progressBarContainer = document.querySelector(".progress-bar");
  const container = document.querySelector(".container");

  let progress = 0;
  let redirectUrl = "./TSA APP/index.html"; // Link chung cho tất cả trường hợp


  

  const userMap = {
      "AECK04": { name: "Phạm Đình Tú", examCode: "AKLMHU" },
      "ABC123": { name: "Phạm Đình Tú", examCode: "AKLMHU" },
      "123456": { name: "Thầy Tiến xấu trai", examCode: "API9OY" },
      "ASPH4I": { name: "Phạm Bảo Duy", examCode: "ASPH4I" },
      "ASFMHC": { name: "Nguyễn Thị Quyên", examCode: "ASFMHC" },
      "VCUONG": { name: "Nguyễn Việt Cường", examCode: "A4AWKT" },
      "VANSON": { name: "Nguyễn Văn Sơn", examCode: "AGMRUS" },
      "123ABC": { name: "Anh Em Cây Khế", examCode: "AOHVBM" },
      "DEMO01": { name: "Demo 1", examCode: "AS0XCG" },
      "DEMO02": { name: "Demo 2", examCode: "A0VSOW" },
      "DEMO03": { name: "Demo 3", examCode: "AK5XVD" },
      "DEMO04": { name: "Demo 4", examCode: "A5TZ9U" },
      "DEMO05": { name: "Demo 5", examCode: "AJUZEA" },
      "DEMO06": { name: "Demo 6", examCode: "AIJ40C" },
      "DEMO07": { name: "Demo 7", examCode: "A376OC" },
      "DEMO08": { name: "Demo 8", examCode: "AAN5EG" },
      "DEMO09": { name: "Demo 9", examCode: "AHXDJ5" },
      "DEMO10": { name: "Demo 10", examCode: "AE56IO" },
      "970699": { "name": "Vũ Nhật Long", "examCode": "AKL33O" },
      "659036": { "name": "Lương Phương Anh", "examCode": "ADHD37" },
      "015570": { "name": "Nguyen Truong Giang", "examCode": "A1J1O5" },
      "724007": { "name": "Tạ Đức Duy", "examCode": "AXCTL9" },
      "893311": { "name": "Cao Việt", "examCode": "AK16KW" },
      "191327": { "name": "Phạm Dũng", "examCode": "AFJPR3" },
      "995321": { "name": "Nguyễn Khánh Trinh", "examCode": "AN64NF" },
      "184858": { "name": "Nguyễn Nhật Minh", "examCode": "ANL6LT" },
      "985343": { "name": "Vũ Ngọc Anh", "examCode": "ADDR1A" },
      "076166": { "name": "Nguyễn Bá Dũng", "examCode": "AKUVKN" },
      "847346": { "name": "Nguyễn Thị Hải", "examCode": "A8K1OV" },
      "350581": { "name": "Hải Dương", "examCode": "ARLX3F" },
      "070777": { "name": "Phan Phú Cường", "examCode": "AIS33O" },
      "576280": { "name": "Thiều Yến Nhi", "examCode": "ACG0EF" },
      "825256": { "name": "Minh Anh", "examCode": "AKU6CF" },
      "914147": { "name": "Nguyễn Thế Lộc", "examCode": "ADI30K" },
      "498329": { "name": "Nguyễn Bá Viết Dũng", "examCode": "AOH2VB" },
      "298108": { "name": "Nguyễn Nhật Nguyên", "examCode": "A0UXNF" },
      "279307": { "name": "Nguyễn Anh Tuấn", "examCode": "AA90NW" },
      "407494": { "name": "Mạc Đăng Quân", "examCode": "AD5VYI" },
      "046797": { "name": "đoàn giang sơn", "examCode": "ARNF6A" },
      "130559": { "name": "Phạm Duy Quyền", "examCode": "ACWFDD" },
      "613045": { "name": "Nguyễn Tuấn Vũ", "examCode": "AAA1H" },
      "445610": { "name": "Đoàn Mạnh Duy", "examCode": "AS26AS" },
      "300071": { "name": "Vũ Đức Tuấn Tú", "examCode": "A0DL49" },
      "241107": { "name": "Nguyễn Trần Đức Chiến", "examCode": "ADZQQF" },
      "736855": { "name": "Đoàn Duy Long", "examCode": "ADSG1J" },
      "191327": { "name": "Pham Dung", "examCode": "ABF57W" },
      "635718": { "name": "nguyễn tiến đạt", "examCode": "ASQORN" },
      "778508": { "name": "Đỗ Anh Quân", "examCode": "AT1JVU" },
      "422207": { "name": "Nguyễn Ninh", "examCode": "A8ZF57" },
      "359907": { "name": "Nguyễn Mạnh Chung ", "examCode": "AUSG5E" },
      "352007": { "name": "Đoàn Phước Long", "examCode": "AIF3YM" },
      "613045": { "name": "Nguyễn Tuấn Vũ", "examCode": "AL4YJZ" },
      "013902": { "name": "Đỗ Xuân Mạnh", "examCode": "ATRR35" },
      "099098": { "name": "Vũ Ngọc Anh", "examCode": "A2F1K4" }
  };

 
  
  function enterFullScreen() {
      if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(err => {
              console.log(`Lỗi khi vào toàn màn hình: ${err.message}`);
          });
      }
  }

  // Kích hoạt full-screen khi trang tải xong
  setTimeout(() => {
      enterFullScreen();
  }, 500);

  function updateProgressBar() {
    progress += 10;
    progressBar.style.width = progress + '%';
    if (progress < 100) {
      setTimeout(updateProgressBar, 50);
    } else {
      loadingScreen.style.display = "none";
      progressBarContainer.style.display = "none";
      container.style.display = "flex";
      document.body.style.overflow = "hidden";
    }
  }

  updateProgressBar();
  document.addEventListener("DOMContentLoaded", function () {
  // Hiển thị modal khi trang tải xong
  const welcomeModal = document.getElementById("welcome-modal");
  const confirmButton = document.getElementById("welcome-confirm");

  welcomeModal.style.display = "flex";

  confirmButton.addEventListener("click", function () {
    welcomeModal.style.display = "none";
  });
});


  inputBoxes.forEach((input, index) => {
    input.addEventListener("input", (event) => {
      const sanitizedValue = input.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
      input.value = sanitizedValue;
      
      if (input.value) {
        input.classList.add('bold');
      } else {
        input.classList.remove('bold');
      }

      if (input.value.length === 1 && index < inputBoxes.length - 1) {
        inputBoxes[index + 1].focus();
      }

      const allFilled = Array.from(inputBoxes).every(box => box.value.length === 1);
      inputBoxes.forEach(box => box.classList.toggle('full', allFilled));
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "Backspace" && index > 0 && input.value === '') {
        inputBoxes[index - 1].focus();
      }
    });
  });

  document.getElementById("submit-button").addEventListener("click", () => {
    const code = Array.from(inputBoxes).map(box => box.value).join("");
    if (code.length === inputBoxes.length) {
        if (userMap[code]) {
            modalContent.innerHTML = code === "AECK04" ? `
                <p><b>Thi thử Đợt 4 TSA</b></p>
                <p>Chào mừng bạn đã tham dự bài thi!</p>
                <button class='exam-btn' data-link='https://e.khaothi.online/t/P1-30818'>Toán học</button>
                <button class='exam-btn' data-link='https://e.khaothi.online/t/P1-30819'>Đọc Hiểu</button>
                <button class='exam-btn' data-link='https://e.khaothi.online/t/P1-30820'>Khoa học</button>
                <button id='close-button' class='confirm-btn'>Đóng</button>
            ` : `
                <p>Xác nhận <b>${userMap[code].name}</b> đã đăng nhập hệ thống. Mã dự thi của bạn là <b>${userMap[code].examCode}</b>. Hãy đăng nhập mã dự thi trên để tham dự bài thi. Chúc bạn hoàn thành tốt bài thi!</p>
                <button id='confirm-button' class='confirm-btn'>Xác nhận</button>
            `;
            
            modal.classList.add('show');
        } else {
            errorModal.classList.add('show');
            setTimeout(() => errorModal.classList.remove('show'), 1500);
        }
    } else {
        alert("Vui lòng nhập đủ mã trước khi tiếp tục!");
    }
});

modal.addEventListener("click", (event) => {
    if (event.target.id === "close-button") {
        modal.classList.remove('show');
    } else if (event.target.id === "confirm-button") {
        window.location.href = redirectUrl;
    } else if (event.target.classList.contains("exam-btn")) {
        window.open(event.target.getAttribute("data-link"), "_blank");
    }
});



  document.addEventListener('keydown', function(event) {
    if (event.key === 'F12' || (event.ctrlKey && (event.key === 's' || event.key === 'u'))) {
      event.preventDefault();
    }
  });

  document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
  });
});
