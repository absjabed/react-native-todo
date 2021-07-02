<div style="text-align:left"><img src="./screenshots/icon_launcher.png" /></div>

# Personal Task Manager (Tasky)

This is a simple task manager application that allows users to list their personal tasks with updating and managing variety of tasks. Users can save different tasks and also can delete them as well. Users will be able to login the app with their social media accounts like facebook.

#### Technologies Used

- React Native
- Javascript, Flow
- Axios
- Modular Component
- Composite Component
- Social Media Login (Facebook)
- MSSQL Server
- Dotnet Core API
- git


#### Development Environment

- Linux (Ubuntu 20.04)
- DotNet Core 3.1
- NodeJs
- Android SDK
- Android Emulator

### Running the project
If you want to run the project please proceed with the following instructions,
  1. Setup React Native Environment ([Environment Setup Link](https://reactnative.dev/docs/environment-setup#development-os))
  2. Download the project,
     ```
     git clone https://github.com/absjabed/react-native-todo.git
     cd react-native-todo
     ```
  3. Install the dependencies,
     ```
     yarn install
     ```
  4. Start Android Emulator and check if it's available with `adb devices`
  5. In separate terminal Run following command for (Metro Bundler),
     ```
     npx react-native start
     ```
  6. To run the project in the emulator,
     ```
     npx react-native run-android
     ```
  7. If running fails follow the instruction below,
     ```
     # for linux
     
     cd android
     ./gradlew clean
     
     # for windows 
     gradlew clean

     # again run
     npx react-native run-android
     ```
  8. To run the tests,
     ```
     yarn test
     ```
  9. If `snapshot` test fails for no reason, update snapshots with below command,
     ```
     yarn test -u 
     ```
---

### Building the release apk using containerization (Docker)
If you have docker installed and have internet connect please follow the steps to build release,

  1. Clone the project
     ```
     git clone https://github.com/absjabed/react-native-todo.git
     cd react-native-todo
     ```
  2. Run the following command to build the project,
     ```
     docker run -it --rm -v $PWD:/app -w /app reactnativecommunity/react-native-android /bin/bash -c "yarn install && cd /app/android && ./gradlew assembleRelease"
     ```
  3. Find your apk file in the following location of your current directory (react-native-todo)
     ```
     react-native-todo/android/app/build/outputs/apk/release/apk-release.apk
     ```

### Building the release apk (Manually)
If you want to build the release apk please proceed with the following instructions,
  
  1. Download the project,
     ```
     git clone https://github.com/absjabed/react-native-todo.git
     cd react-native-todo
     ```
  2. To install the yarn dependencies,
     ```
     yarn install
     ```
  3. To clean the previous gradle build,
     ```
     cd android

     # for linux
     ./gradlew clean

     # for windows
     gradlew clean
     ```
  4. To build the release apk
     ```
     ./gradlew assembleRelease
     ```
  5. If you want to build release apk with Emulator Connected
     ```
     npx react-native run-android --variant=release
     ```
  6. Finally, find the apk in the following locaiton,
     ```
     react-native-todo/android/app/build/outputs/apk/release/apk-release.apk
     ```
  ---


## Application Demo
### Application Video
To see a live demo please visit: [App-Video-Link](https://youtu.be/U6VDpQ7oy3M)

---

### App Screenshots (with usecases)
Left             |  Right
:-------------------------:|:-------------------------:
<img src="./screenshots/Android/1.splashScreen.jpg" />  |  <img src="./screenshots/Android/2.login.jpg" />|
<img src="./screenshots/Android/3.signup.jpg" /> |  <img src="./screenshots/Android/4.home.jpg" />  |
<img src="./screenshots/Android/5.newtask.jpg"/> | <img src="./screenshots/Android/6.update1.jpg" />|
<img src="./screenshots/Android/7.update2.jpg" /> | <img src="./screenshots/Android/8.color.jpg"  />|
<img src="./screenshots/Android/9.done.jpg" /> | <img src="./screenshots/Android/10.logout.jpg"  /> |
<img src="./screenshots/Android/11.icon.jpg" /> | <img src="./screenshots/Android//1.splashScreen.jpg"  />|

