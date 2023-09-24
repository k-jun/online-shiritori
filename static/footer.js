import { h, text } from "https://unpkg.com/hyperapp";

export const Footer = () => {
  return h(
    "div",
    {
      style: {
        position: "absolute",
        left: 0,
        bottom: 0,
        width: "100%",
        backgroundColor: "#ccc",
        height: "20px",
      },
    },
    [
      FooterBar({name: "Team B", width: "50%", color: "blue"}),
      FooterBar({name: "Team C", width: "40%", color: "green"}),
      FooterBar({name: "Team A", width: "10%", color: "red"}),  
    ]
  ) 
}

export const FooterBar = ({name, width, color}) => {
  return h(
        "div",
        {
          style: {
            position: "absolute",
            left: 0,
            bottom: 0,
            width,
            backgroundColor: color,
            height: "20px",
          },
        },
        h(
          "div",
          {
            style: {
              position: "relative",
            },
          },
          [
            h(
              "div",
              {
                style: {
                  position: "absolute",
                  right: -250,
                  top: -30,
                  width: "500px",
                  textAlign: "center",
                  color
                },
              },
              text(name)
            ),
            h(
              "div",
              { style: { position: "absolute", right: -5, top: -15 } },
              text("▾")
            ),
          ]
        ),
      )
};