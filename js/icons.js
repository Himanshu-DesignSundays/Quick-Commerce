// Icon map. Each entry returns a string of SVG markup.
// Use icon('name', { size: 24 }) or iconEl('name') for a DOM element.

const PATHS = {
  "arrow-left":
    '<path d="M15 6L9 12l6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
  "chevron-left":
    '<path d="M14 6l-6 6 6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
  check:
    '<path d="M5 13l4 4 10-10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
  info: '<rect x="3" y="3" width="18" height="18" rx="4" fill="currentColor" opacity="0.12"/><path d="M12 11v6M12 7.5v.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  wifi: '<path d="M2 8.5a15 15 0 0120 0M5 12a10 10 0 0114 0M8 15.5a5 5 0 018 0M12 19.5h.01" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" fill="none"/>',
  signal:
    '<rect x="2" y="14" width="3" height="6" rx="0.5" fill="currentColor"/><rect x="7" y="10" width="3" height="10" rx="0.5" fill="currentColor"/><rect x="12" y="6" width="3" height="14" rx="0.5" fill="currentColor"/><rect x="17" y="2" width="3" height="18" rx="0.5" fill="currentColor"/>',
  battery:
    '<rect x="2" y="7" width="18" height="10" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><rect x="21" y="10" width="1.5" height="4" rx="0.5" fill="currentColor"/><rect x="3.5" y="8.5" width="12" height="7" rx="1.5" fill="currentColor"/>',
  "upload-illus": `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="18" width="76" height="64" rx="6" fill="#F3F3F3" stroke="#1b1b1f" stroke-width="2"/>
      <rect x="12" y="18" width="76" height="12" rx="6" fill="#1b1b1f"/>
      <circle cx="20" cy="24" r="2" fill="#FF5A4F"/>
      <circle cx="28" cy="24" r="2" fill="#FFC43D"/>
      <circle cx="36" cy="24" r="2" fill="#5BD063"/>
      <rect x="26" y="42" width="48" height="4" rx="2" fill="#FFBD3E"/>
      <path d="M50 76V54m0 0l-8 8m8-8l8 8" stroke="#2F80FF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <circle cx="22" cy="78" r="2" fill="#1b1b1f"/>
    </svg>`,
  "google-mark": `
    <svg viewBox="0 0 48 48" class="google-mark" xmlns="http://www.w3.org/2000/svg">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.9 32.4 29.4 35.5 24 35.5c-6.3 0-11.5-5.1-11.5-11.5S17.7 12.5 24 12.5c3 0 5.6 1.1 7.7 2.9l5.7-5.7C33.8 6.6 29.1 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5c10.7 0 19.5-7.8 19.5-19.5 0-1.2-.1-2.3-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.6l6.6 4.8C14.6 15.2 18.9 12.5 24 12.5c3 0 5.6 1.1 7.7 2.9l5.7-5.7C33.8 6.6 29.1 4.5 24 4.5 16.3 4.5 9.7 8.9 6.3 14.6z"/>
      <path fill="#4CAF50" d="M24 43.5c5 0 9.7-1.9 13.1-5.1l-6-5.1c-2 1.5-4.5 2.3-7.1 2.3-5.4 0-9.9-3.4-11.5-8.3l-6.6 5.1C9.6 39 16.2 43.5 24 43.5z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.9 2.5-2.4 4.7-4.4 6.3l6 5.1C40.9 36.4 43.5 30.7 43.5 24c0-1.2-.1-2.3-.4-3.5z"/>
    </svg>`,
  "id-front": `
    <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="316" height="176" rx="16" fill="#ffffff" stroke="#1b1b1f" stroke-width="1" opacity="0.9"/>
      <circle cx="26" cy="22" r="8" fill="#D97706"/>
      <rect x="40" y="16" width="100" height="6" rx="3" fill="#E85C13"/>
      <rect x="40" y="24" width="100" height="6" rx="3" fill="#0F8A3F"/>
      <circle cx="260" cy="22" r="12" fill="#E85C13"/>
      <path d="M248 22h24M258 10l4 24" stroke="#ffffff" stroke-width="2"/>
      <rect x="20" y="56" width="60" height="80" rx="8" fill="#D1D5DB"/>
      <circle cx="50" cy="86" r="14" fill="#9CA3AF"/>
      <rect x="30" y="106" width="40" height="22" rx="6" fill="#9CA3AF"/>
      <rect x="92" y="60" width="140" height="8" rx="4" fill="#E5E7EB"/>
      <rect x="92" y="76" width="110" height="8" rx="4" fill="#E5E7EB"/>
      <text x="92" y="112" font-family="monospace" font-size="14" fill="#111827" font-weight="700">XXXX XXXX XXXX</text>
      <rect x="240" y="56" width="60" height="60" rx="6" fill="#111827"/>
      <rect x="248" y="64" width="12" height="12" fill="#fff"/>
      <rect x="268" y="64" width="12" height="12" fill="#fff"/>
      <rect x="288" y="64" width="4" height="4" fill="#fff"/>
      <rect x="248" y="84" width="4" height="4" fill="#fff"/>
      <rect x="260" y="84" width="18" height="4" fill="#fff"/>
      <rect x="248" y="94" width="24" height="16" fill="#fff"/>
      <line x1="2" y1="138" x2="318" y2="138" stroke="#DC2626" stroke-width="1"/>
      <rect x="12" y="150" width="88" height="12" rx="3" fill="#E5E7EB"/>
      <rect x="112" y="150" width="140" height="12" rx="3" fill="#E5E7EB"/>
    </svg>`,
  "aadhar-back": `
    <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="316" height="176" rx="16" fill="#ffffff" stroke="#1b1b1f" stroke-width="1" opacity="0.95"/>
      <rect x="20" y="18" width="100" height="2" fill="#E85C13"/>
      <rect x="20" y="26" width="100" height="2" fill="#0F8A3F"/>
      <text x="20" y="52" font-family="sans-serif" font-size="8" fill="#374151">Address:</text>
      <rect x="20" y="60" width="220" height="4" rx="2" fill="#E5E7EB"/>
      <rect x="20" y="70" width="200" height="4" rx="2" fill="#E5E7EB"/>
      <rect x="20" y="80" width="180" height="4" rx="2" fill="#E5E7EB"/>
      <rect x="20" y="90" width="160" height="4" rx="2" fill="#E5E7EB"/>
      <rect x="250" y="50" width="60" height="60" rx="6" fill="#111827"/>
      <rect x="258" y="58" width="12" height="12" fill="#fff"/>
      <rect x="278" y="58" width="12" height="12" fill="#fff"/>
      <rect x="258" y="78" width="24" height="12" fill="#fff"/>
      <rect x="288" y="78" width="12" height="4" fill="#fff"/>
      <rect x="288" y="88" width="12" height="12" fill="#fff"/>
      <text x="20" y="130" font-family="monospace" font-size="14" fill="#111827" font-weight="700">XXXX XXXX XXXX</text>
      <line x1="2" y1="146" x2="318" y2="146" stroke="#DC2626" stroke-width="1"/>
      <rect x="12" y="158" width="88" height="12" rx="3" fill="#E5E7EB"/>
      <rect x="112" y="158" width="140" height="12" rx="3" fill="#E5E7EB"/>
    </svg>`,
  "dl-back": `
    <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="316" height="176" rx="16" fill="#FBEAEC" stroke="#1b1b1f" stroke-width="1" opacity="0.95"/>
      <rect x="90" y="12" width="140" height="20" rx="4" fill="#A3182B"/>
      <text x="160" y="27" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff" font-weight="700">DRIVING LICENSE</text>
      <circle cx="22" cy="22" r="10" fill="#A3182B"/>
      <circle cx="298" cy="22" r="10" fill="#A3182B"/>
      <text x="20" y="50" font-family="sans-serif" font-size="8" fill="#374151">DL No: NUMBERS</text>
      <text x="140" y="50" font-family="sans-serif" font-size="8" fill="#374151">DOI: DD-MM-YY</text>
      <text x="20" y="62" font-family="sans-serif" font-size="7" fill="#6B7280">Valid Till: DD-MM-YY (NT)</text>
      <text x="140" y="62" font-family="sans-serif" font-size="7" fill="#6B7280">DLR DD-MM-YY</text>
      <text x="20" y="74" font-family="sans-serif" font-size="6" fill="#6B7280">AUTHORISATION TO DRIVE FOLLOWING CLASS</text>
      <text x="20" y="82" font-family="sans-serif" font-size="6" fill="#6B7280">OF VEHICLES THROUGHOUT INDIA</text>
      <rect x="20" y="88" width="42" height="28" rx="3" fill="#CFAE44"/>
      <rect x="24" y="92" width="34" height="4" fill="#8B6E22"/>
      <rect x="24" y="100" width="20" height="4" fill="#8B6E22"/>
      <rect x="24" y="108" width="30" height="4" fill="#8B6E22"/>
      <text x="70" y="94" font-family="sans-serif" font-size="6" fill="#374151">COV   DOI</text>
      <text x="70" y="104" font-family="sans-serif" font-size="6" fill="#374151">LMV   DD-MM-YY</text>
      <text x="70" y="112" font-family="sans-serif" font-size="6" fill="#374151">MCWG  DD-MM-YY</text>
      <text x="20" y="128" font-family="sans-serif" font-size="7" fill="#374151">DOB:  DD-MM-YY   BG:</text>
      <text x="20" y="140" font-family="sans-serif" font-size="7" fill="#374151">Name: NAME SURNAME</text>
      <text x="20" y="150" font-family="sans-serif" font-size="7" fill="#374151">S/D/W of: NAME SURNAME</text>
      <text x="20" y="160" font-family="sans-serif" font-size="7" fill="#374151">Add: ADDRESS</text>
      <text x="20" y="172" font-family="sans-serif" font-size="6" fill="#6B7280">PIN: NUMBERS</text>
      <text x="20" y="178" font-family="sans-serif" font-size="6" fill="#6B7280">Signature &amp; ID of</text>
      <text x="20" y="184" font-family="sans-serif" font-size="6" fill="#6B7280">Issuing Authority: NUMBERS</text>
      <rect x="240" y="88" width="54" height="60" rx="4" fill="#CBD5E1"/>
      <circle cx="267" cy="110" r="12" fill="#94A3B8"/>
      <rect x="252" y="128" width="30" height="16" rx="4" fill="#94A3B8"/>
      <path d="M240 158c20 6 40 2 60-4" stroke="#1F2937" stroke-width="1.5" fill="none"/>
    </svg>`,
  "pan-card": `
    <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="panbg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#8EB7E8"/>
          <stop offset="1" stop-color="#7FA7D8"/>
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="316" height="176" rx="16" fill="url(#panbg)" stroke="#2563EB" stroke-width="1"/>
      <text x="20" y="34" font-family="sans-serif" font-size="12" fill="#1E3A8A" font-weight="700">आयकर विभाग</text>
      <text x="20" y="48" font-family="sans-serif" font-size="9" fill="#1E3A8A" font-weight="600">INCOME TAX DEPARTMENT</text>
      <circle cx="160" cy="40" r="18" fill="#D1E0F5" stroke="#1E3A8A" stroke-width="1"/>
      <text x="160" y="44" text-anchor="middle" font-family="sans-serif" font-size="8" fill="#1E3A8A" font-weight="700">India</text>
      <text x="300" y="34" text-anchor="end" font-family="sans-serif" font-size="12" fill="#1E3A8A" font-weight="700">भारत सरकार</text>
      <text x="300" y="48" text-anchor="end" font-family="sans-serif" font-size="9" fill="#1E3A8A" font-weight="600">GOVERNMENT OF INDIA</text>
      <rect x="20" y="78" width="110" height="2" rx="1" fill="#2563EB"/>
      <rect x="20" y="86" width="90" height="2" rx="1" fill="#2563EB"/>
      <rect x="20" y="94" width="100" height="2" rx="1" fill="#2563EB"/>
      <rect x="235" y="90" width="60" height="50" rx="6" fill="#D1E0F5" stroke="#1E3A8A" stroke-width="1"/>
      <circle cx="265" cy="115" r="12" fill="#8EB7E8" stroke="#1E3A8A" stroke-width="0.8"/>
      <path d="M254 128c6 4 16 4 22 0" stroke="#1E3A8A" stroke-width="1" fill="none"/>
    </svg>`,
  "aadhar-front": `
    <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="316" height="176" rx="16" fill="#ffffff" stroke="#1b1b1f" stroke-width="1" opacity="0.9"/>
      <circle cx="26" cy="22" r="8" fill="#D97706"/>
      <rect x="40" y="16" width="100" height="6" rx="3" fill="#E85C13"/>
      <rect x="40" y="24" width="100" height="6" rx="3" fill="#0F8A3F"/>
      <g transform="translate(252,10)">
        <circle cx="12" cy="12" r="12" fill="#E85C13"/>
        <path d="M12 2v20M2 12h20M4 4l16 16M20 4L4 20" stroke="#F59E0B" stroke-width="1.6"/>
      </g>
      <rect x="20" y="56" width="60" height="80" rx="8" fill="#D1D5DB"/>
      <circle cx="50" cy="86" r="14" fill="#9CA3AF"/>
      <rect x="30" y="106" width="40" height="22" rx="6" fill="#9CA3AF"/>
      <rect x="92" y="60" width="140" height="8" rx="4" fill="#E5E7EB"/>
      <rect x="92" y="76" width="110" height="8" rx="4" fill="#E5E7EB"/>
      <text x="92" y="112" font-family="monospace" font-size="14" fill="#111827" font-weight="700">XXXX XXXX XXXX</text>
      <rect x="240" y="56" width="60" height="60" rx="6" fill="#111827"/>
      <rect x="248" y="64" width="12" height="12" fill="#fff"/>
      <rect x="268" y="64" width="12" height="12" fill="#fff"/>
      <rect x="288" y="64" width="4" height="4" fill="#fff"/>
      <rect x="248" y="84" width="4" height="4" fill="#fff"/>
      <rect x="260" y="84" width="18" height="4" fill="#fff"/>
      <rect x="248" y="94" width="24" height="16" fill="#fff"/>
      <line x1="2" y1="138" x2="318" y2="138" stroke="#DC2626" stroke-width="1"/>
      <rect x="12" y="150" width="88" height="12" rx="3" fill="#E5E7EB"/>
      <rect x="112" y="150" width="140" height="12" rx="3" fill="#E5E7EB"/>
    </svg>`,
  "dl-front-ka": `
    <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="316" height="176" rx="16" fill="#ffffff" stroke="#1b1b1f" stroke-width="1"/>
      <rect x="2" y="2" width="316" height="26" rx="16" fill="#FFD400"/>
      <text x="12" y="20" font-family="sans-serif" font-size="12" fill="#111827" font-weight="700">ಕರ್ನಾಟಕ ರಾಜ್ಯ</text>
      <text x="140" y="20" font-family="sans-serif" font-size="12" fill="#D32F2F" font-weight="800">KARNATAKA STATE</text>
      <text x="12" y="40" font-family="sans-serif" font-size="10" fill="#D32F2F" font-weight="700">INDIAN UNION MOTOR DRIVING LICENCE</text>
      <text x="12" y="60" font-family="sans-serif" font-size="7" fill="#374151" transform="rotate(-90 12 60)">DWA547249</text>
      <rect x="40" y="60" width="30" height="26" rx="4" fill="#C8A74B"/>
      <rect x="44" y="66" width="22" height="4" fill="#8B6E22"/>
      <rect x="44" y="72" width="14" height="4" fill="#8B6E22"/>
      <rect x="44" y="78" width="18" height="4" fill="#8B6E22"/>
      <g transform="translate(80,56)">
        <path d="M60 10l-6 12h-18v8h6l-10 20h50l-10-20h6v-8h-18l-6-12z" fill="#C19040"/>
        <rect x="48" y="58" width="24" height="6" fill="#8B6E22"/>
        <rect x="52" y="54" width="16" height="4" fill="#B07D32"/>
      </g>
      <g transform="translate(230,56)">
        <rect x="0" y="0" width="34" height="22" fill="#FF9933"/>
        <rect x="0" y="22" width="34" height="22" fill="#ffffff"/>
        <rect x="0" y="44" width="34" height="22" fill="#138808"/>
        <circle cx="17" cy="33" r="4" fill="none" stroke="#000080" stroke-width="1"/>
      </g>
      <rect x="40" y="140" width="200" height="20" rx="2" fill="#1E40AF"/>
      <text x="42" y="156" font-family="sans-serif" font-size="10" fill="#ffffff" font-weight="700">TRANSPORT DEPARTMENT</text>
      <rect x="40" y="160" width="200" height="12" fill="#1E40AF"/>
      <line x1="48" y1="162" x2="48" y2="170" stroke="#ffffff" stroke-width="1"/>
      <line x1="56" y1="162" x2="56" y2="170" stroke="#ffffff" stroke-width="1"/>
      <line x1="64" y1="162" x2="64" y2="170" stroke="#ffffff" stroke-width="1"/>
      <line x1="72" y1="162" x2="72" y2="170" stroke="#ffffff" stroke-width="1"/>
    </svg>`,
};

export function iconMarkup(name, { size = 24 } = {}) {
  const inner = PATHS[name];
  if (!inner) return "";
  // Full-SVG icons already carry their own <svg> tag
  if (inner.trim().startsWith("<svg")) return inner;
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${inner}</svg>`;
}

export function iconEl(name, opts) {
  const span = document.createElement("span");
  span.className = "icon";
  span.setAttribute("aria-hidden", "true");
  span.innerHTML = iconMarkup(name, opts);
  return span;
}
