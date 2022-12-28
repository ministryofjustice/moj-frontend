### csrfToken

| Name | Type   | Required | Description |
| ---- | ------ | -------- | ----------- |
|      | object | Yes      |             |

Setup

`const csrf = csurf()`

`res.locals.csrfToken = req.csrfToken()`

- [csurf](https://www.npmjs.com/package/csurf)

### container

| Name   | Type   | Required | Description       |
| ------ | ------ | -------- | ----------------- |
| id     | string | Yes      | id of the control |
| text   | string | Yes      | Button text       |
| action | string | Yes      | POST URL          |
