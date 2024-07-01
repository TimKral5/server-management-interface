
function toggleNav() {
   const el = document.querySelector("body");

   if (el.classList.contains("show-nav"))
      el.classList.remove("show-nav");
   else
      el.classList.add("show-nav");
}