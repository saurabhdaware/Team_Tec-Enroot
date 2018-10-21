const node_server = 'https://smart-traffic-signal.herokuapp.com';

const constraints = {
    video: (true)?true:{
        facingMode:{exact:"environment"}
    }
};

const video = document.querySelector('video');
const canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

navigator.mediaDevices.getUserMedia(constraints)
.then((stream) => {video.srcObject = stream});


function snapshot() {
    // Draws current image from the video element into the canvas
    ctx.drawImage(video, 0,0, canvas.width, canvas.height);
    let image64 = canvas.toDataURL('image/jpeg',1.0);
    let dataimage = dataURLtoFile(image64,'something.jpg');
    return uploadImage(dataimage);
}

function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

function uploadImage(data){
    let formdata = new FormData();
    formdata.append('dataImage',data)
    return axios.post(`${node_server}/upload`,formdata,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
}