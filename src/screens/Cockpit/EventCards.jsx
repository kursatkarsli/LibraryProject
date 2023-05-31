import React, { useState, useEffect } from "react";
import "./EventCards.css";

const EventCards = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        console.log("Making Request... ");
        const response = await fetch("http://localhost:4000/events");
        console.log("Made Request... ", response);
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        } else {
          const errorStatus = response.status;
          throw new Error(`Failed to fetch data. Status: ${errorStatus}`);
        }
      } catch (error) {
        console.error("Error fetching data", error);
        setIsError(true);
        setErrorMessage(error.message || "Unknown error occurred");
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  {
    console.log("EVENT", Object.values(events));
  }
  return (
    <div className="event-cards-container">
      {isError && (
        <div style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</div>
      )}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        Object.values(events).map((event, index) => (
          <>
            {event.name ? (
              <div key={event._id} className="event-card">
                <div className="event-details">
                  <p className="event-name">{event.name}</p>
                  <p className="event-type">{event.desc}</p>
                </div>
              </div>
            ) : null}
          </>
        ))
      )}
    </div>
  );
};

export default EventCards;
