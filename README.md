# Your Travel -- A travel app

## Setting up Firebase - for android

0. Make sure you have setup environment for React Native
1. Create a new firebase project - https://console.firebase.google.com
2. Go to console -> Click on 'Add App' -> Click on Android App
3. Write package name in the first field - Go to /android/app/build.gradle file
   and file _applicationId_. That will be your _package name_
4. Now in the console 2nd step -- download the config file. Copy that json file (google-services.json) to the directory /android/app
5. The google-services.json file that you just downloaded. Go to _/android/build.gradle_ and add this line `classpath 'com.google.gms:google-services:4.3.10'` in buildscript -> dependencies
6. Add this line in `apply plugin: 'com.google.gms.google-services'` in _/android/app/build.gradle_ and add this `implementation platform('com.google.firebase:firebase-bom:29.3.1')` in dependencies in the same file _/android/app/build.gradle_

And you are all set for the firebase!

## Generating API Key for Google Cloud -- For landmark detecting and Google Maps

Before proceeding make sure you have setup Billing on Google Cloud
https://cloud.google.com/billing/docs

1. Go to https://console.cloud.google.com/getting-started
2. Click on 'Select a project' and create a project if you don't have already
3. Navigate to the APIs & Services → Credentials panel in Cloud Console.
4. Select Create credentials, then select API key from the dropdown menu.
5. The API key created dialog box displays your newly created key. _Copy that key_
6. Create an .env file in the root if there is not one already.
7. Write this line `GC_API_KEY=XXXX-XXXX`. Replace `XXXX-XXXX` with the key you copied in the previous step
8. Navigate to the APIs & Services → Enable APIs & Services
9. Click on _+ Enable APIs & Services_ at the top
10. Search and enable following services
    1. Geocoding API
    2. Cloud Vision API
    3. Maps SDK For Android

# Running project in the VS Code

1. Make sure all the node modules are installed
2. Make sure .env file exists with the right key
3. Run `npm run android` to build the app and then metro bundler would start automatically
   if it does not run `npm start` to do it.
