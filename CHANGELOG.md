# [0.2.0](https://github.com/ministryofjustice/moj-frontend/compare/v0.1.0-alpha...v0.2.0-alpha) (2021-01-11)


### Features

* **add-another:** add to initAll ([4e0f798](https://github.com/ministryofjustice/moj-frontend/commit/4e0f798ad32850757b2f9c0f4b1a02b970163289))
* **multi-select:** add to initAll ([1fe780a](https://github.com/ministryofjustice/moj-frontend/commit/1fe780ac65ff0a583853e8cea6508db2fd505729))
* **password-reveal:** add data-module attribute ([d41cd0f](https://github.com/ministryofjustice/moj-frontend/commit/d41cd0f277f8bcfc99c679f8854f262db06bdbbf))
* **rich-text-editor:** add to initAll ([a487749](https://github.com/ministryofjustice/moj-frontend/commit/a487749651119326d5b352b3df378de919e2f1c0))
* **search-toggle:** add to initAll ([9251a38](https://github.com/ministryofjustice/moj-frontend/commit/9251a38a8d8a927e03654366e90c489baef7b4bd))
* **sortable-table:** add to initAll ([99751e4](https://github.com/ministryofjustice/moj-frontend/commit/99751e4a153085d58017ed4bd5a722615b573a50))

# [0.1.0](https://github.com/ministryofjustice/moj-frontend/compare/v0.0.23-alpha...v0.1.0-alpha) (2021-01-08)


### Features

* **component:** adds the new Ticket Panel component ([1565383](https://github.com/ministryofjustice/moj-frontend/commit/15653837333a50be6e9e5821315e6a629b21e0b1)), closes [#125](https://github.com/ministryofjustice/moj-frontend/issues/125)

## [0.0.23](https://github.com/ministryofjustice/moj-frontend/compare/v0.0.22-alpha...v0.0.23-alpha) (2020-12-29)


### Bug Fixes

* upgrade govuk-frontend from 3.10.0 to 3.10.1 ([a5335d7](https://github.com/ministryofjustice/moj-frontend/commit/a5335d7109c0b51caacfa11b9c8d92239ec18b48))

## [0.0.22](https://github.com/ministryofjustice/moj-frontend/compare/v0.0.21-alpha...v0.0.22-alpha) (2020-12-15)


### Bug Fixes

* upgrade govuk-frontend from 3.9.1 to 3.10.0 ([c8f58f8](https://github.com/ministryofjustice/moj-frontend/commit/c8f58f807e01c5c0b53e6a194bd26ea6c5d15594))

## [0.0.21](https://github.com/ministryofjustice/moj-frontend/compare/v0.0.20-alpha...v0.0.21-alpha) (2020-10-22)


### Bug Fixes

* fix for package contents not distributing correct files ([ffc5e43](https://github.com/ministryofjustice/moj-frontend/commit/ffc5e43679dea0ef19970578a919e35269dc21fc))

## [0.0.20](https://github.com/ministryofjustice/moj-frontend/compare/v0.0.19-alpha...v0.0.20-alpha) (2020-10-22)


### Bug Fixes

* potential fix for missing alpha dist tag in npm package ([cd8d74a](https://github.com/ministryofjustice/moj-frontend/commit/cd8d74a9fd620e5f54f92536f7dcc43ce39ec56f))

## [0.0.19](https://github.com/ministryofjustice/moj-frontend/compare/v0.0.18-alpha...v0.0.19-alpha) (2020-10-22)


### Bug Fixes

* upgrade govuk-frontend from 3.6.0 to 3.7.0 ([#100](https://github.com/ministryofjustice/moj-frontend/issues/100)) ([3498af0](https://github.com/ministryofjustice/moj-frontend/commit/3498af0fab6d8959ccdcda802bc2a2817c149c7f))
* upgrade moment from 2.26.0 to 2.27.0 ([#102](https://github.com/ministryofjustice/moj-frontend/issues/102)) ([611081a](https://github.com/ministryofjustice/moj-frontend/commit/611081a1c1627bb75b122bc26921c4c6e8cf0ce4))

## v0.0.19-alpha

* Fixes #84 "main" location in package.json is not correct
* Fixes #95 MOJ Header display and relating accessibility issues when `$govuk-global-styles` is not set
* Fixes inconsistencies with colour use between components
* Corrects default colours used within components
* Allows use of existing colour override variables supported by the GOV.UK Frontend
* Corrects other display and relating accessibility issues when `$govuk-global-styles` is not set

## v0.0.18-alpha

* Fix #88 where pagination results do not have font size specified
* Removed misleading reference to `$moj-image-url-function`

## v0.0.17-alpha

* JS can now be imported in things like Webpacks thanks to @gregtyler

## v0.0.16-alpha

* Change pagination arrows to use CSS like the back link. Thanks to @MalcolmVonMoJ.
* Fix add another component when a field has hint text. Thanks to @garyboyle (DWP).
* Fix #79 where colour wasn't wrapped in quotes and caused build errors. Thanks to @johnnolan.

## v0.0.15-alpha

* Fix Header component urls

## v0.0.14-alpha

* Fix prototype kit extensions path to macros
* Made header more flexible

## v0.0.13-alpha

* Add task list component
* Fixed bug with identity bar
* Fixed bug with page header actions
* Other miscellaneous fixes

## v0.0.12-alpha

* Update header component
* Update primary navigation component
* Update button menu component
* Other miscellaneous fixes

## v0.0.11-alpha

* Add side navigation component
* Change menu component to button menu
* Other miscellaneous fixes

## v0.0.10-alpha

* Multi file upload added
* Fix prototype kit extension paths

## v0.0.9-alpha

* Change namespacing. See [issue 6](https://github.com/ministryofjustice/moj-frontend/issues/6)
* Fix inline and toggle search
* Fix focus states for search and menu components

## v0.0.8-alpha

* Upgrade to GOV.UK Frontend v3.0.0

## v0.0.7-alpha

* Add messages component
* Update `mq` to `govuk-media-query` mixin in styles
* Update packages to fix vulnerabilities
* Other miscellaneous fixes

## v0.0.6-alpha

* Add filter toggle button component
* Fixes

## v0.0.5-alpha

* Fixes

## v0.0.4-alpha

* Add badge component
* Add banner component
* Add filter component
* Add identity bar component
* Add menu component (split buttons and button group)
* Add multi-select component
* Add password reveal
* Add rich-text editor component
* Add tag styles
* Add timeline component

Other:

* Add date filters and moment.js dependency

## v0.0.3-alpha

* Add add another component
* Add currency input component
* Add header component
* Add notification badge component
* Add organisation switcher component
* Add primary navigation component
* Add progress bar component
* Add sub-navigation component

## v0.0.2-alpha

* Add pagination component
* Add search component
* Add sortable table component

## v0.0.1-alpha

Initial commit
