const listEl = document.getElementById("catalogList");
const statusEl = document.getElementById("catalogStatus");
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
const searchBtn = document.getElementById("searchBtn");

// ✅ Set your Render API base URL here
const API_BASE = "https://bat-sup-lok-gai.onrender.com";

// If you want it to use local API when running locally, and Render on GitHub Pages:
const BASE =
  window.location.hostname.endsWith("github.io")
    ? API_BASE
    : ""; // local dev: same-origin (e.g., http://localhost:3000)

function escapeHtml(str = "") {
  return str.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }[c]));
}

function bizCardHTML(b) {
  const tags = Array.isArray(b.tags) ? b.tags : [];
  const img = b.imageUrl || b.image_url || "";
  const website = b.website || "";
  const insta = b.instagram || "";

  const links = [];
  if (website) links.push(`<a href="${escapeHtml(website)}" target="_blank" rel="noreferrer">Website</a>`);
  if (insta) links.push(`<a href="${escapeHtml(insta)}" target="_blank" rel="noreferrer">Instagram</a>`);

  return `
    <article class="biz-card" data-id="${escapeHtml(String(b.id ?? ''))}">
      ${img ? `<img class="biz-img" src="${escapeHtml(img)}" alt="${escapeHtml(b.name)}">` : ""}

      <h3 class="biz-title">${escapeHtml(b.name)}</h3>
      <p class="biz-meta">
        ${escapeHtml(b.category)}${b.neighborhood ? ` · ${escapeHtml(b.neighborhood)}` : ""}
      </p>

      <div class="biz-content">
        ${b.description ? `<p class="biz-desc clamp-3">${escapeHtml(b.description)}</p>` : ""}
        ${b.address ? `<p class="biz-meta clamp-3">${escapeHtml(b.address)}</p>` : ""}
        ${links.length ? `<div class="biz-links">${links.join("")}</div>` : ""}

        ${tags.length ? `
          <div class="biz-tags">
            ${tags.map(t => `<span class="biz-tag">${escapeHtml(t)}</span>`).join("")}
          </div>
        ` : ""}
      </div>

      <div class="biz-actions">
        <button class="biz-more" type="button" aria-expanded="false">More</button>
      </div>
    </article>
  `;
}


function renderBusinesses(businesses) {
  if (!businesses.length) {
    listEl.innerHTML = "";
    statusEl.textContent = "No results found.";
    return;
  }
  statusEl.textContent = `Showing ${businesses.length} businesses`;
  listEl.innerHTML = businesses.map(bizCardHTML).join("");
  requestAnimationFrame(refreshMoreButtons);

}
function isOverflowing(el) {
  if (!el) return false;
  // small +1 buffer avoids false negatives from rounding
  return el.scrollHeight > el.clientHeight + 1;
}

function refreshMoreButtons() {
  const cards = listEl.querySelectorAll(".biz-card");

  cards.forEach((card) => {
    const actions = card.querySelector(".biz-actions");
    const btn = card.querySelector(".biz-more");

    if (!actions || !btn) return;

    // If expanded, always show the button (so user can collapse)
    if (card.classList.contains("expanded")) {
      actions.classList.remove("hidden");
      btn.textContent = "Less";
      btn.setAttribute("aria-expanded", "true");
      return;
    }

    // Check any clamped text blocks for overflow
    const clampEls = card.querySelectorAll(".clamp-3");
    const needsMore = Array.from(clampEls).some(isOverflowing);

    if (needsMore) {
      actions.classList.remove("hidden");
      btn.textContent = "More";
      btn.setAttribute("aria-expanded", "false");
    } else {
      actions.classList.add("hidden");
      btn.textContent = "More";
      btn.setAttribute("aria-expanded", "false");
    }
  });
}


// Expand/collapse cards (event delegation)
listEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".biz-more");
  if (!btn) return;

  const card = btn.closest(".biz-card");
  if (!card) return;

  const expanded = card.classList.toggle("expanded");
  btn.textContent = expanded ? "Less" : "More";
  btn.setAttribute("aria-expanded", expanded ? "true" : "false");
  requestAnimationFrame(refreshMoreButtons);

});


async function fetchBusinesses({ search = "", category = "" } = {}) {
  statusEl.textContent = "Loading...";
  listEl.innerHTML = "";

  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (category) params.set("category", category);

  const url = `${BASE}/api/businesses${params.toString() ? `?${params.toString()}` : ""}`;

  const res = await fetch(url);
  if (!res.ok) {
    statusEl.textContent = `Error loading businesses (${res.status})`;
    return;
  }

  const data = await res.json();
  renderBusinesses(data);
}


function runSearch() {
  fetchBusinesses({
    search: searchInput.value.trim(),
    category: categorySelect.value,
  });
}

searchBtn.addEventListener("click", runSearch);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") runSearch();
});
categorySelect.addEventListener("change", runSearch);

// initial load
fetchBusinesses();

window.addEventListener("resize", () => requestAnimationFrame(refreshMoreButtons));
