import { FormComponent } from "../components";
import { useState } from "react";

function AuthPage() {
  const [signingUp, setSigningUp] = useState(false);

  function toggleForm() {
    setSigningUp((prev) => !prev);
  }

  return (
    <div className=" relative h-screen pt-10 w-full  grid place-items-center">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(https://assets.nflxext.com/ffe/siteui/vlv3/6fd9d446-cd78-453a-8c9c-417ed3e00422/web/NL-en-20251117-TRIFECTA-perspective_a12b887b-a5b9-47ed-b787-14489e751039_small.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="relative z-10 grid place-items-center w-full">
        <FormComponent signingUp={signingUp} toggleForm={toggleForm} />
      </div>
    </div>
  );
}

export default AuthPage;
