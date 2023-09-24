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
  constructor() {
    this._words = [
      { value: "", rules: [startWithKi] },
      { value: "", rules: [startWithKi] },
      { value: "", rules: [startWithKi] },
      // { value: "", status: "？", rules: [] },
      // {
      //   value: "",
      //   note: ["このマスの最後の文字は「え」である必要がある"],
      //   validators: [],
      //   status: "？",
      //   warn: [],
      // },
      // {
      //   value: "",
      //   note: [
      //     "このマスは3文字である必要がある",
      //     "このマスに入るものは真ん中の文字が濁点を含んでいる",
      //   ],
      //   validators: [],
      //   status: "？",
      //   warn: [],
      // },
      // {
      //   value: "",
      //   note: [
      //     "このマスは6文字である必要がある",
      //     "このマスに入るものは自動で動くものである",
      //   ],
      //   validators: [],
      //   status: "？",
      //   warn: [],
      // },
      // {
      //   value: "",
      //   note: ["このマスは9文字である必要がある"],
      //   validators: [],
      //   status: "？",
      //   warn: [],
      // },
    ];
  }

  update({ index, value }) {
    this._words[index].value = value;
  }

  words() {
    return this._words.map((x, i) => ({
      index: i,
      value: x.value,
      status:
        x.value === ""
          ? "？"
          : x.rules.map((y) => y.func(x.value)).every((z) => z)
          ? "OK"
          : "NG",
      note: x.rules
        .map(
          (y) => (x.value === "" ? "" : y.func(x.value) ? "◯ " : "✕ ") + y.note
        )
        .join(","),
    }));
  }
}
