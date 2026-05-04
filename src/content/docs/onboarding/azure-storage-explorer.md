---
title: "Uploading via Azure Storage Explorer"
description: "Install Microsoft's Azure Storage Explorer and upload your files using the SAS link we sent you"
sidebar:
  order: 2
quickRef:
  - "You don't need an Azure account — the SAS link in your email is your credential"
  - "Install Azure Storage Explorer from Microsoft, then attach the container with `Use a shared access signature URI`"
  - "Drag and drop is the fastest way to upload; the Upload button works too if drag-and-drop is awkward"
  - "Don't change Blob Type, Target Access Tier, Destination Directory, or Overwrite Option — defaults are correct"
  - "If Storage Explorer asks you to install .NET Desktop Runtime on Windows, follow its link, install, then re-open"
  - "If a sign-in to Azure window appears, close or cancel it — the SAS link is the only credential you need"
  - "Email us when uploads finish so we can start processing on our side"
---

This guide is for contributors who received a **SAS link** from finwave by email and need to upload files into our Azure blob container. You do **not** need an Azure account, and you do not need to install the finwave desktop app — only Microsoft's free **Azure Storage Explorer** tool.

:::note[Not what you're looking for?]
If you've been asked to install the **finwave desktop app** instead — to scan a local image library, build a manifest, and sync over time — see the [Desktop Client onboarding guide](/desktop/onboarding/overview/). The two paths solve different problems:

- **This guide (SAS link + Storage Explorer)** is a one-shot upload of files you already have. We do the discovery and manifesting on our side.
- **The desktop app** is for ongoing collections — it scans folders for metadata, groups images into encounters, and runs a resumable sync.

If you got a SAS URL ending in `?sv=…&sig=…` in an email, you're in the right place.
:::

## What you'll need

- A computer running **Windows**, **macOS**, or **Linux**
- A working internet connection
- The **SAS URL** we sent you — it looks like a long web address ending in `?sv=…&sig=…`

## 1. Download Azure Storage Explorer

1. Open your web browser.
2. Either go directly to the [Azure Storage Explorer download page](https://azure.microsoft.com/en-us/products/storage/storage-explorer), or search for **Azure Storage Explorer download** and click the official Microsoft result.
3. On the download page, choose the installer for your operating system:
   - **Windows** — usually a `.exe` file
   - **macOS** — usually a `.dmg` file
   - **Linux** — a package or `.tar.gz` archive

:::tip
If you're not sure which installer to pick, just tell us your system (Windows / Mac) and we can send you the direct download link.
:::

## 2. Install Azure Storage Explorer

### Windows

1. Locate the downloaded `.exe` file (often in your **Downloads** folder).
2. Double-click it.
3. If Windows shows a security prompt, click **Run** or **Yes**.
4. Follow the steps in the installer:
   - Accept the license agreement.
   - Use the default installation location (recommended).
   - Click **Install**.
5. When finished, click **Finish** and (optionally) leave **Launch Azure Storage Explorer** checked.

### macOS

1. Open your **Downloads** folder.
2. Double-click the downloaded `.dmg` file.
3. A window will appear with the **Azure Storage Explorer** icon.
4. Drag the **Azure Storage Explorer** icon into the **Applications** folder shortcut.
5. Open **Applications** and double-click **Azure Storage Explorer**.
6. If macOS shows a security prompt ("Are you sure you want to open this app?"), click **Open**.

### Linux

1. Extract the downloaded archive or install via the package appropriate for your distribution.
2. Run **Azure Storage Explorer** according to the instructions for your system.

If you're on Linux and run into issues, let us know which distro you're using.

## 3. First launch

### Starting Azure Storage Explorer

- **Windows** — open the **Start Menu**, type `Storage Explorer`, and press **Enter**.
- **macOS** — open **Applications** and double-click **Azure Storage Explorer**.

Wait a moment for it to start up.

If a window appears asking you to **sign in to Azure**, you can **close or cancel** that. You do **not** need an Azure account to upload using the SAS link.

![Azure Storage Explorer Get Started screen](/screenshots/onboarding/azure-storage-explorer/01-get-started.png)

### If you're asked to install .NET (Windows only)

On some Windows systems, Azure Storage Explorer may show a message such as:

- ".NET Desktop Runtime is required"
- ".NET runtime is missing"
- Or similar wording

If you see something like this:

1. **Don't panic** — this is normal on some machines.
2. The message will usually include a **link** to download the required **.NET Desktop Runtime** from Microsoft.
3. Click that link, or in your browser search for: `Download .NET Desktop Runtime`.
4. On the Microsoft page, choose the **latest supported .NET Desktop Runtime** version they recommend. Make sure you pick the installer that matches your system (usually **x64** for most modern Windows machines).
5. Download the installer and run it: double-click the `.exe`, then follow the prompts (Next / Install / Finish).
6. Once the .NET Desktop Runtime is installed, close Azure Storage Explorer if it's still open and re-open it from the Start Menu.

After this, Azure Storage Explorer should launch without complaining about .NET.

## 4. Get the SAS URL ready

We will send you a **SAS URL** for a specific blob container. It will look like a long link, e.g.:

```
https://<account>.blob.core.windows.net/<container>?sv=...&se=...&sp=...&sig=...
```

1. Open the email or message where we sent you this link.
2. Select the entire link.
3. Copy it:
   - **Windows** — `Ctrl + C`
   - **macOS** — `Cmd + C`

## 5. Attach the container using the SAS URL

In Azure Storage Explorer, look at the left-hand panel (the tree view). At the top of that panel, click the **plug** icon — the "Add" or "Connect" button. It may be labelled "Add an account" or "Add resource".

![The Add / Connect plug icon in the Explorer panel](/screenshots/onboarding/azure-storage-explorer/02-plug-connect.png)

A **Connect** window will open with several options. Choose **Blob container** (or "Storage account or service → Blob container").

![Select Resource — choose Blob container](/screenshots/onboarding/azure-storage-explorer/03-select-resource.png)

Then choose **Shared access signature URL (SAS)** and click **Next**.

![Select Connection Method — Shared access signature URL (SAS)](/screenshots/onboarding/azure-storage-explorer/04-connection-method-sas.png)

In the **Blob container or directory SAS URL** field, paste the link you copied from our email:

- **Windows** — `Ctrl + V`
- **macOS** — `Cmd + V`

Optionally, provide a friendly **Display name** so it's easy to recognise (e.g. `Alex Upload — Ulceration TS`).

![Enter Connection Info — paste the SAS URL](/screenshots/onboarding/azure-storage-explorer/05-enter-connection-info.png)

Click **Next**, review the summary, then click **Connect**.

![Summary screen before connecting](/screenshots/onboarding/azure-storage-explorer/06-summary.png)

If everything is correct, you'll see a new entry on the left under **Local & Attached → SAS-Attached Services → [your display name]**. Inside that, you should see **Blob Containers → [container name]**.

![New container attached in the Explorer panel](/screenshots/onboarding/azure-storage-explorer/07-container-attached.png)

## 6. Open the container

1. In the left-hand panel, expand your newly added connection if it's collapsed.
2. Click on the blob container name (the one we gave you).
3. The right-hand side will now show the contents of that container — it may be empty at first.

## 7. Upload your files

You can upload files via drag-and-drop or using the Upload button.

### Drag and drop (usually easiest)

1. Open the folder on your computer where your files are stored (e.g. Windows Explorer / Finder).
2. Position that folder window and Azure Storage Explorer so you can see both.
3. In your file/folder window, select all the files and/or folders you want to upload.
4. Drag the selection into the **main pane** of Azure Storage Explorer (where you see the container contents).
5. Release the mouse button to drop them.

![Drag and drop files into Storage Explorer](/screenshots/onboarding/azure-storage-explorer/08-drag-drop.png)

An Upload dialog will appear showing progress for each file. Wait until the status shows **Completed** for all items.

![Activities panel showing transfer complete](/screenshots/onboarding/azure-storage-explorer/09-transfer-complete.png)

### Using the Upload button

With the container selected in the left panel, look at the toolbar at the top of the right-hand pane.

![Upload button in the toolbar](/screenshots/onboarding/azure-storage-explorer/10-upload-toolbar.png)

1. Click **Upload**.
2. Choose one of:
   - **Upload Files…** — to upload one or more individual files.

     ![Upload Files dialog](/screenshots/onboarding/azure-storage-explorer/11-upload-files-dialog.png)

   - **Upload Folder…** — to upload an entire folder and its structure.

     ![Upload Folder dialog](/screenshots/onboarding/azure-storage-explorer/12-upload-folder-dialog.png)

:::note
You do **not** need to change **Blob Type**, **Target Access Tier**, **Destination Directory**, or **Overwrite Option** — leave them at their defaults.
:::

3. In the dialog, click **Browse**, select the file(s) or folder on your computer, click **Open**, then click **Upload** to start.
4. Watch the Upload dialog until all files show **Completed**.

## 8. Confirm the upload

After the upload completes, in Azure Storage Explorer you should see your files listed in the container. Each row shows Name, Last Modified, Size, etc. You can click the column headers (e.g. **Last Modified**) to sort, so the most recent uploads appear at the top.

![Container view after upload completes](/screenshots/onboarding/azure-storage-explorer/13-container-after-upload.png)

## 9. Let us know you're done

Once your files are uploaded, send us a quick email to confirm, including:

- That you've finished uploading.
- Approximately how many files you uploaded.
- Any notes (e.g. "Ulceration TS severity ratings for years X–Y").

That's it — once the files are visible in Azure Storage Explorer, we can access them on our side and start processing.

## Quick summary (for reference)

1. Install Azure Storage Explorer from Microsoft's website.
2. Open Azure Storage Explorer and ignore any Azure sign-in prompts.
3. Click the plug / Connect icon → choose **Blob container** → **Use SAS URI**.
4. Paste the SAS URL we sent you and connect.
5. Select the blob container and drag-and-drop your files into the main pane (or use **Upload → Upload Files / Folder**).
6. Wait until all uploads are complete and files appear in the list.
7. Email us to confirm you're done.
