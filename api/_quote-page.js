// The quotation form lives in a JS module (not a static file) so it is only
// ever sent to browsers holding a valid session cookie. See api/quote.js.
// NOTE: written with String.raw. Do not use backticks or dollar-brace in the client code below.
const PAGE_HTML = String.raw`<!doctype html>
<html lang="en"><head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Quotation Generator · Shriram Enterprise</title>
<style>
  :root{--navy:#0e1b3d;--navy-2:#1c2f66;--line:#b9c2dc;--tint:#eef1f9;--ink:#0e1b3d;--muted:#55618a}
  *{box-sizing:border-box}
  body{margin:0;background:#f3f5fa;color:var(--ink);font:15px/1.4 "IBM Plex Sans",system-ui,sans-serif}
  .wrap{max-width:1000px;margin:0 auto;padding:16px}
  header.top{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:12px}
  header.top h1{margin:0;font-size:1.2rem}
  .btn{padding:10px 16px;border:1px solid var(--navy);background:#fff;color:var(--navy);font:inherit;font-weight:600;cursor:pointer}
  .btn:hover{background:var(--tint)}
  .btn.primary{background:var(--navy);color:#fff}
  .btn.primary:hover{background:var(--navy-2)}
  section{background:#fff;border:1px solid var(--line);padding:16px;margin-bottom:14px}
  h2{margin:0 0 12px;font-size:.95rem;text-transform:uppercase;letter-spacing:.05em;color:var(--muted)}
  label{display:block;font-size:.78rem;font-weight:600;color:var(--muted);margin-bottom:4px}
  input,textarea,select{width:100%;padding:8px 10px;border:1px solid var(--line);font:inherit;background:#fff;color:var(--ink)}
  input:focus,textarea:focus{outline:2px solid #3b5bdb;outline-offset:1px}
  textarea{resize:vertical}
  .grid{display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(200px,1fr))}
  .items{overflow-x:auto}
  table{width:100%;border-collapse:collapse;min-width:760px}
  th{background:var(--navy);color:#fff;font-size:.78rem;font-weight:600;padding:8px 6px;text-align:left}
  td{padding:4px;border-bottom:1px solid var(--line);vertical-align:top}
  td.no{width:34px;text-align:center;color:var(--muted);padding-top:12px}
  td.amt{text-align:right;padding-top:12px;font-variant-numeric:tabular-nums;white-space:nowrap;width:110px}
  td button{border:0;background:none;color:#b3261e;font-size:1.1rem;cursor:pointer;padding:6px}
  .totals{margin-left:auto;margin-top:14px;max-width:360px}
  .totals div.row{display:grid;grid-template-columns:1fr 80px 110px;gap:8px;align-items:center;margin-bottom:6px}
  .totals .row span.v{text-align:right;font-variant-numeric:tabular-nums}
  .totals .grand{font-weight:700;border-top:2px solid var(--navy);padding-top:8px}
  .actions{display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end}
  .note{font-size:.8rem;color:var(--muted)}
</style></head><body>
<div class="wrap">
  <header class="top">
    <h1>Quotation Generator</h1>
    <form method="post" action="/quote"><input type="hidden" name="action" value="logout"><button class="btn" type="submit">Sign out</button></form>
  </header>

  <section>
    <h2>Quotation details</h2>
    <div class="grid">
      <div><label for="qNo">Quotation No.</label><input id="qNo"></div>
      <div><label for="qDate">Date</label><input id="qDate" type="date"></div>
      <div><label for="qValid">Valid Till</label><input id="qValid" type="date"></div>
      <div><label for="qRef">Your Ref.</label><input id="qRef"></div>
      <div><label for="buyerGst">Buyer GSTIN</label><input id="buyerGst"></div>
      <div><label for="ourGst">Our GSTIN</label><input id="ourGst"></div>
    </div>
    <div style="margin-top:12px">
      <label for="to">To (customer name and address)</label>
      <textarea id="to" rows="4"></textarea>
    </div>
  </section>

  <section>
    <h2>Items</h2>
    <div class="items">
      <table>
        <thead><tr><th>No.</th><th>Product &amp; Specification</th><th>HSN</th><th>Qty</th><th>Unit</th><th>Rate (INR)</th><th style="text-align:right">Amount (INR)</th><th></th></tr></thead>
        <tbody id="rows"></tbody>
      </table>
    </div>
    <p><button class="btn" id="addRow" type="button">+ Add item</button></p>

    <div class="totals">
      <div class="row"><span>Sub Total</span><span></span><span class="v" id="tSub">0.00</span></div>
      <div class="row"><label for="packPct" style="margin:0">Packing Charges %</label><input id="packPct" type="number" min="0" step="any" value="3"><span class="v" id="tPack">0.00</span></div>
      <div class="row"><span>Taxable Value</span><span></span><span class="v" id="tTaxable">0.00</span></div>
      <div class="row"><label for="gstPct" style="margin:0">GST %</label><input id="gstPct" type="number" min="0" step="any" value="18"><span class="v" id="tGst">0.00</span></div>
      <div class="row"><label for="freight" style="margin:0">Freight</label><input id="freight" type="number" min="0" step="any" placeholder="0"><span class="v" id="tFreight">0.00</span></div>
      <div class="row grand"><span>Grand Total</span><span></span><span class="v" id="tGrand">0.00</span></div>
    </div>
  </section>

  <section>
    <h2>Terms &amp; conditions</h2>
    <div class="grid" style="margin-bottom:12px">
      <div><label for="delivery">Delivery days (fills the blank in the delivery term)</label><input id="delivery" placeholder="e.g. 15"></div>
    </div>
    <label for="terms">One term per line. Numbering is added automatically.</label>
    <textarea id="terms" rows="11"></textarea>
  </section>

  <div class="actions">
    <button class="btn" id="reset" type="button">Clear form</button>
    <button class="btn primary" id="download" type="button">Download PDF</button>
  </div>
  <p class="note" style="text-align:right">The PDF is created in your browser. Nothing is stored on the server.</p>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<script>
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  var DEFAULT_TERMS = [
    "GST extra as applicable, at the rate shown above.",
    "Minimum order: 1,000 units per SKU for straps, 500 metres for tape rolls.",
    "Packing charges as shown above. Special or wooden packing charged extra.",
    "This quotation is valid for 7 days from the date above.",
    "Payment: 100% in advance, before dispatch.",
    "Delivery: within ___ days from receipt of confirmed order and payment.",
    "Colours from standard factory shades VT 101 to VT 160. Custom Pantone dye-to-match quoted separately.",
    "Rates are ex-factory, Ahmedabad. Freight and transit insurance in buyer's scope.",
    "Goods once sold will not be taken back. We are not responsible for damage during transit.",
    "Subject to Ahmedabad jurisdiction."
  ].join("\n");

  var money = function (n) {
    return Number(n || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };
  var num = function (v) { var n = parseFloat(v); return isFinite(n) ? n : 0; };
  var fmtDate = function (iso) {
    if (!iso) return "";
    var p = iso.split("-");
    return p[2] + "/" + p[1] + "/" + p[0];
  };

  /* ---------- Item rows ---------- */
  var rowsEl = $("rows");
  function addRow() {
    var tr = document.createElement("tr");
    tr.innerHTML =
      '<td class="no"></td>' +
      '<td><textarea rows="2" data-f="desc"></textarea></td>' +
      '<td style="width:90px"><input data-f="hsn"></td>' +
      '<td style="width:80px"><input data-f="qty" type="number" min="0" step="any"></td>' +
      '<td style="width:80px"><input data-f="unit" placeholder="pcs"></td>' +
      '<td style="width:100px"><input data-f="rate" type="number" min="0" step="any"></td>' +
      '<td class="amt">0.00</td>' +
      '<td><button type="button" title="Remove row" aria-label="Remove row">&times;</button></td>';
    tr.querySelector("button").addEventListener("click", function () {
      tr.remove();
      renumber();
      recalc();
    });
    rowsEl.appendChild(tr);
    renumber();
  }
  function renumber() {
    Array.prototype.forEach.call(rowsEl.children, function (tr, i) {
      tr.querySelector(".no").textContent = i + 1;
    });
  }
  function readRows() {
    return Array.prototype.map.call(rowsEl.children, function (tr) {
      var g = function (f) { return tr.querySelector('[data-f="' + f + '"]').value; };
      var qty = num(g("qty")), rate = num(g("rate"));
      return { desc: g("desc"), hsn: g("hsn"), qty: g("qty"), unit: g("unit"), rate: g("rate"), amount: qty * rate };
    });
  }

  /* ---------- Totals ---------- */
  function totals() {
    var rows = readRows();
    var sub = rows.reduce(function (s, r) { return s + r.amount; }, 0);
    var pack = sub * num($("packPct").value) / 100;
    var taxable = sub + pack;
    var gst = taxable * num($("gstPct").value) / 100;
    var freight = num($("freight").value);
    return { rows: rows, sub: sub, pack: pack, taxable: taxable, gst: gst, freight: freight, grand: taxable + gst + freight };
  }
  function recalc() {
    var t = totals();
    Array.prototype.forEach.call(rowsEl.children, function (tr, i) {
      tr.querySelector(".amt").textContent = money(t.rows[i].amount);
    });
    $("tSub").textContent = money(t.sub);
    $("tPack").textContent = money(t.pack);
    $("tTaxable").textContent = money(t.taxable);
    $("tGst").textContent = money(t.gst);
    $("tFreight").textContent = money(t.freight);
    $("tGrand").textContent = money(t.grand);
  }
  document.addEventListener("input", recalc);

  /* ---------- Defaults ---------- */
  function resetForm() {
    ["qNo", "qRef", "buyerGst", "to", "delivery", "freight"].forEach(function (id) { $(id).value = ""; });
    var today = new Date();
    var valid = new Date(today.getTime() + 7 * 864e5);
    var iso = function (d) { return d.toISOString().slice(0, 10); };
    $("qDate").value = iso(today);
    $("qValid").value = iso(valid);
    $("packPct").value = 3;
    $("gstPct").value = 18;
    $("terms").value = DEFAULT_TERMS;
    rowsEl.innerHTML = "";
    for (var i = 0; i < 5; i++) addRow();
    recalc();
  }
  $("addRow").addEventListener("click", function () { addRow(); });
  $("reset").addEventListener("click", function () {
    if (confirm("Clear everything and start a new quotation?")) resetForm();
  });
  try { $("ourGst").value = localStorage.getItem("quote_our_gst") || ""; } catch (e) {}
  $("ourGst").addEventListener("input", function () {
    try { localStorage.setItem("quote_our_gst", $("ourGst").value); } catch (e) {}
  });
  resetForm();

  /* ---------- PDF ---------- */
  var NAVY = [14, 27, 61], TINT = [238, 241, 249], LINE = [160, 170, 200];

  function buildPdf() {
    var t = totals();
    var doc = new window.jspdf.jsPDF({ unit: "pt", format: "a4" });
    var L = 40, R = 555, W = R - L, PAGE_BOTTOM = 800, y = 40;

    function fill(c) { doc.setFillColor(c[0], c[1], c[2]); }
    function stroke() { doc.setDrawColor(LINE[0], LINE[1], LINE[2]); doc.setLineWidth(0.6); }
    function text(c) { doc.setTextColor(c[0], c[1], c[2]); }
    function ensure(h) { if (y + h > PAGE_BOTTOM) { doc.addPage(); y = 40; return true; } return false; }

    // Header band
    fill(NAVY); doc.rect(L, y, W, 84, "F");
    text([255, 255, 255]);
    doc.setFont("helvetica", "normal"); doc.setFontSize(20); doc.text("SHRIRAM ENTERPRISE", L + 10, y + 26);
    doc.setFontSize(7.5); text([176, 188, 222]);
    doc.text("Manufacturers of Nylon Webbing Straps, Hook & Loop Belts and Custom OEM Assemblies", L + 10, y + 40);
    doc.setFontSize(8); text([255, 255, 255]);
    doc.text("180, Mahavir Industrial Park-2, Nr. Vinayak Estate, Kathwada, Ahmedabad, Gujarat 382430", L + 10, y + 53);
    doc.text("Phone / WhatsApp: +91 81607 75905  |  shriramenterprise135@gmail.com  |  www.shriramenterprise.org", L + 10, y + 64);
    doc.text("GSTIN: " + $("ourGst").value, L + 10, y + 76);
    y += 84 + 10;

    // Quotation box
    stroke(); fill(TINT);
    doc.rect(L, y, W, 20, "FD");
    text(NAVY); doc.setFontSize(11); doc.text("QUOTATION", L + W / 2, y + 14, { align: "center" });
    y += 20;

    var meta = [
      ["Quotation No.", $("qNo").value], ["Date", fmtDate($("qDate").value)],
      ["Valid Till", fmtDate($("qValid").value)], ["Your Ref.", $("qRef").value],
      ["Buyer GSTIN", $("buyerGst").value]
    ];
    var rowH = 14, boxH = rowH * meta.length, splitX = L + 310, valX = splitX + 70;
    fill([255, 255, 255]); doc.rect(L, y, W, boxH, "S");
    doc.line(splitX, y, splitX, y + boxH);
    doc.line(valX, y, valX, y + boxH);
    fill(TINT); doc.rect(valX, y, R - valX, boxH, "F"); doc.rect(valX, y, R - valX, boxH, "S");
    text([30, 40, 70]); doc.setFontSize(8.5);
    doc.text("To,", L + 4, y + 10);
    var toLines = doc.splitTextToSize($("to").value || "", 300 - 8).slice(0, 5);
    toLines.forEach(function (ln, i) { doc.text(ln, L + 24, y + 10 + i * rowH); });
    meta.forEach(function (m, i) {
      var ry = y + i * rowH;
      doc.line(splitX, ry, R, ry);
      doc.text(m[0], splitX + 4, ry + 10);
      doc.text(String(m[1]), valX + 4, ry + 10);
    });
    y += boxH + 14;

    // Items table
    var cols = [
      { k: "no", w: 26, a: "center" }, { k: "desc", w: 214, a: "left" }, { k: "hsn", w: 44, a: "center" },
      { k: "qty", w: 42, a: "center" }, { k: "unit", w: 42, a: "center" }, { k: "rate", w: 62, a: "right" },
      { k: "amount", w: 85, a: "right" }
    ];
    var heads = ["No.", "Product & Specification", "HSN", "Qty", "Unit", "Rate (INR)", "Amount (INR)"];
    function tableHead() {
      fill(NAVY); doc.rect(L, y, W, 18, "F"); text([255, 255, 255]); doc.setFontSize(8);
      var x = L;
      cols.forEach(function (c, i) {
        var tx = c.a === "center" ? x + c.w / 2 : c.a === "right" ? x + c.w - 4 : x + c.w / 2;
        doc.text(heads[i], i === 1 ? x + c.w / 2 : tx, y + 12, { align: i === 1 || c.a === "center" ? "center" : c.a });
        x += c.w;
      });
      y += 18;
    }
    tableHead();
    text([30, 40, 70]); doc.setFontSize(8.5);
    var used = t.rows.filter(function (r) { return r.desc || r.qty || r.rate || r.hsn; });
    var printRows = used.slice();
    while (printRows.length < 12) printRows.push(null); // keep blank lines like the sample sheet
    printRows.forEach(function (r, i) {
      var descLines = r ? doc.splitTextToSize(r.desc || "", cols[1].w - 8) : [""];
      var h = Math.max(14, descLines.length * 10.5 + 5);
      if (ensure(h)) { tableHead(); text([30, 40, 70]); doc.setFontSize(8.5); }
      var x = L;
      var cells = r
        ? [String(i + 1), descLines, r.hsn, r.qty, r.unit, r.rate ? money(num(r.rate)) : "", r.amount ? money(r.amount) : ""]
        : ["", [""], "", "", "", "", ""];
      if (!r) { fill(TINT); doc.rect(L, y, W, h, "F"); }
      cols.forEach(function (c, ci) {
        doc.rect(x, y, c.w, h, "S");
        var v = cells[ci];
        if (ci === 1) {
          v.forEach(function (ln, li) { doc.text(ln, x + 4, y + 10 + li * 10.5); });
        } else if (v !== "") {
          var tx = c.a === "center" ? x + c.w / 2 : x + c.w - 4;
          doc.text(String(v), tx, y + 10, { align: c.a });
        }
        x += c.w;
      });
      y += h;
    });
    y += 14;

    // Totals
    var tl = [
      ["Sub Total", "", money(t.sub)],
      ["Packing Charges", String(num($("packPct").value)), money(t.pack)],
      ["Taxable Value", "", money(t.taxable)],
      ["GST", String(num($("gstPct").value)), money(t.gst)],
      ["Freight", "", t.freight ? money(t.freight) : ""],
      ["Grand Total", "", money(t.grand)]
    ];
    var tH = 15, tX = R - 255, tMid = tX + 110, tVal = tMid + 60;
    ensure(tH * tl.length + 10);
    tl.forEach(function (row, i) {
      var ry = y + i * tH, last = i === tl.length - 1;
      if (last) { fill(TINT); doc.rect(tMid, ry, R - tMid, tH, "F"); }
      doc.rect(tX, ry, 110, tH, "S"); doc.rect(tMid, ry, 60, tH, "S"); doc.rect(tVal, ry, R - tVal, tH, "S");
      doc.setFontSize(last ? 9.5 : 8.5);
      text(last ? NAVY : [30, 40, 70]);
      doc.text(row[0], tMid - 6, ry + 10.5, { align: "right" });
      if (row[1]) doc.text(row[1], tMid + 30, ry + 10.5, { align: "center" });
      doc.text(row[2], R - 4, ry + 10.5, { align: "right" });
    });
    y += tH * tl.length + 16;

    // Terms
    var termsLines = $("terms").value.split("\n").map(function (s) { return s.trim(); }).filter(Boolean)
      .map(function (s) { return s.replace(/_{2,}/, $("delivery").value.trim() || "___"); });
    doc.setFontSize(8);
    var blocks = termsLines.map(function (s) {
      var lines = doc.splitTextToSize(s, W - 40);
      return { lines: lines, h: Math.max(13, lines.length * 10 + 4) };
    });
    ensure(18 + (blocks[0] ? blocks[0].h : 0));
    fill(NAVY); doc.rect(L, y, W, 16, "F"); text([255, 255, 255]); doc.setFontSize(9);
    doc.text("Terms & Conditions", L + W / 2, y + 11.5, { align: "center" });
    y += 16;
    doc.setFontSize(8);
    blocks.forEach(function (b, i) {
      ensure(b.h);
      if (i % 2 === 0) { fill(TINT); doc.rect(L, y, W, b.h, "F"); }
      doc.rect(L, y, 26, b.h, "S"); doc.rect(L + 26, y, W - 26, b.h, "S");
      text([30, 40, 70]);
      doc.text(String(i + 1), L + 13, y + 9.5, { align: "center" });
      b.lines.forEach(function (ln, li) { doc.text(ln, L + 32, y + 9.5 + li * 10); });
      y += b.h;
    });
    y += 14;

    // Footer
    ensure(60);
    doc.rect(L, y, W, 54, "S");
    doc.setFontSize(8.5); text([90, 100, 130]);
    doc.text("Thank you for your enquiry.", L + 6, y + 18);
    doc.text("We look forward to your order.", L + 6, y + 31);
    text([30, 40, 70]);
    doc.text("For, SHRIRAM ENTERPRISE", R - 6, y + 14, { align: "right" });
    doc.text("Authorised Signatory", R - 6, y + 46, { align: "right" });

    return doc;
  }

  $("download").addEventListener("click", function () {
    if (!window.jspdf) { alert("PDF library did not load. Check your internet connection and try again."); return; }
    var name = ($("qNo").value || "Quotation").replace(/[^\w.-]+/g, "_");
    buildPdf().save("Shriram_Enterprise_Quotation_" + name + ".pdf");
  });
})();
</script>
</body></html>`;

module.exports = { PAGE_HTML };
