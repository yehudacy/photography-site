import React, { useState } from "react";

// Renders errors or successful transactions on the screen.
function Message({ content }) {
  return <p>{content}</p>;
}

function Payment() {

  const [message, setMessage] = useState("");

  return (
    <div className="App">
      
    </div>
  );
}

export default Payment;
