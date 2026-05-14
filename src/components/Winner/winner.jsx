import React, { useState } from "react";
import axios from "axios";

function Winner({ data }) {

  const [winner, setWinner] = useState({});

  const pickWinner = () => {

    const lowBudget =
      data.filter(d => d.budget === "100-500");

    const midBudget =
      data.filter(d => d.budget === "500-1000");

    const highBudget =
      data.filter(d => d.budget === "1000+");

    const randomPick = (arr) => {

      if(arr.length === 0) return null;

      const randomIndex =
        Math.floor(Math.random() * arr.length);

      return arr[randomIndex];
    };

    setWinner({
      low: randomPick(lowBudget),
      mid: randomPick(midBudget),
      high: randomPick(highBudget)
    });

  };

  const clearWinner = async () => {

  try {

    await axios.delete(
      'http://localhost:8081/clear_lottery'
    );

    alert("Lottery Cleared");

    window.location.reload();

  } catch(err) {

    console.log(err);

  }

};
  return (

    <div>

      <button onClick={pickWinner}>
        Pick Winners
      </button>

      <button classname="clear" onClick={clearWinner}>
  Clear
</button>

      {winner.low && (
        <div>
          <h2>100-500 Winner</h2>
          <p>{winner.low.name}</p>
        </div>
      )}

      {winner.mid && (
        <div>
          <h2>500-1000 Winner</h2>
          <p>{winner.mid.name}</p>
        </div>
      )}

      {winner.high && (
        <div>
          <h2>1000+ Winner</h2>
          <p>{winner.high.name}</p>
        </div>
      )}

    </div>

  );

}

export default Winner;