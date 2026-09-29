# Screenshots

This folder holds the app screenshots used on the platform site. The site currently shows **text placeholders** that give each file name, so `mkdocs build --strict` passes even though the images haven't been added yet.

## How to add a screenshot

1. Take the screenshot. Use a portrait phone screenshot for app screens and a desktop browser window for `mgmt-web-dashboard-desktop.png`. Use demo data only, with no real rider names or personal details.
2. Save it as a PNG in this folder using the **exact file name** from the tables below.
3. Replace the placeholder admonition on each page that mentions the file name with an image:
    - In `docs/features/*.md` pages: `![Dashboard grid](../assets/screenshots/mgmt-dashboard-grid.png)`
    - In `docs/gallery.md`: `![Dashboard grid](assets/screenshots/mgmt-dashboard-grid.png)`
4. Run `mkdocs build --strict` locally to check the paths.

## Management app

| File name | Screen | What to capture |
|---|---|---|
| `mgmt-login.png` | Login | Sign-in screen |
| `mgmt-home-tiles.png` | Home tiles | Home screen with the role-based tiles |
| `mgmt-dashboard-grid.png` | Dashboard grid | Live dashboard grid at normal zoom |
| `mgmt-dashboard-grid-zoomed-out.png` | Dashboard grid, zoomed out | Dashboard grid zoomed out to show the whole field |
| `mgmt-rider-card.png` | Rider card | Rider card opened from the dashboard |
| `mgmt-checkin-scan-success.png` | Check-in scan, success | QR check-in scan showing a success result |
| `mgmt-checkin-scan-error.png` | Check-in scan, error | QR check-in scan showing an error result |
| `mgmt-checkin-log.png` | Check-in log | Check-in log for a pit stop |
| `mgmt-events-home.png` | Events home | Events engine home screen |
| `mgmt-event-scan.png` | Event scan | Scanning during an event occurrence (e.g. Day 0 registration or baggage) |
| `mgmt-occurrence-dashboard.png` | Occurrence dashboard | Progress dashboard for one occurrence |
| `mgmt-baggage-reconciliation.png` | Baggage reconciliation | Baggage reconciliation screen |
| `mgmt-hotel-management.png` | Hotel management | Hotel management screen |
| `mgmt-hotel-csv-upload.png` | Hotel CSV upload | Room allocation CSV upload |
| `mgmt-tour-setup.png` | Tour setup | Tour setup screen |
| `mgmt-ride-tabs.png` | Ride tabs | Ride tabs in tour setup |
| `mgmt-notification-announce.png` | Notification announce | Writing an announcement to riders |
| `mgmt-user-onboarding.png` | User onboarding | Onboarding a team member and assigning a role |
| `mgmt-offline-sync-status.png` | Offline banner / sync status | Offline banner and pending sync status |
| `mgmt-web-dashboard-desktop.png` | Web dashboard on desktop | Management app dashboard in a desktop browser |

## Rider app

| File name | Screen | What to capture |
|---|---|---|
| `rider-login.png` | Login | Rider sign-in screen |
| `rider-signup.png` | Sign-up | Rider sign-up screen |
| `rider-profile-create.png` | Profile creation | Dynamic profile form being filled in |
| `rider-profile-view.png` | Profile view | Completed rider profile |
| `rider-tour-list.png` | Tour list | List of available tours |
| `rider-tour-details.png` | Tour details | Details of one tour, with registration |
| `rider-tour-dashboard.png` | Tour dashboard | Rider's tour dashboard |
| `rider-checkin-status.png` | Check-in status | Rider's check-in status |
| `rider-checkin-history.png` | Check-in history | Rider's check-in history |
| `rider-ride-details.png` | Ride details | Details of one ride |
| `rider-notifications.png` | Notifications | Rider's notifications list |
| `rider-training-challenge.png` | Training challenge | Training challenge screen |
