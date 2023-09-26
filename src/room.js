class Rule {
  constructor({ note, func }) {
    this.note = note;
    this.func = func;
  }

  validate(value) {
    return this.func(value);
  }
}

const x = ({ index, expect }) => {
  return (actual) => {
    return actual[index] === expect;
  };
};

const startWithKi = new Rule({
  note: "ワードの最初の文字は『き』",
  func: x({ index: 0, expect: "き" }),
});

export class Room {
  constructor({ name, color }) {
    this._name = name;
    this._color = color;
    this._words = [
      { value: "", status: "？", rules: [startWithKi] },
      { value: "", status: "？", rules: [startWithKi] },
      { value: "", status: "？", rules: [startWithKi] },
    ];
  }

  update({ index, value }) {
    this._words[index].value = value;
    let x = "？";
    if (value !== "") {
      x = this._words[index].rules.map((y) => y.func(value)).every((z) => z)
        ? "OK"
        : "NG";
    }
    this._words[index].status = x;
  }

  words() {
    return this._words.map((x, i) => ({
      index: i,
      value: x.value,
      status: x.status,
      note: x.rules
        .map(
          (y) => (x.value === "" ? "" : y.func(x.value) ? "◯ " : "✕ ") + y.note
        )
        .join(","),
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
