import { useState, useCallback, useMemo } from "react";

const LOGO_SRC = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNC4wLjIsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0i0KHQu9C+0LlfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAxNDAgMjciIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE0MCAyNzsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGw6dXJsKCNTVkdJRF8xXyk7fQ0KCS5zdDF7ZmlsbDp1cmwoI1NWR0lEXzJfKTt9DQoJLnN0MntmaWxsOiNGRkZGRkY7fQ0KPC9zdHlsZT4NCjxnPg0KCTxnIGlkPSLQodC70L7QuV8yIj4NCgkJPGcgaWQ9ItCh0LvQvtC5XzEtMiI+DQoJCQk8bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzFfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjcuMDYyNSIgeTE9IjYuNzUxNyIgeDI9IjI2LjE1MzgiIHkyPSIyNS44NDMiPg0KCQkJCTxzdG9wICBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiMyMTIxMjEiLz4NCgkJCQk8c3RvcCAgb2Zmc2V0PSIwLjM0MSIgc3R5bGU9InN0b3AtY29sb3I6Izc4Nzg3OCIvPg0KCQkJCTxzdG9wICBvZmZzZXQ9IjAuODQ0IiBzdHlsZT0ic3RvcC1jb2xvcjojQjJCMkIyIi8+DQoJCQk8L2xpbmVhckdyYWRpZW50Pg0KCQkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE5Ljk1LDAuMTVMMTkuOSwwLjEzYy0wLjQzLTAuMjItMC45Ni0wLjE0LTEuMywwLjJMMC42NCwxOC4yOGMtMC4zNCwwLjM0LTAuNDMsMC44Ni0wLjIxLDEuMjkNCgkJCQljMCwwLjAxLDAuMDEsMC4wMiwwLjAxLDAuMDJjMC4wMSwwLjAyLDAuMDIsMC4wMywwLjAyLDAuMDRjMy44NSw2LjkxLDEyLjU3LDkuNCwxOS40OCw1LjU1czkuNC0xMi41Nyw1LjU1LTE5LjQ4DQoJCQkJQzI0LjIxLDMuMzgsMjIuMjgsMS40NSwxOS45NSwwLjE1TDE5Ljk1LDAuMTV6Ii8+DQoJCQkNCgkJCQk8bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzJfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9Ii00NTMuMTEwMSIgeTE9IjQzNi42NTA2IiB4Mj0iLTQ1My4xMTAxIiB5Mj0iNDQ2LjIxNDQiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoLTAuNzA3MSAwLjcwNzEgMC43MDcxIDAuNzA3MSAtNjE5LjUzNzggMjAuOTQwOCkiPg0KCQkJCTxzdG9wICBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiNBQ0FDQUMiLz4NCgkJCQk8c3RvcCAgb2Zmc2V0PSIwLjE0MDUiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRkZGRkYiLz4NCgkJCQk8c3RvcCAgb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojQkFCQUJBIi8+DQoJCQk8L2xpbmVhckdyYWRpZW50Pg0KCQkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEuOTQsMTguMDhjNS44NCwzLjI1LDEzLjIsMS4xNSwxNi40NS00LjY5YzIuMDMtMy42NiwyLjAzLTguMSwwLTExLjc2Yy0wLjIyLTAuNDMtMC4xNC0wLjk2LDAuMi0xLjMNCgkJCQlsLTMuODMsMy44Mkw0LjQ3LDE0LjQ2bC0zLjgzLDMuODJDMC45OSwxNy45NCwxLjUxLDE3Ljg2LDEuOTQsMTguMDh6Ii8+DQoJCTwvZz4NCgk8L2c+DQoJPGc+DQoJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0zOS4xMywyNC4xOFY0LjY4aDMuMDdsMTAuMSwxMy42OVY0LjY4aDMuMjZ2MTkuNWgtMi43N2wtMTAuNC0xNC4wNnYxNC4wNkgzOS4xM3oiLz4NCgkJPHBhdGggY2xhc3M9InN0MiIgZD0iTTYwLjA5LDcuNzh2LTMuMWgzLjV2My4xSDYwLjA5eiBNNjAuMjIsMjQuMThWOS45NmgzLjI2djE0LjIySDYwLjIyeiIvPg0KCQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNzQuMzEsMjQuNWMtMi4xLDAtMy44NS0wLjcyLTUuMjUtMi4xNWMtMS40LTEuNDQtMi4xLTMuMTktMi4xLTUuMjVjMC0yLjA1LDAuNy0zLjgsMi4xMS01LjI1DQoJCQljMS40MS0xLjQ1LDMuMTctMi4xOCw1LjI3LTIuMThjMi4zLDAsNC4xOSwwLjgyLDUuNjgsMi40NUw3OCwxNC4yOWMtMS4xMy0xLjE4LTIuMzYtMS43OC0zLjY5LTEuNzhjLTEuMTcsMC0yLjE0LDAuNDUtMi45MiwxLjM0DQoJCQljLTAuNzgsMC44OS0xLjE3LDEuOTctMS4xNywzLjI0YzAsMS4yOSwwLjQsMi4zOCwxLjIsMy4yNmMwLjgsMC44OCwxLjgyLDEuMzIsMy4wNiwxLjMyYzEuMzEsMCwyLjU0LTAuNTksMy42OS0xLjc4bDEuOTcsMS45NA0KCQkJYy0wLjc3LDAuODYtMS42MSwxLjUyLTIuNTIsMS45OEM3Ni43LDI0LjI4LDc1LjYsMjQuNSw3NC4zMSwyNC41eiIvPg0KCQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNODMuMTIsMjQuMThWNC41MmgzLjI2djExLjc0bDUuOS02LjNoMy45NmwtNS42Niw1Ljc5bDUuODUsOC40M2gtMy43N2wtNC4yOC02LjE0bC0xLjk5LDIuMDh2NC4wN0g4My4xMnoiLz4NCgkJPHBhdGggY2xhc3M9InN0MiIgZD0iTTEwMy42NywyNC40NWMtMi4yMywwLTQuMjQtMC43MS02LjAzLTIuMTNsMS40NS0yLjIxYzEuNTQsMS4xNywzLjEsMS43NSw0LjY2LDEuNzUNCgkJCWMwLjcsMCwxLjI0LTAuMTQsMS42My0wLjQyYzAuMzktMC4yOCwwLjU4LTAuNjcsMC41OC0xLjE3YzAtMC4yNS0wLjA3LTAuNDctMC4yLTAuNjZjLTAuMTMtMC4xOS0wLjM3LTAuMzYtMC43MS0wLjUyDQoJCQljLTAuMzQtMC4xNi0wLjYzLTAuMjgtMC44Ni0wLjM1cy0wLjYyLTAuMTktMS4xNi0wLjM1bC0wLjI0LTAuMDhjLTAuNS0wLjE0LTAuOTMtMC4yOC0xLjI4LTAuNDJjLTAuMzUtMC4xNC0wLjc0LTAuMzItMS4xNy0wLjU1DQoJCQljLTAuNDMtMC4yMy0wLjc4LTAuNDktMS4wNS0wLjc3Yy0wLjI3LTAuMjgtMC40OS0wLjYzLTAuNjctMS4wN2MtMC4xOC0wLjQzLTAuMjctMC45Mi0wLjI3LTEuNDVjMC0xLjMxLDAuNDgtMi4zNiwxLjQ0LTMuMTUNCgkJCWMwLjk2LTAuNzksMi4xNy0xLjE5LDMuNjItMS4xOWMxLjg1LDAsMy41OSwwLjU0LDUuMjMsMS42MmwtMS4yOSwyLjMxYy0xLjQ3LTAuOS0yLjgxLTEuMzUtNC4wMS0xLjM1Yy0wLjYzLDAtMS4xMiwwLjEzLTEuNDcsMC40DQoJCQljLTAuMzUsMC4yNy0wLjUzLDAuNjMtMC41MywxLjA4YzAsMC4zLDAuMTYsMC41OCwwLjQ3LDAuODRjMC4zMSwwLjI1LDAuNjMsMC40MywwLjk0LDAuNTVjMC4zMSwwLjEyLDAuODIsMC4yOSwxLjUyLDAuNTINCgkJCWMwLjA0LDAuMDIsMC4wOCwwLjA0LDAuMTMsMC4wNWMwLjA1LDAuMDIsMC4xLDAuMDMsMC4xMywwLjAzYzAuNjMsMC4yLDEuMTYsMC4zOSwxLjU5LDAuNThjMC40MywwLjE5LDAuODgsMC40NSwxLjM2LDAuNzcNCgkJCWMwLjQ3LDAuMzIsMC44NCwwLjcyLDEuMDksMS4yYzAuMjUsMC40OCwwLjM4LDEuMDMsMC4zOCwxLjY2YzAsMS40NC0wLjQ5LDIuNTQtMS40OCwzLjMxQzEwNi40OCwyNC4wNiwxMDUuMjEsMjQuNDUsMTAzLjY3LDI0LjQ1DQoJCQl6Ii8+DQoJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xMTguNzgsMjQuNWMtMi4wOCwwLTMuODItMC42OS01LjIxLTIuMDdjLTEuMzktMS4zOC0yLjA5LTMuMTctMi4wOS01LjM2YzAtMi4wNywwLjY2LTMuODIsMS45Ny01LjI1DQoJCQlzMi45Ny0yLjE1LDQuOTgtMi4xNWMyLjE1LDAsMy44MywwLjczLDUuMDIsMi4xOWMxLjE5LDEuNDYsMS43OSwzLjI4LDEuNzksNS40NmMwLDAuMzktMC4wMiwwLjctMC4wNSwwLjkxaC0xMC40NQ0KCQkJYzAuMTgsMS4xMywwLjY0LDIuMDIsMS4zNywyLjY1YzAuNzQsMC42NCwxLjY0LDAuOTYsMi43MiwwLjk2YzEuNCwwLDIuNjgtMC41NywzLjg1LTEuN2wxLjkxLDEuNw0KCQkJQzEyMy4xMywyMy42MiwxMjEuMTksMjQuNSwxMTguNzgsMjQuNXogTTExNC43MSwxNi4wN2g3LjNjLTAuMTEtMS4wOS0wLjQ4LTEuOTktMS4xLTIuNjljLTAuNjMtMC43LTEuNDYtMS4wNS0yLjUxLTEuMDUNCgkJCWMtMC45OSwwLTEuODEsMC4zNS0yLjQ4LDEuMDRDMTE1LjI2LDE0LjA2LDExNC44NiwxNC45NiwxMTQuNzEsMTYuMDd6Ii8+DQoJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xMjguNzIsMjQuMThWNC41MmgzLjI2djE5LjY2SDEyOC43MnoiLz4NCgkJPHBhdGggY2xhc3M9InN0MiIgZD0iTTEzNi40MywyNC4xOFY0LjUyaDMuMjZ2MTkuNjZIMTM2LjQzeiIvPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg0K";

const PRICE_TIERS = [
  { minSheets: 1, maxSheets: 10, prices: [1500, 1800, 1800] },
  { minSheets: 11, maxSheets: 40, prices: [1350, 1650, 1650] },
  { minSheets: 41, maxSheets: 120, prices: [1150, 1400, 1400] },
  { minSheets: 121, maxSheets: 300, prices: [800, 1050, 1050] },
  { minSheets: 301, maxSheets: 99999, prices: [650, 900, 900] },
];

const STICKER_TYPES = [
  { id: 0, label: "Серебро", color: "#C0C0C0", accent: "#8ab4b8" },
  { id: 1, label: "Золото", color: "#FFD700", accent: "#c9a830" },
  { id: 2, label: "Чёрные", color: "#333333", accent: "#555" },
];

const SHEET_FULL_W = 160;
const SHEET_FULL_H = 185;
const PRINT_W = 154;
const PRINT_H = 179;
const MARGIN_X = (SHEET_FULL_W - PRINT_W) / 2;
const MARGIN_Y = (SHEET_FULL_H - PRINT_H) / 2;
const MIN_GAP = 4;

function getTier(sheets, tiers) {
  return tiers.find(t => sheets >= t.minSheets && sheets <= t.maxSheets);
}

function calcHybridLayout(sw, sh, gap) {
  const lw = PRINT_W, lh = PRINT_H;
  if (sw <= 0 || sh <= 0) return { zones: [], total: 0 };
  const fitGrid = (cw, ch, areaW, areaH) => {
    if (cw > areaW || ch > areaH) return { cols: 0, rows: 0 };
    return { cols: 1 + Math.floor((areaW - cw) / (cw + gap)), rows: 1 + Math.floor((areaH - ch) / (ch + gap)) };
  };
  const gridSz = (cols, rows, cw, ch) => ({ w: cols * cw + (cols - 1) * gap, h: rows * ch + (rows - 1) * gap });
  let best = { zones: [], total: 0 };
  const oris = [{ cw: sw, ch: sh, rot: false }, { cw: sh, ch: sw, rot: true }];

  for (const pri of oris) {
    const mg = fitGrid(pri.cw, pri.ch, lw, lh);
    if (mg.cols === 0 || mg.rows === 0) continue;
    const msz = gridSz(mg.cols, mg.rows, pri.cw, pri.ch);
    const mc = mg.cols * mg.rows;
    const rightW = lw - msz.w - gap, bottomH = lh - msz.h - gap;

    // Main only — center main zone in print area
    if (mc > best.total) {
      best = { zones: [{ x: MARGIN_X + (lw - msz.w) / 2, y: MARGIN_Y + (lh - msz.h) / 2, cols: mg.cols, rows: mg.rows, cellW: pri.cw, cellH: pri.ch, rotated: pri.rot }], total: mc };
    }

    const trySplit = (rAW, rAH, rOX, rOY, bAW, bAH, bOX, bOY) => {
      const rC = [], bC = [];
      for (const s of oris) {
        if (rAW >= s.cw && rAH >= s.ch) { const g = fitGrid(s.cw, s.ch, rAW, rAH); if (g.cols > 0 && g.rows > 0) rC.push({ ...g, cw: s.cw, ch: s.ch, rot: s.rot, aW: rAW, aH: rAH, oX: rOX, oY: rOY, count: g.cols * g.rows }); }
        if (bAW >= s.cw && bAH >= s.ch) { const g = fitGrid(s.cw, s.ch, bAW, bAH); if (g.cols > 0 && g.rows > 0) bC.push({ ...g, cw: s.cw, ch: s.ch, rot: s.rot, aW: bAW, aH: bAH, oX: bOX, oY: bOY, count: g.cols * g.rows }); }
      }
      const build = (extras) => {
        const total = mc + extras.reduce((s, e) => s + e.count, 0);
        if (total <= best.total) return;

        // Place main at top-left of print area, centered
        const mainX = MARGIN_X + (lw - msz.w) / 2;
        const mainY = MARGIN_Y + (lh - msz.h) / 2;

        // But with addons we need different approach:
        // Main zone anchored at print area origin, addons relative to it
        // Then center everything together

        // Raw positions: main at (0,0)
        const raw = [{ rx: 0, ry: 0, ...msz, cols: mg.cols, rows: mg.rows, cellW: pri.cw, cellH: pri.ch, rotated: pri.rot }];
        for (const e of extras) {
          const esz = gridSz(e.cols, e.rows, e.cw, e.ch);
          // Center addon within its allocated strip
          const ecx = e.oX + (e.aW - esz.w) / 2;
          const ecy = e.oY + (e.aH - esz.h) / 2;
          raw.push({ rx: ecx, ry: ecy, ...esz, cols: e.cols, rows: e.rows, cellW: e.cw, cellH: e.ch, rotated: e.rot });
        }

        // Find bounding box
        let mnX = Infinity, mnY = Infinity, mxX = -Infinity, mxY = -Infinity;
        for (const z of raw) { mnX = Math.min(mnX, z.rx); mnY = Math.min(mnY, z.ry); mxX = Math.max(mxX, z.rx + z.w); mxY = Math.max(mxY, z.ry + z.h); }
        const bbW = mxX - mnX, bbH = mxY - mnY;

        // Center bounding box within print area
        const oX = MARGIN_X + (lw - bbW) / 2 - mnX;
        const oY = MARGIN_Y + (lh - bbH) / 2 - mnY;

        best = { zones: raw.map(z => ({ x: z.rx + oX, y: z.ry + oY, cols: z.cols, rows: z.rows, cellW: z.cellW, cellH: z.cellH, rotated: z.rotated })), total };
      };
      for (const r of rC) { for (const b of bC) build([r, b]); build([r]); }
      for (const b of bC) build([b]);
    };
    if (rightW > 0 || bottomH > 0) trySplit(rightW, lh, msz.w + gap, 0, msz.w, bottomH, 0, msz.h + gap);
    if (rightW > 0 || bottomH > 0) trySplit(rightW, msz.h, msz.w + gap, 0, lw, bottomH, 0, msz.h + gap);
  }
  return best;
}

function generatePdf(layout, gap, stickerW, stickerH) {
  const mmToPt = v => v * 2.83465;
  const pw = mmToPt(SHEET_FULL_W), ph = mmToPt(SHEET_FULL_H);
  let objId = 0; const newObj = () => ++objId; const offsets = [];
  const catId = newObj(), pgsId = newObj(), pgId = newObj(), cntId = newObj();
  let s = `0.6 0.6 0.6 RG\n0.5 w\n0 0 ${pw.toFixed(2)} ${ph.toFixed(2)} re S\n`;
  const mx = mmToPt(MARGIN_X), my = mmToPt(MARGIN_Y), mw = mmToPt(PRINT_W), mh = mmToPt(PRINT_H);
  s += `0.8 0.8 0.8 RG\n[2 2] 0 d\n0.3 w\n${mx.toFixed(2)} ${my.toFixed(2)} ${mw.toFixed(2)} ${mh.toFixed(2)} re S\n[] 0 d\n`;
  const cls = [{ r: .91, g: .94, b: 1 }, { r: 1, g: .94, b: .85 }, { r: .88, g: 1, b: .9 }];
  let count = 0;
  layout.zones.forEach((z, zi) => {
    const c = cls[zi % cls.length];
    s += `0.2 0.2 0.2 RG\n${c.r} ${c.g} ${c.b} rg\n0.3 w\n`;
    for (let r = 0; r < z.rows; r++) for (let cc = 0; cc < z.cols; cc++) {
      const xm = z.x + cc * (z.cellW + gap), ym = SHEET_FULL_H - z.y - (r + 1) * z.cellH - r * gap;
      const x = mmToPt(xm), y = mmToPt(ym), w = mmToPt(z.cellW), h = mmToPt(z.cellH);
      s += `${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re B\n`;
      count++;
      s += `BT\n0.2 0.2 0.2 rg\n/F1 5 Tf\n${(x + w / 2).toFixed(2)} ${(y + h / 2 - 2).toFixed(2)} Td\n(${count}) Tj\nET\n`;
      s += `${c.r} ${c.g} ${c.b} rg\n`;
    }
  });
  s += `BT\n0 0 0 rg\n/F1 6 Tf\n${mmToPt(3).toFixed(2)} ${mmToPt(2).toFixed(2)} Td\n(${SHEET_FULL_W}x${SHEET_FULL_H}mm | ${stickerW}x${stickerH}mm | gap ${gap}mm | ${layout.total} pcs) Tj\nET\n`;
  const fntId = newObj(); let pdf = "%PDF-1.4\n";
  const wr = (id, ct) => { offsets[id] = pdf.length; pdf += `${id} 0 obj\n${ct}\nendobj\n`; };
  wr(catId, `<< /Type /Catalog /Pages ${pgsId} 0 R >>`);
  wr(pgsId, `<< /Type /Pages /Kids [${pgId} 0 R] /Count 1 >>`);
  wr(pgId, `<< /Type /Page /Parent ${pgsId} 0 R /MediaBox [0 0 ${pw.toFixed(2)} ${ph.toFixed(2)}] /Contents ${cntId} 0 R /Resources << /Font << /F1 ${fntId} 0 R >> >> >>`);
  wr(cntId, `<< /Length ${s.length} >>\nstream\n${s}\nendstream`);
  wr(fntId, `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`);
  const xr = pdf.length; pdf += `xref\n0 ${objId + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= objId; i++) pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  pdf += `trailer\n<< /Size ${objId + 1} /Root ${catId} 0 R >>\nstartxref\n${xr}\n%%EOF`;
  return pdf;
}

function downloadPdf(pdfStr, fn) {
  const b = new Uint8Array(pdfStr.length);
  for (let i = 0; i < pdfStr.length; i++) b[i] = pdfStr.charCodeAt(i);
  const url = URL.createObjectURL(new Blob([b], { type: "application/pdf" }));
  const a = document.createElement("a"); a.href = url; a.download = fn; a.click(); URL.revokeObjectURL(url);
}

const Inp = ({ label, value, onChange, unit, min = 0, style: sx }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 4, ...sx }}>
    {label && <label style={{ fontSize: 12, color: "#2a5a5e", letterSpacing: "0.03em", fontWeight: 600 }}>{label}</label>}
    <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#fff", border: "1px solid #c0dde0", borderRadius: 10, padding: "10px 12px", boxShadow: "0 1px 4px rgba(0,80,80,0.06)" }}>
      <input type="text" inputMode="decimal" value={value === "" ? "" : value}
        onChange={e => {
          let raw = e.target.value.replace(",", ".");
          if (raw === "" || raw === "-") { onChange(""); return; }
          if (/^-?\d*\.?\d*$/.test(raw)) onChange(raw);
        }}
        onBlur={e => {
          const raw = e.target.value.replace(",", ".");
          const num = Number(raw);
          if (raw === "" || isNaN(num)) { onChange(""); return; }
          onChange(Math.max(min, num));
        }}
        onFocus={e => e.target.select()}
        placeholder="—"
        style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#1a3a3e", fontSize: 17, fontFamily: "'Space Mono', monospace", fontWeight: 700, width: 50 }}
      />
      {unit && <span style={{ fontSize: 12, color: "#6a9a9e" }}>{unit}</span>}
    </div>
  </div>
);

export default function StickerCalc() {
  const isStaff = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("mode") === "staff";

  const [stickerW, setStickerW] = useState("");
  const [stickerH, setStickerH] = useState("");
  const [gap, setGap] = useState(4);
  const [quantity, setQuantity] = useState("");
  const [activeType, setActiveType] = useState(0);
  const [tiers, setTiers] = useState(PRICE_TIERS);
  const [showTierEditor, setShowTierEditor] = useState(false);

  const activeTiers = isStaff ? tiers : PRICE_TIERS;

  const numW = Number(stickerW) || 0;
  const numH = Number(stickerH) || 0;
  const numGap = Number(gap) || 0;
  const numQty = Number(quantity) || 0;
  const effectiveGap = numGap < MIN_GAP ? MIN_GAP : numGap;

  const layout = useMemo(() => calcHybridLayout(numW, numH, effectiveGap), [numW, numH, effectiveGap]);
  const perSheet = layout.total;
  // Round sheets to tenths
  const rawSheets = perSheet > 0 && numQty > 0 ? numQty / perSheet : 0;
  const sheetsNeeded = rawSheets > 0 ? Math.round(rawSheets * 10) / 10 : 0;
  const sheetsForTier = Math.ceil(sheetsNeeded);
  const tier = sheetsForTier > 0 ? getTier(sheetsForTier, activeTiers) : null;
  const pricePerSheet = tier ? tier.prices[activeType] : 0;
  const pricePerSticker = perSheet > 0 && tier ? (tier.prices[activeType] / perSheet) : 0;
  const totalCost = sheetsNeeded * pricePerSheet;

  const updateTier = (idx, field, val) => setTiers(prev => prev.map((t, i) => i === idx ? { ...t, [field]: val } : t));
  const updateTierPrice = (idx, typeIdx, val) => setTiers(prev => prev.map((t, i) => { if (i !== idx) return t; const np = [...t.prices]; np[typeIdx] = val; return { ...t, prices: np }; }));
  const addTier = () => { const last = tiers[tiers.length - 1]; setTiers([...tiers, { minSheets: last.maxSheets + 1, maxSheets: last.maxSheets + 100, prices: [0, 0, 0] }]); };
  const removeTier = (idx) => { if (tiers.length > 1) setTiers(tiers.filter((_, i) => i !== idx)); };

  const handleDownloadPdf = useCallback(() => {
    if (perSheet === 0) return;
    downloadPdf(generatePdf(layout, effectiveGap, numW, numH), `stickers_${numW}x${numH}.pdf`);
  }, [layout, effectiveGap, numW, numH, perSheet]);

  const ps = Math.min(280 / SHEET_FULL_W, 280 / SHEET_FULL_H);
  const pvW = SHEET_FULL_W * ps, pvH = SHEET_FULL_H * ps;

  const zc = [
    { bg: "rgba(42,160,168,0.2)", border: "rgba(42,160,168,0.5)" },
    { bg: "rgba(200,160,40,0.2)", border: "rgba(200,160,40,0.5)" },
    { bg: "rgba(60,180,100,0.2)", border: "rgba(60,180,100,0.5)" },
  ];

  const zi = layout.zones.map((z, i) => ({
    label: i === 0 ? "Основная" : `Добор ${i}`,
    cols: z.cols, rows: z.rows, count: z.cols * z.rows,
    rotated: z.rotated, cellW: z.cellW, cellH: z.cellH,
  }));

  const sType = STICKER_TYPES[activeType];
  const card = { background: "rgba(255,255,255,0.92)", borderRadius: 16, padding: 20, border: "1px solid rgba(255,255,255,0.5)", backdropFilter: "blur(10px)", boxShadow: "0 2px 16px rgba(0,80,80,0.08)" };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #43b5a0 0%, #3bbfb2 30%, #2db8b0 60%, #1fa8a0 100%)", padding: "24px 16px 32px", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      <style>{`
        .grid-inputs { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; margin-bottom: 20px; }
        .grid-results { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 20px; }
        .grid-tiers { display: grid; grid-template-columns: 60px 60px 1fr 1fr 1fr 32px; gap: 8px; margin-bottom: 8px; }
        .tabs { display: flex; gap: 8px; margin-bottom: 20px; justify-content: center; flex-wrap: wrap; }
        @media (max-width: 640px) {
          .grid-inputs { grid-template-columns: 1fr 1fr; }
          .grid-results { grid-template-columns: 1fr; }
          .grid-tiers { grid-template-columns: 1fr 1fr; }
          .tabs { gap: 6px; }
          .tabs button { padding: 8px 16px !important; font-size: 13px !important; }
        }
        @media (max-width: 400px) {
          .grid-inputs { grid-template-columns: 1fr; }
        }
      `}</style>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* Header: logo left + contacts right */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
          <div>
            <img src={LOGO_SRC} alt="Nicksell" style={{ height: 36 }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start" }}>
            <a href="tel:+79962283434" style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.9)", textDecoration: "none", fontSize: 13, fontWeight: 500 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              +7 (996) 228-34-34
            </a>
            <a href="mailto:sales@nicksell.ru" style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.9)", textDecoration: "none", fontSize: 13, fontWeight: 500 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              sales@nicksell.ru
            </a>
          </div>
        </div>

        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#fff", margin: 0, textShadow: "0 1px 8px rgba(0,60,60,0.15)" }}>
            Калькулятор наклеек
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 4 }}>
            Лист {SHEET_FULL_W}×{SHEET_FULL_H} мм · Печать {PRINT_W}×{PRINT_H} мм
          </p>
        </div>

        {/* Sticker type tabs */}
        <div className="tabs">
          {STICKER_TYPES.map(t => (
            <button key={t.id} onClick={() => setActiveType(t.id)}
              style={{
                padding: "10px 24px", borderRadius: 12, border: "none",
                background: activeType === t.id ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.2)",
                color: activeType === t.id ? "#1a3a3e" : "rgba(255,255,255,0.9)",
                fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
                display: "flex", alignItems: "center", gap: 8,
                boxShadow: activeType === t.id ? "0 2px 12px rgba(0,60,60,0.15)" : "none"
              }}>
              <span style={{ width: 16, height: 16, borderRadius: 4, background: t.color, display: "inline-block", border: "1px solid rgba(0,0,0,0.15)" }} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Inputs */}
        <div className="grid-inputs">
          <div style={card}>
            <div style={{ fontSize: 11, color: "#2aa0a8", fontWeight: 700, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>Наклейка</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <Inp label="Ширина" value={stickerW} onChange={setStickerW} unit="мм" />
              <Inp label="Высота" value={stickerH} onChange={setStickerH} unit="мм" />
            </div>
          </div>
          <div style={{ ...card, display: "flex", alignItems: "flex-end" }}>
            <Inp label="Отступ" value={gap} onChange={setGap} unit="мм" min={MIN_GAP} style={{ flex: 1 }} />
          </div>
          <div style={{ ...card, display: "flex", alignItems: "flex-end" }}>
            <Inp label="Тираж" value={quantity} onChange={setQuantity} unit="шт" style={{ flex: 1 }} />
          </div>
        </div>

        {/* Results */}
        <div className="grid-results">
          <div style={card}>
            <div style={{ fontSize: 11, color: "#2aa0a8", fontWeight: 700, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>Раскладка</div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 14 }}>
              <div style={{ position: "relative", width: pvW, height: pvH, border: "1.5px solid #b0d8da", borderRadius: 6, background: "#f0f8f8" }}>
                <div style={{ position: "absolute", left: MARGIN_X * ps, top: MARGIN_Y * ps, width: PRINT_W * ps, height: PRINT_H * ps, border: "1px dashed rgba(42,160,168,0.25)", borderRadius: 3, pointerEvents: "none" }} />
                {layout.zones.map((zone, zii) =>
                  Array.from({ length: zone.rows }).map((_, r) =>
                    Array.from({ length: zone.cols }).map((_, c) => {
                      const x = (zone.x + c * (zone.cellW + effectiveGap)) * ps;
                      const y = (zone.y + r * (zone.cellH + effectiveGap)) * ps;
                      const w = zone.cellW * ps, h = zone.cellH * ps;
                      const z = zc[zii % zc.length];
                      return <div key={`${zii}-${r}-${c}`} style={{ position: "absolute", left: x, top: y, width: w, height: h, background: z.bg, border: `1px solid ${z.border}`, borderRadius: 2 }} />;
                    })
                  )
                )}
              </div>
            </div>
            <div style={{ fontSize: 12 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 8 }}>
                <div style={{ color: "#5a8a8e" }}>На листе:</div>
                <div style={{ color: "#1a3a3e", fontFamily: "'Space Mono', monospace", fontWeight: 700, textAlign: "right" }}>{perSheet} шт</div>
              </div>
              {zi.map((z, i) => (
                <div key={i} style={{ background: "rgba(42,160,168,0.06)", borderRadius: 8, padding: "6px 10px", marginBottom: 5, borderLeft: `3px solid ${zc[i % zc.length].border}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 1 }}>
                    <span style={{ color: "#5a8a8e", fontSize: 11 }}>{z.label}</span>
                    <span style={{ color: "#1a3a3e", fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 12 }}>{z.count} шт</span>
                  </div>
                  <div style={{ color: "#7aaa9e", fontSize: 10, fontFamily: "'Space Mono', monospace" }}>
                    {z.cols}×{z.rows} · {z.cellW}×{z.cellH} мм{z.rotated ? " · ↻90°" : ""}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={card}>
            <div style={{ fontSize: 11, color: "#2aa0a8", fontWeight: 700, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Стоимость · <span style={{ color: sType.accent }}>{sType.label}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, fontSize: 12, marginBottom: 14 }}>
              <div style={{ color: "#5a8a8e" }}>Листов:</div>
              <div style={{ color: "#1a3a3e", fontFamily: "'Space Mono', monospace", fontWeight: 700, textAlign: "right" }}>{sheetsNeeded % 1 === 0 ? sheetsNeeded : sheetsNeeded.toFixed(1)}</div>
              <div style={{ color: "#5a8a8e" }}>За лист:</div>
              <div style={{ color: "#1a3a3e", fontFamily: "'Space Mono', monospace", fontWeight: 700, textAlign: "right" }}>{pricePerSheet.toLocaleString("ru")} ₽</div>
              <div style={{ color: "#5a8a8e" }}>За 1 наклейку:</div>
              <div style={{ color: "#c9a830", fontFamily: "'Space Mono', monospace", fontWeight: 700, textAlign: "right" }}>{pricePerSticker.toFixed(2)} ₽</div>
            </div>
            <div style={{ background: "linear-gradient(135deg, #2aa0a8, #1f8a90)", borderRadius: 12, padding: 16, textAlign: "center", marginBottom: 14 }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>Итого</div>
              <div style={{ fontSize: 28, fontFamily: "'Space Mono', monospace", fontWeight: 700, color: "#fff" }}>
                {totalCost.toLocaleString("ru")} ₽
              </div>
            </div>
            <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, minWidth: 280 }}>
              <thead><tr style={{ borderBottom: "1px solid #d0e8ea" }}>
                {["Листов", "Наклеек", "Лист", "1 шт"].map(h => (
                  <th key={h} style={{ color: "#7aaa9e", fontWeight: 500, padding: "6px 4px", textAlign: "right", fontSize: 10, textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {activeTiers.map((t, i) => {
                  const active = tier && t.minSheets === tier.minSheets;
                  const p = t.prices[activeType];
                  const pps = perSheet > 0 ? (p / perSheet).toFixed(2) : "—";
                  const lbl = t.maxSheets >= 99999 ? `от ${t.minSheets}` : `${t.minSheets}–${t.maxSheets}`;
                  const minS = t.minSheets * perSheet, maxS = t.maxSheets >= 99999 ? "∞" : t.maxSheets * perSheet;
                  return (
                    <tr key={i} style={{ background: active ? "rgba(42,160,168,0.08)" : "transparent" }}>
                      <td style={{ padding: "5px 4px", textAlign: "right", fontFamily: "'Space Mono', monospace", color: active ? "#1a3a3e" : "#7aaa9e", fontWeight: active ? 700 : 400 }}>{lbl}</td>
                      <td style={{ padding: "5px 4px", textAlign: "right", fontFamily: "'Space Mono', monospace", color: active ? "#1a3a3e" : "#9ababe", fontSize: 10 }}>{minS.toLocaleString("ru")}–{typeof maxS === "number" ? maxS.toLocaleString("ru") : maxS}</td>
                      <td style={{ padding: "5px 4px", textAlign: "right", fontFamily: "'Space Mono', monospace", color: active ? "#1a3a3e" : "#7aaa9e", fontWeight: active ? 700 : 400 }}>{p.toLocaleString("ru")} ₽</td>
                      <td style={{ padding: "5px 4px", textAlign: "right", fontFamily: "'Space Mono', monospace", color: active ? "#c9a830" : "#7aaa9e", fontWeight: 700 }}>{pps} ₽</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          </div>
        </div>


        {/* Tier editor — staff only */}
        {isStaff && (
          <div style={{ marginBottom: 20 }}>
            <button onClick={() => setShowTierEditor(!showTierEditor)}
              style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 12, padding: "10px 20px", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", width: "100%", transition: "all .15s" }}>
              {showTierEditor ? "▲ Скрыть редактор тарифов" : "▼ Редактировать тарифную сетку"}
            </button>
            {showTierEditor && (
              <div style={{ ...card, marginTop: 12 }}>
                <div style={{ fontSize: 11, color: "#2aa0a8", fontWeight: 700, marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.08em" }}>Тарифная сетка</div>
                <div className="grid-tiers">
                  <span style={{ fontSize: 10, color: "#7aaa9e", textTransform: "uppercase" }}>От</span>
                  <span style={{ fontSize: 10, color: "#7aaa9e", textTransform: "uppercase" }}>До</span>
                  {STICKER_TYPES.map(t => <span key={t.id} style={{ fontSize: 10, color: t.accent, textTransform: "uppercase", textAlign: "center" }}>{t.label}</span>)}
                  <span />
                </div>
                {tiers.map((t, idx) => (
                  <div key={idx} className="grid-tiers">
                    <input type="number" value={t.minSheets} onChange={e => updateTier(idx, "minSheets", Number(e.target.value) || 0)}
                      style={{ background: "#f0f8f8", border: "1px solid #c0dde0", borderRadius: 6, padding: "6px 8px", color: "#1a3a3e", fontSize: 13, fontFamily: "'Space Mono', monospace", fontWeight: 700, width: "100%", textAlign: "center" }} />
                    <input type="number" value={t.maxSheets >= 99999 ? "" : t.maxSheets} placeholder="∞"
                      onChange={e => updateTier(idx, "maxSheets", e.target.value === "" ? 99999 : (Number(e.target.value) || 0))}
                      style={{ background: "#f0f8f8", border: "1px solid #c0dde0", borderRadius: 6, padding: "6px 8px", color: "#1a3a3e", fontSize: 13, fontFamily: "'Space Mono', monospace", fontWeight: 700, width: "100%", textAlign: "center" }} />
                    {STICKER_TYPES.map(st => (
                      <input key={st.id} type="number" value={t.prices[st.id]}
                        onChange={e => updateTierPrice(idx, st.id, Number(e.target.value) || 0)}
                        style={{ background: "#f0f8f8", border: `1px solid ${activeType === st.id ? st.accent + "55" : "#c0dde0"}`, borderRadius: 6, padding: "6px 8px", color: "#1a3a3e", fontSize: 13, fontFamily: "'Space Mono', monospace", fontWeight: 700, width: "100%", textAlign: "center" }} />
                    ))}
                    <button onClick={() => removeTier(idx)}
                      style={{ background: "transparent", border: "1px solid #e0a0a0", borderRadius: 6, color: "#d06060", fontSize: 16, cursor: "pointer", padding: "4px", lineHeight: 1 }}>×</button>
                  </div>
                ))}
                <button onClick={addTier}
                  style={{ background: "transparent", border: "1px dashed #c0dde0", borderRadius: 8, padding: "8px", color: "#7aaa9e", fontSize: 12, cursor: "pointer", width: "100%", marginTop: 4 }}>
                  + Добавить тариф
                </button>
              </div>
            )}
          </div>
        )}

        <button onClick={handleDownloadPdf} disabled={perSheet === 0}
          style={{
            width: "100%", padding: "16px 0", borderRadius: 14, border: "none",
            background: perSheet > 0 ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.3)",
            color: perSheet > 0 ? "#1a3a3e" : "rgba(255,255,255,0.5)",
            fontSize: 15, fontWeight: 700, cursor: perSheet > 0 ? "pointer" : "default",
            letterSpacing: "0.02em", transition: "transform 0.15s, box-shadow 0.15s",
            boxShadow: perSheet > 0 ? "0 4px 20px rgba(0,60,60,0.15)" : "none"
          }}
          onMouseEnter={e => { if (perSheet > 0) { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 6px 28px rgba(0,60,60,0.2)"; } }}
          onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = perSheet > 0 ? "0 4px 20px rgba(0,60,60,0.15)" : "none"; }}
        >
          Скачать PDF-макет раскладки
        </button>
      </div>
    </div>
  );
}
