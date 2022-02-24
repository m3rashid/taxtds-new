import React from "react";
import ArrowDropDownCircle from "@material-ui/icons/ArrowDropDownCircle";

const services = [
  { name: "Registration Services" },
  { name: "Company Compliance" },
  { name: "Tax Filling" },
  { name: "Audit And Insurance" },
  { name: "Taxation Advisory And Personal Advisory" },
  { name: "FCRA FEMA NGOs" },
  { name: "Valuations" },
  { name: "Accounting Services" },
  { name: "Investment Planning" },
  { name: "GST Return" },
  { name: "GST Registration" },
  { name: "GST Registration For Foreigners" },
  { name: "Cancel GST Registration" },
  { name: "Temporary Registration" },
  { name: "Income Tax Registration" },
  { name: "Company Registration" },
  { name: "Private Limited Company" },
  { name: "Public Limited Company" },
  { name: "Proprietorship Registration" },
  { name: "Partnership Registration" },
  { name: "LLP Registration" },
  { name: "Society Registration" },
  { name: "Trust Registration" },
  { name: "PF Registration" },
  { name: "ESI Registration" },
  { name: "MSME Registration" },
  { name: "FSSAI Registration" },
  { name: "Digital Registration" },
  { name: "Patent Registration" },
  { name: "Import Export Code" },
  { name: "Copyright Registration" },
  { name: "Trademark Registration" },
  { name: "Trademark Rectification" },
  { name: "Trade Mark Objection" },
  { name: "Trademark Renewal" },
  { name: "Logo Registration" },
  { name: "Provisional Patent Registration" },
  { name: "Partnership Deed" },
  { name: "Company Name Change" },
  { name: "Registration Office Change" },
  { name: "Add Directors" },
  { name: "Remove Directores" },
  { name: "Increase Authorized Capital" },
  { name: "Shares Transfer" },
  { name: "MOA Amendment" },
  { name: "Add Partner" },
  { name: "Winding Up Company" },
  { name: "Winding Up LLP" },
  { name: "Filing Of Income Tax" },
  { name: "Wealth Tax Returns" },
  { name: "TDS Return" },
  { name: "ESI Return" },
  { name: "Statutory Audits" },
  { name: "Tax Audits" },
  { name: "Internal And Management Audits" },
  { name: "Internal Control Review" },
  { name: "Due Diligence" },
  { name: "Business And Asset Valuation" },
  { name: "System Audit" },
  { name: "Risk Assessment And Management" },
  {
    name: "Corporate And Personal Tax Compliance Including Income Tax Assessments",
  },
  { name: "Appeals Before The Commissioner (Appeals)" },
  { name: "International And Domestic Tax Planning" },
  { name: "Filing Of Income Tax" },
  { name: "Wealth Tax Returns Of Residents And Non Residents Individuals" },
  { name: "Tax And Tds Services" },
  { name: "Domestic And Foreign Companies And Other Entities" },
  { name: "Compliance With Law Relating To Indirect Taxes" },
  { name: "Personal Financial Planning" },
  { name: "Insurance And Pension Planning" },
  { name: "Advice On Various Foreign Exchange Matters Under The Act" },
  { name: "Trust/Society Formation" },
  { name: "Registration U/S 12A And 80G Of Income Tax Act" },
  { name: "Registration Under FCRA" },
  { name: "Business Valuation" },
  { name: "Partnership Valuation" },
  { name: "Fair Valuation For IFRS Valuation In Shareholder Disputes" },
  { name: "Intangible Asset Valuation" },
  { name: "Maintenance Of Statutory Records Registers And Minutes Books" },
  { name: "Book Keeping And General Accounting Services" },
  { name: "Preparation Of Financial Statements" },
  { name: "Payroll Processing" },
  {
    name: "Cash Forecasting Design, Implementation And Review Of Accounting Manuals",
  },
  { name: "Book Keeping And General Accounting Services" },
  { name: "Preparation Of Financial Statements" },
  { name: "Payroll Processing" },
  { name: "Cash Forecasting Design" },
  { name: "Implementation And Review Of Accounting Manuals" },
  { name: "Life Insurance Policy (LIC)" },
  { name: "Public Provident Fund" },
  { name: "Mutual Fund" },
  { name: "Equity Share" },
  { name: "Real Estate Investment" },
  { name: "Gold ETF" },
  { name: "Post Office Investment" },
  { name: "Company Fixed Deposits" },
  { name: "Bank Fixed Deposits" },
  { name: "Recurring Deposits" },
  { name: "Double Accounting System" },
  { name: "Economics - Micro" },
  { name: "Economics - Macro" },
  { name: "Business Studies" },
  { name: "Fundamentals Of Accounting" },
  { name: "Mercantile Law" },
  { name: "General Economics" },
  { name: "Quantitative Aptitude" },
  { name: "Accounting" },
  { name: "Cost Accounting And Financial Management" },
  { name: "Advanced Accounting" },
  { name: "Taxation" },
  { name: "Auditing And Assurance" },
  { name: "Business Laws, Ethics And Communication" },
  { name: "Information Technology And Strategic Management" },
  { name: "Corporate And Other Laws" },
  { name: "Advanced Auditing And Professional Ethics" },
  { name: "Financial Reporting" },
  { name: "Strategic Financial Management" },
  { name: "Strategic Cost Management And Performance Evaluation" },
  { name: "Corporate And Economic Laws" },
  { name: "Direct Tax Laws And International Taxation" },
  { name: "Indirect Tax Laws" },
  { name: "Risk Management" },
  { name: "International Taxation" },
  { name: "Economic Laws" },
  { name: "Financial Services And Capital Markets" },
  { name: "Global Financial Reporting Standards" },
  { name: "Multidisciplinary Case Study" },
];

const Sidebar = () => {
  const [open, setOpen] = React.useState<boolean>(true);

  return (
    <>
      <ul className="list-none w-[94vw] md:w-[350px] h-full mr-0 md:mr-[20px] lg:mr-[40px] pb-[20px] rounded-b-md bg-[white] rounded-md shadow-md">
        <li className="p-[15px] bg-accentOne text-[white] rounded-t-md mb-4 flex flex-row items-center justify-between">
          <p className="font-bold text-lg hover:text-buttonSuccess">
            Listed Services
          </p>
          <div className="md:hidden" onClick={() => setOpen(!open)}>
            <ArrowDropDownCircle className="hover:text-accentTwo" />
          </div>
        </li>
        {services.map(({ name }: { name: string }, index: number) => {
          // made id as the key
          return (
            <li
              key={index}
              className={`mx-[10px] px-[10px] my-1 py-1 text-accentOne font-semibold hover:bg-lightHover hover:font-bold cursor-pointer rounded-md ${
                !open && "hidden md:block"
              }`}
              onClick={() => {}}
            >
              {name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Sidebar;
