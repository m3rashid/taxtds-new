import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export interface IListItem {
  key: string;
  externalLinkHref?: string;
  alt?: string;
  imageUrl: string;
}

const ListItem = ({ item }: { item: IListItem }) => {
  return (
    <li className="h-[144px] w-[244px]">
      {item.externalLinkHref ? (
        <a
          target="_blank"
          href={item.externalLinkHref}
          rel="noreferrer noopener"
        >
          <LazyLoadImage
            className="h-[144px] min-w-[244px]"
            src={item.imageUrl}
            alt={item.alt}
          />
        </a>
      ) : (
        <LazyLoadImage
          className="h-[144px] min-w-[244px]"
          src={item.imageUrl}
          alt={item.alt}
        />
      )}
    </li>
  );
};

interface IProps {
  data: IListItem[];
}

const Carousel: React.FC<IProps> = ({ data }) => {
  return (
    <div className={`bg-white h-[144px] w-full relative overflow-hidden`}>
      <ul className="flex w-[1952px] h-full animate">
        {data.map((item) => (
          <ListItem key={"one" + item.key} item={item} />
        ))}
        {data.map((item) => (
          <ListItem key={"two" + item.key} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default Carousel;
