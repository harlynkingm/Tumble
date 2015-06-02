#pragma strict

var ending : GameObject;
var pause : GameObject;
var highScore : GameObject;

function Pause(){
	Time.timeScale = 0;
}

function Play(){
	Time.timeScale = 1;
}

function Restart(){
	Time.timeScale = 1;
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
	var cubes : int = player.GetComponent(player_controller).getCubes();
	PlayerPrefs.SetInt("cubes", PlayerPrefs.GetInt("cubes") + cubes);
	UpdateLevelCubes(cubes);
}

function UpdateLevelCubes(cubes : int){
	var level : int = ParseLevel();
	if (cubes > int.Parse(PlayerPrefs.GetString("player_progress").Substring(level - 1, 1))){
		var temp : String = String.Format("{0}{1}{2}", PlayerPrefs.GetString("player_progress").Substring(0, level - 1), cubes, PlayerPrefs.GetString("player_progress").Substring(level));
		PlayerPrefs.SetString("player_progress", temp);
		highScore.SetActive(true);
	}
	else highScore.SetActive(false);
}

function ParseLevel(){
 	var name : String = Application.loadedLevelName.Substring(5);
	return parseInt(name);
}