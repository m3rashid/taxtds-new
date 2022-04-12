import {
  FaWhatsappSquare,
  FaFacebookSquare,
  FaYoutubeSquare,
  FaLinkedinIn,
  FaTwitterSquare,
} from "react-icons/fa";
import { IListItem } from "./carousel";

export const socials = [
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

export const navs = [
  { key: "1", name: "About Us" },
  { key: "2", name: "Login" },
  { key: "3", name: "Register" },
  { key: "4", name: "Quick Enquiry" },
  { key: "5", name: "Terms & Conditions" },
];

export const services = [
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

export const data: IListItem[] = [
  {
    key: "1",
    externalLinkHref: "https://www.icsi.edu/home/",
    imageUrl: "/images/carousel/1.jpg",
    alt: "The institure of company secretaries of India",
  },
  {
    key: "2",
    externalLinkHref: "https://icmai.in/icmai/index.php",
    imageUrl: "/images/carousel/2.jpg",
    alt: "The institure of cost accountants of India",
  },
  {
    key: "3",
    externalLinkHref: "https://www.icai.org/",
    imageUrl: "/images/carousel/3.jpg",
    alt: "The institure of chartered accountants of India",
  },
  {
    key: "4",
    externalLinkHref: "https://www.cbic.gov.in/",
    imageUrl: "/images/carousel/4.jpg",
    alt: "Central Board of Indirect Taxes and Customs",
  },
  {
    key: "5",
    externalLinkHref: "http://www.gstcouncil.gov.in/",
    imageUrl: "/images/carousel/5.jpg",
    alt: "Goods and services tax council",
  },
  {
    key: "6",
    externalLinkHref: "https://www.gst.gov.in/",
    imageUrl: "/images/carousel/6.jpg",
    alt: "Goods and services tax",
  },
  {
    key: "7",
    externalLinkHref: "https://www.mca.gov.in/content/mca/global/en/home.html",
    imageUrl: "/images/carousel/7.jpg",
    alt: "Ministry of corporate affairs",
  },
  {
    key: "8",
    externalLinkHref: "https://incometaxindia.gov.in/Pages/default.aspx",
    imageUrl: "/images/carousel/8.jpg",
    alt: "Income tax department",
  },
];
