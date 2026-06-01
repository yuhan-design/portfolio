# Portfolio of Yuhan

個人作品集網站（UI/UX · Web · Graphic），採 **Apex Slate** 極簡科技風：白／淡灰背景、灰藍點綴、RWD 作品網格。

## 技術結構

| 類型 | 說明 |
|------|------|
| 頁面 | 根目錄列表頁 + `detailpages/` 作品詳情（共 70+ HTML） |
| 樣式 | `css/style.css`（原版）+ `css/themes/theme-apex.css`（變數）+ `css/portfolio-redesign.css`（覆寫） |
| 腳本 | `js/theme.js`（footer、作品卡圖文化）、`js/main.js`（導覽、篩選、動畫） |

## 本地預覽

以靜態伺服器開啟根目錄，例如：

```bash
npx serve .
```

瀏覽 `index.html`。

## 主要頁面

- `index.html` — Web Design 作品
- `uiux.html` — UI/UX
- `banner.html` / `edm.html` / `graphic.html` — 其他分類
- `about.html` — 履歷與服務項目

## 維護腳本

- `scripts/finalize-site.ps1` — 批次同步 HTML 的 theme／footer／script 結構

## 設計備註

- 作品卡：4:3 圖 + 下方標題（`theme.js` 自動轉換）
- Graphic 分類：`graphic.html` 使用 chip 篩選 + 數量標籤
- 手機導覽：navbar 僅 logo + 漢堡，選單在 offcanvas
