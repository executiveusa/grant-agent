# User Identity — Prototype V1

The browser creates and stores a stable local correlation ID such as `user-ab12cd34`.

## Purpose
- associate a local prototype request with the person sitting at that browser
- make run/audit artifacts attributable during customer-zero testing
- prove that work state can carry an actor identifier without requiring a dashboard

## What it is not
- not authentication
- not authorization
- not proof of identity
- not a tenant boundary
- not suitable for external side effects

## Production direction
QM must become the authoritative identity/scope/policy layer before multiplayer or external write actions ship. The local correlation ID will then map to an authenticated QM user/scope rather than granting permissions by itself.
