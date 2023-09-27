import { h, text } from "https://unpkg.com/hyperapp";

export const Background = () => {
  let minv = 50;
  let px = "5px";
  let width = window.innerWidth / (5 * 10) - 1;
  let height = window.innerHeight / (5 * 10);
  for (let i = 5; i <= 50; i++) {
    if (window.innerWidth % (i * 10) < minv) {
      minv = window.innerWidth % (i * 10);
      px = `${i}px`;
      width = window.innerWidth / (i * 10) - 1;
      height = window.innerHeight / (i * 10);
    }
  }

  const view = [];
  for (let i = 0; i < height; i++) {
    let row = [];
    for (let j = 0; j < width; j++) {
      row.push(DotBox({ px }));
    }
    view.push(
      h(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "row",
          },
        },
        row
      )
    );
  }

  return h(
    "div",
    {
      style: {
        position: "sticky",
        display: "flex",
        flexDirection: "column",
        top: 0,
        bottom: 0,
        padding: "auto",
        width: "100%",
        zIndex: -1,
      },
    },
    h(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          padding: "auto",
          width: "100%",
        },
      },
      view
    )
  );
};

const DotBox = ({ px }) => {
  const rand = Math.floor(Math.random() * 3) + 1;
  const kinds = [
    "soil",
    "soil",
    "soil",
    "soil",
    "rock",
    "rock",
    "rock",
    "moss",
    "iron",
    "iron",
  ];
  const kind = kinds[Math.floor(Math.random() * kinds.length)];
  return h(
    "div",
    {
      class: "dotbox",
      style: { "--px": px },
    },
    h(
      "div",
      {
        class: kind + rand,
        style: { "--px": px },
      },
      []
    )
  );
};
