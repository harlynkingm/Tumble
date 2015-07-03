#pragma strict

private var player : player_controller;
private var cubeCount : int;
private var total : int;
private var prevCount : int;

function Start () {
	player = GameObject.Find("player").GetComponent(player_controller);
	cubeCount = player.getCubes();
	total = player.getCubesInLevel();
	prevCount = cubeCount;
}

function Update () {
	cubeCount = player.getCubes();
	if (prevCount != cubeCount){
		FadeIn();
	}
	prevCount = cubeCount;
}

function FadeIn(){
	total = player.getCubesInLevel();
	var text : String = String.Format("{0} / {1}", cubeCount, total);
	GetComponent(UI.Text).text = text;
	while (GetComponent(UI.Text).color.a < 1){
		GetComponent(UI.Text).color.a += .01;
		yield;
	}
	var ticker : int = 0;
	while (ticker < 100){
		ticker += 1;
		yield;
	}
	FadeOut();
}

function FadeOut(){
	while (GetComponent(UI.Text).color.a > 0){
		GetComponent(UI.Text).color.a -= .01;
		yield;
	}
}