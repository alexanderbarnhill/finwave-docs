---
title: "Common Issues"
description: "How to read the error messages the web app shows you"
sidebar:
  order: 1
quickRef:
  - "Most error toasts in the web app come from a single error-handler service that maps HTTP status to a friendly message"
  - "Connection error (status 0): the browser couldn't reach the server. Almost always a local network or VPN problem"
  - "Bad request (400): the server's specific message is shown. Often a validation error from the form you just submitted"
  - "Unauthorized (401): your session has expired. Sign in again — the message says exactly that"
  - "Forbidden (403): your role isn't allowed for this action. The toast names the action ('Submit export request: You do not have permission for this action.')"
  - "Not found (404): the record was deleted or moved. Refresh the listing to see the current state"
  - "Conflict (409): two clients edited the same thing simultaneously. Refresh and try again"
  - "Server error (500/502/503): server-side problem. The toast says 'Server error. Please try again later.' — retry, then escalate if persistent"
---

## Reading the error messages

The web app routes most error toasts through a single error handler that produces consistent messages. Knowing what each status code maps to lets you skip the guesswork.

| Status | Toast text (after the action context) | What it usually means |
|---|---|---|
| **0** | "Unable to connect to the server." | Your browser couldn't reach the API. Check your internet connection or VPN. The server itself is fine — your request never arrived. |
| **400** | The server's specific validation message — or "Please check your input." as fallback | A field you submitted is missing or malformed. The toast usually shows the exact problem. |
| **401** | "Your session has expired. Please log in again." | Your auth token timed out. Sign in again. |
| **403** | "{action}: You do not have permission for this action." | Your role doesn't permit this. The action name is included so you know which call was rejected. |
| **404** | "{action}: The requested item was not found." | The record no longer exists. Often someone else deleted it; refresh the page. |
| **409** | "{action}: A conflict occurred. Please refresh and try again." | Optimistic concurrency conflict — someone else saved the same record while you were editing. Refresh, redo your changes, save again. |
| **500 / 502 / 503** | "{action}: Server error. Please try again later." | A server-side problem. Try again in a minute. If it persists, contact support. |
| **anything else** | "{action}: An unexpected error occurred." | The handler didn't recognise the response. Check the browser console for more detail and share with support if needed. |

## When the toast carries a trace id

For requests that match the structured error format, the handler also displays a **trace id**. If you report the issue, include the trace id — support can find the corresponding server log entry from it.

## Specific surface troubleshooting

Some pages have richer error handling than the generic mapping above:

- **Encounter submission** — see [Creating Encounters → What happens after submission](/web/features/encounters/creating/#what-happens-after-submission) for the upload retry/skip flow.
- **Encounter ML pipeline** — see [Submissions → Stages](/web/features/submissions/#processing-stages) for what each ML state means.
- **Author approval flow on exports** — declined approval requests can be re-approved; see the Export Approval section in [Creating Encounters](/web/features/encounters/creating/) for the license interaction.

For desktop-client-specific issues (sync, photographer resolution, cloud discovery), the desktop docs have their own troubleshooting page: [Sync Troubleshooting](/desktop/sync/troubleshooting/).

## When this page doesn't help

If your error doesn't match any of the codes above, or the same error keeps recurring even after the suggested action, the next step is to capture context for support:

- The exact toast text
- The trace id, if shown
- The page URL when the error happened
- What you were doing right before it appeared
- The browser's dev tools console, if you can copy any errors logged there

## Related

- [Upload Errors](/web/troubleshooting/upload-errors/) — upload-specific failure modes
- [ML Issues](/web/troubleshooting/ml-issues/) — when ML metrics or annotations behave unexpectedly
- [ML Center Overview](/web/ml-center/overview/) — for understanding what the metrics dashboards show
