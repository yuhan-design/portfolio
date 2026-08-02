# Portfolio of Yuhan

個人作品集網站（UI/UX · Web · Graphic），採 Figma Make 設計系統：白／淡灰背景、灰藍點綴、RWD 作品網格。

## 技術結構

| 類型 | 說明 |
|------|------|
| 頁面 | 根目錄列表頁 + `detailpages/` 作品詳情（共 70+ HTML） |
| 樣式 | `css/figma-index.css`（全站唯一全域樣式系統） |
| 腳本 | `js/main.js`（導覽、篩選、動畫） |

## 本地預覽

以靜態伺服器開啟根目錄，例如：

```bash
npx serve .
```

瀏覽 `index.html`。

## 主要頁面

- `index.html` — Web Design 作品
- `works.html` — 作品總覽（含篩選、燈箱）
- `about.html` — 履歷與服務項目

## 維護腳本

- `scripts/finalize-site.ps1` — 舊版 apex 佈景批次同步腳本，目標檔案（`theme-apex.css`／`theme.js`）已隨改版移除，目前已停用

## 設計備註

- 作品卡：4:3 圖 + 下方標題
- 分類篩選：`works.html` 使用 chip 篩選 + 燈箱瀏覽
- 手機導覽：navbar 僅 logo + 漢堡，選單在 offcanvas
