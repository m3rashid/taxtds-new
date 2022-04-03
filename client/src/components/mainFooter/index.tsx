import { socials, services, navs } from "./data";
import FooterCarousel from "../footerCarousel";

const Footer = () => {
  const container = "pt-[20px] pl-[10px] md:pl-[25px] lg:pl-[25px]";
  return (
    <>
      <FooterCarousel />
      <footer className="w-[100%] bg-accentOne text-lightBgOne">
        <div className="grid grid-cols-1 lg:grid-cols-2 p-[10px] md:pt-[50px] md:pr-[10%] md:pb-0 md:pl-[10%] lg:pt-[30px] lg:pr-[4%] lg:pb-0 lg:pl-[4%]">
          <div className={container}>
            <div className="flex flex-col items-center">
              <img className="" src="/images/foot-logo.png" alt="logo" />
              <p className="text-center">
                Worlds's No. 1 Local Business Directory Website
              </p>
            </div>

            <div className="text-center my-[20px] md:mt-[30px]">
              <p>Follow with us</p>

              <p>
                Follow with Us where thousand of professionals available on
                India's 1st professionals Hub
              </p>

              <div className="flex items-center justify-center">
                {socials.map((item) => (
                  <a
                    key={"social" + item.key}
                    rel="noreferrer noopener"
                    style={{ color: item.color }}
                    href={item.href}
                    target="_blank"
                  >
                    <item.Icon className="mr-[6px]" fontSize="large" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="md:flex md:justify-around items-center">
            <div className={container}>
              <p className="text-center lg:text-left text-xl font-semibold">
                Support & Help
              </p>
              <ul>
                {navs.map((item) => (
                  <li
                    className="text-center lg:text-left"
                    key={"nav" + item.key}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className={container}>
              <p className="text-center lg:text-left text-xl font-semibold">
                Popular Services
              </p>
              <ul>
                {services.map((service) => (
                  <li
                    className="text-center lg:text-left"
                    key={"service" + service.key}
                  >
                    {service.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center mt-[30px] md:p-[10px] lg:p-[25px] xl:px-[200px]">
          <div className={container}>
            <p className="mb-[10px]">Free Listing to All over Cities</p>
            <p className="">
              Ahmedabad / Bangalore / Chandigarh / Chennai / Coimbatore /
              Delhi-NCR / Goa/Hyderabad / Indore / Jaipur / Kolkata / Mumbai /
              Mysore / Nagpur / Nashik / Pune / Surat / Vadodara / Rajasthan /
              Noida / Gurgaon / All Over India
            </p>
          </div>
        </div>
        <div className="text-center text-lightBgTwo md:pb-[5px] mt-[20px] ">
          copyrights &copy; {new Date().getFullYear()} &nbsp;All rights
          reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;
