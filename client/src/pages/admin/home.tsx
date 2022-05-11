import React from "react";
import AdminWrapper from "../../components/admin/wrapper";
import InputEl from "../../components/atoms/Input";

interface IProps {}

const Home:React.FC<IProps> = () => {
  const [data, setData] = React.useState({profession: "", service: ""});

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({...prev, [e.target.name]: e.target.value}));
  }

  return (
    <AdminWrapper>
      <div className="flex flex-col items-center justify-center my-8">
        <InputEl
          type="text" name="profession"
          value={data.profession}
          onChange={changeHandler}
          placeholder="Enter profession"
        />
        <InputEl
          type="text" name="service"
          value={data.service}
          onChange={changeHandler}
          placeholder="Enter service"
        />
      </div>
    </AdminWrapper>
  );
}


export default Home;