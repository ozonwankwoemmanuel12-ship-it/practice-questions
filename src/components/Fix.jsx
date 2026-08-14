import { useState } from "react";

 function Fix() {
  const [number, setNumber] = useState(0);

  function increaseNumber() {
    setNumber(number + 1);
  }

  function decreaseNumber() {
    if (number <= 0) {
      return;
    }

    setNumber(number - 1);
  }

  return (
    <div className="h-screen bg-fuchsia-300 flex items-center justify-center">
      <div className="flex flex-row gap-12">
        <button
          onClick={() => decreaseNumber()}
          className="size-13 bg-fuchsia-900 text-2xl text-fuchsia-100">
          -
        </button>

        <p>{number}</p>

        <button
          onClick={increaseNumber}
          className="size-13 bg-fuchsia-900 text-2xl text-fuchsia-100">
          +
        </button>
      </div>
    </div>
  );
}

export default Fix