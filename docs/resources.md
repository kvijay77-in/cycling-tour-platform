# Resources

These are the repositories that make up the platform, with their main documentation.

!!! note "Access"
    The app and backend repositories may be private. If a link below gives a "not found" page, ask the platform owner for access.

---

## :material-server: tour-data-api: backend and infrastructure

The Python AWS SAM backend. It owns **all** AWS infrastructure (both Cognito user pools, `TourDataApi` and `RiderApi`, Lambda, DynamoDB and S3) and defines the roles and permissions.

| | |
|---|---|
| Repository | [kvijay77-in/tour-data-api](https://github.com/kvijay77-in/tour-data-api) |
| Documentation index | [docs/README.md](https://github.com/kvijay77-in/tour-data-api/blob/main/docs/README.md) |
| API reference | [docs/design/api-reference.md](https://github.com/kvijay77-in/tour-data-api/blob/main/docs/design/api-reference.md) |
| Roles & permissions (RBAC) | [docs/design/rbac.md](https://github.com/kvijay77-in/tour-data-api/blob/main/docs/design/rbac.md) · [src/layers/common/rbac.py](https://github.com/kvijay77-in/tour-data-api/blob/main/src/layers/common/rbac.py) |
| Data model | [docs/design/data-model.md](https://github.com/kvijay77-in/tour-data-api/blob/main/docs/design/data-model.md) |
| Deployment guide | [docs/guides/deployment.md](https://github.com/kvijay77-in/tour-data-api/blob/main/docs/guides/deployment.md) |

---

## :material-clipboard-list: tour-mgmt-app: management app

The React Native / Expo app (Android and web) for organizers and crews. It works offline.

| | |
|---|---|
| Repository | [kvijay77-in/tour-mgmt-app](https://github.com/kvijay77-in/tour-mgmt-app) |
| Documentation index | [docs/README.md](https://github.com/kvijay77-in/tour-mgmt-app/blob/main/docs/README.md) |
| User guide | [docs/user-guide/README.md](https://github.com/kvijay77-in/tour-mgmt-app/blob/main/docs/user-guide/README.md) |

---

## :material-bike: tour-rider-app: rider app

The React Native / Expo app for riders.

Tour and ride artifact manifests, download behavior, and document viewing are described in the [Rider App feature guide](features/rider-app.md#tour-and-ride-documents).

| | |
|---|---|
| Repository | [kvijay77-in/tour-rider-app](https://github.com/kvijay77-in/tour-rider-app) |
| Documentation index | [docs/README.md](https://github.com/kvijay77-in/tour-rider-app/blob/main/docs/README.md) |
| User guide | [docs/user-guide/README.md](https://github.com/kvijay77-in/tour-rider-app/blob/main/docs/user-guide/README.md) |

---

## :material-web: cycling-tour-platform: this site

| | |
|---|---|
| Repository | [kvijay77-in/cycling-tour-platform](https://github.com/kvijay77-in/cycling-tour-platform) |
| Live site | [kvijay77-in.github.io/cycling-tour-platform](https://kvijay77-in.github.io/cycling-tour-platform/) |
| Platform glossary | [Glossary](glossary.md) |
| Platform user guide | [User guide](user-guide.md) |

_Last updated: 2026-10-02_
