import { useEffect, useState } from "react";

import "../styles/SimulationHistory.css";

const SimulationHistory = () => {
  const [history, setHistory] =
    useState([]);

  useEffect(() => {
    const stored =
      localStorage.getItem(
        "simulation_history"
      );

    if (stored) {
      setHistory(
        JSON.parse(stored),
      );
    }
  }, []);

  return (
    <section className="history-section">
      <h2>
        📊 Simulation History
      </h2>

      {history.length === 0 ? (
        <p>
          No simulations found
        </p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>
                Sustainability
              </th>

              <th>
                Pollution
              </th>

              <th>
                CO₂
              </th>

              <th>
                Cost
              </th>
            </tr>
          </thead>

          <tbody>
            {history.map(
              (
                item,
                index
              ) => (
                <tr key={index}>
                  <td>
                    {
                      item
                        .scores
                        .sustainability
                    }
                  </td>

                  <td>
                    {
                      item
                        .scores
                        .pollution
                    }
                  </td>

                  <td>
                    {
                      item
                        .scores.co2
                    }
                  </td>

                  <td>
                    {
                      item
                        .scores.cost
                    }
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default SimulationHistory;

