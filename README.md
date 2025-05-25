# Real-time Donation Drive

A real-time donation app inspired by the Community Pantry in the Philippines. Users can donate or redeem $10, and all connected users see updates instantly via Socket.IO.

## Project Outline

1. **Set up the Express server and Socket.IO**

   - Initialize a Node.js project and install dependencies (`express`, `socket.io`, `ejs`).
   - Set up the Express app to use EJS as the view engine.
   - Serve static files from the `public` directory.

2. **Render the main view**

   - Configure the server to render `views/index.ejs` at the root route (`/`).
   - Pass the initial cash value to the view.

3. **Build the UI in `index.ejs`**

   - Display the total cash donation.
   - Add “Donate $10” and “Redeem $10” buttons.
   - Add a message area for real-time updates.

4. **Set up client-side Socket.IO logic**

   - Connect to the server using Socket.IO in the browser.
   - Listen for real-time updates (`updateCash` event).
   - Emit events (`donate`, `redeem`) when buttons are clicked.

5. **Implement server-side Socket.IO logic**

   - Track the total cash in a server variable.
   - Listen for `donate` and `redeem` events from clients.
   - Update the cash value and broadcast the new value and message to all connected clients.

6. **Test real-time functionality**

   - Open multiple browser tabs/windows.
   - Ensure that donating or redeeming updates all clients instantly.

7. **Document and polish**
   - Add comments to your code for clarity.
   - Write a comprehensive `README.md` with setup, usage, and deployment instructions.

## Project Structure

- `server.js` — Main Express server with Socket.IO integration and donation logic.
- `views/index.ejs` — Main UI view, rendered by Express.
- `public/style.css` — App styling.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd SocketIO_Projects
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Run the app:**
   ```sh
   node server.js
   ```
   Open [http://localhost:8888](http://localhost:8888) in your browser.

## Usage

- **Donate $10:** Click the blue button to add $10 to the total.
- **Redeem $10:** Click the red button to subtract $10 (if available).
- All updates are shown in real time to all users.

## Deployment

To deploy or run the app on another machine:

1. Clone the repository and install dependencies as above.
2. Make sure port 8888 is available, or set the `PORT` environment variable.
3. Run `node server.js` and access the app in your browser.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is open source and available under the [MIT License](LICENSE).
