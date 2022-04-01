// import React from "react";
// import { toast } from "react-toastify";

import Card from "../../components/main/card";
import UserWrapper from "../../components/user/wrapper";

const demoServices = [
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
];

const username = "Demouser";
const User = () => {
  // React.useEffect(() => {
  //   toast.success(`Hello ${username}`);
  // }, []);

  return (
    <UserWrapper name="Demouser" username={username}>
      <div className="flex flex-col md:flex-row flex-shrink-0 gap-4 p-4 md:w-full max-w-[1600px] mb-4">
        {demoServices.map(
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
              id={id}
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
    </UserWrapper>
  );
};

export default User;
