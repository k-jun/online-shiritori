class Rule {
  constructor({ note, func }) {
    this.note = note;
    this.func = func;
  }

  validate(value, previousValue = "") {
    return this.func(value, previousValue);
  }
}

const shiritori = new Rule({
  note: "しりとり",
  func: (v, pv) => (pv === "" ? false : v[0] === pv[pv.length - 1]),
});

const shiritori1 = new Rule({
  note: "しりとり",
  func: (v, _) => v !== "",
});

const XinY = ({ x, y }) => {
  return new Rule({
    note: `ワードの${y + 1}番目の文字が『${x}』`,
    func: (v, _) => v[y] === x,
  });
};

export class Room {
  constructor({ name, color }) {
    this._name = name;
    this._color = color;
    this._words = [
      {
        value: "",
        status: "？",
        note: "",
        rules: [shiritori1, XinY({ x: "き", y: 0 })],
      },
      {
        value: "",
        status: "？",
        note: "",
        rules: [shiritori, XinY({ x: "ひ", y: 0 })],
      },
      {
        value: "",
        status: "？",
        note: "",
        rules: [shiritori, XinY({ x: "に", y: 0 })],
      },
    ];
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
        const bool = rules[j].validate(this._words[i].value, previousValue);
        notes.push((bool ? "◯ " : "✕ ") + rules[j].note);
        if (!bool) {
          status = "NG";
        }
      }

      this._words[i].status = status;
      this._words[i].note = notes.join(" ");
    }
  }

  words() {
    return this._words.map((x, i) => ({
      index: i,
      value: x.value,
      status: x.status,
      note: x.value === "" ? x.rules.map((y) => y.note).join(" ") : x.note,
    }));
  }

  footer() {
    return {
      name: this._name,
      color: this._color,
      pct: Math.floor(
        (this._words.filter((e) => e.status === "OK").length /
          this._words.length) *
          100
      ),
    };
  }
}
