#pragma strict

var totalTime : int = 60;

function Start () {
	if (ParseLevel() % 10 != 0) GameObject.Destroy(gameObject);
	else{
		GetComponent(UI.Text).color.a = 1;
	}
}

function ParseLevel(){
	var name : String = Application.loadedLevelName.Substring(5);
	return int.Parse(name);
}