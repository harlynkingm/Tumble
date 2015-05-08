#pragma strict

function Pause(){
	Time.timeScale = 0;
}

function Play(){
	Time.timeScale = 1;
}

function Restart(){
	Application.LoadLevel(Application.loadedLevel);
}