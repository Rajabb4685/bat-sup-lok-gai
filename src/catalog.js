const listEl = document.getElementById("catalogList");
const statusEl = document.getElementById("catalogStatus");
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
const searchBtn = document.getElementById("searchBtn");

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
  const img = b.imageUrl || b.image_url || ""; // supports either naming
  const website = b.website || "";

  return `
    <article class="biz-card">
      ${img ? `<img src="${escapeHtml(img)}" alt="${escapeHtml(b.name)}" style="width:100%;border-radius:10px;aspect-ratio:16/9;object-fit:cover;margin-bottom:10px;">` : ""}

      <h3 class="biz-title">${escapeHtml(b.name)}</h3>
      <p class="biz-meta">
        ${escapeHtml(b.category)}${b.neighborhood ? ` · ${escapeHtml(b.neighborhood)}` : ""}
      </p>

      ${b.description ? `<p>${escapeHtml(b.description)}</p>` : ""}

      ${b.address ? `<p class="biz-meta">${escapeHtml(b.address)}</p>` : ""}

      ${website ? `<p><a href="${escapeHtml(website)}" target="_blank" rel="noreferrer">Website</a></p>` : ""}

      ${tags.length ? `
        <div class="biz-tags">
          ${tags.map(t => `<span class="biz-tag">${escapeHtml(t)}</span>`).join("")}
        </div>
      ` : ""}
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
}

async function fetchBusinesses({ search = "", category = "" } = {}) {
  statusEl.textContent = "Loading...";
  listEl.innerHTML = "";

  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (category) params.set("category", category);

  const url = `/api/businesses${params.toString() ? `?${params.toString()}` : ""}`;

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
