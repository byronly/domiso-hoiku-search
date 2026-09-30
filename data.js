// 2026-09-30 追加調査分。
// 取得した公開情報に基づく候補であり、現在の空室確認ではありません。
(() => {
  const additions = [
    {
      id: "homes-higashiikebukuro-3f",
      name: "東池袋ビル 3F",
      station: "池袋",
      walk: 11,
      address: "東京都豊島区東池袋4丁目3-3",
      type: "貸店舗・事務所",
      area: 64.77,
      floor: "3階 / 9階建",
      rent: "44万円 / 月（管理費33,000円・税区分要確認）",
      structure: "鉄骨造・2023年2月",
      elevator: "有（転載情報・要再確認）",
      exits: "不明",
      published: "公開2026-07-16／転載情報更新2026-08-18",
      fit: "review",
      fitLabel: "要重点確認",
      reason:
        "検索条件内ですが、3階の幼児避難、独立した2出口、保育用途の承諾、実効保育面積、定期借家2年の継続性を重点確認。行政・建築・消防上の確認ではありません。",
      source: "https://www.homes.co.jp/chintai/b-1162050021282/",
      sourceName: "LIFULL HOME'S／goo住宅・不動産（転載）",
      evidence:
        "一覧と転載情報に64.77㎡・44万円・3階の記載。転載では現況居住中・引渡2026年8月下旬の古い情報。現在募集中かは未確認。",
      checkedAt: "2026-09-30",
      listingState: "unverified",
      listingNote:
        "詳細原掲載を取得できず、転載の更新日も古いため要再確認。内定の確認はありません。",
      relatedSource: {
        url: "https://house.goo.ne.jp/rent/bb/detail/4/13116/1162050021282/116205/x41162050021282.html",
        label: "条件・問い合わせ先の転載情報"
      },
      contact: {
        building: "東池袋ビル",
        url: "https://www.homes.co.jp/chintai/b-1162050021282/",
        company: "株式会社サンライズ",
        contact:
          "03-3356-1101／管理コード21282（転載情報のため最新受付状況を確認）"
      }
    },
    {
      id: "homes-meisho-mg-3f",
      name: "明昌ＭＧビル 3階",
      station: "池袋",
      walk: 8,
      address: "東京都豊島区東池袋3丁目9-9",
      type: "貸事務所",
      area: 72.04,
      floor: "3階 / 10階建",
      rent: "31.174万円 / 月（税込換算・共益費57,860円）",
      structure: "SRC・1987年9月",
      elevator: "有（掲載情報・要再確認）",
      exits: "不明",
      published: "掲載日・媒体更新日：不明",
      fit: "review",
      fitLabel: "要重点確認",
      reason:
        "検索条件内ですが、事務所から保育用途への転用承諾、3階の幼児避難、独立した2出口、防火区画、採光換気、児童用設備を重点確認。行政・建築・消防上の確認ではありません。",
      source: "https://www.builbank-r.com/tokyo/t109072/",
      sourceName: "ビルバンク／LIFULL HOME'S一覧",
      evidence:
        "取得した掲載情報に3階72.04㎡・即日入居可。税別賃料283,400円・共益費52,600円を税込換算すると311,740円・57,860円でHOME'S一覧と一致。現在の空室は未確認。",
      checkedAt: "2026-09-30",
      listingState: "unverified",
      listingNote:
        "取得情報の掲載更新日を確認できないため、募集継続・保育用途を問い合わせて確認。",
      contact: {
        building: "明昌ＭＧビル",
        url: "https://www.builbank-r.com/tokyo/t109072/",
        company: "株式会社ビルバンク",
        contact:
          "0120-95-3737／物件番号B2001P（平日9:00〜17:30）"
      }
    }
  ];

  // 同じ追加コードを貼り付けても、同一IDの重複を防ぎます。
  for (const property of additions) {
    const index = window.PROPERTIES.findIndex(
      item => item.id === property.id
    );
    if (index === -1) {
      window.PROPERTIES.push(property);
    } else {
      window.PROPERTIES[index] = property;
    }
  }
})();
