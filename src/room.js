const DAKUON = [
  "が",
  "ぎ",
  "ぐ",
  "げ",
  "ご",
  "ざ",
  "じ",
  "ず",
  "ぜ",
  "ぞ",
  "だ",
  "ぢ",
  "づ",
  "で",
  "ど",
  "ば",
  "び",
  "ぶ",
  "べ",
  "ぼ",
];

const YOUON = ["ぁ", "ぃ", "ぅ", "ぇ", "ぉ", "ゃ", "ゅ", "ょ", "ゎ"];

class Rule {
  constructor({ note, func }) {
    this.note = note;
    this.func = func;
  }

  validate(previousValue = "", value = "") {
    return this.func(previousValue, value);
  }
}

export const hiragana = new Rule({
  note: "ひらがな",
  func: (_, v) => {
    const reg = /^[\u3041-\u3093\u30FC]+$/;
    return reg.test(v);
  },
});

export const shiritori1 = new Rule({
  note: "しりとり",
  func: (_, v) => v.length > 1,
});

export const shiritori = new Rule({
  note: "しりとり",
  func: (pv, v) => {
    if (pv.length <= 1 || v.length <= 1) {
      return false;
    }

    pv = pv.replace(/ー/g, "");

    let b = pv?.[pv.length - 1];
    let f = v?.[0];

    if (b === "ん") {
      return false;
    }

    if (YOUON.includes(b)) {
      b = pv?.[pv.length - 2] + pv?.[pv.length - 1];
      f = v?.[0] + v?.[1];
    }
    return b === f;
  },
});

export const IndexFirst = ({ x = "" }) => {
  return new Rule({
    note: `ワードの最初の文字が『${x}』`,
    func: (_, v) => v?.[0] === x,
  });
};

export const IndexLast = ({ x = "" }) => {
  return new Rule({
    note: `ワードの最後の文字が『${x}』`,
    func: (_, v) => v?.[v?.length - 1] === x,
  });
};

export const IncludeMoreThan = ({ x = "", y = 1, z = [] }) => {
  return new Rule({
    note: `ワードが${x}を${y}回以上含む`,
    func: (_, v) => {
      let count = 0;
      for (var i = 0; i < v.length; i++) {
        if (z.includes(v[i])) {
          count += 1;
        }
      }
      return count >= y;
    },
  });
};

export const Length = ({ x = 1 }) => {
  return new Rule({
    note: `ワードの文字数は ${x}文字`,
    func: (_, v) => v.length === x,
  });
};

export const LengthMoreThan = ({ x = 1 }) => {
  return new Rule({
    note: `ワードの文字数は ${x}文字以上`,
    func: (_, v) => v.length >= x,
  });
};

export const AlwaysTrue = ({ x }) => {
  return new Rule({
    note: x,
    func: (_, v) => true,
  });
};

export const Equal = ({ x = "" }) => {
  return new Rule({
    note: `ワードは『${x}』である`,
    func: (_, v) => v === x,
  });
};

export class Room {
  constructor({ name, env }) {
    const wordsProduction = [
      {
        value: "",
        status: "？",
        note: "",
        rules: [hiragana, shiritori1, IndexFirst({ x: "き" })],
      },
      {
        value: "",
        status: "？",
        note: "",
        rules: [hiragana, shiritori],
      },
      {
        value: "",
        status: "？",
        note: "",
        rules: [hiragana, shiritori],
      },
      {
        value: "",
        status: "？",
        note: "",
        rules: [hiragana, shiritori],
      },
      {
        value: "",
        status: "？",
        note: "",
        rules: [hiragana, shiritori, IndexFirst({ x: "ろ" })],
      },
      {
        value: "",
        status: "？",
        note: "",
        rules: [hiragana, shiritori],
      },
      {
        value: "",
        status: "？",
        note: "",
        rules: [hiragana, shiritori],
      },
      {
        value: "",
        status: "？",
        note: "",
        rules: [hiragana, shiritori],
      },
      {
        value: "",
        status: "？",
        note: "",
        rules: [
          hiragana,
          shiritori,
          IncludeMoreThan({
            x: "濁音",
            y: 2,
            z: DAKUON,
          }),
        ],
      },
      {
        value: "",
        status: "？",
        note: "",
        rules: [hiragana, shiritori],
      },
      {
        value: "",
        status: "？",
        note: "",
        rules: [hiragana, shiritori],
      },
      {
        value: "",
        status: "？",
        note: "",
        rules: [hiragana, shiritori, Length({ x: 6 })],
      },
      {
        value: "",
        status: "？",
        note: "",
        rules: [hiragana, shiritori],
      },
      {
        value: "",
        status: "？",
        note: "",
        rules: [hiragana, shiritori],
      },
      {
        value: "",
        status: "？",
        note: "",
        rules: [hiragana, shiritori],
      },
      {
        value: "",
        status: "？",
        note: "",
        rules: [
          hiragana,
          shiritori,
          AlwaysTrue({
            x: "ワードは チームメンバーを 50音順に並べたとき 最後に来る人が持っている",
          }),
        ],
      },
      {
        value: "",
        status: "？",
        note: "",
        rules: [hiragana, shiritori],
      },
      {
        value: "",
        status: "？",
        note: "",
        rules: [hiragana, shiritori, IndexLast({ x: "え" })],
      },
      {
        value: "",
        status: "？",
        note: "",
        rules: [hiragana, shiritori],
      },
      {
        value: "",
        status: "？",
        note: "",
        rules: [hiragana, shiritori],
      },
      {
        value: "",
        status: "？",
        note: "",
        rules: [hiragana, shiritori, IndexLast({ x: "や" })],
      },
      {
        value: "",
        status: "？",
        note: "",
        rules: [
          hiragana,
          shiritori,
          LengthMoreThan({ x: 6 }),
          IncludeMoreThan({
            x: "濁音",
            y: 1,
            z: DAKUON,
          }),
        ],
      },
      {
        value: "",
        status: "？",
        note: "",
        rules: [
          hiragana,
          shiritori,
          LengthMoreThan({ x: 6 }),
          AlwaysTrue({ x: "ワードは 人の顔が写っている" }),
          IncludeMoreThan({
            x: "拗音",
            y: 2,
            z: YOUON,
          }),
        ],
      },
      {
        value: "",
        status: "？",
        note: "",
        rules: [hiragana, shiritori, Equal({ x: "しょうり" })],
      },
    ];

    const wordsStaging = [
      {
        value: "",
        status: "？",
        note: "",
        rules: [hiragana, shiritori1, IndexFirst({ x: "え" })],
      },
      {
        value: "",
        status: "？",
        note: "",
        rules: [hiragana, shiritori, Length({ x: 4 })],
      },
      {
        value: "",
        status: "？",
        note: "",
        rules: [hiragana, shiritori],
      },
    ];

    const env2words = {
      staging: wordsStaging,
      production: wordsProduction,
    };

    this._name = name;
    this._words = env2words[env];
  }

  update({ index, value }) {
    this._words[index].value = value;

    for (let i = 0; i < this._words.length; i++) {
      if (this._words[i].value === "") {
        this._words[i].status = "？";
        continue;
      }

      let status = "OK";
      let notes = [];
      const rules = this._words[i].rules;
      const previousValue = i === 0 ? "" : this._words[i - 1].value;
      for (let j = 0; j < rules.length; j++) {
        const bool = rules[j].validate(previousValue, this._words[i].value);
        notes.push((bool ? "◯ " : "✕ ") + rules[j].note);
        if (!bool) {
          status = "NG";
        }
      }

      this._words[i].status = status;
      this._words[i].note = notes.join(" ");
    }
  }

  status() {
    return {
      name: this._name,
      words: this._words.map((x, i) => ({
        index: i,
        value: x.value,
        status: x.status,
        note: x.value === "" ? x.rules.map((y) => y.note).join(" ") : x.note,
      })),
      prog: Math.floor(
        (this._words.filter((e) => e.status === "OK").length /
          this._words.length) *
          100
      ),
    };
  }
}
