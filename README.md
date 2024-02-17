# ee-grocery
Grocery list todo app

## Requirements to run
1. Node (I used version 20.2.0). You can use node version manager (nvm) to avoid polluting your version if you like, though a similar version like node 18 will probably work
2. `npm ci` In the root to install the dependencies
3. `npm run dev` To run the application
4. `npm run test` To run the tests (you may need to Ctrl+c to end them. Didn't have time to fix supertest leaving the server open)
5. Access site at `localhost:3000`

## Current state
I got the index page working which allows you to create and remove lists.
I ran out of time to add the lists themselves, though the structure would be very similar to
the list index page. The only real difference is the additional strikethrough functionality that would
be required, and the necessity of passing the listId around in addition to the item data.
