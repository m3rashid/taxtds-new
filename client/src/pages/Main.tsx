import Header from "../components/mainHeader";
import Footer from "../components/mainFooter";
import Sidebar from "../components/main/sidebar";
import Card from "../components/main/card";

const demoData = [
  {
    id: 1,
    name: "Rashid lsdjfalsd",
    tagline: "jsdfl asdflaksdfa sldkad",
    avatar: "/images/carousel/1.jpg",
    owner: "Rashid",
    state: "delhi",
    phone: "4952903453",
    email: "user@wwamil.com",
    featured: false,
  },
  {
    id: 2,
    name: "Rashid sdflasdjfklasd",
    tagline: "jsdfl asdflaksdfa sldkad",
    avatar: "/images/carousel/1.jpg",
    owner: "Rashid",
    state: "delhi",
    phone: "4952903453",
    email: "user@wwamil.com",
    featured: false,
  },
  {
    id: 3,
    name: "Rashid slkdjfals dflkj",
    tagline: "jsdfl asdflaksdfa sldkad",
    avatar: "/images/carousel/1.jpg",
    owner: "Rashid",
    state: "delhi",
    phone: "4952903453",
    email: "user@wwamil.com",
    featured: false,
  },
];

const Main = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row">
        <div className="mb-4">
          {/* make the sidebar dropdown-able */}
          <Sidebar />
        </div>
        <div className="">
          {demoData.map((item) => {
            const { id, name, tagline, owner, avatar, state, phone, email } =
              item;
            return (
              <Card
                key={id}
                name={name}
                tagline={tagline}
                owner={owner}
                avatar={avatar}
                state={state}
                phone={phone}
                email={email}
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Main;
