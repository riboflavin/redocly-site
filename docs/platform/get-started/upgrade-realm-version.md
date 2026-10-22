---
plans:
  - Community
  - Pro
  - Scale
  - Enterprise
keywords:
  includes:
    - package.json
---

# Upgrade your product version

{% configOptionRequirements plans=$frontmatter.plans /%}

If you are working in the Redocly platform, your project updates automatically when new versions are released and you trigger a new build.
If you are working locally, you must update your `package.json` file to the version you want your project to use.

Keep Redocly up to date to prevent exposing your systems to security risks.
To learn about Redocly's release schedule for patching known security vulnerabilities, see [Security vulnerability fixes](../faq/security-fixes.md).

## Before you begin

Make sure you have the following:

- for local development: [NodeJS LTS](https://nodejs.org/en), v22.12.0 or later (alternatively -- v20.19.5 or later)

## Check product version

Before you can decide if you want to update your version, you need to know what version your project is currently using.
You can ascertain the version your project is using with the developer tools in your browser.

To verify the version your project is using:

1. From the Redocly editor, open the preview or production build of your project in your browser.
   Use the **View** drop-down in the top left corner of the page.

   {% img
    src="../content/images/view-project-dropdown.png"
    alt="Screenshot of top right corner of the Redocly editor with View drop-down"
    withLightbox=true
    framed=true
   /%}

2. Right-click anywhere on a page and select **Inspect** or **Inspect Element**.
3. In the developer tools pane, select **Console**.
4. You should see the version displayed as in the following screenshot:

   {% img
    src="../content/images/console-version.png"
    alt="Screenshot of the console in Chrome showing the Redocly version"
    withLightbox=true
    framed=true
   /%}

After you have determined what version your project is running, you can find the latest version to help you decide if you want to upgrade.

## Find the latest product version

You might know what version you are running, but not whether it is the latest version.
You can see a list of all available versions or get only the latest one.
Use the [changelog](../changelog.page.tsx) or npm commands.

To find the latest Redocly version, use the following npm command:

`npm view @redocly/framework version`

To find a list of all available Redocly versions, use the following npm command:

`npm view @redocly/framework versions`

## Run a specific product version

You may need to run a specific version, instead of the latest version.
You can control what version your project runs, using a `package.json` file.

### Run a specific product version locally

If you want to run a specific version, you need to add a `package.json` file to your project if you don't already have one.
You also need to install `@redocly/cli` globally and your Redocly product to your project directory.

To run a specific version working locally:

1. Add the following `package.json` file to the root of your project.
   Replace `realm` with the Redocly product you are using and the `*` for the version you want to run:

   ```json   {% title="package.json" %}
   {
      "name": "demo",
      "version": "1.0.0",
      "description": "",
      "author": "",
      "license": "UNLICENSED",
      "dependencies": {
      "@redocly/framework": "*"
    }
   }
   ```

2. Install your product to your project directory using the following command:

   `npm i`

3. Install `@redocly/cli` globally using the following command:

   `npm i @redocly/cli -g`

4. Run your project using the following command:

   `redocly preview`

5. Using your developer tools, verify the version in the console as described in [Check product version](#check-product-version).

### Run a specific product version in Redocly

If you are working in the Redocly editor, your project by default uses the most recent version.
It automatically updates whenever new versions are released and you trigger a new build.
However, you might want to use a specific version and not update automatically.
In that case, add a `package.json` file to your project with the version listed.

To run a specific version in Redocly:

1. Create a new development branch.

   <details>
   <summary>Create a branch steps</summary>

    {% partial file="../_partials/create-branch.md" /%}

   </details>

2. On the new development branch, add a new file named `package.json` by clicking the **+** icon and selecting **New file**.
3. Paste the following configuration into the `package.json` file.
   Replace `realm` with the Redocly product you are using and the `*` for the version you want to run:

   ```json   {% title="package.json" %}
   {
      "name": "demo",
      "version": "1.0.0",
      "description": "",
      "author": "",
      "license": "UNLICENSED",
      "dependencies": {
      "@redocly/framework": "*"
    }
   }
   ```

4. Commit your update.

   <details>
   <summary>Create update steps</summary>

    {% partial file="../_partials/commit.md" /%}

   </details>

5. After the preview build has completed, open it using the **View** drop-down in the top right corner of the page.

   {% img
    src="../content/images/view-project-dropdown.png"
    alt="Screenshot of top right corner of the Redocly editor with View drop-down"
    withLightbox=true
    framed=true
   /%}

6. [Check the version](#check-product-version).
7. To run this version in your production build, [open a pull request](../project/pull-request/open-pull-request.md), then review and [merge it](../project/pull-request/review-pull-request.md#merge-a-pull-request) with the new `package.json` file.

## Resources

- **[Get started with Redocly](./index.md)** - Take your first steps building your project
