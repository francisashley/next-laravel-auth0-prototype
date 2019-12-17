# Next.js - Laravel API - Auth0 prototype

This project explores [Auth0](https://auth0.com) user authentication with a simple [serverless](https://martinfowler.com/articles/serverless.html) blog site. Serverless means "backend as a service", so in this case we're using Auth0 for user authentication and a custom [Laravel](https://laravel.com/) API for storing blog data. On the frontend we use [Next.js](https://nextjs.org/) (with [Tailwind CSS](https://tailwindcss.com/)) which will interface between users and the APIs.

**NB**; currently [`auth0/nextjs-auth0`](https://github.com/auth0/nextjs-auth0) has no way to refresh user data (stored in session cookie) without logging back in. This prevents the ability to see instant changes on `/settings` page. A [pull req](https://github.com/auth0/nextjs-auth0/pull/38) seeks to address this. Keep checking in.


## Table of contents
- [Next.js - Laravel API - Auth0 prototype](#nextjs---laravel-api---auth0-prototype)
  - [Table of contents](#table-of-contents)
  - [Features](#features)
  - [TODO](#todo)
  - [Dependencies](#dependencies)
  - [Getting started](#getting-started)
    - [Install](#install)
    - [Prepare your Auth0 account](#prepare-your-auth0-account)
    - [Create an Auth0 application for handling user authentication](#create-an-auth0-application-for-handling-user-authentication)
    - [Configure Auth0 database to require a username](#configure-auth0-database-to-require-a-username)
    - [Create an Auth0 application for updating user info](#create-an-auth0-application-for-updating-user-info)
    - [Configure Next environment variables](#configure-next-environment-variables)
    - [Configure Laravel](#configure-laravel)
    - [Run the prototype](#run-the-prototype)
  - [Reference material](#reference-material)
    - [Next routes](#next-routes)
    - [Laravel routes](#laravel-routes)
  - [Answers](#answers)
    - [Auth0: What is a tenant?](#auth0-what-is-a-tenant)
    - [Auth0: What is an application?](#auth0-what-is-an-application)
    - [Auth0: What is a scope?](#auth0-what-is-a-scope)
    - [Auth0: What does an Auth0 API do?](#auth0-what-does-an-auth0-api-do)
    - [Auth0: How can I prevent new users from registering?](#auth0-how-can-i-prevent-new-users-from-registering)
    - [Auth0: How can I update user props?](#auth0-how-can-i-update-user-props)
    - [Auth0: How can I add username to the idToken payload object?](#auth0-how-can-i-add-username-to-the-idtoken-payload-object)
    - [Auth0: How can I add username to the idToken payload object?](#auth0-how-can-i-add-username-to-the-idtoken-payload-object-1)
    - [Auth0: What is the difference between an ID Token and Access Token?](#auth0-what-is-the-difference-between-an-id-token-and-access-token)
    - [Next: Where is my user_id?](#next-where-is-my-userid)
    - [Laravel: How can I get user information from Auth0 token in API request?](#laravel-how-can-i-get-user-information-from-auth0-token-in-api-request)
  - [Resources](#resources)


## Features
- [x] Auth0: Sign in | `/api/login`
- [x] Auth0: Sign out | `/api/logout`
- [x] Auth0: Register an account | `/api/login`
- [x] Next: Authed users can change account data | `/settings`
- [ ] Next: Authed users can create new posts | `/posts/create`
- [ ] Next: Authed users can update their posts | `/posts/{post}/edit`
- [ ] Next: Authed users can delete their posts | `/posts`
- [x] Next: View all posts created by everyone | `/posts`
- [x] Next: View a post | `/posts/{post}`
- [x] Next: View all users |  `/users`
- [ ] Next: View a user and their posts |  `/users/{user}`
- [ ] Laravel API: Custom user provider stores Auth0 users in Laravel db
- [ ] Laravel API: List, create, read, update and delete all posts
- [ ] Laravel API: Update user info

## TODO
- allow users to delete their posts (on Home / Posts / Users pages)\
- show edit buttons below owned posts (on Home / Posts / Users pages)
- Standardise the `user` and `authed` objects
- Finish this README
- Add tests

## Dependencies
- [Composer](https://getcomposer.org/) for Laravel packages.
- [Node](https://nodejs.org/en/) for npm packages and serving next.js.
- An [Auth0 account](https://auth0.com/) (free tier suffices).


## Getting started


### Install
Download the NLAP repo from Github if you haven't already.

```
$ git clone https://github.com/fa-repo/next-laravel-auth0-prototype.git .
```

Navigate to the `/laravel` folder and install php packages.

```
composer install
```

And install npm packages in the `/next` folder.

```
npm install
```


### Prepare your Auth0 account

If you don't already have an account, head over and [set one up now](https://auth0.com/).

After logging into your account we will need to **create a tenant**. A tenant is basically a centralised repository of users which we can fill from a whole range of sources; like our own database, auth0 register page of third party [0auth2](https://oauth.net/2/) services like Google / Github. We can then tap into this repository to log users into anything we want.. maybe a website and mobile app combo? or a single sign on service for a range of unrelated apps?? The options are numerous. Anyway, name the tenant carefully as it can't be changed later.


### Create an Auth0 `application` for handling user authentication

Head over to the applications page and create a `Regular Web Application` called  `Next Client`.

*The settings in this application will allow us to connect our Next client to Auth0.*

On the settings tab of the new app, configure the fields:

`Allowed Callback URLs`: Auth0 will redirect us to this route after we log in.

- Local example: `http://localhost:3000/api/callback`
- Production example: `https://myapp.com/api/callback`
	
`Allowed Logout URLs`: Auth0 will redirect us to this route after we log out.

- Local example: `http://localhost:3000/`
- Production example: `https://myapp.com/`

### Configure Auth0 `database` to require a username
[Turn on the username feature by heading to `Connections > Database`. Select the database used by the `Next Client` app. Toggle `Requires Username` and save.](https://auth0.com/docs/connections/database/require-username)

Include the username in the idToken payload by heading to the `rules` page and creating a new rule called `Transform user claims`. Paste the snippet below: *Read more on including a username in payload [here](#auth0-how-can-i-add-username-to-the-idtoken-payload-object).* 

```
function (user, context, callback) {
  const blacklist = [ 'nickname' ];

  // Copy nickname claim to name claim
  context.idToken.name = user.username;

  // Remove nickname claim
  Object.keys(user).forEach(function(key) {
    if (blacklist.indexOf(key) > -1) {
      delete user[key];
    }
  });

  auth0.users.updateUserMetadata(user.user_id, user.user_metadata)
    .then(function(){
        callback(null, user, context);
    })
    .catch(function(err){
        callback(err);
    });
}
```


### Create an Auth0 `application` for updating user info
Head back to the applications page and create a `Machine to Machine` app called `User Manager`.

Connect this app to `Auth0 Management API` and enable `update:users` scope

### Configure Next environment variables
Duplicate `.env.example` and rename to `.env`. 

Configure `AUTH0_*` env *(used to authorise users and read personal info):*

```
// Grab these values from the `Next Client` app settings page.

AUTH0_DOMAIN=YOUR_AUTH0_DOMAIN
AUTH0_CLIENT_ID=YOUR_AUTH0_CLIENT_ID
AUTH0_CLIENT_SECRET=YOUR_AUTH0_CLIENT_SECRET

// An audience identifies the API we want to interact with. In 
// our case we want to use the `Auth0 Management API` found
// at `http://{tenant}.{country}.auth0.com/api/v2/`. Don't 
// forget that trailing `/`!

AUTH0_AUDIENCE=https://{tenant}.{country}.auth0.com/api/v2/

// Don't know why these scopes are necessary. They just are for 
// `@auth0/nextjs-auth0` to work.

AUTH0_SCOPE=openid profile
```

Configure `AUTH0_MANAGER_*` env *(used to perform exec. actions on auth0 tenant):*


```
// Grab these values from the `User Manager` app settings page.

AUTH0_MANAGER_CLIENT_ID=
AUTH0_MANAGER_CLIENT_SECRET=
```

Configure `SESSION_COOKIE_*` env:

```
You have to provide a random string of at least 32 characters here. This tool should do the job: browserling.com/tools/random-string.

SESSION_COOKIE_SECRET=viloxyf_z2GW6K4CT-KQD_MoLEA2wqv5jWuq4Jd0P7ymgG5GJGMpvMneXZzhK3sL

// 7200 seconds = 2 hours

SESSION_COOKIE_LIFETIME=7200
```

Configure other vars:

```
// The URL you will be redirected to after logging in

REDIRECT_URI=http://localhost:3000/api/callback

// The URL you will be redirected to after logging out

POST_LOGOUT_REDIRECT_URI=http://localhost:3000/
```

### Configure Laravel
<br />

### Run the prototype
Serve the Laravel API in the `laravel` folder.

```
php artisan serve
```

Switch on the Next client in the `next` folder.

```
npm run dev
```


## Reference material


### Next routes

- [x] `/` | *everyone*
	- [x] Show a welcome message to guests
	- [x] Show a custom message to authed users
	- [ ] Display the latest 5 posts pooled from all users
	- [ ] Displayed the latest 5 users to register
- [ ] `/posts` | *everyone* | view a list of all posts created by all users
- [ ] `/posts/{post}` | *everyone* | view a post
- [ ] `/posts/create` | *requires auth* | create a new post
- [ ] `/posts/{post}/edit` | *requires auth* | edit one of my posts
- [ ] `/posts/{post}/delete` | *requires auth* | delete one of my posts
- [ ] `/users` | *everyone* | view a list of all users
- [ ] `/users/{user}` | *everyone* | view a users profile and posts
- [ ] `/users/ssr-{user}` | *requires auth* | view profile / posts (rendered on server)
- [ ] `/settings` | *requires auth* | update auth0 info associated with the user
- [ ] `/api/login` | *requires guest* | sign in with Auth0
- [ ] `/api/callback` | *requires guest* | sets cookies after redirect from Auth0 login
- [ ] `/api/logout` | *requires auth* | sign out of Auth0
- [ ] GET | `/api/me` | *requires auth* | get logged in users info
- [ ] PATCH | `/api/me` | *requires auth* | update logged in users info


### Laravel routes
<br/>

## Answers

###  Auth0: What is a tenant?
 A tenant is a walled-off database of users that you can configure any number of connections (called apps) to have access too. So for example, if three apps (website A, website B and mobile app) were connected to the same tenant, a user would only need to register in one place to gain access to all three.

### Auth0: What is an `application`?
- An `application` configures a connection between a client and auth0.
- An `application` has four types to pick from to cater to varying use cases.
- `Native app`: *used for mobile, desktop and smartphone type apps.* 
- `SPA web app`: *used for web apps that communicate mostly through APIs.*
- `Regular web app`: *used for web apps that perform most logic on the server.*
- `M2M app`: *used for backend services that require no human interaction.*
- `NB`: all presets require some human interaction except `M2M`.
- `NB`: features vary between types to cater to the security demands of each client.
- `NB`:  `native`, `SPA` and `regular` apps can pool users from multiple sources. Like custom databases, Single Sign-On services (SSO) and social networks.
- `NB`: `M2M` apps issue tokens that can be used with APIs authed in the APIs tab.
- Resources:
	- [Set up an app.](https://auth0.com/docs/getting-started/set-up-app)
	- [App types.](https://auth0.com/docs/applications/concepts/app-types-auth0)

### Auth0: What is a `scope?`
A `scope` defines the actions that an application can do on a users behalf. Like the permissions system on the android app store. [Glossary entry.](https://auth0.com/docs/glossary#scope)

### Auth0: What does an Auth0 `API` do?
An Auth0 API is a piece of *middleware* that protects your APIs.

### Auth0: How can I prevent new users from registering?
1. Open your [dashboard](https://manage.auth0.com/dashboard).
2. Navigate to `Connections` > `Database` page.
3. Select the database used for this prototype.
4. Scroll down (on the Settings tab) to `Disable Sign Ups` option and switch off.

### Auth0: How can I update user props?

- For backend apps: 
	- Create an Auth0 `M2M` `application` called `User Manager`.
	- Connect `User Manager` to Management API w/ `update:users` scope.
	- On the backend: [request an access token](https://auth0.com/docs/api/management/v2/tokens) and store the token in cookies.
	- Use this token whenever you want to [update the user](https://auth0.com/docs/api/management/v2#!/Users/patch_users_by_id).

- For SPAs (haven't tried yet):
	- *[Get Management API Tokens for Single-Page Applications](https://auth0.com/docs/api/management/v2/get-access-tokens-for-spas)*
	- NB; because SPAs can't store tokens securely, scopes are restricted to updating metadata.

### Auth0: How can I add `username` to the `idToken` payload object?
Auth0 won't allow us to create a `username` claim. The only claims we can set are those [in the OIDC spec](https://www.iana.org/assignments/jwt/jwt.xhtml#claims) or rather ugly looking [namespaced claims](https://auth0.com/docs/tokens/concepts/claims-namespacing).

> To make any changes, we have to create a rule on the rules page. I find the `Add persistent attributes to user` template to be most useful.

**OIDC claims:** while we can't add any top-level props outside of the OIDC spec, we could transform one of the objects that IS IN the OIDC spec. I'd be inclined just to add `username` to `name` or `nickname` instead:

```
function (user, context, callback) {
  // add username to `name` claim
  context.idToken.name = user.username;

  auth0.users.updateUserMetadata(user.user_id, user.user_metadata)
    .then(function(){
        callback(null, user, context);
    })
    .catch(function(err){
        callback(err);
    });
}
```

**Our other option** is to create an ugly looking namespace claim. As described in the [docs](https://auth0.com/docs/tokens/concepts/claims-namespacing), this is to ensure that it is globally unique and doesn't clash with claims from other resources or the OIDC spec. *From the example: Yes indeed you have to access the property on the client like user['https://nlap/username'].*

```
function (user, context, callback) {
  // add username to `https://nlap/username` claim
  context.idToken['https://nlap/username'] = user.username;

  auth0.users.updateUserMetadata(user.user_id, user.user_metadata)
    .then(function(){
        callback(null, user, context);
    })
    .catch(function(err){
        callback(err);
    });
}
```


### Auth0: How can I add `username` to the `idToken` payload object?
- You can't add the `username` claim but you can add a [namespaced](https://auth0.com/docs/tokens/concepts/claims-namespacing) version of the claim.
- NB; Unfortunately Auth0 prevents us from doing this to ensure no claims can accidentally write over [reserved claims](https://www.iana.org/assignments/jwt/jwt.xhtml#claims) or claims from other resources.
- NB; We **CAN** [create custom claims](https://auth0.com/docs/tokens/jwt-claims#custom-claims) but they require strict [namespacing](https://auth0.com/docs/tokens/concepts/claims-namespacing) rules which look kinda ugly *to ensure they are globally unique.* So instead of `user.username` you'd have to use `user['https://nlap.com/username']`.
- To set up this all up, head to the `Rules` page.
- Create a new rule and select `Add persistent attributes to the user` template.
- Customise to look something like this:

```
function (user, context, callback) {
  user.user_metadata = user.user_metadata || {};
  user.user_metadata.username = user.nickname;
  context.accessToken['https://nlap.com/username'] = user.user_metadata.username;
  context.accessToken.username = user.user_metadata.username;

  auth0.users.updateUserMetadata(user.user_id, user.user_metadata)
    .then(function(){
        callback(null, user, context);
    })
    .catch(function(err){
        callback(err);
    });
}
```

- Save and log back in with your Auth0 account client-side to retrieve this new claim in your `ID Token`.


### Auth0: What is the difference between an `ID Token` and `Access Token`?
- `ID Token`: is a JSON Web Token (JWT) that contains info about a user.
- `Access Token`: is a token used to gain access to APIs
- [Tokens documentation](https://auth0.com/docs/tokens)


### Next: Where is my `user_id`?
`user_id` comes bundled in the user object under the `sub` key.

```js
const { user } = useFetchUser();

const user_id = user && user.sub;
```
### Laravel: How can I get user information from Auth0 token in API request?
- **NB;** 
- Related questions from around the internet
	- Search term: *auth0 laravel get user in token*
	- [Unable to retrieve user details](https://community.auth0.com/t/unable-to-retrieve-user-details/7224)
	- [Authenticate as a Laravel API user using the Auth0 token](https://github.com/auth0/laravel-auth0/issues/129)
	- [Auth0::getUser() returns null even when Auth::check() is true](https://github.com/auth0/laravel-auth0/issues/38)
	- [Auth0 Laravel: Validate token and get user information](https://stackoverflow.com/questions/42412459/auth0-laravel-validate-token-and-get-user-information)
	- [Native app + Laravel API (both with Auth0)](https://community.auth0.com/t/native-app-laravel-api-both-with-auth0/32299/9)


## Resources
- [auth0.com: Glossary](https://auth0.com/docs/glossary)
- [auth0.com: The Ultimate Guide to Next.js Authentication with Auth0](https://auth0.com/blog/ultimate-guide-nextjs-authentication-auth0/)
- [auth0.com: Laravel API: Authorisation](https://auth0.com/docs/quickstart/backend/laravel/01-authorization)
- [auth0.com: The Ultimate Guide to Next.js Authentication with Auth0](https://auth0.com/blog/ultimate-guide-nextjs-authentication-auth0/)
- [github.com: Next.js and Auth0 Example](https://github.com/zeit/next.js/tree/canary/examples/auth0)
- [github.com: The next folder project is built on top this repo](http://github.com/auth0/nextjs-auth0)
- [jwt.io: JWT.io](https://jwt.io)
