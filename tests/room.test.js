import {
  assertEquals,
} from "https://deno.land/std@0.65.0/testing/asserts.ts";
import { Room } from "../src/room.js";

Deno.test("firstChar", () => {
  const tt = [
    {
      name: "first word: success",
      start: "き",
      words: [{ value: "きつね" }],
      input: { index: 0 },
      output: [true, []],
    },
    {
      name: "first word: failure",
      start: "ね",
      words: [{ value: "きつね" }],
      input: { index: 0 },
      output: [false, ["最初の文字は『ね』でなければなりません"]],
    },
    {
      name: "second word: success",
      words: [{ value: "きつね" }, { value: "ねこ" }],
      input: { index: 1 },
      output: [true, []],
    },
    {
      name: "second word: failure",
      words: [{ value: "りんご" }, { value: "ねこ" }],
      input: { index: 1 },
      output: [false, ["最初の文字は『前の言葉の最後の文字』でなければなりません"]],
    },
  ];
  for (let i = 0; i < tt.length; i++) {
    const t = tt[i];
    const r = new Room();
    r.start = t.start;
    r.words = t.words;
    assertEquals(r.validate(t.input), t.output);
  }
});
