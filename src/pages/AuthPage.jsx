import { FormComponent } from "../components";
import { useState } from "react";

function AuthPage() {
  const [signingUp, setSigningUp] = useState(false);

  function toggleForm() {
    setSigningUp((prev) => !prev);
  }

  return (
    <div>
      <div className="max-h-screen pt-10 w-full  grid place-items-center">
        <FormComponent signingUp={signingUp} toggleForm={toggleForm} />
      </div>
    </div>
  );
}

export default AuthPage;
