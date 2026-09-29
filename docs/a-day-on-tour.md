# A day on tour

This page follows a tour from the rider's point of view and shows where the platform helps at each step, from registration on **Day 0** to the evening at the hotel.

---

## The journey

The journey diagram scores each step from 1 (stressful) to 5 (delightful). It shows the rider's experience next to the crew's, stage by stage.

```mermaid
journey
    title A rider's day on tour
    section Day 0 - Registration
      Sign up and complete profile in the rider app: 4: Rider
      Register for the tour: 4: Rider
      Arrive, get scanned at Day 0 registration: 5: Rider, Crew
    section Morning
      Check today's ride details: 5: Rider
      Bags scanned onto the truck (baggage load): 4: Hotel & baggage staff
      Roll out from the start: 5: Rider
    section On the road
      Arrive at a pit stop: 5: Rider
      QR check-in scan: 5: Pit stop crew
      Organizer follows progress on the live dashboard: 5: Organizer
      Read an announcement: 4: Rider
    section Finish
      Cross the finish: 5: Rider
      Check own check-in history: 4: Rider
    section Evening at the hotel
      Room ready from the room allocation: 5: Rider, Hotel & baggage staff
      Bags scanned off the truck (baggage unload): 4: Hotel & baggage staff
      Missing bags found through reconciliation: 3: Hotel & baggage staff
```

---

## Step by step

### :material-numeric-0-circle: Day 0: registration

Before the first ride, riders sign up in the **rider app**, complete their profile and register for the tour. On **Day 0**, the day before the first ride, riders arrive in person. The crew run the **Day 0 registration** event in the management app and scan each rider as they check in.

### :material-weather-sunset-up: Morning: bags on, riders out

The baggage crew scan every bag onto the truck (**baggage load**). The organizer sets the ride status, riders check the day's **ride details** in the rider app, and the ride starts.

### :material-map-marker-radius: On the road: pit stops

At each pit stop, the crew (`PS_1` to `PS_5`) scan riders' QR codes as they arrive. Each scan becomes a **check-in**. If there's no signal, the management app saves the scan on the phone and syncs it later. If a rider withdraws, the crew record a **rider exit**.

### :material-view-grid: At base: the live dashboard

Organizers watch the **dashboard grid** fill in as check-ins arrive. Rows are riders and columns are check-in points. Organizers can spot a rider who is falling behind and act quickly. They can send **notifications** to riders at any time.

### :material-flag-checkered: Finish

Riders reach the finish. Their check-in history in the rider app shows the whole day.

### :material-bed: Evening: hotel and baggage

Hotel staff already have the **room allocation**, which was uploaded as a CSV file. The baggage crew scan bags off the truck (**baggage unload**), and **baggage reconciliation** shows any bag that hasn't turned up.

---

## Who talks to whom

This sequence diagram shows the main exchanges during one day of the tour.

```mermaid
sequenceDiagram
    autonumber
    actor Rider
    participant RA as Rider app
    actor Crew as Crew (PS_n / HOTEL_STAFF)
    participant MA as Management app
    actor Org as Organizer
    participant BE as Platform backend

    Note over Rider,BE: Day 0 - registration
    Rider->>RA: Sign up, complete profile, register for tour
    RA->>BE: Save profile and tour registration
    Crew->>MA: Scan rider at Day 0 registration
    MA->>BE: Record activity for the registration occurrence

    Note over Rider,BE: Morning
    Crew->>MA: Scan bags onto truck (baggage load)
    MA->>BE: Record baggage activities
    Org->>MA: Set ride status
    MA->>BE: Update ride
    Rider->>RA: Open ride details
    RA->>BE: Fetch ride details

    Note over Rider,BE: On the road
    Rider->>Crew: Arrives at pit stop
    Crew->>MA: Scan rider QR code
    MA->>BE: Record check-in (queued if offline)
    Org->>MA: Watch live dashboard
    MA->>BE: Fetch dashboard data
    Org->>MA: Announce an update
    MA->>BE: Create notification
    RA->>BE: Fetch notifications
    RA-->>Rider: Shows the announcement

    Note over Rider,BE: Evening
    Crew->>MA: Scan bags off truck (baggage unload)
    MA->>BE: Record baggage activities
    Crew->>MA: Open baggage reconciliation
    Rider->>RA: Check own check-in history
    RA->>BE: Fetch check-ins for this rider
```

_Last updated: 2026-09-29_
