-- Planning enquiries may be sent before dates are chosen.
-- Booking dates remain required; this changes only the enquiry inbox.
alter table enquiries alter column arrival_date drop not null;
alter table enquiries alter column departure_date drop not null;
alter table enquiries add constraint enquiry_date_order check (
 (arrival_date is null and departure_date is null) or
 (arrival_date is not null and departure_date is not null and departure_date > arrival_date)
);
