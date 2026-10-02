# Rider app

The **rider app** is the rider's companion before and during the tour. Riders use it to sign up, manage their profile, view tours and rides, check their check-ins, participate in eligible events, read organizer messages and open tour documents.

!!! abstract "At a glance"
    - **Who uses it:** riders
    - **Sign-in:** a separate rider sign-in pool, not the management team's
    - **Connection:** needs a data connection. The rider app has no offline mode.

---

## Sign up and sign in

Riders create their own account and sign in with it. Rider accounts are kept completely separate from the management team's accounts.

!!! info "Screenshot to be added"
    **Login**: `assets/screenshots/rider-login.png`

!!! info "Screenshot to be added"
    **Sign-up**: `assets/screenshots/rider-signup.png`

---

## A profile that fits the tour

The profile form is **dynamic**. It's built from the **rider profile definitions** set up by the organizer, so the organizer decides which details to collect. Riders fill it in once and can view it at any time.

!!! info "Screenshot to be added"
    **Profile creation**: `assets/screenshots/rider-profile-create.png`

!!! info "Screenshot to be added"
    **Profile view**: `assets/screenshots/rider-profile-view.png`

---

## Tours and rides

The Tour view shows the active tour, when available, and listed historical tours. Riders select a tour to browse its rides and open ride details. The separate tour registration and dashboard screens are not linked from the current app menu; riders should contact their organizer about joining a tour.

For a registered ride, riders with available check-in history can choose **Ride info** or **Check-In**. If history is absent or unavailable, the ride opens to **Ride info**, and the check-in status affordance explains that no records are available. Unregistered rides open directly to **Ride info**.

!!! info "Screenshot to be added"

!!! info "Screenshot to be added"
    **Ride details**: `assets/screenshots/rider-ride-details.png`

---

## My check-ins

When a crew member records a rider's QR code check-in at a stage, the rider can see it in that ride's **Check-In** view. The view shows the selected ride's progress and records. Permitted rider-created records are labelled **Self**; staff QR/manual records retain their method label. Missing or empty history is an available no-record state, not an app failure.

Home and today's Check-In view offer self check-in only to an enrolled rider on the active tour's ride for today. The app checks the live ride and current records before showing actions; a saved or historical ride does not qualify. Self check-in needs a connection, and each action requires confirmation.

| Action | How the organizer's setting applies | Default |
|---|---|---|
| **Quit Riding** | A tour-wide setting applies unless the ride has its own setting. | Not allowed |
| **Stage check-in** | A stage's setting overrides the ride-wide setting; without either, the stage type sets the default. | Start and Finish: allowed; Pit Stops: not allowed |
| **Not Riding** | A separate setting on the Start stage only. | Not allowed |

Start and Finish are fixed stages; organizers can add and arrange Pit Stops between them. For example, if stage check-ins are turned off for a ride, an individual stage can still be allowed by its own setting; stages without an override follow the ride setting.

Normal stage check-ins are available only while the ride is **OPEN** or **STARTED** and the stage is allowed. A Pit Stop must also be open. **Not Riding** is available at Start only while the ride is **OPEN**, before a Start check-in. **Quit Riding** is available only after the ride has started and before a Finish check-in.

Riders can cancel their own eligible normal or Not Riding check-ins, including staff-recorded entries that belong to them, when current settings still permit cancellation. After the app refreshes and confirms the cancellation, they can repeat an available action. Riders cannot cancel Quit Riding.

!!! danger "Quit Riding and rider safety"
    **Organisers' advice:** Wherever possible, quit at a Pit Stop so the team can record it for you and arrange safe transport for you and your bike. If you must quit on the road, contact the organisers immediately after confirming.

    **This cannot be undone from the app.** Only the organisers can cancel a Quit Riding check-in, after making sure you are safe to continue. The app hides all actions after an active Quit Riding record and directs the rider to contact the organisers before resuming.

!!! info "Screenshot to be added"
    **Check-in status**: `assets/screenshots/rider-checkin-status.png`

!!! info "Screenshot to be added"
    **Ride check-in records**: `assets/screenshots/rider-checkin-history.png`

---

## Events and registration

The rider app lists events for the rider's tours, with the active tour first. Each event can require registration for its occurrences. Registration means taking part in one specific occurrence, not joining the tour. When registration is enabled, riders can register or unregister only while that occurrence is **PLANNED**; registration closes when it starts. Organizers can register or unregister riders for an occurrence while it is planned. Only registered riders can have activities recorded for an occurrence with registration enabled. When registration is off, all eligible tour riders participate.

For an **ACTIVE** occurrence, riders see their activity progress and any permitted self-service actions. The organizer can set a default for the event, change it for an activity, change it for an occurrence, or make a more specific choice for an activity in that occurrence. The most specific setting wins; if a setting is not specified, the next broader setting applies. If self-service is not allowed, the rider can still see progress but cannot act.

When allowed, riders can mark an activity complete, opt out if that activity permits it, and choose a required option. Riders can cancel an eligible record and repeat the activity after refreshed progress shows that it is available again. Rider-created records are labelled **Self**. Any older baggage self-service indicator is informational, not a separate permission: rider actions follow the current event settings, while baggage custody and reconciliation remain staff functions.

!!! info "Screenshot to be added"
    **Events and registration**: `assets/screenshots/rider-events.png`

---

## Tour and ride documents

When a tour or ride has files, the rider app shows a **Documents** section on the selected Tour or Ride Details screen. Empty manifests do not produce an empty section. Riders can view the returned title and filename, download with progress, and open the local file with the device's share/view sheet. Downloads stay in app-private storage, so the app does not request public storage access. It fetches a fresh presigned link for each open and retries once after a transfer failure.

!!! info "Screenshot to be added"
    **Tour and ride documents**: `assets/screenshots/rider-documents.png`

---

## Notifications

Announcements from the organizers, and notifications sent automatically by notification rules, reach riders in two ways:

- **Push**: an alert on the rider's phone as soon as the notification is sent.
- **Inbox**: every notification is kept in the app so riders can read it later.

!!! info "Screenshot to be added"
    **Notifications**: `assets/screenshots/rider-notifications.png`

---

## Training challenge

The **training challenge** gives riders something to work towards while they prepare for the tour.

!!! info "Screenshot to be added"
    **Training challenge**: `assets/screenshots/rider-training-challenge.png`

---

!!! tip "Want the step-by-step guide?"
    The rider app user guide is in the app's repository at `docs/user-guide/README.md`. See [Resources](../resources.md).

_Last updated: 2026-10-02_
