/// <reference path="./jquery.d.ts" />

// (1) 팝업 OPEN / CLOSE

function openPopup(popupId) {
  const bg = document.querySelector(".popup_bg");
  const popup = document.getElementById(popupId);

  bg.style.display = "block";
  popup.style.display = "block";
  document.body.style.overflow = "hidden";
}

function closePopup(popupId) {
  const bg = document.querySelector(".popup_bg");
  const popup = document.getElementById(popupId);

  bg.style.display = "none";
  popup.style.display = "none";
  document.body.style.overflow = "";
}

// (2) Radio 클릭시 내용 change

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
  if (id === "radio4") {
    $(".change_depart_arrival").removeClass("round-active");
  }
  if (id === "radio5") {
    $(".change_depart_arrival").addClass("round-active");
  }
}

// group 밖 클릭 시 active 초기화
function removeActiveOutside(GroupSelector) {
  document.addEventListener("click", (e) => {
    if (!e.target.closest(GroupSelector)) {
      document
        .querySelectorAll(`${GroupSelector} .active`)
        .forEach((el) => el.classList.remove("active"));
    }
  });
}

// (3) 탑배너 close
document.querySelector(".close").addEventListener("click", function () {
  document.querySelector(".topbanner").style.display = "none";
  document.querySelector("header").style.height = "110px";
});

// (4) 슬라이드
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

// (5) clickcolors (tab1 / tab3 클릭시 내부 독립 작동)
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", (e) => {
    if (e.target.matches(".clickcolor")) {
      tab.querySelectorAll(".clickcolor").forEach((btn) => {
        btn.classList.remove("active");
      });
      e.target.classList.add("active");
    }
  });
});

// (6) 탭 변경(항공권 예매 / 예약 조회 / 운항 조회)
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

// (7) 예약 날짜 + 1주일 후
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
  // const dateText2 = `${formatDate(today)}`;

  departdate.forEach((el) => {
    el.textContent = dateText;
  });

  // $("#date_change").click(() => {
  //   departdate.forEach((el) => {
  //     el.textContent = dateText2;
});

// (8) 출발/도착 버튼 > 밑줄 active
//출발 버튼 내용 바뀌지 x -> 도착 버튼 누를시 팝업창 오픈
document.addEventListener("DOMContentLoaded", () => {
  const departBtns = document.querySelectorAll(".depart");
  const arrivalBtns = document.querySelectorAll(".arrival");

  departBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      departBtns.forEach((el) => el.classList.add("active"));
      arrivalBtns.forEach((el) => el.classList.remove("active"));
      e.stopPropagation();
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
      e.stopPropagation();
    });
  });
});

removeActiveOutside(".ticketing_left");

// (9) 탭1 라디오 (radio1, radio2, radio3)
const tab1 = document.getElementById("tab1");
const radiosTab1 = tab1.querySelectorAll('input[name="point"]');

radiosTab1.forEach((radio) => {
  radio.addEventListener("change", () => {
    tab1
      .querySelectorAll(".radio")
      .forEach((r) => r.classList.remove("active"));
    const label = tab1.querySelector(`label[for="${radio.id}"] .radio`);
    if (label) label.classList.add("active");

    if (radio.id === "radio3") {
      handleRadioChangeTab1("radio3");
      openPopup("popup3");
      return;
    }
    handleRadioChangeTab1(radio.id);
  });
});

document.querySelectorAll(".closepopup3").forEach((btn) => {
  btn.addEventListener("click", () => {
    closePopup("popup3");

    const radio1 = document.getElementById("radio1");
    radio1.checked = true;
    radio1.dispatchEvent(new Event("change"));
  });
});

// (10) 탭3 라디오 (radio4, radio5)
const tab3 = document.getElementById("tab3");
const radiosTab3 = tab3.querySelectorAll('input[name="point2"]');

radiosTab3.forEach((radio) => {
  radio.addEventListener("change", () => {
    tab3
      .querySelectorAll(".radio")
      .forEach((r) => r.classList.remove("active"));
    const label = tab3.querySelector(`label[for="${radio.id}"] .radio`);
    if (label) label.classList.add("active");

    handleRadioChangeTab2(radio.id);
  });
});

// (11) 탭2 예약번호 active
const reservenums = document.querySelectorAll(".reservenum li");

reservenums.forEach((reservenum) => {
  reservenum.addEventListener("click", (e) => {
    e.stopPropagation();
    reservenums.forEach((li) => li.classList.remove("active"));
    reservenum.classList.add("active");
  });
});

removeActiveOutside(".reservenum");

$(".departdate").click(() => {
  openPopup("popup4");
});
$("#departnum").click(() => {
  openPopup("popup5");
});

// (12) swiper
const swipes = document.querySelector(".swipes");
const prev = document.querySelector(".slide-prev");
const next = document.querySelector(".slide-next");
const pages = document.querySelectorAll(".page li");

const itemWidth = 320 + 12;
const visibleCount = 3;

let currentIndex = 0;
let currentPage = 0;

function updatePage() {
  pages.forEach((p) => p.classList.remove("active"));
  pages[currentPage].classList.add("active");
}

next.addEventListener("click", () => {
  const maxIndex = swipes.children.length - visibleCount;
  if (currentIndex >= maxIndex) {
    currentIndex = 0;
    currentPage = 0;
  } else {
    currentIndex += visibleCount;
    currentPage = (currentPage + 1) % pages.length;
  }
  swipes.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
  updatePage();
});

prev.addEventListener("click", () => {
  const maxIndex = swipes.children.length - visibleCount;
  if (currentIndex <= 0) {
    currentIndex = maxIndex;
    currentPage = pages.length - 1;
  } else {
    currentIndex -= visibleCount;
    currentPage = (currentPage - 1 + pages.length) % pages.length;
  }
  swipes.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
  updatePage();
});

updatePage();

const article2SubTitles = document.querySelectorAll(".sub_title");
const article2Tabs = document.querySelectorAll(".tab2");

article2SubTitles.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target2 = btn.dataset.tab2;

    article2SubTitles.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    article2Tabs.forEach((tab) => tab.classList.remove("show"));
    document.getElementById(target2).classList.add("show");
  });
});
