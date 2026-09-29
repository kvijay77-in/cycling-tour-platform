---
hide:
  - navigation
---

# Cycling Tour Management Platform

**Riders, pit stop crews, hotel staff and organizers, all working from the same up-to-date picture of the tour.**

---

## The story of a tour day

It's 5:45 a.m. The hotel car park is still dark. A hundred riders are pumping tyres and clipping in. The baggage crew has already scanned every bag onto the truck, so nobody has to wonder whether their bag will reach the next hotel.

At 6:00 the first riders **roll out**. Forty kilometres down the road, the **Pit Stop 1** crew have water, bananas and a phone ready. As each rider pulls in, a crew member scans the rider's QR code. There's a beep and a green tick, and the check-in is recorded. If the mobile signal on that hillside has dropped, the scan is still saved on the phone and sent automatically once the phone reconnects.

Back at base, the **organizer** is watching the **live dashboard**: a grid with one row per rider and one column per pit stop, filling in as riders move along the route. They can see at a glance who is ahead, who is behind and who hasn't reached the last pit stop yet. If a rider pulls out, the crew record a **rider exit**, so everyone stops expecting them further down the road.

Meanwhile, riders open the **rider app** to check the day's ride details, confirm their own check-ins and read the latest **announcement** from the organizers.

By afternoon riders are crossing the finish. At the hotel, staff already have the **room allocation**, and the baggage crew scan bags off the truck, so there's a reconciled list of bags delivered and bags still missing.

Tomorrow they do it all again.

!!! tip "That's the platform"
    This site describes the platform that runs that day: **two apps and one backend**, keeping everyone on the tour working from the same information.

---

## Why it matters

<div class="grid cards" markdown>

-   :material-eye-check:{ .lg .middle } **Everyone sees the same picture**

    ---

    Check-ins from every pit stop go to one backend. The live dashboard shows organizers where every rider is.

-   :material-wifi-off:{ .lg .middle } **Built for the road**

    ---

    The management app keeps working without a signal. Scans are stored on the phone and synced when the connection returns.

-   :material-account-lock:{ .lg .middle } **The right access for each role**

    ---

    Each role gets only the permissions it needs, from administrators to pit stop crews, hotel staff and guests. Riders use a separate app and a separate sign-in.

-   :material-shield-home:{ .lg .middle } **Your data stays yours**

    ---

    Each organizer runs the whole platform in their own AWS account. No data is shared between organizers.

</div>

---

## At a glance

| | |
|---|---|
| :material-cellphone: **2 apps** | A **management app** for organizers and crews (Android and web) and a **rider app** for riders |
| :material-server: **1 backend** | A serverless AWS backend that owns all infrastructure, data and permissions |
| :material-account-key: **2 separate sign-in pools** | One for the management team and one for riders |
| :material-account-group: **9 roles** | `ADMINISTRATOR`, `SUPER_USER`, `PS_1`–`PS_5`, `HOTEL_STAFF`, `GUEST` |
| :material-map-marker-path: **5 pit stop crew roles** | `PS_1`–`PS_5`, one for each pit stop crew |
| :material-calendar-check: **More than riding** | Day 0 registration, baggage load and unload, hotels and room allocation, and more, through the **events engine** |
| :material-lock: **0 data shared** | Every organizer has an isolated AWS environment |

---

## Quick links

<div class="grid cards" markdown>

-   :material-account-multiple: [**Who it's for**](who-its-for.md): the people who use the platform and what each of them needs
-   :material-weather-sunset-up: [**A day on tour**](a-day-on-tour.md): the rider's journey from Day 0 to the hotel
-   :material-clipboard-list: [**Management app**](features/management-app.md): the tools organizers and crews use
-   :material-bike: [**Rider app**](features/rider-app.md): what riders see
-   :material-sitemap: [**How it works**](how-it-works.md): architecture and data flow
-   :material-shield-check: [**Security & privacy**](security-and-privacy.md): roles, sign-in and data ownership
-   :material-cloud: [**Deployment model**](deployment-model.md): one organizer, one AWS environment
-   :material-book-alphabet: [**Glossary**](glossary.md): what each platform term means

</div>

_Last updated: 2026-09-29_
