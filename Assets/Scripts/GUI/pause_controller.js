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
	PlayerPrefs.SetInt ("times_restarted", PlayerPrefs.GetInt("times_restarted") + 1);
	Application.LoadLevel(Application.loadedLevel);
}

function ResetGame(){
	PlayerPrefs.DeleteAll();
	Application.LoadLevel("Main Menu");
}

function End(){
	Pause();
	pause.SetActive(false);
	ending.GetComponent(animate_in).SendIn();
	AddCubesToTotal();
}

function AddCubesToTotal(){
	var player : GameObject = GameObject.FindGameObjectWithTag("Player");
	PlayerPrefs.SetInt("cubes", PlayerPrefs.GetInt("cubes") + player.GetComponent(player_controller).getCubes());
}