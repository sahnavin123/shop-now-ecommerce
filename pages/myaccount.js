import React from "react";
import { useRouter } from "next/router";

const Myaccount = () => {
  const router = useRouter();
  React.useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);
  return <div>myaccount</div>;
};

export default Myaccount;
