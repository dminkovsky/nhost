# @nhost/hasura-storage-js

## 0.5.2

### Patch Changes

- Updated dependencies [197d1d5c]
  - @nhost/core@0.7.5

## 0.5.1

### Patch Changes

- Updated dependencies [6eaa5c79]
  - @nhost/core@0.7.4

## 0.5.0

### Minor Changes

- 4f928756: Extend file upload parameters

  - `bucketId` is available everywhere as an option
  - It is possible to pass files as a parameter on a multiple `upload`, making the `add` action optional.
  - The `add` and `upload` actions of multiple file upload accepts both a `File`, an array of `File` items, and a `FileList`

## 0.4.0

### Minor Changes

- f9854b15: Upload multiple files with `useMultipleFilesUpload`
- f9854b15: `useFileUpload`: keep track of upload progress and cancel upload

### Patch Changes

- Updated dependencies [f9854b15]
- Updated dependencies [f9854b15]
  - @nhost/core@0.7.3

## 0.3.4

### Patch Changes

- dbc10e62: fixed `exports` field to support imports in a server-side environment

## 0.3.3

### Patch Changes

- ebad0936: reverted ESM related changes

## 0.3.2

### Patch Changes

- 1b37b9f6: fix: ESM import path fixes

## 0.3.1

### Patch Changes

- 78341491: fix: Next.js and React issues with ESM packages
  chore: Updated output bundle names

## 0.3.0

### Minor Changes

- 858014e4: New `adminSecret` option
  It is now possible to add a new adminSecret when creating a Nhost client. When set, it is sent as an `x-hasura-admin-secret` header for all GraphQL, Storage, and Serverless Functions requests.

### Patch Changes

- bc11c9e5: chore: Changed copy script to support Windows
  fix: Fixed warnings about unknown globals occurring while building the packages
- 2b2f8e91: fix: ESM related issues in Node environments
  chore: Improved the way different formats are exposed via `exports` field in package.js

## 0.2.2

### Patch Changes

- e094e68: chore: bump axios from 0.26.0 to 0.27.2
  fix: add Content-Type to file upload request headers

## 0.2.1

### Patch Changes

- 584976d: - publishable directory structure changes (ESM, CJS and UMD included in the output)
  - build system improvements
  - fixed some bundling concerns (https://github.com/nhost/nhost/issues/428)

## 0.2.0

### Minor Changes

- 744fd69: Unify vanilla, react and next APIs so they can work together
  React and NextJS libraries now works together with `@nhost/nhost-js`. It also means the Nhost client needs to be initiated before passing it to the React provider.
  See the [React](https://docs.nhost.io/reference/react#configuration) and [NextJS](https://docs.nhost.io/reference/nextjs/configuration) configuration documentation for additional information.

## 0.1.0

### Minor Changes

- ff7ae21: Introducing `setAdminSecret` to allow users of the SDK to use `x-hasura-admin-secret` request header in storage related functions

## 0.0.12

### Patch Changes

- 8f7643a: Change target ES module build target to es2019
  Some systems based on older versions of Webpack or Babel don't support the current esbuild configuration e.g, [this issue](https://github.com/nhost/nhost/issues/275).

## 0.0.11

### Patch Changes

- 35f0ee7: Rename `storage.getUrl` to `storage.getPublicUrl`
  It aims to make a clear distinction between `storage.getPublicUrl` and `storage.getPresginedUrl`
  `storage.getUrl` is now deprecated.

## 0.0.10

### Patch Changes

- c8f2488: build npm package with esbuild instead of vite. Vite does not build isomorphic packages correctly, in particular the dependency to axios

## 0.0.9

### Patch Changes

- 2e1c055: Axios causes some trouble when used NodeJS / CommonJS. Any code importing `axios` now does so in using the `require()` syntax

## 0.0.8

### Patch Changes

- 03562af: Build in CommonJS and ESM instead of UMD and ESM as the UMD bundle generated by the default Vite lib build mode doesn't work with NodeJS

## 0.0.7

### Patch Changes

- 7c3a7be: Remove http timeout options (fix[#157](https://github.com/nhost/nhost/issues/157))
  This new release also comes up with both ESM and CommonJS distributions and solves [#151](https://github.com/nhost/nhost/issues/151)
