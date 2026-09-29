# How it works

This page explains how the platform fits together. It stays at the level of boxes and arrows. For the full technical design, see the backend repository listed in [Resources](resources.md).

---

## The big picture

There are **two apps** and **one backend**. The backend, `tour-data-api`, owns **all** of the cloud infrastructure, including sign-in, APIs, compute, databases and file storage.

```mermaid
flowchart LR
    subgraph Apps
        MA["📋 Management app<br/>Android + web<br/>(organizers & crews)"]
        RA["🚴 Rider app<br/>(riders)"]
    end

    subgraph Identity["Sign-in (Amazon Cognito)"]
        MP["Management user pool"]
        RP["Rider user pool"]
    end

    subgraph APIs["APIs (API Gateway HTTP APIs)"]
        TA["TourDataApi<br/>management API"]
        RI["RiderApi<br/>rider API"]
    end

    subgraph Compute["Business logic"]
        L["AWS Lambda functions<br/>+ role-based access checks"]
    end

    subgraph Data["Storage"]
        DS[("DynamoDB<br/>shared tables")]
        DT[("DynamoDB<br/>per-tour tables")]
        S3[("Amazon S3<br/>files")]
    end

    MA -- sign in --> MP
    RA -- sign in --> RP
    MA -- requests with token --> TA
    RA -- requests with token --> RI
    MP -. validates .-> TA
    RP -. validates .-> RI
    TA --> L
    RI --> L
    L --> DS
    L --> DT
    L --> S3
```

**In plain words**

- Each app has its **own sign-in pool** and its **own API**. The management team and riders never share a login system.
- Every request carries a sign-in token. The API checks the token. The Lambda functions then check the **role** (for management users) before doing anything.
- Data is kept in **DynamoDB**. Some tables are shared across the platform, and each tour also gets its **own tables**. Files are kept in **S3**.

---

## Data flow for a check-in

This is what happens when a pit stop crew member scans a rider's QR code.

```mermaid
sequenceDiagram
    autonumber
    actor Crew as Pit stop crew (PS_n)
    participant MA as Management app
    participant Q as Local SQLite + sync queue
    participant API as TourDataApi
    participant FN as Lambda (RBAC check)
    participant DB as DynamoDB
    actor Org as Organizer
    participant RI as RiderApi
    participant RA as Rider app

    Crew->>MA: Scan rider QR code
    MA->>Q: Save check-in locally, add to sync queue
    MA-->>Crew: ✅ Success / ❌ Error on screen
    alt Online
        Q->>API: Send queued check-in (with token)
        API->>FN: Token valid, pass request on
        FN->>FN: Does this role have permission?
        FN->>DB: Store check-in
        DB-->>FN: OK
        FN-->>Q: OK, remove from queue
    else Offline
        Q->>Q: Keep in queue until the connection returns
    end
    Org->>MA: Open live dashboard
    MA->>API: Fetch dashboard data
    API->>FN: Forward request
    FN->>DB: Read check-ins
    FN-->>MA: Grid data (rider × check-in point)
    RA->>RI: Fetch my check-ins
    RI->>FN: Forward request
    FN->>DB: Read this rider's check-ins
    FN-->>RA: Check-in status & history
```

---

## Offline sync in the management app

Pit stops are often somewhere with a weak signal. The management app keeps a local copy of what it needs in **SQLite**, and each change it makes goes into an **outbound sync queue**. The queue is sent to the backend whenever there is a connection.

```mermaid
stateDiagram-v2
    [*] --> Online
    Online --> Offline: Connection lost
    Offline --> Offline: New scans / changes saved locally and queued
    Offline --> Syncing: Connection restored
    Online --> Syncing: Items waiting in queue
    Syncing --> Online: Queue sent successfully
    Syncing --> Offline: Connection lost again
    Syncing --> Syncing: Retry items that failed

    note right of Offline
        Offline banner shown.
        Crews keep scanning as normal.
    end note
    note right of Syncing
        Sync status shows
        what is still pending.
    end note
```

!!! note
    Only the **management app** works offline. The **rider app** needs a connection.

---

## Notification flow

Notifications reach riders in two ways:

1. **Announcements**: an organizer writes a message in the management app.
2. **Notification rules**: rules configured for the tour create notifications automatically when something happens.

```mermaid
flowchart LR
    Org["Organizer"] -- announce --> MA["Management app"]
    MA --> TA["TourDataApi"]
    TA --> FN["Lambda<br/>notifications"]
    Rules["Notification rules"] -. trigger .-> FN
    Tour["Something happens on the tour"] -. matches a rule .-> Rules
    FN --> DB[("DynamoDB")]
    RA["Rider app"] -- fetch notifications --> RI["RiderApi"]
    RI --> FN
    FN -- reads --> DB
    RA --> Rider["Rider"]
```

---

## What lives where

| Piece | Repository | What it contains |
|---|---|---|
| Backend and **all** infrastructure | `tour-data-api` | Python AWS SAM application: APIs, Lambda functions, DynamoDB tables, S3, both Cognito user pools and the role/permission model |
| Management app | `tour-mgmt-app` | React Native / Expo app (Android and web) with offline SQLite storage and a sync queue |
| Rider app | `tour-rider-app` | React Native / Expo app for riders |
| This site | `cycling-tour-platform` | The platform overview and the platform glossary |

_Last updated: 2026-09-29_
