# Glossary

This is **the** platform glossary. The `tour-data-api`, `tour-mgmt-app` and `tour-rider-app` repositories all link here instead of keeping their own lists of terms. Because the backend (`tour-data-api`) owns the domain model and the permissions, the definitions follow the backend's terms. Where a term matches a role or permission name, the backend name is used exactly as it is.

!!! note "Keeping this page accurate"
    If a definition here disagrees with the backend code or its design docs, the backend is correct. Please update this page to match.

<!--
Maintainers: this page is referenced from other repositories as docs/glossary.md.
Do not move or rename it.
-->

---

## Tours and rides

Tour
:   A multi-day cycling event run by an **organizer**. A tour has its own rides, riders, team assignments, events, hotels, artifacts and notifications. The backend keeps each tour's operational data in **per-tour tables**.

Ride
:   One riding day of a tour, with its route and check-in points. The organizer manages each ride's **status** during the day. Ride details are shown to riders in the rider app.

Stage
:   A section of a ride between two consecutive check-in points, such as start to Pit Stop 1 or Pit Stop 1 to Pit Stop 2.

Pit Stop
:   A support point along a ride where a crew looks after riders and records their **check-ins**. Each pit stop crew has its own role, `PS_1` to `PS_5`.

Check-in
:   A record that a rider reached a check-in point (for example a pit stop). It's made by scanning the rider's QR code in the management app. Check-ins fill the **dashboard grid** for organizers and appear in the rider's **check-in status** and **history** in the rider app.

Dashboard grid
:   The live view in the management app, with one row per rider and one column per check-in point, filled in as check-ins arrive.

Float
:   A crew member, usually in a support vehicle, who moves along the route rather than staying at one pit stop, and can record check-ins wherever riders are met.

Rider Exit
:   A record that a rider has withdrawn from the tour or from a ride, so they're no longer expected at later check-in points.

---

## Riders and identity

Rider
:   A person taking part in a tour. Riders use the **rider app** and sign in through the **rider user pool**.

Profile ID
:   The identifier of a rider's **platform profile**, which is created when they sign up in the rider app. It belongs to the person and stays the same across tours.

Rider ID
:   The identifier of a rider **within a specific tour**, created when the rider registers for that tour. One Profile ID can have a different Rider ID on each tour.

ID Code
:   The short code that identifies a rider on a tour. It's the value in the rider's QR code, which crews scan at check-in and in event scans.

Personal Code
:   A code specific to a rider that can be used to identify them, for example when their QR code isn't available.

Rider Profile Definition
:   The organizer's definition of the **profile attributes** (questions and fields) riders must complete. The rider app builds its profile form from these definitions, which is why the profile is called **dynamic**.

---

## Events engine

Event
:   A type of tour operation, other than riding, that the team needs to track. Examples are **Day 0 registration**, **baggage load** and **baggage unload**.

Day 0
:   The day before the first ride, when riders arrive and go through registration.

Occurrence
:   A specific instance of an event, such as baggage load on the morning of Day 3. Each occurrence has its own dashboard showing progress.

Activity
:   A single action recorded in an occurrence, usually a QR scan by a crew member (for example, "rider's bag loaded").

Activity Log
:   The recorded history of activities in an occurrence: who did what, and when.

Baggage status
:   Where a rider's bag is in the daily load and unload cycle, as recorded by baggage activities. **Baggage reconciliation** compares the bags loaded with the bags unloaded, so missing bags can be found.

---

## Hotels

Hotel
:   A place where the tour stays overnight, set up in the management app.

Room Allocation
:   The mapping of riders to hotel rooms. It's uploaded to the management app as a **CSV file**.

---

## Communication and files

Notification
:   A message to riders that appears in the rider app. It can be an **announcement** written by an organizer, or it can be created automatically by a **notification rule**.

Notification Rule
:   A rule configured for a tour that creates a notification automatically when a matching situation occurs on the tour.

Artifact
:   A file that belongs to a tour. The backend stores artifacts in the organizer's own S3 storage.

Training challenge
:   A feature of the rider app that gives riders a training goal to work towards before the tour.

---

## People, roles and access

Organizer
:   The organization that runs tours. Each organizer runs the **entire platform in its own AWS account**, and no data is shared between organizers. See [Deployment model](deployment-model.md).

Tour User
:   A member of the management team (not a rider) with an account in the **management user pool**.

Tour User Assignment
:   The link between a tour user and a tour, with the **role** that person has on that tour. The same person can have different roles on different tours.

Role
:   The set of permissions given to a tour user. The backend defines the roles and their permissions in `src/layers/common/rbac.py` and enforces them on every request. The roles are:

    | Role | Summary |
    |---|---|
    | `ADMINISTRATOR` | Runs the platform for the organizer: tours, users and settings |
    | `SUPER_USER` | Runs tour operations with broad access |
    | `PS_1` … `PS_5` | Pit stop crew for pit stops 1 to 5 |
    | `HOTEL_STAFF` | Hotels, room allocation and baggage |
    | `GUEST` | Observer with restricted access |

Permission
:   A named action that a role may or may not perform. Permissions are defined **only** in the backend (`rbac.py`), and the apps use the backend's names without changing them.

---

## Platform building blocks

Management app
:   The React Native / Expo app (Android and web) used by the management team. It works **offline** using a local SQLite database and an outbound **sync queue**.

Rider app
:   The React Native / Expo app used by riders. It needs a connection and has **no offline mode**.

Sync queue
:   The management app's list of changes, such as check-in scans, that are saved on the device and waiting to be sent to the backend when there is a connection.

TourDataApi
:   The HTTP API used by the management app. It accepts tokens from the management user pool.

RiderApi
:   The HTTP API used by the rider app. It accepts tokens from the rider user pool.

Management user pool / Rider user pool
:   The two separate Amazon Cognito user pools, one for the management team and one for riders. Both are owned by the backend.

Shared tables / Per-tour tables
:   DynamoDB tables used by the backend. **Shared** tables hold data for the whole platform, and **per-tour** tables hold one tour's operational data.

_Last updated: 2026-09-29_
