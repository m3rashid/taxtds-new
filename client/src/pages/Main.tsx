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
    avatar: "/images/carousel/2.jpg",
    owner: "Rashid",
    state: "delhi",
    phone: "4952903453",
    email: "user@wwamil.com",
    featured: true,
  },
  {
    id: 3,
    name: "Rashid slkdjfals dflkj",
    tagline: "jsdfl asdflaksdfa sldkad",
    avatar: "/images/carousel/3.jpg",
    owner: "Rashid",
    state: "delhi",
    phone: "4952903453",
    email: "user@wwamil.com",
    featured: true,
  },
];

const Main = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row max-w-[1400px] lg:min-w-[1200px] justify-center items-start mb-4">
        <div className="mb-4 md:mb-0 flex justify-center">
          <Sidebar />
        </div>
        <div className="flex flex-col items-center gap-4">
          {/* TODO show the featured services at the top */}
          {demoData.map(
            ({
              id,
              name,
              tagline,
              owner,
              avatar,
              state,
              phone,
              email,
              featured,
            }) => (
              <Card
                key={id}
                name={name}
                tagline={tagline}
                owner={owner}
                avatar={avatar}
                state={state}
                phone={phone}
                email={email}
                featured={featured}
              />
            )
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Main;
