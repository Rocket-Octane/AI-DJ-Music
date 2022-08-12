song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
score_leftWrist = 0;
song1_status = "";

function preload(){
    song1 = loadSound("music1.mp3");
    song2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(665, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is initialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        score_leftWrist = results[0].pose.keypoints[9].score;
        console.log("Left Wrist X = " + leftWristX + "     Left Wrist Y = " + leftWristY);
        console.log("Left Wrist score = " + score_leftWrist);
        console.log("Right Wrist X = " + rightWristX + "     Right Wrist Y = " + rightWristY);
    }
}

function draw(){
    image(video, 0, 0, 665, 500);

    song1_status = song1.isPlaying(true);

    fill("red");
    stroke("red");

    if(score_leftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        song2.stop();

        if(song1.isPlaying() == false){
            song1.isPlaying(true);
            document.getElementById("song_playing").innerHTML = "The song being played is gaming music";
        }
    }
}

function play(){
    song1.play();
}