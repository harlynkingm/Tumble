#pragma strict

function OnEnable () {
	var level : int = GetLevel();
	var zone : int = GetZone();
	var text = String.Format("Zone {0} - Level {1}", zone, level);
	gameObject.GetComponent(UI.Text).text = text;
}

function GetLevel(){
	var level : int = ParseLevel() % 10;
	if (level == 0) level = 10;
	return level;
}

function GetZone(){
	return Mathf.Floor(ParseLevel() / 10) + 1;
}

function ParseLevel(){
 	var name : String = Application.loadedLevelName.Substring(5);
	return parseInt(name);
}