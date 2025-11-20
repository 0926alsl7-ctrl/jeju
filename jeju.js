// 팝업 open

function openPopup(popupId) {
  const bg = document.querySelector(".popup_bg");
  const popup = document.getElementById(popupId);

  bg.style.display = "block";
  popup.style.display = "block";

  document.body.style.overflow = "hidden";
}

// 팝업 close

function closePopup(popupId) {
  const bg = document.querySelector(".popup_bg");
  const popup = document.getElementById(popupId);

  bg.style.display = "none";
  popup.style.display = "none";

  document.body.style.overflow = "";
}

// radio 버튼
const radio1 = document.querySelector("#radio1");
const radio2 = document.querySelector("#radio2");
const radio3 = document.querySelector("#radio3");
const radio4 = document.querySelector("#radio4");
const radio5 = document.querySelector("#radio5");

const radio1Label = document.querySelector('label[for="radio1"]');
const radio2Label = document.querySelector('label[for="radio2"]');
const radio3Label = document.querySelector('label[for="radio3"]');

function handleRadioChangeTab1(id) {
  const ticketingRowDel = document.querySelector("#ticketing_row_del");
  const ticketingRowHeight = document.querySelector("#ticketing_row_heightup");
  const airsearchHidden = document.querySelector("#airsearch_hidden");
  const selectHidden = document.querySelector("#select_hidden");

  if (id === "radio1") {
    ticketingRowDel.style.display = "block";
    ticketingRowDel.style.display = "flex";
    ticketingRowDel.style.alignItems = "center";
    airsearchHidden.style.display = "none";
    selectHidden.style.display = "none";
    ticketingRowHeight.style.marginTop = "26px";
    ticketingRowHeight.style.marginBottom = "0";
  }

  if (id === "radio2") {
    ticketingRowDel.style.display = "none";
    airsearchHidden.style.display = " block";
    selectHidden.style.display = "none";
    ticketingRowHeight.style.marginTop = "42px";
    ticketingRowHeight.style.marginBottom = "14px";
  }

  if (id === "radio3") {
    ticketingRowDel.style.display = "none";
    airsearchHidden.style.display = " block";
    selectHidden.style.display = "block";
    ticketingRowHeight.style.marginTop = "28px";
    ticketingRowHeight.style.marginBottom = "0";
  }
}

function handleRadioChangeTab2(id) {
  const roundBtn = document.querySelector(".change_depart_arrival");

  if (id === "radio4") {
    roundBtn.classList.remove("active");
  }
  if (id === "radio5") {
    roundBtn.classList.add("active");
  }
}

document.querySelector(".close").addEventListener("click", function () {
  document.querySelector(".topbanner").style.display = "none";
  document.querySelector("header").style.height = "110px";
});

//슬라이드
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelector(".slides");
  const slide = document.querySelectorAll(".slide");
  const total = slide.length;

  let index = 0;
  let isPlaying = true;
  let auto;

  function goToSlide(n) {
    index = (n + total) % total;
    slides.style.transform = `translateX(-${index * 100}%)`;
    document.querySelector(".page").innerHTML = `<span>${
      index + 1
    }</span> / <span>${total}</span>`;
  }

  function startAutoPlay() {
    auto = setInterval(() => {
      goToSlide(index + 1);
    }, 9000);
  }
  startAutoPlay();

  document.querySelector("#left").addEventListener("click", () => {
    goToSlide(index - 1);
  });

  document.querySelector("#right").addEventListener("click", () => {
    goToSlide(index + 1);
  });

  const stopbtn = document.querySelector(".stop");

  document.querySelector(".stop").addEventListener("click", function () {
    if (isPlaying) {
      clearInterval(auto);
      stopbtn.classList.add("active");
    } else {
      startAutoPlay();
      stopbtn.classList.remove("active");
    }
    isPlaying = !isPlaying;
  });
  goToSlide(0);
});

//클릭하면 색깔 변함 + 밑줄효과
const clickcolors = document.querySelectorAll(".clickcolor");

clickcolors.forEach((clickcolor) => {
  clickcolor.addEventListener("click", () => {
    clickcolors.forEach((item) => item.classList.remove("active"));
    clickcolor.classList.add("active");
  });
});

// 항공권예매 예약 조회 운항조회 버튼 누르면 > 탭
const reserves = document.querySelectorAll(".reserve");
const tabs = document.querySelectorAll(".tab");

reserves.forEach((reserve) => {
  reserve.addEventListener("click", () => {
    reserves.forEach((item) => item.classList.remove("active"));
    reserve.classList.add("active");

    const target = reserve.dataset.tab;
    tabs.forEach((tab) => tab.classList.remove("show"));
    document.getElementById(target).classList.add("show");
  });
});

//예약 날짜 + 1주일 후
window.addEventListener("DOMContentLoaded", () => {
  const departdate = document.querySelectorAll(".departdate_txt");

  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const week = ["일", "월", "화", "수", "목", "금", "토"];

  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    const w = week[date.getDay()];
    return `${y}.${m}.${d}(${w})`;
  };

  const dateText = `${formatDate(today)} ~ ${formatDate(nextWeek)}`;

  departdate.forEach((el) => {
    el.textContent = dateText;
  });
});

//출발 버튼 , 도착 버튼 >> 밑줄 (왼>오) active
//출발 버튼 내용 바뀌지 x -> 도착 버튼 누를시 팝업창 오픈
document.addEventListener("DOMContentLoaded", () => {
  const departBtns = document.querySelectorAll(".depart");
  const arrivalBtns = document.querySelectorAll(".arrival");

  departBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      departBtns.forEach((el) => el.classList.add("active"));
      arrivalBtns.forEach((el) => el.classList.remove("active"));
    });
  });

  arrivalBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const departText = departBtns[0].textContent.trim();

      if (departText === "출발지") {
        openPopup("popup2");
        return;
      }

      departBtns.forEach((el) => el.classList.remove("active"));
      arrivalBtns.forEach((el) => el.classList.add("active"));
    });
  });
});

//탭1 라디오버튼
// 각각 클릭시 active 효과 + 라디오123 > 아래 탭 변화 + 3번(기프티켓) 클릭시 팝업/초기화면
document.addEventListener("DOMContentLoaded", () => {
  function setActiveRadioVisual(radioInput) {
    const groupName = radioInput.name;
    const group = document.querySelector(
      `.radio-group[date-group="${groupName}"]`
    );

    const radios = group.querySelectorAll(".radio");
    radios.forEach((r) => r.classList.remove("active"));

    const selectedLabel = document.querySelector(
      `label[for="${input.id}"].radio`
    );
    if (selectedLabel) selectedLabel.classList.add("active");
  }

  const radiosTab1 = document.querySelectorAll(
    'input[type="radio"][name="point"]'
  );

  radiosTab1.forEach((radio) => {
    radio.addEventListener("change", () => {
      setActiveRadioVisual(radio);

      if (radio.id === "radio3") {
        handleRadioChangeTab1("radio3");
        openPopup("popup3");
        return;
      }

      if (typeof handleRadioChangeTab1 === "function") {
        handleRadioChangeTab1(radio.id);
      }
    });
  });

  document.querySelectorAll(".closepopup3").forEach((btn) => {
    btn.addEventListener("click", () => {
      closePopup("popup3");

      const radio1 = document.getElementById("radio1");
      radio1.checked = true;

      radio1.dispatchEvent(new Event("change"));
      setActiveRadioVisual("radio1");
    });
  });

  const radiosTab2 = document.querySelectorAll(
    'input[type="radio"][name="point2"]'
  );

  radiosTab2.forEach((radio) => {
    radio.addEventListener("change", () => {
      setActiveRadioVisual(radio);

      if (typeof handleRadioChangeTab2 === "function") {
        handleRadioChangeTab2(radio.id);
      }

      // if (radio.id === "radio5") {
      //   changeButtonsToOneWay();
      // }

      // if (radio.id === "radio4") {
      //   restoreButtonsToRoundtrip();
      // }
    });
  });
});

const reservenums = document.querySelectorAll(".reservenum li");

reservenums.forEach((reservenum) => {
  reservenum.addEventListener("click", () => {
    reservenums.forEach((li) => li.classList.remove("active"));

    reservenum.classList.add("active");
  });
});
