#pragma strict

private var t : UI.Text;
private var p : player_controller;

function Start () {
	p = GameObject.FindGameObjectWithTag("Player").GetComponent(player_controller);
	t = gameObject.GetComponent(UI.Text);
}

function Update () {
	if (p.GetBackwards()) FadeIn();
	else FadeOut();
}

function FadeIn(){
	while (t.color.a < 1){
		t.color.a += .05;
		yield;
	}
}

function FadeOut(){
	while (t.color.a > 0){
		t.color.a -= .05;
		yield;
	}
}