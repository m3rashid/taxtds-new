import React from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { Loader } from "../../components/atoms/loader";
import UserWrapper from "../../components/user/wrapper";
import { IListing } from "../../store/interfaces";
import {formatResponseMessage, SERVER_ROOT_URL, tokenHeader} from "../../hooks/helpers";
import Card, {EmptyCard} from "../../components/main/card"

const User = () => {
  const [services, setServices] = React.useState<IListing[]>([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    getUserListings().then().catch()
  }, [])

  const getUserListings = async () => {
    try{
      setLoading(true);
      const res = await axios.post(
        `${SERVER_ROOT_URL}/listings/me`,
        JSON.stringify({}),
        tokenHeader
      );
      setServices(res.data.listings)
      setLoading(false);
    }catch(err: any) {
      toast.error(formatResponseMessage(err.response?.data?.message))
    }
  }

  return (
    <UserWrapper>
      <div className="flex flex-col md:flex-row flex-shrink-0 gap-4 p-4 md:w-full max-w-[1600px] mb-4">
        {loading ? <Loader/> :
          services.length > 0 ? services.map((listing) => (
            <Card key={listing._id} listing={listing} isUserPage={true}/>
          )) : (
            <EmptyCard />
          )
        }
      </div>
    </UserWrapper>
  );
};

export default User;
