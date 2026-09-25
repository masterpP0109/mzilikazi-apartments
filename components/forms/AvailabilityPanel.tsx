"use client";
import { useId, useState } from "react";
export default function AvailabilityPanel({
  preference,
}: {
  preference?: string;
}) {
  const id = useId();
  const [arrival, setArrival] = useState("");
  const today = new Date().toLocaleDateString("en-CA");
  return (
    <form action="/contact" className="availability">
      <div className="field">
        <label htmlFor={id + "arrival"}>Arrival</label>
        <input
          id={id + "arrival"}
          name="arrival"
          type="date"
          min={today}
          value={arrival}
          onChange={(e) => setArrival(e.target.value)}
          required
        />
      </div>
      <div className="field">
        <label htmlFor={id + "departure"}>Departure</label>
        <input
          id={id + "departure"}
          name="departure"
          type="date"
          min={
            arrival
              ? new Date(
                  new Date(arrival + "T12:00:00").getTime() + 86400000,
                ).toLocaleDateString("en-CA")
              : today
          }
          required
        />
      </div>
      <div className="field">
        <label htmlFor={id + "guests"}>Guests</label>
        <input
          id={id + "guests"}
          name="guests"
          type="number"
          min="1"
          max="20"
          defaultValue="2"
          required
        />
      </div>
      {preference && (
        <input type="hidden" name="preference" value={preference} />
      )}
      <button className="button button-primary" type="submit">
        Check availability <span aria-hidden="true">→</span>
      </button>
      <p className="form-note">
        Send an enquiry for current rates and availability.
      </p>
    </form>
  );
}
