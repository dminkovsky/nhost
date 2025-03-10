---
title: 'Get Started with Nhost CLI'
sidebar_position: 2
image: /img/og/platform/get-started-with-nhost-cli.png
---

# Get started with Nhost CLI

Nhost's command-line interface (CLI) lets you run a complete Nhost development
environment locally with the following services: PostgreSQL database, Hasura,
Authentication, Storage (MinIO), Serverless Functions, and Emails (Mailhog).

## Installation

### Install the binary globally

To install **Nhost CLI**, run this command from any directory in your terminal:

```bash
sudo curl -L https://raw.githubusercontent.com/nhost/cli/main/get.sh | bash
```

On **MacOS and Linux**, this will install the **Nhost CLI** in `/usr/local/bin`.

If you'd prefer to install to a different location other than `/usr/local/bin`,
set the `INSTALL_PATH` variable accordingly:

```bash
sudo curl -L https://raw.githubusercontent.com/nhost/cli/main/get.sh | INSTALL_PATH=$HOME/bin bash
```

On **Windows**, this will download and extract the binary `nhost.exe` available
under `Assets` of the latest release from the GitHub release page:
https://github.com/nhost/cli/releases.

You can move the executable to a different location and add the path to the
environment variable `PATH` to make `nhost` accessible globally.

Finally, you can check that everything has been successfully installed by
typing:

```bash
nhost version
```

![Nhost CLI Version](/img/architecture/cli/cli-installed.png)

### (Optional) Add shell completion

To add command auto-completion in the shell, you can run the following command:

```bash
nhost completion [shell]
```

This will generate the autocompletion script for `nhost` for the specified shell
(bash, fish, PowerShell, or zsh).

## Prerequisites

### Dependencies

Before using the **Nhost CLI**, make sure you have the following dependencies
installed on your local machine:

- [Git](https://git-scm.com/downloads)
- [Docker](https://www.docker.com/get-started)

:::caution
Docker must be running while using Nhost CLI.
:::

### Nhost CLI login

After installing **Nhost CLI**, you can log in to your Nhost account by running
the following command:

```bash
nhost login
```

This will display a prompt for you to enter your Nhost account credentials
(email/password).

:::info
You can create a Nhost account here: [https://app.nhost.io](https://app.nhost.io/).
:::

![Nhost CLI Login](/img/architecture/cli/cli-login.png)

After successfully logging in, you are authorized to manage your Nhost projects
using the Nhost CLI.

You can also log out at any time by running:

```bash
nhost logout
```

## Set up your project

### 1. Create a new Nhost app

import CreateApp from '@site/src/components/create-nhost-app.mdx';

<CreateApp />

### 2. Create a new GitHub Repository

A typical workflow would also include creating a Github repository for your
Nhost project. It will facilitate your development workflow since Nhost can
integrate with Github to enable continuous deployment.

So, go to your Github account and
[create a new repository](https://github.com/new). You can make your repository
either public or private.

![Create GitHub Repo](/img/architecture/cli/create-github-repo.png)

### 3. Connect Nhost project to Github

Finally, connect your Github repository to your Nhost project. Doing so will
enable Nhost to deploy new versions of your project when you push automatically
commits to your connected Git repository.

1. From your project workspace, click **Connect to Github**.

![Connect to GitHub](/img/architecture/cli/connect-repo-step-1.png)

2. **Install the Nhost app** on your Github account.

![Connect to GitHub](/img/architecture/cli/connect-repo-step-2.png)

3. **Connect** your Github repository.

![Connect to GitHub](/img/architecture/cli/connect-repo-step-3.png)

## Develop locally

## 1. Initialize your Nhost app

**Nhost CLI** brings the functionality of your Nhost production environment
directly to your local machine.

It provides Docker containers to run the backend services that match your
production application in a local environment. That way, you can make changes
and test your code locally before deploying those changes to production.

You can either initialize a blank Nhost app locally to start from scratch by
running the following command:

```bash
nhost init -n my-nhost-app
```

And then link it to a remote app from your Nhost workspace in `app.nhost.io` by
running the `link` command and selecting the corresponding app from the prompt:

```bash
nhost link
```

Or you can directly initialize a local Nhost app from one of your existing
production apps by specifying the `--remote` flag:

```bash
nhost init --remote -n my-nhost-app
```

It will also prompt you to choose the remote app you'd like to use to initialize
your local Nhost development environment.

![Select app](/img/architecture/cli/cli-select-app.png)

The `init` command creates the Nhost app inside your current working directory
within a `nhost/` folder.

```
my-nhost-app/
  └─ nhost/
      ├─ config.yaml
      ├─ emails/
      ├─ metadata/
      ├─ migrations/
      └─ seeds/
```

Finally, make sure to link your current working directory to your GitHub
repository:

```bash
echo "# my-nhost-app" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/[github-username]/my-nhost-app.git
git push -u origin main
```

## 2. Start a local development environment

To start a local development environment for your Nhost app, run the following
command:

```bash
nhost dev
```

:::caution
Make sure [Docker](https://www.docker.com/get-started) is up and running. It’s required for Nhost to work.
:::

Running this command will start up all the backend services provided by Nhost.

It also runs a webserver to serve the Hasura console for the GraphQL engine so
you can manage the database and try out the API.

The Hasura console should open automatically at
[http://localhost:1337](http://localhost:1337/).

![Hasura Console](/img/architecture/cli/hasura-console.png)

## 3. Make changes

There are three things the Nhost CLI and the GitHub integration track and apply
to production:

- Database migrations
- Hasura Metadata
- Serverless Functions

:::caution
Settings in `nhost/config.yaml` are not being applied to production. They only work locally for now.
:::

### Database migrations

Database changes are tracked and managed through migrations.

:::tip
It's important that you use the Hasura console to make database changes. Indeed, with the Hasura console, DB migration files are generated incrementally to track changes automatically for you.
:::

To demonstrate how to make database changes, let's create a new table called
`messages`, with the following columns:

- `id` (type UUID and default `gen_random_uuid()`),
- `text` (type Text),
- `authorId` (type UUID),
- `createdAt` (type Timestamp and default `now()`)

In the Hasura console, head over to the **data** tab section and click on the
PostgreSQL database (from the left side navigation) that Nhost provides us.

Click on the **public** schema and the **Create Table** button.

![Create Table](/img/architecture/cli/create-table-step-1.png)

Then, enter the values for creating the `messages` table as mentioned above.
Also, specify the `id` column as the primary key of the table, and link the
`authorId` column to the `users.id` column using a foreign key to link the
`users` and `messages` tables together.

![Create Table](/img/architecture/cli/create-table-step-2.png)

Next, click on the **Add Table** button to create the table.

Finally, check out the `migrations/` folder in your project directory. A
migration file has been created automatically to reflect our database changes
and track the new table creation.

The migration was created under `nhost/migrations/default`:

```bash
$ ls -la nhost/migrations/default
total 0
drwxr-xr-x  3 user  staff   96 Apr 27 17:06 .
drwxr-xr-x  3 user  staff   96 Apr 27 17:06 ..
drwxr-xr-x  4 user  staff  128 Apr 27 17:06 1651071963431_create_table_public_messages
```

However, note that this database migration has only been applied locally. In
other words, the `messages` table does not (yet) exists in production.

To apply the local changes to production, check out the
[Deploy your project](#deploy-your-project) section below.

### Hasura metadata

In addition to database schema changes, Nhost also tracks Hasura metadata.

The Hasura metadata track all the actions performed on the console, like
tracking tables/views/functions, creating relationships, configuring
permissions, creating event triggers, and remote schemas.

To demonstrate it, let's add a new permission to our `messages` table for the
`user` role on the `insert` operation. That permission will allow users to
create new messages.

So, open the permissions tab for the `messages` table, type in `user` in the
role cell, and click the edit icon on the `insert` operation:

![Create Table](/img/architecture/cli/permissions-1.png)

To restrict the users to create new messages only for themselves, specify an
`_eq` condition between the `authorId` and the `X-Hasura-User-ID` session
variable, which is passed with each request.

![Create Table](/img/architecture/cli/permissions-2.png)

Then, select the columns the users can define through the GraphQL API, set the
value for the `authorId` column to be equal to the `X-Hasura-User-ID` session
variable, and click **Save Permissions**.

![Create Table](/img/architecture/cli/permissions-3.png)

Finally, check out the `metadata/` folder in your project directory to confirm
that the permission changes we did were tracked locally in your git repository.

In our case, those changes should be tracked in
`nhost/metadata/databases/default/tables/public_messages.yaml`:

```yaml title="nhost/metadata/databases/default/tables/public_messages.yaml"
table:
  name: messages
  schema: public
insert_permissions:
  - permission:
      backend_only: false
      check:
        authorId:
          _eq: X-Hasura-User-Id
      columns:
        - text
      set:
        authorId: x-hasura-User-Id
    role: user
```

### Serverless functions

Now let's create a serverless function before we push all changes to GitHub so
Nhost can deploy them to production.

For this guide, let's create a simple serverless function that will return the
current date-time when called.

First, make sure to install `express`, which is required for serverless
functions to work.

```bash
npm install express
npm install -d @types/node @types/express
```

Then, create a new file named `time.ts` inside the `functions/` folder of your
working directory, and paste the following code:

```ts title="functions/time.ts"
import { Request, Response } from 'express'

export default (req: Request, res: Response) => {
  return res.status(200).send(`Hello ${req.query.name}! It's now: ${new Date().toUTCString()}`)
}
```

Every JavaScript and TypeScript file inside the `functions/` folder becomes an
API endpoint.

Locally, the base URL for the serverless functions is
`http://localhost:1337/v1/functions`. Then, the endpoint for each function is
determined by its filename or the name of its dedicated parent directory.

For example, the endpoint for our function is
`http://localhost:1337/v1/functions/time`.

```bash
curl http://localhost:1337/v1/functions/time\?name\=Greg
Hello Greg! It's now: Wed, 27 Apr 2022 18:52:12 GMT
```

## Deploy your project

To deploy your local changes to production, you can commit and push them to
GitHub. As a result, Nhost will automatically pick up the changes in your
repository and apply them to your associated remote Nhost project.

:::caution
Make sure to [connect your Github repository](#3-connect-nhost-project-to-Github) to your Nhost project first.
:::

```bash
git add -A
git commit -m "commit message"
git push
```

To check out your deployment, head over to the **Deployments** tab in your
[Nhost dashboard](https://app.nhost.io).

![Deployments](/img/architecture/cli/deployments.png)

## Get help

To get usage tips and learn more about available commands from within Nhost CLI,
run the following:

```shell
nhost help
```

For more information about a specific command, run the command with the `--help`
flag:

```
nhost init --help
```

If you have additional questions or ideas for new features, you can
[start an issue](https://github.com/nhost/cli/issues) or
[a new discussion](https://github.com/nhost/cli/discussions/new) on Nhost CLI’s
open-source repository. You can also
[chat with our team](https://discord.com/invite/9V7Qb2U) on Discord.

We’d love to hear from you!
