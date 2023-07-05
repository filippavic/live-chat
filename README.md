# LiveChat Docs

### Installation

1. clone
2. run `pnpm install`
3. run `pnpm run dev`
4. you're up and running

# Docs

Project structure, objects, endpoints and important flows

# Objects -> Database models

```ts
type User = {
    hash: string // autogenerated based on first and last name
    firstName: string
    lastName: string
    email: string
    password: string // password hash
    isOnline: boolean
}
```

```ts
type Message = {
    sentAtFromUser: string
    sentAtFromServer: string
    message: string
    sentBy: User
    sentTo: User
    isRead: boolean
}
```

## Routes

**Auth**

-   `POST` /auth/register

    -   body:

    ```ts
    {
        firstName: string
        lastName: string
        password: string
        email: string
    }
    ```

-   `POST` /auth/login
    -   body:
    ```ts
    {
        email: string
        password: string
    }
    ```
-   `GET` /auth/logout

**Find user**

-   `GET` /user?firstName=marko&lastName=polo

Returns 200 and user details if that user exists, otherwise return 404, used for starting chat communication.

# Flows

### Auth

**Registration**

1. Client send info to /register endpoint, we validate the input.
2. If it's valid we hash the password and create unique hash.
3. Store that in the database and generate JWT token.
4. Return new user object and JWT to the user.
5. Set isOnline for current user to true
6. Notify all already connected clients that current client is online (emit status update)
7. Request status list from server -> this tells our user who's online

**Login**

1. Client sends info to /login endopint, we validate the input.
2. It it's valid we create the hash from password and look up if that user exists. Lookup password hash + name + surname combination. (Here I could lookup by something unique for every user, maybe that can be email address or someking of nickname)
3. Set isOnline for current user to true
4. Notify all already connected clients that current client is online (emit status update)
5. Request status list from server -> this tells our user who's online

**Logout**

1. Set isOnline for current user to false
2. emit status update to everyone

### Chat

**Start chat**

1. Sender client looks up by name and surname the target
2. If target exists and isOnline we connect them.
    - 2a.

**Send messages**

1. Now that they are connected they can send messages to each other

**End chat**
Once someone leavs the chat the chatroom is over.
