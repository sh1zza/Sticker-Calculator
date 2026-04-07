import { useState, useCallback, useMemo, useEffect, useRef } from "react";

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

const SHEET_FULL_W = 160, SHEET_FULL_H = 185, PRINT_W = 154, PRINT_H = 179;
const MARGIN_X = (SHEET_FULL_W - PRINT_W) / 2, MARGIN_Y = (SHEET_FULL_H - PRINT_H) / 2;
const MIN_GAP = 3, CLIENT_GAP = 4;

function getTier(sheets, tiers) { return tiers.find(t => sheets >= t.minSheets && sheets <= t.maxSheets); }

function calcHybridLayout(sw, sh, gap) {
  const lw = PRINT_W, lh = PRINT_H;
  if (sw <= 0 || sh <= 0) return { zones: [], total: 0 };
  const fitGrid = (cw, ch, aW, aH) => {
    if (cw > aW || ch > aH) return { cols: 0, rows: 0 };
    return { cols: 1 + Math.floor((aW - cw) / (cw + gap)), rows: 1 + Math.floor((aH - ch) / (ch + gap)) };
  };
  const gridSz = (c, r, cw, ch) => ({ w: c * cw + (c - 1) * gap, h: r * ch + (r - 1) * gap });
  let best = { zones: [], total: 0 };
  const oris = [{ cw: sw, ch: sh, rot: false }, { cw: sh, ch: sw, rot: true }];
  for (const pri of oris) {
    const mg = fitGrid(pri.cw, pri.ch, lw, lh);
    if (mg.cols === 0 || mg.rows === 0) continue;
    const msz = gridSz(mg.cols, mg.rows, pri.cw, pri.ch), mc = mg.cols * mg.rows;
    const rightW = lw - msz.w - gap, bottomH = lh - msz.h - gap;
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
        const raw = [{ rx: 0, ry: 0, ...msz, cols: mg.cols, rows: mg.rows, cellW: pri.cw, cellH: pri.ch, rotated: pri.rot }];
        for (const e of extras) { const esz = gridSz(e.cols, e.rows, e.cw, e.ch); raw.push({ rx: e.oX + (e.aW - esz.w) / 2, ry: e.oY + (e.aH - esz.h) / 2, ...esz, cols: e.cols, rows: e.rows, cellW: e.cw, cellH: e.ch, rotated: e.rot }); }
        let mnX = Infinity, mnY = Infinity, mxX = -Infinity, mxY = -Infinity;
        for (const z of raw) { mnX = Math.min(mnX, z.rx); mnY = Math.min(mnY, z.ry); mxX = Math.max(mxX, z.rx + z.w); mxY = Math.max(mxY, z.ry + z.h); }
        const oX = MARGIN_X + (lw - (mxX - mnX)) / 2 - mnX, oY = MARGIN_Y + (lh - (mxY - mnY)) / 2 - mnY;
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

function generatePdf(layout, gap, sW, sH, perSheet, qty, typeName, priceSheet, pricePc, totalCost) {
  // Use canvas to render PDF page with Cyrillic support
  const mmPx = 8; // px per mm for canvas resolution (high-res)
  const cw = SHEET_FULL_W * mmPx, ch = SHEET_FULL_H * mmPx;
  const infoH = 50 * mmPx;
  const totalH = ch + infoH;

  const canvas = document.createElement("canvas");
  canvas.width = cw; canvas.height = totalH;
  const ctx = canvas.getContext("2d");

  // White background
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, cw, totalH);

  // Sheet rect (offset down by infoH from bottom, so sheet at top)
  const sheetY = 0;
  ctx.strokeStyle = "#999";
  ctx.lineWidth = 1;
  ctx.strokeRect(0.5, sheetY + 0.5, cw - 1, ch - 1);

  // Margin guide dashed
  ctx.strokeStyle = "#ccc";
  ctx.setLineDash([4, 4]);
  ctx.strokeRect(MARGIN_X * mmPx, sheetY + MARGIN_Y * mmPx, PRINT_W * mmPx, PRINT_H * mmPx);
  ctx.setLineDash([]);

  // Sticker zones
  const cls = ["rgba(42,160,168,0.2)", "rgba(200,160,40,0.2)", "rgba(60,180,100,0.2)"];
  const brd = ["rgba(42,160,168,0.6)", "rgba(200,160,40,0.6)", "rgba(60,180,100,0.6)"];
  let cnt = 0;
  layout.zones.forEach((z, zi) => {
    for (let r = 0; r < z.rows; r++) for (let cc = 0; cc < z.cols; cc++) {
      const x = (z.x + cc * (z.cellW + gap)) * mmPx;
      const y = sheetY + (z.y + r * (z.cellH + gap)) * mmPx;
      const w = z.cellW * mmPx, h = z.cellH * mmPx;
      ctx.fillStyle = cls[zi % cls.length];
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = brd[zi % brd.length];
      ctx.lineWidth = 0.5;
      ctx.strokeRect(x, y, w, h);
      cnt++;
      ctx.fillStyle = "#555";
      ctx.font = `${Math.max(8, mmPx * 2.5)}px sans-serif`;
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(String(cnt), x + w / 2, y + h / 2);
    }
  });

  // Info block below sheet
  const iy = ch + 10;
  ctx.textAlign = "left"; ctx.textBaseline = "top";

  ctx.fillStyle = "#0a6668";
  ctx.font = `bold ${mmPx * 4}px sans-serif`;
  ctx.fillText(`Nicksell  |  ${sW}×${sH} мм  |  ${typeName}`, 10, iy);

  ctx.fillStyle = "#333";
  ctx.font = `${mmPx * 3}px sans-serif`;
  const sheets = qty > 0 && perSheet > 0 ? Math.round(qty / perSheet * 10) / 10 : 0;
  ctx.fillText(`На листе: ${perSheet} шт   |   Листов: ${sheets}   |   Тираж: ${qty} шт`, 10, iy + mmPx * 6);
  ctx.fillText(`За лист: ${priceSheet} ₽   |   За 1 шт: ${pricePc} ₽   |   Итого: ${totalCost} ₽`, 10, iy + mmPx * 11);

  ctx.fillStyle = "#999";
  ctx.font = `${mmPx * 2.2}px sans-serif`;
  ctx.fillText(`nicksell.ru  |  +7 (996) 228-34-34  |  sales@nicksell.ru`, 10, iy + mmPx * 17);

  // Convert canvas to PDF with embedded image
  const imgData = canvas.toDataURL("image/jpeg", 0.98);
  const raw = atob(imgData.split(",")[1]);
  const bytes = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);

  // Build minimal PDF with the image
  const mmPt = 2.83465;
  const pw = SHEET_FULL_W * mmPt, pth = totalH / mmPx * mmPt;

  let oi = 0; const no = () => ++oi; const off = [];
  const catId = no(), pagesId = no(), pageId = no(), contId = no(), imgId = no();

  const stream = `q ${pw.toFixed(2)} 0 0 ${pth.toFixed(2)} 0 0 cm /Img1 Do Q\n`;

  let parts = ["%PDF-1.4\n"];
  const wr = (id, content) => { off[id] = parts.join("").length; parts.push(`${id} 0 obj\n${content}\nendobj\n`); };

  wr(catId, `<< /Type /Catalog /Pages ${pagesId} 0 R >>`);
  wr(pagesId, `<< /Type /Pages /Kids [${pageId} 0 R] /Count 1 >>`);
  wr(pageId, `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${pw.toFixed(2)} ${pth.toFixed(2)}] /Contents ${contId} 0 R /Resources << /XObject << /Img1 ${imgId} 0 R >> >> >>`);
  wr(contId, `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);

  // Image XObject
  off[imgId] = parts.join("").length;
  const imgHead = `${imgId} 0 obj\n<< /Type /XObject /Subtype /Image /Width ${cw} /Height ${totalH} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${bytes.length} >>\nstream\n`;
  const imgTail = `\nendstream\nendobj\n`;

  // Combine all parts into Uint8Array
  const textPart = parts.join("");
  const xrefContent = [];
  const encoder = new TextEncoder();
  const textBytes = encoder.encode(textPart);
  const headBytes = encoder.encode(imgHead);
  const tailBytes = encoder.encode(imgTail);

  // Recalc offset for image object
  off[imgId] = textBytes.length;

  const afterImg = textBytes.length + headBytes.length + bytes.length + tailBytes.length;

  // Build xref
  let xref = `xref\n0 ${oi + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= oi; i++) {
    const o = i === imgId ? off[i] : off[i];
    xref += `${String(o).padStart(10, "0")} 00000 n \n`;
  }
  xref += `trailer\n<< /Size ${oi + 1} /Root ${catId} 0 R >>\nstartxref\n${afterImg}\n%%EOF`;
  const xrefBytes = encoder.encode(xref);

  // Merge all
  const total = new Uint8Array(textBytes.length + headBytes.length + bytes.length + tailBytes.length + xrefBytes.length);
  let pos = 0;
  total.set(textBytes, pos); pos += textBytes.length;
  total.set(headBytes, pos); pos += headBytes.length;
  total.set(bytes, pos); pos += bytes.length;
  total.set(tailBytes, pos); pos += tailBytes.length;
  total.set(xrefBytes, pos);

  return total;
}

function downloadPdf(data, fn) {
  const blob = data instanceof Uint8Array
    ? new Blob([data], { type: "application/pdf" })
    : (() => { const b = new Uint8Array(data.length); for (let i = 0; i < data.length; i++) b[i] = data.charCodeAt(i); return new Blob([b], { type: "application/pdf" }); })();
  const u = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = u; a.download = fn; a.click(); URL.revokeObjectURL(u);
}

// Animated number component
function AnimNum({ value, decimals = 0, prefix = "", suffix = "" }) {
  const [display, setDisplay] = useState(value);
  const ref = useRef(null);
  useEffect(() => {
    const start = display, end = value, dur = 400;
    if (start === end) return;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setDisplay(start + (end - start) * ease);
      if (p < 1) ref.current = requestAnimationFrame(tick);
    };
    ref.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(ref.current);
  }, [value]);
  const formatted = decimals > 0 ? display.toFixed(decimals) : Math.round(display).toLocaleString("ru");
  return <>{prefix}{formatted}{suffix}</>;
}

const Inp = ({ label, value, onChange, unit, min = 0, style: sx }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 4, ...sx }}>
    {label && <label style={{ fontSize: 12, color: "#2a5a5e", letterSpacing: "0.03em", fontWeight: 600 }}>{label}</label>}
    <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#fff", border: "1px solid #c0dde0", borderRadius: 10, padding: "10px 12px", boxShadow: "0 1px 4px rgba(0,80,80,0.06)" }}>
      <input type="text" inputMode="decimal" value={value === "" ? "" : value}
        onChange={e => { let raw = e.target.value.replace(",", "."); if (raw === "" || raw === "-") { onChange(""); return; } if (/^-?\d*\.?\d*$/.test(raw)) onChange(raw); }}
        onBlur={e => { const raw = e.target.value.replace(",", "."); const num = Number(raw); if (raw === "" || isNaN(num)) { onChange(""); return; } onChange(Math.max(min, num)); }}
        onFocus={e => e.target.select()} placeholder="—"
        style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#1a3a3e", fontSize: 17, fontFamily: "'Space Mono', monospace", fontWeight: 700, width: 50 }}
      />
      {unit && <span style={{ fontSize: 12, color: "#6a9a9e" }}>{unit}</span>}
    </div>
  </div>
);

export default function StickerCalc() {
  const isStaff = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("mode") === "staff";

  // Read URL params for shared calc
  const initParams = useMemo(() => {
    if (typeof window === "undefined") return {};
    const p = new URLSearchParams(window.location.search);
    return { w: p.get("w") || "", h: p.get("h") || "", qty: p.get("qty") || "", type: Number(p.get("type")) || 0 };
  }, []);

  const [stickerW, setStickerW] = useState(initParams.w || "");
  const [stickerH, setStickerH] = useState(initParams.h || "");
  const [gap, setGap] = useState(4);
  const [quantity, setQuantity] = useState(initParams.qty || "");
  const [activeType, setActiveType] = useState(initParams.type || 0);
  const [tiers, setTiers] = useState(PRICE_TIERS);
  const [showTierEditor, setShowTierEditor] = useState(false);
  const [copied, setCopied] = useState(false);

  const numW = Number(stickerW) || 0, numH = Number(stickerH) || 0, numGap = Number(gap) || 0, numQty = Number(quantity) || 0;
  const effectiveGap = isStaff ? (numGap < MIN_GAP ? MIN_GAP : numGap) : CLIENT_GAP;
  const activeTiers = isStaff ? tiers : PRICE_TIERS;

  const layout = useMemo(() => calcHybridLayout(numW, numH, effectiveGap), [numW, numH, effectiveGap]);
  const perSheet = layout.total;
  const rawSheets = perSheet > 0 && numQty > 0 ? numQty / perSheet : 0;
  const sheetsNeeded = rawSheets > 0 ? Math.round(rawSheets * 10) / 10 : 0;
  const sheetsForTier = Math.ceil(sheetsNeeded);
  const tier = sheetsForTier > 0 ? getTier(sheetsForTier, activeTiers) : null;
  const pricePerSheet = tier ? tier.prices[activeType] : 0;
  const pricePerSticker = perSheet > 0 && tier ? (tier.prices[activeType] / perSheet) : 0;
  const totalCost = numQty * pricePerSticker;

  const updateTier = (idx, f, v) => setTiers(p => p.map((t, i) => i === idx ? { ...t, [f]: v } : t));
  const updateTierPrice = (idx, ti, v) => setTiers(p => p.map((t, i) => { if (i !== idx) return t; const np = [...t.prices]; np[ti] = v; return { ...t, prices: np }; }));
  const addTier = () => { const l = tiers[tiers.length - 1]; setTiers([...tiers, { minSheets: l.maxSheets + 1, maxSheets: l.maxSheets + 100, prices: [0, 0, 0] }]); };
  const removeTier = (idx) => { if (tiers.length > 1) setTiers(tiers.filter((_, i) => i !== idx)); };

  const sType = STICKER_TYPES[activeType];

  const handleDownloadPdf = useCallback(() => {
    if (perSheet === 0) return;
    const pdf = generatePdf(layout, effectiveGap, numW, numH, perSheet, numQty, sType.label, pricePerSheet, pricePerSticker.toFixed(2), Math.round(totalCost));
    downloadPdf(pdf, `nicksell_${numW}x${numH}_${sType.label}.pdf`);
  }, [layout, effectiveGap, numW, numH, perSheet, numQty, sType, pricePerSheet, pricePerSticker, totalCost]);

  const handleShare = useCallback(() => {
    const base = window.location.origin + window.location.pathname;
    const params = new URLSearchParams();
    if (numW) params.set("w", numW);
    if (numH) params.set("h", numH);
    if (numQty) params.set("qty", numQty);
    if (activeType) params.set("type", activeType);
    const url = base + "?" + params.toString();
    navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }, [numW, numH, numQty, activeType]);

  const ps = Math.min(280 / SHEET_FULL_W, 280 / SHEET_FULL_H);
  const pvW = SHEET_FULL_W * ps, pvH = SHEET_FULL_H * ps;
  const zc = [
    { bg: "rgba(42,160,168,0.2)", border: "rgba(42,160,168,0.5)" },
    { bg: "rgba(200,160,40,0.2)", border: "rgba(200,160,40,0.5)" },
    { bg: "rgba(60,180,100,0.2)", border: "rgba(60,180,100,0.5)" },
  ];
  const card = { background: "rgba(255,255,255,0.92)", borderRadius: 16, padding: 20, border: "1px solid rgba(255,255,255,0.5)", backdropFilter: "blur(10px)", boxShadow: "0 2px 16px rgba(0,80,80,0.08)" };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #43b5a0 0%, #3bbfb2 30%, #2db8b0 60%, #1fa8a0 100%)", padding: "24px 16px 100px", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      <style>{`
        .grid-inputs { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; margin-bottom: 20px; }
        .grid-results { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 20px; }
        .grid-tiers { display: grid; grid-template-columns: 60px 60px 1fr 1fr 1fr 32px; gap: 8px; margin-bottom: 8px; }
        .tabs { display: flex; gap: 8px; margin-bottom: 20px; justify-content: center; flex-wrap: wrap; }
        .sticky-bottom { display: none; }
        @media (max-width: 640px) {
          .grid-inputs { grid-template-columns: 1fr 1fr; }
          .grid-results { grid-template-columns: 1fr; }
          .grid-tiers { grid-template-columns: 1fr 1fr; }
          .tabs { gap: 6px; }
          .tabs button { padding: 8px 16px !important; font-size: 13px !important; }
          .sticky-bottom { display: flex; position: fixed; bottom: 0; left: 0; right: 0; padding: 12px 16px; background: linear-gradient(0deg, rgba(31,168,160,0.98) 0%, rgba(31,168,160,0.9) 100%); backdrop-filter: blur(10px); z-index: 100; gap: 8px; }
          .main-download { display: none !important; }
        }
        @media (max-width: 400px) { .grid-inputs { grid-template-columns: 1fr; } }
      `}</style>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
          <a href="https://nicksell.ru" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <img src={LOGO_SRC} alt="Nicksell" style={{ height: 36, cursor: "pointer" }} />
          </a>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start" }}>
            <a href="tel:+79962283434" style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.9)", textDecoration: "none", fontSize: 13, fontWeight: 500 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.88.37 1.87.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.94.33 1.93.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              +7 (996) 228-34-34
            </a>
            <a href="mailto:sales@nicksell.ru" style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.9)", textDecoration: "none", fontSize: 13, fontWeight: 500 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              sales@nicksell.ru
            </a>
          </div>
        </div>

        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#fff", margin: 0, textShadow: "0 1px 8px rgba(0,60,60,0.15)" }}>Калькулятор наклеек</h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 4 }}>Лист {SHEET_FULL_W}×{SHEET_FULL_H} мм · Печать {PRINT_W}×{PRINT_H} мм</p>
        </div>

        <div className="tabs">
          {STICKER_TYPES.map(t => (
            <button key={t.id} onClick={() => setActiveType(t.id)} style={{
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

        <div className="grid-inputs">
          <div style={card}>
            <div style={{ fontSize: 11, color: "#2aa0a8", fontWeight: 700, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>Наклейка</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <Inp label="Ширина" value={stickerW} onChange={setStickerW} unit="мм" />
              <Inp label="Высота" value={stickerH} onChange={setStickerH} unit="мм" />
            </div>
          </div>
          {isStaff && <div style={{ ...card, display: "flex", alignItems: "flex-end" }}><Inp label="Отступ" value={gap} onChange={setGap} unit="мм" min={3} style={{ flex: 1 }} /></div>}
          <div style={{ ...card, display: "flex", alignItems: "flex-end" }}><Inp label="Тираж" value={quantity} onChange={setQuantity} unit="шт" style={{ flex: 1 }} /></div>
        </div>

        {/* Results: Стоимость first, Раскладка second */}
        <div className="grid-results">
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
                <AnimNum value={Math.round(totalCost)} suffix=" ₽" />
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
                  const p = t.prices[activeType], pps = perSheet > 0 ? (p / perSheet).toFixed(2) : "—";
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
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                <div style={{ color: "#5a8a8e" }}>На листе:</div>
                <div style={{ color: "#1a3a3e", fontFamily: "'Space Mono', monospace", fontWeight: 700, textAlign: "right" }}>{perSheet} шт</div>
              </div>
            </div>
          </div>
        </div>

        {/* Staff tier editor */}
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
                    <input type="number" value={t.minSheets} onChange={e => updateTier(idx, "minSheets", Number(e.target.value) || 0)} style={{ background: "#f0f8f8", border: "1px solid #c0dde0", borderRadius: 6, padding: "6px 8px", color: "#1a3a3e", fontSize: 13, fontFamily: "'Space Mono', monospace", fontWeight: 700, width: "100%", textAlign: "center" }} />
                    <input type="number" value={t.maxSheets >= 99999 ? "" : t.maxSheets} placeholder="∞" onChange={e => updateTier(idx, "maxSheets", e.target.value === "" ? 99999 : (Number(e.target.value) || 0))} style={{ background: "#f0f8f8", border: "1px solid #c0dde0", borderRadius: 6, padding: "6px 8px", color: "#1a3a3e", fontSize: 13, fontFamily: "'Space Mono', monospace", fontWeight: 700, width: "100%", textAlign: "center" }} />
                    {STICKER_TYPES.map(st => (
                      <input key={st.id} type="number" value={t.prices[st.id]} onChange={e => updateTierPrice(idx, st.id, Number(e.target.value) || 0)} style={{ background: "#f0f8f8", border: `1px solid ${activeType === st.id ? st.accent + "55" : "#c0dde0"}`, borderRadius: 6, padding: "6px 8px", color: "#1a3a3e", fontSize: 13, fontFamily: "'Space Mono', monospace", fontWeight: 700, width: "100%", textAlign: "center" }} />
                    ))}
                    <button onClick={() => removeTier(idx)} style={{ background: "transparent", border: "1px solid #e0a0a0", borderRadius: 6, color: "#d06060", fontSize: 16, cursor: "pointer", padding: "4px", lineHeight: 1 }}>×</button>
                  </div>
                ))}
                <button onClick={addTier} style={{ background: "transparent", border: "1px dashed #c0dde0", borderRadius: 8, padding: "8px", color: "#7aaa9e", fontSize: 12, cursor: "pointer", width: "100%", marginTop: 4 }}>+ Добавить тариф</button>
              </div>
            )}
          </div>
        )}

        {/* Desktop buttons */}
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={handleShare} style={{
            flex: "0 0 auto", padding: "16px 20px", borderRadius: 14, border: "none",
            background: "rgba(255,255,255,0.2)", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
            display: "flex", alignItems: "center", gap: 8
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            {copied ? "Скопировано!" : "Поделиться"}
          </button>
          <button className="main-download" onClick={handleDownloadPdf} disabled={perSheet === 0} style={{
            flex: 1, padding: "16px 0", borderRadius: 14, border: "none",
            background: perSheet > 0 ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.3)",
            color: perSheet > 0 ? "#1a3a3e" : "rgba(255,255,255,0.5)",
            fontSize: 15, fontWeight: 700, cursor: perSheet > 0 ? "pointer" : "default",
            boxShadow: perSheet > 0 ? "0 4px 20px rgba(0,60,60,0.15)" : "none"
          }}>
            Скачать PDF-макет
          </button>
        </div>
      </div>

      {/* Sticky mobile bottom bar */}
      <div className="sticky-bottom">
        <button onClick={handleShare} style={{ padding: "12px 16px", borderRadius: 12, border: "none", background: "rgba(255,255,255,0.2)", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          {copied ? "Скопировано!" : "Поделиться"}
        </button>
        <button onClick={handleDownloadPdf} disabled={perSheet === 0} style={{
          flex: 1, padding: "12px 0", borderRadius: 12, border: "none",
          background: perSheet > 0 ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.3)",
          color: perSheet > 0 ? "#1a3a3e" : "rgba(255,255,255,0.5)",
          fontSize: 14, fontWeight: 700, cursor: perSheet > 0 ? "pointer" : "default",
        }}>
          Скачать PDF
        </button>
      </div>
    </div>
  );
}
