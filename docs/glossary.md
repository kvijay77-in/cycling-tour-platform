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
:   A check-in point on a ride. Every ride's stages include the **Start** (stage 0) and the **Finish**, with the pit stops in between. For example: Start (stage 0) → Pit Stop 1 (stage 1) → Pit Stop 2 (stage 2) → Finish. The dashboard grid has one column per stage.

Pit Stop
:   A support point along a ride where a crew looks after riders and records their **check-ins**. Each pit stop crew has its own role, `PS_1` to `PS_5`.

Check-in
:   A record that a rider reached a **stage** (a check-in point such as the Start, a pit stop or the Finish). It can be made by scanning the rider's QR code or, where the backend policy permits, by the rider through the Rider API. Check-ins fill the **dashboard grid** for organizers and appear in the rider's **check-in status** and **history** in the rider app. Rider-created records use the `SELF_SERVICE` method and are labelled **Self** in the app.

Self check-in
:   A check-in submitted by the signed-in rider through the Rider API, when the active tour, today's live ride, rider enrollment and backend-resolved `selfService` policy allow it. The rider confirms the action in the app. It is separate from a staff member's QR scan or manual check-in.

Quit Riding
:   A rider check-in that records the rider stopping a ride after it has started. The Rider API permits it only under the tour/ride policy, while the ride is started and before a Finish check-in. It cannot be cancelled in the rider app; organizers must first make sure the rider is safe before restoring them to the ride. Riders should quit at a Pit Stop where possible so the team can arrange safe transport; if quitting on the road, they should contact the organizers immediately.

Check-in history availability
:   The Rider API may return no records when a ride has not started, no check-in table exists yet, or the rider has no check-ins. The rider app renders this as an unavailable/empty state rather than a transport failure; a real authorization or network error remains an error.

Dashboard grid
:   The live view in the management app, with one row per rider and one column per stage, filled in as check-ins arrive.

Float
:   Official transport, arranged by the organizers, that lets a **rider** skip the first part of a ride. Instead of riding from the Start (stage 0), the rider and their bicycle travel by vehicle to a later stage set in the ride's **float plan**, and the rider starts riding from there. The aim is to help riders save energy on a long or hard route so they can still reach the Finish by bike.

    For example:

    - **A long route.** On a 160 km ride that some riders can't cover in full, a float takes those riders to Pit Stop 1 (stage 1) at the 53 km mark.
    - **A big climb at the end.** On a 100 km ride that ends with a 30 km climb and 2,500 m of elevation gain, a float takes riders to Pit Stop 2 at the 60 km mark. They get about 10 km of warm-up and then ride only the climb.

Float plan
:   The part of a ride's setup that says which stage the float takes riders to.

Rider Exit
:   A record that a rider has withdrawn from the tour or from a ride, so they're no longer expected at later check-in points.

---

## Riders and identity

Rider
:   A person taking part in a tour. Riders use the **rider app** and sign in through the **rider user pool**.

Profile ID
:   The identifier of a rider's **platform profile**, which is created when they sign up in the rider app. It belongs to the person and stays the same across tours.

Rider ID
:   The identifier of a rider **within a specific tour**. When a Rider ID is generated, the rider becomes a **confirmed participant** in that tour. One Profile ID can have a different Rider ID on each tour.

Personal Code
:   The rider's **permanent** identification number, given at **profile** level. It never changes from tour to tour, and **every rider QR code contains the Personal Code**.

ID Code (Rider ID Code)
:   The rider's **tour-specific** identification number, used only for that tour.

    Each tour keeps a link between each rider's ID Code and their Personal Code. When a crew member scans a rider's QR code, the platform reads the Personal Code and uses this link to find the rider's ID Code for the current tour.

    ```mermaid
    flowchart LR
        QR["Rider's QR code"] -- contains --> PC["Personal Code<br/>(permanent, profile level)"]
        PC -- "tour link" --> IC["ID Code<br/>(this tour only)"]
        IC --> CI["Check-in / activity<br/>recorded for this tour"]
    ```

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

Event registration
:   A rider's registration for one event occurrence. When registration is enabled, riders can register or unregister only while the occurrence is `PLANNED`; when disabled, all tour riders participate.

Event self-service
:   A rider-created activity record submitted through the Rider API while an occurrence is `ACTIVE` and the backend-resolved activity permission allows it. The rider app labels records made with `SELF_SERVICE` as **Self**. The backend enforces prerequisites, sequence, option choices, and record ownership.

Baggage status
:   Where a rider's bag is in the daily load and unload cycle, as recorded by baggage activities. **Baggage reconciliation** is a staff-side Management App function that compares load and unload records; riders cannot release baggage or reconcile custody in the rider app.

---

## Hotels

Hotel
:   A place where the tour stays overnight, set up in the management app.

Room Allocation
:   The mapping of riders to hotel rooms. It's uploaded to the management app as a **CSV file**.

---

## Communication and files

Notification
:   A message to riders. Notifications are delivered in two ways: as a **push** notification to the rider's phone, and into the **inbox** in the rider app, where riders can read them later. A notification can be an **announcement** written by an organizer, or it can be created automatically by a **notification rule**.

Notification Rule
:   A rule configured for a tour that creates a notification automatically when a matching situation occurs on the tour.

Artifact
:   A file attached to a tour or ride and listed in that scope's artifact manifest. The backend stores it in the organizer's S3 storage; the rider app downloads it to app-private storage and opens it with the device's share/view sheet. Presigned download links are short-lived and fetched when needed.

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
