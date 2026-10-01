"use client";
import { useState } from "react";
import { dayIdeas } from "@/lib/planning";
import { AddToTrip } from "./TripProvider";
export default function DayBuilder() {
  const [selected, setSelected] = useState(dayIdeas[0].id);
  const day = dayIdeas.find((d) => d.id === selected)!;
  return (
    <section id="day-ideas" className="section stone">
      <div className="container">
        <p className="eyebrow">Build a Victoria Falls day</p>
        <h2>What sounds like your kind of day?</h2>
        <div className="filter-options" aria-label="Choose a day idea">
          {dayIdeas.map((d) => (
            <button
              className="button button-secondary"
              key={d.id}
              aria-pressed={selected === d.id}
              onClick={() => setSelected(d.id)}
            >
              {d.title}
            </button>
          ))}
        </div>
        <div aria-live="polite">
          <h3>{day.title}</h3>
          <ol className="day-timeline">
            {day.stops.map(([time, idea]) => (
              <li key={time}>
                <span>{time}</span>
                <p>{idea}</p>
              </li>
            ))}
          </ol>
        </div>
        <AddToTrip kind="day" id={day.id} />
        <p className="form-note">
          A sample rhythm, with timings and activity options to discuss. Nothing
          is reserved.
        </p>
      </div>
    </section>
  );
}
