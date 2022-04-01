import data from "./data";

interface IProps {
  key: string;
  href: string;
  alt: string;
  image: string;
}

const ListItem = ({ item }: { item: IProps }) => {
  return (
    <li className="h-[144px] w-[244px]">
      <a target="_blank" href={item.href} rel="noreferrer noopener">
        <img
          className="h-[144px] min-w-[244px]"
          src={item.image}
          alt={item.alt}
        />
      </a>
    </li>
  );
};

const FooterCarousel = () => {
  return (
    <div className="bg-white h-[144px] w-screen relative overflow-hidden">
      <ul className="flex w-[1952px] h-full animate">
        {data.map((item: any) => (
          <ListItem key={"one" + item.key} item={item} />
        ))}
        {data.map((item: any) => (
          <ListItem key={"two" + item.key} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default FooterCarousel;
