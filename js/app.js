// Entry point. Wires the route table, mounts the router into the phone
// viewport, and picks the initial route from the URL hash.
import { ROUTES } from "./screens.js";
import { mountRouter, registerRoutes, go, back, reset } from "./router.js";
import { iconMarkup } from "./icons.js";

function buildPhoneChrome() {
  const stage = document.getElementById("stage");
  const phone = document.createElement("div");
  phone.className = "phone";
  phone.setAttribute("data-theme", "light");

  const statusbar = document.createElement("div");
  statusbar.className = "phone__statusbar";
  statusbar.innerHTML = `
    <div class="phone__statusbar-left">9:41</div>
    <div class="phone__statusbar-right" aria-hidden="true">
      ${iconMarkup("signal", { size: 16 })}
      ${iconMarkup("wifi", { size: 16 })}
      ${iconMarkup("battery", { size: 22 })}
    </div>
  `;

  const viewport = document.createElement("main");
  viewport.className = "phone__viewport";
  viewport.setAttribute("role", "main");

  const home = document.createElement("div");
  home.className = "phone__home";

  phone.appendChild(statusbar);
  phone.appendChild(viewport);
  phone.appendChild(home);
  stage.appendChild(phone);

  return { phone, viewport };
}

function init() {
  const { viewport } = buildPhoneChrome();
  registerRoutes(ROUTES);
  mountRouter(viewport);

  const hash = (location.hash || "").replace(/^#/, "");
  const initial = ROUTES[hash] ? hash : "login-phone";
  go(initial);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
