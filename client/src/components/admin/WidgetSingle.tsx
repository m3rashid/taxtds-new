interface IProps {
  data: number | string;
  label: string;
}

const WidgetSingle = ({ data, label }: IProps) => {
  return (
    <div className="bg-accentTwo p-4 rounded-md w-full min-w-[250px]  md:w-[500px] max-w-[600px] shadow-lg">
      <div className="w-full h-full py-4">
        <h1 className="font-bold text-2xl text-center mb-2">{label}</h1>
        <div
          className={`font-bold text-center ${
            typeof data === "number" ? "text-8xl" : "text-3xl"
          }`}
        >
          {data}
        </div>
      </div>
    </div>
  );
};

export default WidgetSingle;
