import Footer from "../components/mainFooter";
import Header from "../components/customHeader";

const username = "Demouser";

const User = () => {
  // TODO handle OG tags
  document.title = `Taxtds - ${username}`;
  return (
    <>
      <Header greeting="Hello Demouser" />
      <Footer />
    </>
  );
};

export default User;
