#pragma strict

function OnEnable () {
	var level : int = GetLevel();
	var zone : int = GetZone();
	var text = String.Format("Floor {0} - Level {1}", zone, level);
	gameObject.GetComponent(UI.Text).text = text;
}

function GetLevel(){
//	var level : int = ParseLevel() % 10;
//	if (level == 0) level = 10;
	return ParseLevel();
}

function GetZone(){
	var level : int = ParseLevel();
	if (level % 10 == 0) return level/10;
	else return Mathf.Floor(level / 10) + 1;
}

function ParseLevel(){
 	var name : String = Application.loadedLevelName.Substring(5);
	return parseInt(name);
}