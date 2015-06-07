#pragma strict

function OnEnable () {
	var level : int = int.Parse(transform.parent.gameObject.name);
	if (GetCubesForLevel(level) > 0 && GetProgressForLevel(level) == GetCubesForLevel(level)){
		gameObject.GetComponent(UI.Image).color.a = 1;
	}
	else gameObject.GetComponent(UI.Image).color.a = 0;
}

function GetProgressForLevel(level : int){
	return int.Parse(PlayerPrefs.GetString("player_progress").Substring(level - 1, 1));
}

function GetCubesForLevel(level : int){
	return int.Parse(PlayerPrefs.GetString("level_cube_counts").Substring(level - 1, 1));
}