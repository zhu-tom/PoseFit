# Background
The COVID-19 pandemic has made it extremely difficult to be mentally healthy. Remaining restricted to the confines of your home and increased stress levels due to losing jobs and loved ones is a major part of this. Often people believe the physical and mental health are separate things, while in reality it is synonymous. Trying to stay healthy and fit at home is extremely difficult. Given the lockdown in Ontario, where public gyms are closed, the quality of your workouts is limited.  Often times in gyms, personal trainers or friends can correct your form. Working out with poor form can be dangerous for your long term health, as it often leads to injury. Proper form allows you to work more efficiently as well! 

# Our App
PoseFit aims to bridge the gap between gym and home workouts. Our mobile app, built with React-Native uses Tensorflow's Posenet to analyze a user's form while providing real-time feedback on form and counting reps. Our algorithms can directly identify where users need to improve, and allows us to only count proper reps. Users Authenticated users can store their scores on Google Cloud using Firebase. The app also provides informative videos and notes to give users tips for good form. 

# To Run
- Clone the git repo to your local computer
- Run "npm start" in the expo directory
- Download the Expo Go application on your mobile phone
- Using your phone's camera, scan the QR Code displayed in the terminal window
- Choose and perform your exercise!


# Next Steps
We currently only have squatting supported for video analysis, but pushups and other exercises are also included on our app. We also have a web interface, which is slightly faster than mobile but with less features currently. Next steps for this project are to include a leaderboard and possibly live competitions with friends!

We ran into a lot of challenges during this project. For both of us, it was our first time using Tensorflow and React Native. There were countless issues during set up, but in the end, we're extremely proud of our project and hope it can be extended further after this hackathon to help people of all ages get healthy in a safe way!


# Notes
- The counter in the app now works as intended! There was a small bug during the demo video.
- Raising you hand above your head starts the timer for the exercise (I am not crazy). 
- Had we not run in to so much trouble initially developing the app we would have added more prompts/messages to the user interface, currently these messages display in the terminal while running the app.