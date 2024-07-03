import * as React from "react";
import { Masonry } from "masonic";
let i = 0;

const ImageCard = ({ data: { id, name, src } }) => (
  <div className={"card"}>
    <img className={"img"} alt="kitty" src={src} />
    <span children={name} />
  </div>
);
const EasyMasonryComponent = () => {
  const items = Array.from(Array(10), () => {
    const randomPhoto = Math.floor(Math.random() * 10) + 1;
    const randomHeight = 300;
    const randomWidth = 400;
    const imgUrl = `https://picsum.photos/${randomWidth}/${randomHeight}?random=${randomPhoto}`;

    return {
      id: i++,
      name: `Img-title-${i}`,
      src: imgUrl,
    };
  });

  return (
    <main>
      <div>
        <Masonry
          items={items}
          //   columnGutter={8}
          columnWidth={300}
          overscanBy={5}
          render={ImageCard}
        />
      </div>
    </main>
  );
};
export default EasyMasonryComponent;
