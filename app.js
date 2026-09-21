const $ = (selector) => document.querySelector(selector);
const properties = window.PROPERTIES;
const stations = ["高田馬場", "新宿", "西新宿", "大久保", "新大久保", "早稲田", "池袋"];
const storageKey = "nestTokyoPropertyActionsV1";
const statuses = ["未確認", "要確認", "問い合わせ中", "内見予定", "有力候補", "対象外", "募集終了"];
const reasons = {
  "要確認":["保育用途", "2方向避難", "エレベーター", "消防・建築条件", "その他"],
  "対象外":["保育用途不可", "避難条件", "賃料が高い", "立地・周辺環境", "面積・間取り", "その他"],
  "募集終了":["成約済み", "募集停止", "掲載終了", "不動産会社に確認済み", "その他"]
};
let actions = loadActions();

const contactDetails = {
  "takadanobaba-1-2f": {building:"ビル名非公開", url:"https://www.inshokuten.com/bukken/bukkens/399219", company:"取扱不動産会社（会員登録後に表示）", contact:"詳細ページの「問い合わせる」から無料問い合わせ"},
  "takadanobaba-3-1f": {building:"ビル名非公開", url:"https://www.inshokuten.com/bukken/bukkens/401845", company:"取扱不動産会社（会員登録後に表示）", contact:"詳細ページの「問い合わせる」から無料問い合わせ"},
  "takadanobaba-3-2f": {building:"ビル名非公開", url:"https://www.inshokuten.com/bukken/bukkens/401847", company:"取扱不動産会社（会員登録後に表示）", contact:"詳細ページの「問い合わせる」から無料問い合わせ"},
  "takadanobaba-1-1f": {building:"ビル名非公開", url:"https://www.inshokuten.com/bukken/bukkens/393547", company:"取扱不動産会社（会員登録後に表示）", contact:"詳細ページの「問い合わせる」から無料問い合わせ"},
  "nishi-okubo-eleven": {building:"西大久保イレブン", url:"https://www.homemate.co.jp/dtl-D664001280101/", company:"株式会社サンネット（掲載取扱会社）", contact:"物件詳細ページのメールフォームから問い合わせ"},
  "tsuchiya-2f": {building:"土屋ビル", url:"https://officee.jp/detail/14385/476066", company:"47株式会社 / officee", contact:"0120-981-247（平日9:00〜19:00）"},
  "tsuchiya-3f": {building:"土屋ビル", url:"https://www.e-miki.com/tokyo23/search/area/13001040005/", company:"三鬼商事", contact:"問合せ番号 021-12626／詳細ページから資料請求"},
  "kabukicho-2f": {building:"ソシアルビル（正式名は要問い合わせ）", url:"https://bk-sagasa-nt.com/tokyo/properties/8247/", company:"ぶけなび掲載取扱会社", contact:"詳細ページから物件ID 8247を伝えて問い合わせ"},
  "tk-shintoshin-2f": {building:"TK新都心ビル", url:"https://www.officetar.jp/building/2220/150730/", company:"株式会社スリースター", contact:"0120-733-383（平日9:30〜18:00）／物件No.002220"},
  "minami-ikebukuro-1f": {building:"池袋第一生命ビルディング", url:"https://mapfan.com/realestate/details/69ba21ba020c0805a5fa1eea", company:"株式会社バイオンマネジメント", contact:"03-5985-4521／物件番号 6989968754"},
  "ikebukuro-first": {building:"池袋ファーストビル", url:"https://tempoly.jp/property/O-1031432911-3", company:"TEMPOLY掲載窓口", contact:"03-5457-7825（平日10:00〜18:00）／物件番号 O-1031432911-3"},
  "homes-takadanobaba-2f": {building:"ビル名は掲載会社へ要確認", url:"https://www.homes.co.jp/chintai/b-1457150042363/", company:"株式会社エステートエージェンシー 東京支店", contact:"0037-633-10228／問い合わせ番号 401469／物件番号 0145715-0042363"},
  "homes-takadanobaba-1f": {building:"ビル名は掲載会社へ要確認", url:"https://www.homes.co.jp/chintai/b-1457150043147/", company:"株式会社エステートエージェンシー 東京支店", contact:"0037-633-10228／問い合わせ番号 058152／物件番号 0145715-0043147"},
  "homes-carmel-103": {building:"カーメルI", url:"https://www.homes.co.jp/chintai/b-1577540000026/", company:"株式会社TFC", contact:"LIFULL HOME'S物件詳細の問い合わせフォームから、物件番号 0157754-0000026を伝えて確認"}
};

stations.forEach((station) => $("#station").insertAdjacentHTML("beforeend", `<option>${station}</option>`));

const escapeHtml = (value) => String(value).replace(/[&<>\"']/g, (character) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[character]));

function loadActions() {
  try { return JSON.parse(localStorage.getItem(storageKey)) || {}; } catch { return {}; }
}

function saveActions() { localStorage.setItem(storageKey, JSON.stringify(actions)); }

function actionPanel(property) {
  const saved = {...{status:"未確認", reason:"", visitDate:"", assignee:"", note:""}, ...(actions[property.id] || {})};
  const statusOptions = statuses.map((value) => `<option ${saved.status === value ? "selected" : ""}>${escapeHtml(value)}</option>`).join("");
  const summaryParts = [saved.visitDate && `内見：${saved.visitDate.replace("T", " ")}`, saved.reason, saved.note].filter(Boolean);
  const reasonGroups = Object.entries(reasons).map(([status, values]) => `<label class="conditional-field" data-show-for="${status}">理由・確認項目<select data-field="reason"><option value="">選択してください</option>${values.map((value) => `<option ${saved.reason === value ? "selected" : ""}>${escapeHtml(value)}</option>`).join("")}</select></label>`).join("");
  return `<section class="action-panel compact" data-property-id="${escapeHtml(property.id)}"><div class="action-summary"><div><span class="current-status status-${escapeHtml(saved.status)}">${escapeHtml(saved.status)}</span><span class="summary-text">${escapeHtml(summaryParts.join(" ／ ") || "メモはありません")}</span></div><button type="button" class="edit-button" data-action="edit">編集</button></div><div class="action-editor" hidden><label>対応状況<select data-field="status">${statusOptions}</select></label>${reasonGroups}<div class="visit-fields" data-show-for="内見予定"><label>内見日時<input type="datetime-local" data-field="visitDate" value="${escapeHtml(saved.visitDate)}"></label><label>担当者<input type="text" data-field="assignee" value="${escapeHtml(saved.assignee)}" placeholder="会社名・担当者名"></label></div><label>メモ<textarea data-field="note" rows="3" placeholder="連絡内容、内見時の確認事項、不適合理由など">${escapeHtml(saved.note)}</textarea></label><div class="action-footer"><span class="save-message" aria-live="polite"></span><button type="button" class="save-button" data-action="save">保存</button><button type="button" class="cancel-button" data-action="cancel">閉じる</button><button type="button" class="clear-button" data-action="clear">リセット</button></div></div></section>`;
}

function updateConditionalFields(panel) {
  const status = panel.querySelector('[data-field="status"]').value;
  panel.querySelectorAll("[data-show-for]").forEach((field) => { field.hidden = field.dataset.showFor !== status; });
}

function createCard(property, index) {
  const details = contactDetails[property.id];
  return `<article class="card" style="--delay:${index * 35}ms"><div class="card-top"><span class="index">${String(index + 1).padStart(2, "0")}</span><span class="badge ${property.fit}">${escapeHtml(property.fitLabel)}</span></div><h2>${escapeHtml(details.building)}</h2><p class="unit">${escapeHtml(property.name)}</p><p class="location">${escapeHtml(property.station)}駅・徒歩${property.walk}分　${escapeHtml(property.address)}</p><div class="key"><div><b>${property.area}</b><span>㎡</span></div><div><b>${escapeHtml(property.floor)}</b><span>募集階</span></div><div><b>${escapeHtml(property.rent)}</b><span>賃料</span></div></div><dl><div><dt>募集用途</dt><dd>${escapeHtml(property.type)}</dd></div><div><dt>構造・築年</dt><dd>${escapeHtml(property.structure)}</dd></div><div><dt>エレベーター</dt><dd>${escapeHtml(property.elevator)}</dd></div><div><dt>独立した2出口</dt><dd>${escapeHtml(property.exits)}</dd></div></dl><div class="assessment"><b>保育施設としての一次評価</b><p>${escapeHtml(property.reason)}</p></div><div class="contact"><b>問い合わせ先</b><p>${escapeHtml(details.company)}<br><strong>${escapeHtml(details.contact)}</strong></p></div><p class="evidence">確認メモ：${escapeHtml(property.evidence)}</p>${actionPanel(property)}<div class="card-foot"><span>${escapeHtml(property.published)}</span><a class="source-button" href="${details.url}" target="_blank" rel="noopener noreferrer" referrerpolicy="no-referrer">元の物件詳細・問い合わせ（新しいタブ） ↗</a></div></article>`;
}

function render() {
  const query = $("#search").value.trim().toLowerCase();
  const station = $("#station").value;
  const fit = $("#fit").value;
  const operationStatus = $("#operationStatus").value;
  const groundOnly = $("#ground").checked;
  const results = properties.filter((property) => (!query || JSON.stringify(property).toLowerCase().includes(query)) && (!station || property.station === station) && (!fit || property.fit === fit) && (!operationStatus || (actions[property.id]?.status || "未確認") === operationStatus) && (!groundOnly || property.floor.startsWith("1階")));
  $("#cards").innerHTML = results.map(createCard).join("");
  $("#resultCount").textContent = results.length;
  $("#empty").hidden = results.length !== 0;
  $("#summary").innerHTML = `<b>${results.length} / ${properties.length}件を表示</b><span>主要確認媒体：at home（直接検索・転載掲載を区別）、LIFULL HOME'S、飲食店ドットコム、オフィス系媒体。該当なしは「物件なし」ではなく継続調査対象です。</span>`;
}

["search", "station", "fit", "operationStatus", "ground"].forEach((id) => $("#" + id).addEventListener("input", render));
$("#cards").addEventListener("click", (event) => {
  const panel = event.target.closest(".action-panel");
  if (!panel) return;
  const id = panel.dataset.propertyId;
  if (event.target.dataset.action === "edit") {
    panel.querySelector(".action-editor").hidden = false; updateConditionalFields(panel);
  } else if (event.target.dataset.action === "cancel") {
    panel.querySelector(".action-editor").hidden = true;
  } else if (event.target.dataset.action === "save") {
    const value = (field) => panel.querySelector(`[data-field="${field}"]`)?.value.trim() || "";
    const status = value("status");
    const visibleReason = panel.querySelector(`[data-show-for="${status}"] [data-field="reason"]`);
    actions[id] = {status, reason:visibleReason?.value || "", visitDate:value("visitDate"), assignee:value("assignee"), note:value("note")};
    saveActions(); render();
  } else if (event.target.dataset.action === "clear") {
    delete actions[id]; saveActions(); render();
  }
});
$("#cards").addEventListener("change", (event) => {
  if (event.target.dataset.field === "status") updateConditionalFields(event.target.closest(".action-panel"));
});
render();
