import React, { useEffect, useState } from "react";
import "./table.scss";
import useFetch from "../../Hooks/Firebase/useFetch";
import useListen from "../../Hooks/Firebase/useListen";

export default function DataTable({ flyToTrainClick }) {
  const [trainlist, settrainlist] = useState([]);
  var result = useListen("Trains/");

  useEffect(() => {
    settrainlist(result);
  }, [result]);

  return (
    <div className="fetch-comp">
      <table className="styled-table">
        <thead>
          <tr>
            <th>Train</th>
            <th>Status</th>
            {/* <th>
              Speed
              <br />
              (m/s)
            </th> */}
            <th>Name</th>
            {/* <th>Long</th>
            <th>Lat</th> */}
          </tr>
        </thead>
        <tbody>
          {trainlist &&
            trainlist.map((train) => {
              return (
                <tr
                  key={train.no}
                  id={train.no}
                  className="td-row"
                  onClick={() => flyToTrainClick(train)}
                >
                  <td className="td-1">{train.no}</td>
                  <td className="td-2" data-online={train.status}>
                    {train.status}
                  </td>
                  {/* <td className="td-3">{train.speed}</td> */}
                  <td className="td-4">{train.name}</td>
                  {/* <td className="td-3">{train.long}</td>
                  <td className="td-4">{train.lat}</td> */}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
