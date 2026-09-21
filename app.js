const $ = (selector) => document.querySelector(selector);
const properties = window.PROPERTIES;
const stations = ["高田馬場", "新宿", "西新宿", "大久保", "新大久保", "早稲田", "池袋"];

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
  "ikebukuro-first": {building:"池袋ファーストビル", url:"https://tempoly.jp/property/O-1031432911-3", company:"TEMPOLY掲載窓口", contact:"03-5457-7825（平日10:00〜18:00）／物件番号 O-1031432911-3"}
};

stations.forEach((station) => $("#station").insertAdjacentHTML("beforeend", `<option>${station}</option>`));

const escapeHtml = (value) => String(value).replace(/[&<>\"']/g, (character) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[character]));

function createCard(property, index) {
  const details = contactDetails[property.id];
  return `<article class="card" style="--delay:${index * 35}ms"><div class="card-top"><span class="index">${String(index + 1).padStart(2, "0")}</span><span class="badge ${property.fit}">${escapeHtml(property.fitLabel)}</span></div><h2>${escapeHtml(details.building)}</h2><p class="unit">${escapeHtml(property.name)}</p><p class="location">${escapeHtml(property.station)}駅・徒歩${property.walk}分　${escapeHtml(property.address)}</p><div class="key"><div><b>${property.area}</b><span>㎡</span></div><div><b>${escapeHtml(property.floor)}</b><span>募集階</span></div><div><b>${escapeHtml(property.rent)}</b><span>賃料</span></div></div><dl><div><dt>募集用途</dt><dd>${escapeHtml(property.type)}</dd></div><div><dt>構造・築年</dt><dd>${escapeHtml(property.structure)}</dd></div><div><dt>エレベーター</dt><dd>${escapeHtml(property.elevator)}</dd></div><div><dt>独立した2出口</dt><dd>${escapeHtml(property.exits)}</dd></div></dl><div class="assessment"><b>保育施設としての一次評価</b><p>${escapeHtml(property.reason)}</p></div><div class="contact"><b>問い合わせ先</b><p>${escapeHtml(details.company)}<br><strong>${escapeHtml(details.contact)}</strong></p></div><p class="evidence">確認メモ：${escapeHtml(property.evidence)}</p><div class="card-foot"><span>${escapeHtml(property.published)}</span><a class="source-button" href="${details.url}" target="_blank" rel="noopener">元の物件詳細・問い合わせ ↗</a></div></article>`;
}

function render() {
  const query = $("#search").value.trim().toLowerCase();
  const station = $("#station").value;
  const fit = $("#fit").value;
  const groundOnly = $("#ground").checked;
  const results = properties.filter((property) => (!query || JSON.stringify(property).toLowerCase().includes(query)) && (!station || property.station === station) && (!fit || property.fit === fit) && (!groundOnly || property.floor.startsWith("1階")));
  $("#cards").innerHTML = results.map(createCard).join("");
  $("#resultCount").textContent = results.length;
  $("#empty").hidden = results.length !== 0;
  $("#summary").innerHTML = `<b>${results.length} / ${properties.length}件を表示</b><span>早稲田・西新宿では、今回の公開検索で全条件を確認できる募集中区画を特定できませんでした。該当なしではなく、継続調査対象です。</span>`;
}

document.querySelectorAll("input, select").forEach((element) => element.addEventListener("input", render));
render();
