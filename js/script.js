// Selecting the sidebar and buttons
const sidebar = document.querySelector(".sidebar");
const sidebarOpenBtn = document.querySelector("#sidebar-open");
const sidebarCloseBtn = document.querySelector("#sidebar-close");
const sidebarLockBtn = document.querySelector("#lock-icon");
const searchbox = document.querySelector(".search_box");
const innter_content = document.querySelector(".inner-content");
const float_card = document.querySelector("#float-card");
const float_menu_chKbox = document.querySelector("#checked");

// Function to toggle the lock state of the sidebar
const toggleLock = () => {
  sidebar.classList.toggle("locked");
  // If the sidebar is not locked
  if (!sidebar.classList.contains("locked")) {
    sidebar.classList.add("hoverable");
    searchbox.classList.replace("search_box", "search_close");
    innter_content.classList.replace("inner-content", "inner-content-close");
    sidebarLockBtn.classList.replace("bx-x", "bx-right-arrow-alt");
    document.querySelector("#add").innerHTML =
      "<i class='bx bx-plus-circle'></i>";
  } else {
    sidebar.classList.remove("hoverable");
    sidebarLockBtn.classList.replace("bx-right-arrow-alt", "bx-x");
    searchbox.classList.replace("search_close", "search_box");
    innter_content.classList.replace("inner-content-close", "inner-content");
    document.querySelector("#add").innerHTML =
      "<i class='bx bx-plus-circle'></i> Add New";
  }
};

// Function to hide the sidebar when the mouse leaves
const hideSidebar = () => {
  if (sidebar.classList.contains("hoverable")) {
    sidebar.classList.add("close");
  }
};

// Function to show the sidebar when the mouse enter
const showSidebar = () => {
  if (sidebar.classList.contains("hoverable")) {
    sidebar.classList.remove("close");
  }
};

// Function to show and hide the sidebar
const toggleSidebar = () => {
  sidebar.classList.toggle("close");
};

// If the window width is less than 800px, close the sidebar and remove hoverability and lock
if (window.innerWidth < 800) {
  sidebar.classList.add("close");
  sidebar.classList.remove("locked");
  sidebar.classList.remove("hoverable");
}

// Adding event listeners to buttons and sidebar for the corresponding actions
sidebarLockBtn.addEventListener("click", toggleLock);
sidebar.addEventListener("mouseleave", hideSidebar);
sidebar.addEventListener("mouseenter", showSidebar);
sidebarOpenBtn.addEventListener("click", toggleSidebar);
sidebarCloseBtn.addEventListener("click", toggleSidebar);

const toggleFloatMenu = () => {
  if (float_menu_chKbox.checked) {
    float_card.classList.replace("float", "float-open"); // Show the menu
  } else {
    float_card.classList.replace("float-open", "float"); // Hide the menu
  }
};2

// Add event listener to the checkbox
float_menu_chKbox.addEventListener("change", toggleFloatMenu);
