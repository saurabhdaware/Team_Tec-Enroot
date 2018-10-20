const five = require("johnny-five");
const board = new five.Board();
// const PubNub = require('pubnub');

let frameDifference = 0;
let lastFrame = 2000;
let currentFrame = 0;
let carsCount = 0;
board.on("ready", function (){
    let ultrasonic = new five.Proximity({
        controller: "HCSR04",
        pin: 7
    });

    ultrasonic.on("change", async function () {
        currentFrame = this.cm;
        if (this.cm < 50) {
          frameDifference = lastFrame - currentFrame;
          if (frameDifference > 100) {
            carsCount++;
            // var publishConfig = {
            //   channel: "",
            //   message: {
            //     carsCount:carsCount,
            //   }
            // }
            // pubnub.publish(publishConfig)
            console.log(carsCount);
          }
        }
        lastFrame = this.cm;
    });
})
