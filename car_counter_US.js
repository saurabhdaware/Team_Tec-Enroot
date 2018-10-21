const five = require("johnny-five");
const board = new five.Board({port: "COM19"});
const PubNub = require('pubnub');
const dev_config = require('./dev.config');
const pubnub = new PubNub(dev_config.pubnubSettings); // see pubnub documentations for the pubnub setup
pubnub.subscribe({
    channels: ['smart-traffic-change-signal']
});


let frameDifference = 0;
let lastFrame = 2000;
let currentFrame = 0;
let carsCount = 0;

var signalno=1
board.on("ready", function (){
    let ultrasonic = new five.Proximity({
        controller: "HCSR04",
        pin: 7
    });

	signalstatus='red';
	sendToFrontend(signalstatus);
    	ultrasonic.on("change", async function () {
        currentFrame = this.cm;
        if (this.cm < 50) {
          	frameDifference = lastFrame - currentFrame;
          	if (frameDifference > 100) {
            		carsCount++;
					// if(carsCount==9){
						// sendToFrontend('click-img');
						// }
					// if (carsCount>10){
						// sendToFrontend('green',signalno,5000);
                // // setTimeout(function(){sendToFrontend('red',1);},1000);
					// carsCount=0;
        // }
            		console.log(carsCount);
          	}
        }
        lastFrame = this.cm;
		
    });
	function control_signal(){
		setTimeout(function(){sendToFrontend('click-img',signalno+1);},time-10000);
		no_of_vehicle_ip=5;
		
		signalno=(signalno%4)+1;
		
		if(no_of_vehicle_ip<=5)
		{
			time=10;
		}
		else if(no_of_vehicle_ip<20)
		{
			time=20;
		}
		else{
			time=30;
		}
		sendToFrontend('green',signalno,time);
	}
})

function sendToFrontend(color,signalno=0,time=0){
    	console.log(time,signalno);
		var publishConfig = {
        channel: "smart-traffic-change-signal",
        message: {
            signal: color,
			time:time,
			signalno:signalno
        }
    }
    pubnub.publish(publishConfig, function (status, response) {
        console.log(response)
    })
}

// setInterval(()=>{
//     sendToFrontend('red')
// },20000);

