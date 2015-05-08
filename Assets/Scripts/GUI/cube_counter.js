#pragma strict

function OnEnable(){
	var player : GameObject = GameObject.Find("player");
	var cubeCount : int = player.GetComponent(player_controller).getCubes();
	var total : int = GameObject.FindGameObjectsWithTag("Cube").Length;
	var text = String.Format("{0} / {1} Cubes Collected", cubeCount, total);
	gameObject.GetComponent(UI.Text).text = text;
}