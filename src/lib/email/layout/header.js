export function enaHeader({ logoUrl, brand = "ENA" }) {
    return `
        <div style="display:flex;align-items:center;gap:10px;font-weight:600;">
            <img src="src\lib\assets\logo.png"
                 width="28" height="28"
                 style="display:block" />

            <span style="font-size:18px;">${brand}</span>
        </div>

        <hr style="margin:16px 0;border-color:#e5e7eb"/>
    `;
}