var callButton = document.getElementById('callButton');
var hangupButton = document.getElementById('hangupButton');

callButton.disabled = true;
hangupButton.disabled = true;
callButton.onclick = call;
hangupButton.onclick = hangup;


var localVideo = document.getElementById('#');
var remoteVideo = document.getElementById('remoteVideo');