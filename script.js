// ===== LOADER =====
window.addEventListener("load", () => {
  setTimeout(
    () => document.getElementById("loader")?.classList.add("hidden"),
    1300,
  );
});

// ===== STICKY NAV SHRINK =====
const nav = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 80);
});

// ===== DAY / NIGHT TOGGLE (Order Up button doubles as theme switch per design guide) =====
const themeToggle = document.getElementById("themeToggle");
themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("sunset-mode");
});

// ===== LANGUAGE TOGGLE (EN / ES / VN / 日本語) =====
const langs = ["EN", "ES", "VN", "日本語"];
let li = 0;
const langLabel = document.getElementById("langLabel");
document.getElementById("langToggle")?.addEventListener("click", () => {
  li = (li + 1) % langs.length;
  langLabel.textContent = langs[li];
});

// ===== MOBILE SHEET =====
const hamburger = document.getElementById("hamburger");
const sheet = document.getElementById("mobileSheet");
hamburger?.addEventListener("click", () => sheet.classList.toggle("open"));
sheet
  ?.querySelectorAll("a")
  .forEach((a) =>
    a.addEventListener("click", () => sheet.classList.remove("open")),
  );

// ===== REDUCED MOTION CHECK =====
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ===== WAVE PARALLAX (ocean drifts slower than scroll) =====
if (!reduce) {
  const layers = document.querySelectorAll("[data-parallax]");
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    layers.forEach((l, i) => {
      const speed = i === 0 ? 0.18 : 0.1; // wave drifts a touch more than sunset
      l.style.transform = `translateY(${y * speed}px) scale(1.08)`;
    });
  });
}

// ===== SCROLL REVEAL (staggered card slice-in) =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("in"), idx * 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ===== RIPPLE BUTTONS (gold pebble-in-water) =====
if (!reduce) {
  document.querySelectorAll(".ripple").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const circle = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      circle.style.width = circle.style.height = size + "px";
      circle.style.left = e.clientX - rect.left - size / 2 + "px";
      circle.style.top = e.clientY - rect.top - size / 2 + "px";
      circle.className = "ripple-circle";
      this.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  });
}
