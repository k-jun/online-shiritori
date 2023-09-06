import { h, text, app } from "https://unpkg.com/hyperapp";

const Box = ({value}) => {
  if (value === undefined) {
    value = ''
  }
  return h("input", {value, maxLength: 1, style: {
    height: '100px',
    width: '100px',
    fontSize: '60px',
    textAlign: 'center',
    fontFamily: 'Shinonome14B',
  }}, [])
}

const Arrow = () => {
  return h("div", {style:{
    height: '100px',
    width: '100px',
    fontSize: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}, text("→"))
}

app({
  init: {},
  view: () => h("main", {}, [
    h("h1", {}, text("オンラインしりとり")),
    h("div", {style: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    }}, [
      Box({}),
      Arrow(),
      Box({}),
      Arrow(),
      Box({}),
      Arrow(),
      Box({}),
      Arrow(),
      Box({}),
      Arrow(),
      Box({}),
      Arrow(),
      Box({value: "か"}),
      Arrow(),
      Box({}),
      Arrow(),
      Box({value: "ね"}),
      Arrow(),
      Box({}),
      Arrow(),
      Box({}),
      Arrow(),
      Box({}),
      Arrow(),
      Box({value: "ん"}),
      Arrow(),
      Box({}),
      Arrow(),
      Box({}),
      Arrow(),
      Box({}),
      Arrow(),
      Box({}),
      Arrow(),
      Box({}),
      Arrow(),
      Box({}),
      Arrow(),
      Box({}),
      Arrow(),
      Box({value: "ぱ"}),
      Arrow(),
      Box({}),
      Arrow(),
      Box({value: "ょ"}),
      Arrow(),
      Box({}),
      Arrow(),
      Box({}),
    ])
  ]),
  node: document.getElementById("app"),
});
