/// <reference path="./jquery.d.ts" />

// (0) 팝업 OPEN / CLOSE 함수 - openPopup / closePopup
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

// (0) Group 밖 클릭시 active 초기화 - removeActiveOutside
function removeActiveOutside(GroupSelector) {
  document.addEventListener("click", (e) => {
    if (!e.target.closest(GroupSelector)) {
      document
        .querySelectorAll(`${GroupSelector} .active`)
        .forEach((el) => el.classList.remove("active"));
    }
  });
}

// (0) Tab1 - 라디오 클릭시 동작
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

// (0) Tab3 - 라디오 클릭시 동작
function handleRadioChangeTab3(id) {
  const departdate = document.querySelectorAll(".departdate_txt");
  const today = new Date();

  if (id === "radio4") {
    $(".change_depart_arrival").removeClass("round-active");
    updateDefaultDate();
  }
  if (id === "radio5") {
    $(".change_depart_arrival").addClass("round-active");
    departdate.forEach((el) => (el.textContent = `${formatDate(today)}`));
  }
}

// (0) Tab3 - 라디오 이름 변화
function resetTab3RadioNames() {
  document.querySelector('label[for="radio4"] .label-text').textContent =
    "왕복";
  document.querySelector('label[for="radio5"] .label-text').textContent =
    "편도";
}
function changeTab3RadioNames() {
  document.querySelector('label[for="radio4"] .label-text').textContent =
    "구간 조회";
  document.querySelector('label[for="radio5"] .label-text').textContent =
    "편명 조회";
}

// (0) Tab1 Clickcolor 기능 - handleTab1ClickColor
function handleTab1ClickColor(type) {
  if (type === "왕복") {
    document.getElementById("radio1").checked = "true";
    document.getElementById("radio1").dispatchEvent(new Event("change"));
  }
  if (type === "편도") {
    document.getElementById("radio2").checked = "true";
    document.getElementById("radio2").dispatchEvent(new Event("change"));
  }
  if (type === "다구간") {
    document.getElementById("radio3").checked = "true";
    document.getElementById("radio3").dispatchEvent(new Event("change"));
  }
}

// (0) Tab3 Clickcolor 기능 - handleTab3ClickColor
function handleTab3ClickColor(type) {
  const departdate = document.querySelectorAll(".departdate_txt");
  const today = new Date();

  if (type === "운항 스케줄") {
    $(".change_depart_arrival").removeClass("round-active");
    updateDefaultDate();
    resetTab3RadioNames();
  }

  if (type === "출도착 현황") {
    $(".change_depart_arrival").addClass("round-active");
    departdate.forEach((el) => (el.textContent = `${formatDate(today)}`));
    changeTab3RadioNames();
  }
}

// (0) 멀티(다구간) 표시
function showMulti() {
  const m = document.querySelector(".multi-section");
  if (m) m.style.display = "grid";
}

function hideMulti() {
  const m = document.querySelector(".multi-section");
  if (m) m.style.display = "none";
}

// (1) 탑배너 close / 아래배너 close
document.querySelector(".close").addEventListener("click", function () {
  document.querySelector(".topbanner").style.display = "none";
  document.querySelector("header").style.height = "110px";
});

document.querySelector(".permitpopup1").addEventListener("click", function () {
  document.querySelector("#popup1").style.display = "none";
});

document.querySelector(".closepopup1").addEventListener("click", function () {
  document.querySelector("#popup1").style.display = "none";
});

// (2) 메인 슬라이드
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
    }, 8000);
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

// (3) clickcolors (tab1 / tab3 각각 독립 작동)
document.querySelector("#tab1 .clickcolors")?.addEventListener("click", (e) => {
  if (!e.target.classList.contains("clickcolor")) return;

  e.currentTarget
    .querySelectorAll(".clickcolor")
    .forEach((btn) => btn.classList.remove("active"));

  e.target.classList.add("active");
  handleTab1ClickColor(e.target.textContent.trim());
});

document.querySelector("#tab3 .clickcolors")?.addEventListener("click", (e) => {
  if (!e.target.classList.contains("clickcolor")) return;

  e.currentTarget
    .querySelectorAll(".clickcolor")
    .forEach((btn) => btn.classList.remove("active"));

  e.target.classList.add("active");

  const type = e.target.textContent.trim();
  handleTab3ClickColor(type);
});

// (6) 탭 변경 - 항공권 예매/ 예약조회 / 운항조회
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
function formatDate(date) {
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const w = week[date.getDay()];
  return `${y}.${m}.${d}(${w})`;
}

// 기본 날짜 세팅
window.addEventListener("DOMContentLoaded", () => {
  updateDefaultDate();
});

function updateDefaultDate() {
  const departdate = document.querySelectorAll(".departdate_txt");
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  departdate.forEach((el) => {
    el.textContent = `${formatDate(today)} ~ ${formatDate(nextWeek)}`;
  });
}

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
// (9) 탭1 라디오
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
      handleRadioChangeTab1("다구간");
      openPopup("popup3");
      return;
    }

    handleRadioChangeTab1(radio.id);
  });
});

// 팝업 닫을 때 초기화
document.querySelectorAll(".closepopup3").forEach((btn) => {
  btn.addEventListener("click", () => {
    closePopup("popup3");

    const radio1 = document.getElementById("radio1");
    radio1.checked = true;
    radio1.dispatchEvent(new Event("change"));
  });
});

// (10) 탭3 라디오
const tab3 = document.getElementById("tab3");
const radiosTab3 = tab3.querySelectorAll('input[name="point2"]');

radiosTab3.forEach((radio) => {
  radio.addEventListener("change", () => {
    tab3
      .querySelectorAll(".radio")
      .forEach((r) => r.classList.remove("active"));
    const label = tab3.querySelector(`label[for="${radio.id}"] .radio`);
    if (label) label.classList.add("active");

    const isShedule =
      document.querySelector("#tab3 .clickcolor.active").textContent.trim() ===
      "운항 스케줄";

    if (isShedule) {
      handleRadioChangeTab3(radio.id);
    }
  });
});

// (10-1) 탭3 라디오 클릭 아래 탭 전환
const tab3Radios = document.querySelectorAll("#tab3 input[type='radio']");
const tab3Screens = document.querySelectorAll("#tab3 .tab3-screen");

tab3Radios.forEach((radio) => {
  radio.addEventListener("change", () => {
    const isShedule =
      document.querySelector("#tab3 .clickcolor.active").textContent.trim() ===
      "출도착 현황";

    if (isShedule) {
      const target = radio.dataset.target;

      tab3Screens.forEach((screen) => {
        screen.classList.toggle(
          "active",
          screen.id === target.replace("#", "")
        );
      });
    }
  });
});

document.getElementById("departdate_txt-tab3-screen").textContent = formatDate(
  new Date()
);

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

// (12) 탭1 왕복/편도/다구간
function handleTab1ClickColor(type) {
  const departdate = document.querySelectorAll(".departdate_txt");
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);
  const departNum = document.querySelector("#departnum");

  if (type === "왕복") {
    departNum.style.display = "block";
    $(".change_depart_arrival").removeClass("round-active");
    departdate.forEach(
      (el) =>
        (el.textContent = `${formatDate(today)} ~ ${formatDate(nextWeek)}`)
    );
    hideMulti();
  }

  if (type === "편도") {
    departNum.style.display = "block";
    $(".change_depart_arrival").addClass("round-active");
    departdate.forEach((el) => (el.textContent = `${formatDate(today)}`));
    hideMulti();
  }

  if (type === "다구간") {
    departNum.style.display = "none";
    $(".change_depart_arrival").addClass("round-active");
    showMulti();
    departdate.forEach((el) => (el.textContent = `${formatDate(today)}`));
  }
}

// (12) article1 - swipe(next,prev 버튼/page 버튼)
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

// (13) article2 - tab (여행 전/기내에서/여행 동반)
const article2SubTitles = document.querySelectorAll(".sub_title");
const article2Tabs = document.querySelectorAll(".tab22");

article2SubTitles.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target2 = btn.dataset.tab2;

    article2SubTitles.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    article2Tabs.forEach((tab) => tab.classList.remove("show"));
    document.getElementById(target2).classList.add("show");
  });
});

// (14) article3 - swipe(next,prev 버튼/page 버튼)
const swipes3 = document.querySelector(".swipes3");
const prev3 = document.querySelector(".slide-prev3");
const next3 = document.querySelector(".slide-next3");
const pages3 = document.querySelectorAll(".page3 li");

const itemWidth3 = 490 + 20;
const visibleCount3 = 2;

let currentIndex3 = 0;
let currentPage3 = 0;

function updatePage3() {
  pages3.forEach((p) => p.classList.remove("active"));
  pages3[currentPage3].classList.add("active");

  if (currentPage3 === 0) {
    next3.classList.add("active");
    prev3.classList.remove("active");
  } else if (currentPage3 === 1) {
    next3.classList.remove("active");
    prev3.classList.add("active");
  }
}

next3.addEventListener("click", () => {
  const maxIndex3 = swipes3.children.length - visibleCount3;
  if (currentIndex3 < maxIndex3) {
    currentIndex3 += 2;
    currentPage3 = Math.min(currentPage3 + 1, pages3.length - 1);
  }
  swipes3.style.transform = `translateX(${-currentIndex3 * itemWidth3}px)`;
  updatePage3();
});

prev3.addEventListener("click", () => {
  if (currentIndex3 > 0) {
    currentIndex3 -= 2;
    currentPage3 = Math.max(currentPage3 - 1, 0);
  }
  swipes3.style.transform = `translateX(${-currentIndex3 * itemWidth3}px)`;
  updatePage3();
});

updatePage3();

// (15) article4 - swipe(자동 슬라이드/next,prev 버튼)
const swipes4 = document.querySelector(".swipes4");
const prev4 = document.querySelector(".slide-prev4");
const next4 = document.querySelector(".slide-next4");

const itemWidth4 = 240 + 16;

const items4 = [...swipes4.children];
const originalCount4 = items4.length;

for (let i = 0; i < 3; i++) {
  items4.forEach((item) => swipes4.appendChild(item.cloneNode(true)));
  items4.forEach((item) => swipes4.prepend(item.cloneNode(true)));
}

let currentIndex4 = originalCount4 * 3;
swipes4.style.transform = `translateX(${-currentIndex4 * itemWidth4}px)`;

function goToSlide4(index) {
  swipes4.style.transition = "transform 0.5s ease";
  currentIndex4 = index;
  swipes4.style.transform = `translateX(${-currentIndex4 * itemWidth4}px)`;
}

swipes4.addEventListener("transitionend", () => {
  if (currentIndex4 >= originalCount4 * 4) {
    swipes4.style.transition = "none";
    currentIndex4 = originalCount4 * 3;
    swipes4.style.transform = `translateX(${-currentIndex4 * itemWidth4}px)`;
  }

  if (currentIndex4 < originalCount4 * 2) {
    swipes4.style.transition = "none";
    currentIndex4 = originalCount4 * 3 - 1;
    swipes4.style.transform = `translateX(${-currentIndex4 * itemWidth4}px)`;
  }
});

next4.addEventListener("click", () => {
  goToSlide4(currentIndex4 + 1);
});

prev4.addEventListener("click", () => {
  goToSlide4(currentIndex4 - 1);
});

setInterval(() => {
  goToSlide4(currentIndex4 + 1);
}, 5000);

// 팝업

// window.addEventListener("load", () => {
//   openPopup("popup8");
// });

$(".departdate").click(() => {
  openPopup("popup4");
});
$("#departnum").click(() => {
  openPopup("popup5");
});
$("#reservesearch").click(() => {
  openPopup("popup6");
});
$("#reserve2").click(() => {
  openPopup("popup7");
});

// 팝업 - calendar
function renderCalendar(year, month, monthId, daysId) {
  const monthNames = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];
  const monthDiv = document.getElementById(monthId);
  const daysUl = document.getElementById(daysId);

  monthDiv.innerText = `${year}. ${monthNames[month]}`;
  daysUl.innerHTML = "";

  let firstDay = new Date(year, month, 1).getDay();
  let lastDate = new Date(year, month + 1, 0).getDate();

  const today = new Date();

  for (let i = 0; i < firstDay; i++) {
    let li = document.createElement("li");
    daysUl.appendChild(li);
  }

  for (let d = 1; d <= lastDate; d++) {
    let li = document.createElement("li");
    let span = document.createElement("span");
    span.textContent = d;
    li.appendChild(span);

    let dateObj = new Date(year, month, d);
    let dayIndex = dateObj.getDay();

    if (dayIndex === 0) li.classList.add("sunday");

    if (
      year === today.getFullYear() &&
      month === today.getMonth() &&
      d === today.getDate()
    ) {
      li.classList.add("today");
    }

    if (dateObj < today.setHours(0, 0, 0, 0)) {
      li.classList.add("disabled");
    } else {
      li.addEventListener("click", () => {
        document
          .querySelectorAll(".days li")
          .forEach((el) => el.classList.remove("active"));

        li.classList.add("active");
      });
    }
    daysUl.appendChild(li);
  }
}

function renderTwoMonths() {
  const now = new Date();

  renderCalendar(now.getFullYear(), now.getMonth(), "month-11", "days-11");

  renderCalendar(now.getFullYear(), now.getMonth() + 1, "month-12", "days-12");
}

function resetCalendar() {
  document
    .querySelectorAll(".days li")
    .forEach((li) => li.classList.remove("active"));
}

renderTwoMonths();

// 스크롤 이벤트 - nav 변화
window.addEventListener("scroll", function () {
  const topmenu = document.querySelector(".topmenu");
  const nav = document.querySelector("nav");
  const navInner = document.querySelector(".nav_inner");
  const cookie = document.querySelector("#popup1");
  const mainHeader = document.querySelector(".m-header");
  const mainHeaderLogo = document.querySelector(".m-header-logo");
  const mainMenuOpen = document.querySelector(".m-gnb-open");
  const quickMenu = document.querySelector(".quick-menu");

  if (window.scrollY > 50) {
    topmenu.style.height = "0";
    topmenu.style.overflow = "hidden";
    nav.style.height = "110px";
    nav.style.borderBottom = "1px solid #ddd";
    navInner.style.height = "110px";
    cookie.style.display = "none";
    mainHeader.classList.add("sticky");
    mainHeaderLogo.classList.add("sticky");
    mainMenuOpen.classList.add("sticky");
    quickMenu.classList.remove("hide");
  } else {
    topmenu.style.height = "34px";
    nav.style.height = "76px";
    nav.style.borderBottom = "0";
    navInner.style.height = "76px";
    cookie.style.display = "none";
    mainHeader.classList.remove("sticky");
    mainHeaderLogo.classList.remove("sticky");
    mainMenuOpen.classList.remove("sticky");
    quickMenu.classList.add("hide");
  }

  if (window.scrollY > 890) {
    nav.classList.add("search-mode");
  } else {
    nav.classList.remove("search-mode");
  }
});

//모바일
//(1) 메뉴창 close / open

const gnb = document.querySelector(".mo-gnb");
document.querySelector(".m-gnb-open").addEventListener("click", () => {
  gnb.classList.add("active");
});

document.querySelectorAll(".m-close").forEach((btn) => {
  btn.addEventListener("click", () => {
    gnb.classList.remove("active");
  });
});

//(2) mo-login 도달하면 상단 고정 헤더 등장

const moLogin = document.querySelector(".mo-login");
const moLoginSticky = document.querySelector(".sticky");

let isSticky = false;

gnb.addEventListener("scroll", () => {
  const triggerPoint = moLogin.getBoundingClientRect().top;

  if (triggerPoint <= 0 && !isSticky) {
    isSticky = true;
    moLoginSticky.classList.add("is-sticky");
  }

  if (triggerPoint > 0 && isSticky) {
    isSticky = false;
    moLoginSticky.classList.remove("is-sticky");
  }
});

//(3) menu-list button on 활성화 영역 안에서 활성화 클릭시 > 각 서브메뉴 이동

const container = document.querySelector(".mo-gnb");
const submenuWrap = document.querySelector(".m-submenu-wrap");
const menuButtons = Array.from(
  document.querySelectorAll(".m-menu-list button")
);
const submenuGroups = Array.from(
  document.querySelectorAll(".m-submenu-box-group")
);

let groupOffsets = [];
let menuIndexRanges = [];
let isScrollingByClick = false;
let rafId = null;

function calcBaseOffset() {
  const containerRect = container.getBoundingClientRect();
  const wrapRect = submenuWrap.getBoundingClientRect();
  return wrapRect.top - containerRect.top + container.scrollTop;
}

function computeGroupOffsets() {
  const base = calcBaseOffset();
  const offsets = [];
  let acc = base;

  submenuGroups.forEach((group, i) => {
    offsets.push(Math.round(acc));
    const style = getComputedStyle(group);
    const marginTop = parseFloat(style.marginTop) || 0;
    acc += group.offsetHeight + marginTop;
  });

  groupOffsets = offsets;
}

function computeMenuIndexRanges() {
  menuIndexRanges = [];
  let acc = 0;
  menuButtons.forEach((btn) => {
    const cnt = Number(btn.dataset.count) || 1;
    menuIndexRanges.push({ start: acc, end: acc + cnt - 1 });
    acc += cnt;
  });
}

function recalcAll() {
  computeGroupOffsets();
  computeMenuIndexRanges();
}
recalcAll();

menuButtons.forEach((btn, menuIdx) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    menuButtons.forEach((b) => b.classList.remove("on"));
    btn.classList.add("on");

    const range = menuIndexRanges[menuIdx];
    const targetGroupIndex = range ? range.start : 0;
    const targetY = groupOffsets[targetGroupIndex] || 0;

    isScrollingByClick = true;
    container.scrollTo({ top: targetY, behavior: "smooth" });
    setTimeout(() => {
      isScrollingByClick = false;
    }, 600);
  });
});

function handleScroll() {
  if (isScrollingByClick) return;

  const scrollY = container.scrollTop;
  let currentGroup = 0;

  const nearBottom =
    container.scrollHeight - (container.clientHeight + scrollY) <= 5;
  if (nearBottom) {
    currentGroup = groupOffsets.length - 1;
  } else {
    for (let i = 0; i < groupOffsets.length; i++) {
      const start = groupOffsets[i];
      const end =
        groupOffsets[i + 1] !== undefined ? groupOffsets[i + 1] : Infinity;
      const threshold = 8;
      if (scrollY + threshold >= start && scrollY + threshold < end) {
        currentGroup = i;
        break;
      }
    }
  }

  let activeMenuIdx = 0;
  for (let m = 0; m < menuIndexRanges.length; m++) {
    const { start, end } = menuIndexRanges[m];
    if (currentGroup >= start && currentGroup <= end) {
      activeMenuIdx = m;
      break;
    }
  }

  menuButtons.forEach((b, i) => {
    if (i === activeMenuIdx) b.classList.add("on");
    else b.classList.remove("on");
  });
}

function onContainerScroll() {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(handleScroll);
}

container.addEventListener("scroll", onContainerScroll);

// (3) resize 또는 DOM 변동 시 재계산
window.addEventListener("resize", () => {
  recalcAll();
  handleScroll();
});

// (4) 모바일 quick-menu
const quickItems = document.querySelectorAll(".quick-menu-item");

quickItems[0].classList.add("on");

quickItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();

    quickItems.forEach((i) => i.classList.remove("on"));

    item.classList.add("on");
  });
});

// (5) 모바일 footer
const footerItems = document.querySelectorAll(
  ".m-footer-content > li, .m-footer-content-bottom > li"
);

footerItems.forEach((item) => {
  const title = item.querySelector(".m-footer-content-title");
  const sub = item.querySelector(".m-footer-content-sub");

  title.addEventListener("click", () => {
    const isOpen = sub.classList.contains("is-open");

    if (isOpen) {
      sub.classList.remove("is-open");
      title.classList.remove("is-open");
      return;
    }

    sub.classList.add("is-open");
    title.classList.add("is-open");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const swiper = document.querySelector(".m-section-list-swiper");
  const drag = document.querySelector(".m-section_page_drag");
  const dragBg = document.querySelector(".m-section_page");

  function updateDrag() {
    const maxScroll = swiper.scrollWidth - swiper.clientWidth;
    const scrollLeft = swiper.scrollLeft;

    const ratio = scrollLeft / maxScroll;

    const bgWidth = dragBg.clientWidth;
    const scrollbarWidth = bgWidth * (swiper.clientWidth / swiper.scrollWidth);

    drag.style.width = scrollbarWidth + "px";
    drag.style.transform = `translateX(${
      ratio * (bgWidth - scrollbarWidth)
    }px)`;
  }

  updateDrag();
  swiper.addEventListener("scroll", updateDrag);
  window.addEventListener("resize", updateDrag);
});
