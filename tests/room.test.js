import {
  assertEquals,
} from "https://deno.land/std@0.65.0/testing/asserts.ts";
import { Room, hiragana, shiritori, shiritori1 } from "../src/room.js";

Deno.test("hiragana", () => {
  const tt = [
    {
      input: ["", ""],
      output: false,
    },
    {
      input: ["", "あ"],
      output: true,
    },
    {
      input: ["", "カタカナ"],
      output: false,
    },
    {
      input: ["", "漢字"],
      output: false,
    },
    {
      input: ["", "-+"],
      output: false,
    },
    {
      input: ["", "ぁ゙"],
      output: false,
    },
    {
      input: ["", "あいーん"],
      output: true,
    },
  ];
  for (let i = 0; i < tt.length; i++) {
    const t = tt[i];
    assertEquals(hiragana.validate(...t.input), t.output);
  }
});

Deno.test("shiritori1", () => {
  const tt = [
    {
      input: ["", ""],
      output: false,
    },
    {
      input: ["", "あ"],
      output: false,
    },
    {
      input: ["", "あい"],
      output: true,
    },
  ];
  for (let i = 0; i < tt.length; i++) {
    const t = tt[i];
    assertEquals(shiritori1.validate(...t.input), t.output);
  }
});


Deno.test("shiritori", () => {
  const tt = [
    {
      input: ["", ""],
      output: false,
    },
    {
      input: ["あ", "あ"],
      output: false,
    },
    {
      input: ["あ", "あい"],
      output: false,
    },
    {
      input: ["あい", ""],
      output: false,
    },
    {
      input: ["あい", "あい"],
      output: false,
    },
    {
      input: ["あうん", "んじゃめな"],
      output: false,
    },
    {
      input: ["みさんが", "がらす"],
      output: true,
    },
    {
      input: ["みさんが", "からす"],
      output: false,
    },
    {
      input: ["るびー", "びきに"],
      output: true,
    },
    {
      input: ["かいしゃ", "しゃもじ"],
      output: true,
    },
    {
      input: ["たこ", "こあら"],
      output: true,
    },
    {
      input: ["たこ", "おやじ"],
      output: false,
    },
    {
      input: ["しょうぼうしゃ", "しゃちょう"],
      output: true,
    },
    {
      input: ["しょうぼうしゃ", "ちょうちん"],
      output: false,
    },
    {
      input: ["ちょうしょ", "しょうが"],
      output: true,
    },
    {
      input: ["ちょうしょ", "がっこう"],
      output: false,
    },
    {
      input: ["あんぱんまん", "んまりー"],
      output: false,
    },
    {
      input: ["ゃー", "あいうえお"],
      output: false,
    },
    {
      input: ["てぃーちゃー", "ちゃーしゅー"],
      output: true,
    },
    
    {
      input: ["てぃーちゃー", "ちゃいむ"],
      output: true,
    },
    {
      input: ["てぃーちゃー", "むーさか"],
      output: false,
    },
    {
      input: ["でぃーぷふりーざ", "ざいる"],
      output: true,
    },
    {
      input: ["でぃーぷふりーざ", "ざうるす"],
      output: true,
    },
    {
      input: ["くぃーん", "んでぃらがんじー"],
      output: false,
    },
    {
      input: ["くぃーん", "んどろめだ"],
      output: false,
    },
    {
      input: ["しょっぴんぐもーる", "るーたー"],
      output: true,
    },
    {
      input: ["しょっぴんぐもーる", "たーげっと"],
      output: false,
    },
    {
      input: ["でぃなー", "ないと"],
      output: true,
    },
    {
      input: ["でぃなー", "なうしか"],
      output: true,
    },
    {
      input: ["ちゅーたー", "たーばん"],
      output: true,
    },
    {
      input: ["ちゅーたー", "んぼくちん"],
      output: false,
    },
    {
      input: ["ばってぃんぐ", "んぐりっしゅ"],
      output: false,
    },
    {
      input: ["ばってぃんぐ", "ぐらす"],
      output: true,
    },
    {
      input: ["ぴっきんぐ", "んぐりっしゅ"],
      output: false,
    },
    {
      input: ["ぴっきんぐ", "ぐっど"],
      output: true,
    },
    {
      input: ["うぃんどう", "うみがめ"],
      output: true,
    },
    {
      input: ["うぃんどう", "うーまん"],
      output: true,
    },
    {
      input: ["ついったー", "たーん"],
      output: true,
    },
    {
      input: ["ついったー", "んばー"],
      output: false,
    }
    
  ];
  for (let i = 0; i < tt.length; i++) {
    const t = tt[i];
    assertEquals(shiritori.validate(...t.input), t.output);
  }
});
