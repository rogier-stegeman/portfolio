---
name: remote-preview
description: Preview dev server remotely on mobile devices over a secure reverse tunnel. Use when the user asks to preview on phone or mobile.
---

# Remote Mobile Preview

Start a silent, zero-install tunnel to access the local Vite dev server from a mobile phone with live Hot Module Replacement (HMR).

## Steps

### 1. Verify or Launch Dev Server

Check if port `5173` is actively listening:

```powershell
Get-NetTCPConnection -LocalPort 5173 -State Listen -ErrorAction SilentlyContinue
```

If not listening, launch `pnpm dev` as a background daemon task (`IsDaemon: true`, `WaitMsBeforeAsync: 4000`). Confirm `VITE ready` in the task log.

### 2. Verify or Launch Reverse Tunnel

Check running background tasks via `manage_task(Action='list')` for an existing task running `pnpm tunnel` or `a.pinggy.io`.

- **If active tunnel task exists:** Read its task log URI and retrieve the existing HTTPS URL.
- **If no tunnel task exists:** Launch `pnpm tunnel` as a background daemon task (`IsDaemon: true`, `WaitMsBeforeAsync: 4000`).

### 3. Extract and Verify Live URL

From the tunnel task log, extract the assigned HTTPS URL matching `https://[^\s]+\.(?:pinggy\.link|pinggy\.net|pinggy-free\.link)`.

Verify HTTP and Vite client module endpoints return `200`:

```powershell
(Invoke-WebRequest -Uri "<tunnel-url>/" -UseBasicParsing).StatusCode
(Invoke-WebRequest -Uri "<tunnel-url>/@vite/client" -UseBasicParsing).StatusCode
```

Return the verified URL directly in chat.
