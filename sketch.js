let noiseSamples = ['sound/RingOut.wav', 'sound/Urchin3.wav', 'sound/Stroke1.wav', 'sound/Urchin.wav', 'sound/Stroke2.wav', 'sound/Field_Thaw.wav', 'sound/GongCrusher.wav', 'sound/ParticleCrash.wav', 'sound/Field_Freight.wav', 'sound/CellarDoor.wav', 'sound/WhineTone.wav', 'sound/ParticleCrash3.wav', 'sound/Scanner2.wav', 'sound/ParticleCrash2.wav', 'sound/Field_Slush.wav', 'sound/Field_Water.wav', 'sound/ParticleCrash5.wav', 'sound/ParticleCrash4.wav', 'sound/NoiseTapeSpeed.wav', 'sound/Clank2.wav', 'sound/Clank3.wav', 'sound/Fragment.wav', 'sound/Clank1.wav', 'sound/Bappp.wav', 'sound/Clank4.wav', 'sound/TechnoNoise2.wav', 'sound/Scanner.wav', 'sound/FuzzHit.wav', 'sound/TechnoNoise.wav', 'sound/Urchin2.wav']

let waterSamples = []
let noises = [];
let isPlaying = false;
let button;
let randNum;
let elapsedTime = 0;
let wave;

let polySynth;
let cnv;
var vw, wh;
let spectrum;
let level = 0;
let pLevel = level;
let circlesX = [];
let circlesY = [];


//'sound/Clank2.wav sound/Clank3.wav sound/Fragment.wav sound/Clank1.wav sound/Bappp.wav sound/Clank4.wav sound/TechnoNoise2.wav sound/Scanner.wav sound/FuzzHit.wav sound/TechnoNoise.wav sound/Urchin2.wav

function preload() {
    for (let i = 0; i < noiseSamples.length; i++) {
        noises[i] = loadSound(noiseSamples[i])
    }
    wave = loadSound('waves.wav')
    print(noiseSamples.length)
}

function setup() {
    button = select('button');
    button.mousePressed(play);
    frameRate(1);
    polySynth = new p5.PolySynth();

    // wv = windowWidth;
    // vh = windowHeight;
    // cnv = createCanvas(500, 500);
    // var x = (windowWidth - width) / 2;
    // var y = (windowHeight - height) / 2;
    // background('#222222');


    // cnv.position(x, y);


    // loaded = false;

    fft = new p5.FFT();
    amplitude = new p5.Amplitude();
    peakDetect = new p5.PeakDetect();
    colorMode(HSB, 360);

}

function play() {
    userStartAudio();

    if (!isPlaying) {
        isPlaying = true;
        button.html('Pause');
        // playSynth();
    } else {
        isPlaying = false;
        button.html('Play');
        elapsedTime = 0;
        getAudioContext().suspend();

    }


    // randNum = Math.floor(Math.random() * noiseSamples.length);
    // console.log(randNum)
    // if (noises[randNum].isPlaying()) {
    //     // .isPlaying() returns a boolean
    //     noises[randNum].stop();
    //     console.log('here')
    //     background(255, 0, 0);
    // } else {
    //     noises[randNum].play();
    //     background(0, 255, 0);
    // }
}


function draw() {
    pLevel = level;

    spectrum = fft.analyze();
    level = amplitude.getLevel();



    console.log(level)
    if (isPlaying) {
        wave.play();
        console.log(elapsedTime)
        let dur = 2;

        // time from now (in seconds)
        let time = 0;

        // velocity (volume, from 0 to 1)
        let vel = 0.1;

        // notes can overlap with each other




        elapsedTime += 1;
        if (elapsedTime >= 25) {
            elapsedTime = 0;
        }
        // let randTiming = Math.floor(Math.random() * (8 - 3 + 1) + 3)
        let randTiming = (Math.floor(Math.random() * 6)) + Math.floor(Math.random() * (6 - 2 + 1) + 2)

        console.log(randTiming)
        if (elapsedTime % randTiming == 0) {
            console.log("here2")

            randNum = Math.floor(Math.random() * noiseSamples.length);
            if (noises[randNum] != null) {
                noises[randNum].play();
            }
            noises[randNum] = null;
        }
    }
}

// function playSynth() {
//     console.log('hi' + elapsedTime)
//     // note duration (in seconds)
//     let dur = 2;

//     // // time from now (in seconds)
//     let time = 0;

//     // // velocity (volume, from 0 to 1)
//     let vel = 1;

//     // // notes can overlap with each other
//     polySynth.play('G2', vel, 1, dur);
//     polySynth.play('C3', vel, 4, dur);

//     // polySynth.play('C3', vel, time += 1 / 3, dur);
//     // polySynth.play('G3', vel, time += 1 / 3, dur);
// }