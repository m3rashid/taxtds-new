import {
  FaWhatsappSquare,
  FaFacebookSquare,
  FaYoutubeSquare,
  FaLinkedinIn,
  FaTwitterSquare,
} from "react-icons/fa";

import FooterCarousel from "./footerCarousel";

const socials = [
  {
    key: "1",
    href: "https://www.facebook.com/taxtdscom",
    Icon: FaFacebookSquare,
    color: "#4267b2",
  },
  {
    key: "2",
    href: "https://twitter.com/taxtds_com",
    Icon: FaTwitterSquare,
    color: "#1da1f2",
  },
  {
    key: "3",
    href: "https://www.linkedin.com/in/tax-tds-183601224/",
    Icon: FaLinkedinIn,
    color: "#2867b2",
  },
  {
    key: "4",
    href: "https://www.youtube.com/channel/UCbCa3ZWUjLkyzk8WSj-GwXQ",
    Icon: FaYoutubeSquare,
    color: "#ff0000",
  },
  {
    key: "5",
    href: "https://wa.me/918285565503",
    Icon: FaWhatsappSquare,
    color: "#25d366",
  },
];

const navs = [
  { key: "1", name: "About Us" },
  { key: "2", name: "Login" },
  { key: "3", name: "Register" },
  { key: "4", name: "Quick Enquiry" },
  { key: "5", name: "Terms & Conditions" },
];

const services = [
  { key: "1", name: "Registration Services" },
  { key: "2", name: "Tax Filing" },
  { key: "3", name: "Taxation & Personal advisory" },
  { key: "4", name: "Investment Planning" },
  { key: "5", name: "Company Compliance" },
  { key: "6", name: "Audit & Insurance" },
  { key: "7", name: "FCRA FEMA NGOs" },
  { key: "8", name: "Valuations" },
  { key: "9", name: "Accounting" },
  { key: "10", name: "Services" },
  { key: "11", name: "GST Return" },
];

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
