document.addEventListener("DOMContentLoaded", () => {
  const tarifItems = document.querySelectorAll(".main__tarif-item");

  tarifItems.forEach(item => {
    item.addEventListener("click", () => {
      if (item.classList.contains("active")) return;

      tarifItems.forEach(tarif => tarif.classList.remove("active"));

      item.classList.add("active");
    });
  });
});
