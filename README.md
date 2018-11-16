# BoxCutter

## It's a thing that does a thing with your LaunchBox data things

You need more details? OK then, Mary Lou, buckle up and get ready for the info train to come into the station. WOOOWooooooo.

BoxCutter will take your platform list, grab all games labled as your favorite, and then copy the metadata, images, videos and the ROM files to where ever you want it.

Not enough? Yeah, fine, I'll be your Burger King, baby - you're gonna have it your way right away.

BoxCutter can also export your platforms to specific folder schemas, like EmulationStation/RetroPie. You manage your collection in LaunchBox, run BoxCutter, throw all of the stuff BoxCutter exports to a USB drive, plug that sucker in to your Raspberry Pi, and you're off to the track, Speed Racer.

## I'm sold, let's install this thing. Less wording, more downloading, maximum exporting go go go

Woah there, chief. Pump the brakes. You'll need to grab the latest relase of the app that I've cooked up for you. Unzip that thing, run that thing, and then you can use that thing. The app doesn't need an installer or anything fancy - just run it from wherever. He's a cool guy like that. You also don't need to yell "YES CHEF" when you're running it, but if you do, it would but a big smile on my face.

## Something bad happened, you suck at the code, etc

Man, that sucks. Sorry to hear that. As far as I know, I'm a human, so this isn't exactly surprising. Hell, I'm barely a developer. I just bang on a keyboard until things compile. So, I mean, run BoxCutter with some degree of trepidation. Maybe less than Indiana Jones trying to swap that bag of stones for the idol, but probably a little more than Patton Oswalt doing a filmed comedy set. But for real, post a bug here and I'll get to it when I have a chance.

## Stuff in the queue I want to add

Here's my to-do list. I'm working on these things. Please don't bug me about when these get done or to prioritize something over something else. It takes me long enough to pop the clutch to get my ass in gear as it is - please don't add some kind of social obligation to this on top of it.

* Set export type (USB Stick/Friendly Naming, RetroPie Naming, etc)
* Generate conversion mapping for RetroPie
* Set media export type/settings (Export Videos, Images, Metadata)
* Image export preferred region
* Export Process:
  * Generate Metadata, generate new file
  * Copy media
* Make a nice logo
* Clean up DOM/CSS to make it look cooler
* Page transitions
* Better headers

## I want to build this thing myself because I'm like a nerd version of Bob Vila

Cool. Go nuts. Make this wasteland of code something better than what I can do. Show me up and remove any last shred of self-respect and self-esteem I have. Go man, go - it's the weekend.

``` bash
# Install necessary packages if you don't have them: (use your package manager of choice here if you're on Linux)
apt install -y libxss1 libgtk-3-0 libgconf-2-4 libnss3 libasound2 gcc make

# Make sure you have nvm and use version 9
nvm install 8
nvm use 8

# install dependencies
npm install

# serve with hot reload
npm run dev

# build electron application for production
npm run build
```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[9add6ff](https://github.com/SimulatedGREG/electron-vue/tree/9add6ff4d47eaf8fb9f04efd0aca7be4dc6fb69d) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
