const five = require("johnny-five");
const board = new five.Board({
      port: "COM19"
});
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

    var ledon = new five.Led(4);
    var ledoff = new five.Led(5);
    ledoff.on()
function togggle(){
ledon.toggle();ledoff.toggle();
}
    ultrasonic.on("change", async function () {
        currentFrame = this.cm;
        if (this.cm < 50) {
          frameDifference = lastFrame - currentFrame;
          if (frameDifference > 100) {
            carsCount++;
	if (carsCount>10){
		togggle();
		setTimeout(function(){togggle();},1000);
		carsCount=0;
	}
            console.log(carsCount);
          }
        }
        lastFrame = this.cm;
    });
})
