const orgId = "new-world-kids";
const userKey = "grant-agent:user-id";
let actorId = localStorage.getItem(userKey);
if (!actorId) {
  actorId = `user-${crypto.randomUUID().slice(0, 8)}`;
  localStorage.setItem(userKey, actorId);
}

document.querySelector("#identity").textContent = `USER ${actorId}`;

const form = document.querySelector("#need-form");
const textarea = document.querySelector("#need");
const conversation = document.querySelector("#conversation");
const button = form.querySelector("button");

function setState(state) {
  document.querySelectorAll(".status-item").forEach((el) => {
    el.classList.toggle("active", el.dataset.state === state);
  });
}

function esc(text) {
  const div = document.createElement("div");
  div.textContent = String(text ?? "");
  return div.innerHTML;
}

function addMessage(kind, label, html) {
  const article = document.createElement("article");
  article.className = `message ${kind}`;
  article.innerHTML = `<p class="speaker">${esc(label)}</p><div class="body">${html}</div>`;
  conversation.appendChild(article);
  article.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" });
}

function renderRun(run) {
  setState(run.state);
  if (run.blocker && !run.result) {
    addMessage("agent", "NEEDS YOU", `<p>${esc(run.blocker)}</p>`);
    return;
  }
  const result = run.result;
  if (!result) {
    addMessage("agent", "GRANT DIRECTOR", "<p>I stopped rather than invent an answer. Check the setup or source data.</p>");
    return;
  }
  const matches = (result.matches || []).slice(0, 8).map((m) => `
    <div class="match">
      <strong>${esc((m.decision || "review").toUpperCase())} · ${esc(m.title || m.id)}</strong>
      <p>${esc(m.reason)}</p>
      ${m.missing_facts?.length ? `<p><b>Needs:</b> ${m.missing_facts.map(esc).join(" · ")}</p>` : ""}
    </div>`).join("");
  addMessage(
    "agent",
    run.state === "ready" ? "READY" : "NEEDS YOU",
    `<p>${esc(result.summary)}</p><div class="details">${matches}<div class="match"><strong>NEXT</strong><p>${esc(result.next_action)}</p></div></div>`,
  );
}

async function refresh() {
  try {
    const res = await fetch(`/api/v1/state?orgId=${encodeURIComponent(orgId)}`, { cache: "no-store" });
    const data = await res.json();
    if (data.run) setState(data.run.state);
  } catch {
    // The initial page remains usable even before the local runtime is ready.
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const need = textarea.value.trim();
  if (need.length < 12) return;
  addMessage("user", "YOU", `<p>${esc(need)}</p>`);
  textarea.value = "";
  button.disabled = true;
  setState("working");
  addMessage("agent", "WORKING", "<p>I’m checking the funding field and separating real fits from distractions.</p>");

  try {
    const res = await fetch("/api/v1/need", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ orgId, actorId, need }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || `request failed (${res.status})`);
    renderRun(data.run);
  } catch (error) {
    setState("needs-you");
    addMessage("agent", "NEEDS YOU", `<p>${esc(error.message || error)}</p>`);
  } finally {
    button.disabled = false;
    textarea.focus();
  }
});

refresh();
