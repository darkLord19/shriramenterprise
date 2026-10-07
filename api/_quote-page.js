// The quotation form lives in a JS module (not a static file) so it is only
// ever sent to browsers holding a valid session cookie. See api/quote.js.
const BRAND_LOGO = 'data:image/png;base64,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';

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
    <div style="display:flex;align-items:center;gap:12px">
      <img src="${BRAND_LOGO}" alt="Shriram Enterprise Logo" style="width:42px;height:42px;border-radius:8px;display:block">
      <div>
        <h1 style="margin:0;font-size:1.25rem;letter-spacing:.02em">SHRIRAM ENTERPRISE</h1>
        <p style="margin:0;font-size:.8rem;color:var(--muted)">Quotation Generator</p>
      </div>
    </div>
    <form method="post" action="/quote"><input type="hidden" name="action" value="logout"><button class="btn" type="submit">Sign out</button></form>
  </header>

  <section>
    <h2>Quotation details</h2>
    <div class="grid">
      <div><label for="qDate">Date</label><input id="qDate" type="date"></div>
      <div><label for="qValid">Valid Till</label><input id="qValid" type="date"></div>
      <div><label for="qRef">Your Ref.</label><input id="qRef"></div>
      <div><label for="buyerGst">Buyer GSTIN</label><input id="buyerGst"></div>
      <div><label for="ourGst">Our GSTIN</label><input id="ourGst" value="24BMRPT0518G1ZW"></div>
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
    <h2>Bank details (for payment)</h2>
    <div class="grid">
      <div><label for="bankName">Bank Name</label><input id="bankName" value="Bank of India"></div>
      <div><label for="accNo">Account Number</label><input id="accNo" value="203120110001155"></div>
      <div><label for="ifsc">IFSC Code</label><input id="ifsc" value="BKID0002031"></div>
      <div><label for="accName">Account Holder Name</label><input id="accName" value="SHRI RAM ENTERPRISE"></div>
    </div>
  </section>

  <section>
    <h2>Terms &amp; Conditions</h2>
    <label for="terms">Terms &amp; conditions (one per line, numbered automatically):</label>
    <textarea id="terms" rows="9"></textarea>
  </section>

  <div class="actions">
    <button class="btn" id="reset" type="button">Clear form</button>
    <button class="btn primary" id="download" type="button">Download PDF</button>
  </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<script>
(function () {
  "use strict";
  var BRAND_LOGO = "${BRAND_LOGO}";
  var $ = function (id) { return document.getElementById(id); };
  var DEFAULT_TERMS = [
    "GST extra as applicable, at the rate shown above.",
    "Minimum order: 1,000 units per SKU for straps, 500 metres for tape rolls.",
    "This quotation is valid for 7 days from the date above.",
    "Payment: 50% in advance, 50% before dispatch.",
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
  var BANK_FIELDS = ["bankName", "accNo", "ifsc", "accName"];
  var BANK_DEFAULTS = {
    bankName: "Bank of India",
    accNo: "203120110001155",
    ifsc: "BKID0002031",
    accName: "SHRI RAM ENTERPRISE"
  };

  function resetForm() {
    ["qRef", "buyerGst", "to", "freight"].forEach(function (id) { if ($(id)) $(id).value = ""; });
    var today = new Date();
    var valid = new Date(today.getTime() + 7 * 864e5);
    var iso = function (d) { return d.toISOString().slice(0, 10); };
    $("qDate").value = iso(today);
    $("qValid").value = iso(valid);
    $("packPct").value = 3;
    $("gstPct").value = 18;
    $("terms").value = DEFAULT_TERMS;
    try {
      var savedGst = localStorage.getItem("quote_our_gst");
      $("ourGst").value = (savedGst && savedGst !== "Available on request") ? savedGst : "24BMRPT0518G1ZW";
    } catch (e) {
      $("ourGst").value = "24BMRPT0518G1ZW";
    }
    BANK_FIELDS.forEach(function (f) {
      try { $(f).value = localStorage.getItem("quote_" + f) || BANK_DEFAULTS[f]; } catch (e) { $(f).value = BANK_DEFAULTS[f]; }
    });
    rowsEl.innerHTML = "";
    for (var i = 0; i < 5; i++) addRow();
    recalc();
  }
  $("addRow").addEventListener("click", function () { addRow(); });
  $("reset").addEventListener("click", function () {
    if (confirm("Clear everything and start a new quotation?")) resetForm();
  });
  try {
    var savedGst = localStorage.getItem("quote_our_gst");
    $("ourGst").value = (savedGst && savedGst !== "Available on request") ? savedGst : "24BMRPT0518G1ZW";
  } catch (e) {
    $("ourGst").value = "24BMRPT0518G1ZW";
  }
  $("ourGst").addEventListener("input", function () {
    try { localStorage.setItem("quote_our_gst", $("ourGst").value); } catch (e) {}
  });
  BANK_FIELDS.forEach(function (f) {
    try { $(f).value = localStorage.getItem("quote_" + f) || BANK_DEFAULTS[f]; } catch (e) { $(f).value = BANK_DEFAULTS[f]; }
    $(f).addEventListener("input", function () {
      try { localStorage.setItem("quote_" + f, $(f).value); } catch (e) {}
    });
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

    // Header band with Logo
    fill(NAVY); doc.rect(L, y, W, 84, "F");

    // Brand Logo Badge
    var logoX = L + 10, logoY = y + 14, logoSize = 56;
    try {
      doc.addImage(BRAND_LOGO, "PNG", logoX, logoY, logoSize, logoSize);
    } catch (e) {
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(logoX, logoY, logoSize, logoSize, 6, 6, "F");
    }

    // Header Text details beside logo
    var textX = logoX + logoSize + 14;
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("SHRIRAM ENTERPRISE", textX, y + 25);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(185, 195, 225);
    doc.text("Manufacturers of Nylon Webbing Straps, Hook & Loop Belts & OEM Assemblies", textX, y + 38);

    doc.setTextColor(230, 235, 250);
    doc.setFontSize(7.5);
    doc.text("180, Mahavir Industrial Park-2, Nr. Vinayak Estate, Kathwada, Ahmedabad, Gujarat 382430", textX, y + 50);
    doc.text("Phone / WhatsApp: +91 81607 75905  |  shriramenterprise135@gmail.com  |  www.shriramenterprise.org", textX, y + 61);

    var gstin = ($("ourGst").value || "").trim() || "24BMRPT0518G1ZW";
    doc.setTextColor(217, 171, 82);
    doc.setFont("helvetica", "bold");
    doc.text("GSTIN: " + gstin, textX, y + 72);
    doc.setFont("helvetica", "normal");

    y += 84 + 10;

    // Quotation box
    stroke(); fill(TINT);
    doc.rect(L, y, W, 20, "FD");
    text(NAVY); doc.setFontSize(11); doc.text("QUOTATION", L + W / 2, y + 14, { align: "center" });
    y += 20;

    var meta = [
      ["Date", fmtDate($("qDate").value)],
      ["Valid Till", fmtDate($("qValid").value)],
      ["Your Ref.", $("qRef").value],
      ["Buyer GSTIN", $("buyerGst").value]
    ];
    var rowH = 15, boxH = rowH * meta.length, splitX = L + 310, valX = splitX + 70;
    fill([255, 255, 255]); doc.rect(L, y, W, boxH, "S");
    doc.line(splitX, y, splitX, y + boxH);
    doc.line(valX, y, valX, y + boxH);
    fill(TINT); doc.rect(valX, y, R - valX, boxH, "F"); doc.rect(valX, y, R - valX, boxH, "S");
    text([30, 40, 70]); doc.setFontSize(8.5);
    doc.text("To,", L + 4, y + 10);
    var toLines = doc.splitTextToSize($("to").value || "", 300 - 8).slice(0, 4);
    toLines.forEach(function (ln, i) { doc.text(ln, L + 24, y + 10 + i * rowH); });
    meta.forEach(function (m, i) {
      var ry = y + i * rowH;
      doc.line(splitX, ry, R, ry);
      doc.text(m[0], splitX + 4, ry + 10.5);
      doc.text(String(m[1]), valX + 4, ry + 10.5);
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

    // Bank Details (left side, alongside Totals)
    var bW = tX - L - 12;
    var bH = tH * tl.length;
    fill(NAVY); doc.rect(L, y, bW, 16, "F");
    text([255, 255, 255]); doc.setFontSize(8.5);
    doc.text("Bank Details for Payment (RTGS / NEFT)", L + bW / 2, y + 11.5, { align: "center" });
    doc.rect(L, y, bW, bH, "S");

    var bankRows = [
      ["Account Name:", $("accName").value || "SHRI RAM ENTERPRISE"],
      ["Bank Name:", $("bankName").value || "Bank of India"],
      ["Account No.:", $("accNo").value || "203120110001155"],
      ["IFSC Code:", $("ifsc").value || "BKID0002031"]
    ];
    var bRowH = (bH - 16) / bankRows.length;
    bankRows.forEach(function (br, bi) {
      var bry = y + 16 + bi * bRowH;
      if (bi % 2 === 1) { fill(TINT); doc.rect(L, bry, bW, bRowH, "F"); }
      doc.rect(L, bry, bW, bRowH, "S");
      text([85, 97, 138]); doc.setFontSize(7.5);
      doc.text(br[0], L + 8, bry + bRowH / 2 + 3);
      text(NAVY); doc.setFontSize(8); doc.setFont("helvetica", "bold");
      doc.text(String(br[1]), L + 75, bry + bRowH / 2 + 3);
      doc.setFont("helvetica", "normal");
    });

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

    // Terms & Conditions
    var termsLines = $("terms").value.split("\n").map(function (s) { return s.trim(); }).filter(Boolean);
    doc.setFontSize(8);
    var blocks = termsLines.map(function (s) {
      var lines = doc.splitTextToSize(s, W - 40);
      return { lines: lines, h: Math.max(13, lines.length * 10 + 4) };
    });
    if (blocks.length > 0) {
      ensure(18 + blocks[0].h);
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
    }

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
    var ref = ($("qRef").value || "").trim().replace(/[^\w.-]+/g, "_");
    var dateStr = ($("qDate").value || "").replace(/-/g, "");
    var suffix = ref ? "_" + ref : (dateStr ? "_" + dateStr : "");
    buildPdf().save("Shriram_Enterprise_Quotation" + suffix + ".pdf");
  });
})();
</script>
</body></html>`;

module.exports = { PAGE_HTML };
