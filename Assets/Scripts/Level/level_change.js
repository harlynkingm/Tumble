#pragma strict

function Change () {
	if (Application.loadedLevel == Application.levelCount - 1) MainMenu();
	else Application.LoadLevel(Application.loadedLevel + 1);
}

function MainMenu(){
	Time.timeScale = 1;
	Application.LoadLevel("Main Menu");
}