#pragma strict

var ending : GameObject;
var pause : GameObject;

function Pause(){
	Time.timeScale = 0;
}

function Play(){
	Time.timeScale = 1;
}

function Restart(){
	Application.LoadLevel(Application.loadedLevel);
}

function End(){
	Pause();
	pause.SetActive(false);
	ending.SetActive(true);
}