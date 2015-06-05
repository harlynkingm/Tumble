#pragma strict

var three : GameObject;
var two : GameObject;
var one : GameObject;
var go : GameObject;
var pause : GameObject;
var screen : GameObject;
private var s : float;

function Start () {
	Time.timeScale = 0;
	screen.SetActive(true);
	three.SetActive(true);
	s = System.DateTime.Now.Second;
	pause.SetActive(false);
}

function Update(){
	if (System.DateTime.Now.Second != s){
		if (three.activeSelf){
			three.SetActive(false);
			two.SetActive(true);
		}
		else if (two.activeSelf){
			two.SetActive(false);
			one.SetActive(true);
		}
		else if (one.activeSelf){
			one.SetActive(false);
			go.SetActive(true);
		}
		else if (go.activeSelf){
			go.SetActive(false);
			screen.SetActive(false);
			pause.SetActive(true);
			Time.timeScale = 1;
			GetComponent(countdown).enabled = false;
		}
		s = System.DateTime.Now.Second;
	}
}