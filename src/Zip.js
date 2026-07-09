import React from "react";

const Zip = () => {
  const zips = [
    3589, 3590, 3592, 3597, 3598, 3601, 3604, 3605, 3607, 5819, 5820, 5821,
    5823, 5824, 5825, 3609, 5141, 5142, 5146, 5148, 5149, 5151, 5152, 5153,
    5155, 5156, 5158, 5159, 5161, 5340, 5341, 5342, 5343, 5344, 5345, 5350,
    5351, 5353, 5355, 5356, 5357, 5358, 5359, 5360, 5361, 5362, 5363, 5701,
    5701, 5730, 5732, 5733, 5734, 5735, 5736, 5737, 5738, 5739, 5740, 5742,
  ];
  const withLeadingZeros = zips.map((zip) => {
    return `0${zip}`;
  });
  const sorted = withLeadingZeros.sort((a, b) => a - b);
  console.log(sorted);
  return (
    <div>
      <h3>Zips</h3>
      <article className="zip-container">
        {withLeadingZeros.map((number, i) => {
          return (
            <section key={i} className="zip-sub-container">
              <p>{i + 1}.</p>
              <h4>
                {number == "03609"
                  ? "05101/03609"
                  : number == "05350"
                    ? "05350/52"
                    : number == "05701"
                      ? "05701 - 02"
                      : number == "05735"
                        ? "05735/49"
                        : number}
              </h4>
            </section>
          );
        })}
      </article>
    </div>
  );
};

export default Zip;
