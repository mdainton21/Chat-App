# Chat App

## Description
- A chat app for mobile devices built using React Native. The app will
provide users with a chat interface and options to share images and their
location.

## Technology and Dependencies Used
* React Native
- Gifted Chat
* Expo
- Expo Go App
- NetInfo
- Expo ImagePicker
- Expo Location
* Google Firestore
- Firestore Database
- Firestore Authentication
- Firestore Storage
* Android Studio
- Android Emulator

## Features
* The ability to choose your name and background for the chat screen
* Send and recieve messages, images, and locations.
* Client side storage that allows the user to see messages even when offline.

## Getting Started
1. Setting up the Development Enviornment
* Make sure you have Node installed.
- Expo only supports Node 16.. at max, so if you have a higher version than 16.., make sure to downgrade to 16.19.0 by running the following commands (if this does not apply to you ignore this step.)
```
nvm install 16.19.0
nvm use 16.19.0
nvm alias default 16.19.0
```
* Install the Expo CLI
```
npm install -g expo-cli
```
* Create an Expo Account
- You will need to make and login to your Expo account in order to run the App on your device or emulator. You can sign-up here: https://expo.dev/

2. Setting up the Repository
- Open the console
- Clone the Repository:
```
git clone https://github.com/mdainton21/Chat-App.git
```
- Make sure you are inside the main App directory.
- Install dependencies.
```
npm install
```

3. Setting up Firestore Database
* Starting Firestore
- Login to Google Firebase (https://firebase.google.com/)
- Create a new project.
* Database Setup
- Create a new Database (Build -> Firestore Database -> Create Database)
- Choose Start in production mode.
- Choose your Region, and click enable.
- Go to the Rule Tab near the top of the page.
- Change the read-and-write statement to look like the following:
```
allow read, write: if false;
```
- Press Publish to keep this change!
- Enable Anonymous sign-in (Build -> Authentication -> Get Started -> Select the Anonymous option -> Select enable and hit save)

4. Connecting to the App
- On the Firestore page, open the menu and select the gear icon near the top. Select Project Settings.
- In the General tab find the Your Apps section.
- Click the Firestore for Web button (it may be shown as the </> icon)
- Choose a name and click Register App to generate our configuration code
- The configuration code should look like this:
```
 const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```
- In the App.js file you copied from this repository replace the configuration code in the orginal file with the code you just got from your database.

5. Running the App
- Open the console
- Navigate to the main app directory
- Run the program
```
npm start
```
- If using the Expo Go app on your phone the link to the server should appear.
- If using an Emulator, make sure the emulator is open and then press the corresponing button in the terminal (a for Android, or i for iOS)