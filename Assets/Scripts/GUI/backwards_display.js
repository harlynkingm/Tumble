#pragma strict

private var t : UI.Text;
private var i : UI.Image;
private var p : player_controller;

function Start () {
	p = GameObject.FindGameObjectWithTag("Player").GetComponent(player_controller);
	t = gameObject.GetComponent(UI.Text);
	if (t == null) i = gameObject.GetComponent(UI.Image);
}

function Update () {
	if (t != null){
		if (p.GetBackwards()) FadeInText();
		else FadeOutText();
	}
	else{
		if (p.GetBackwards()) FadeInImage();
		else FadeOutImage();
	}
}

function FadeInText(){
	while (t.color.a < 1){
		t.color.a += .05;
		yield;
	}
}

function FadeOutText(){
	while (t.color.a > 0){
		t.color.a -= .05;
		yield;
	}
}

function FadeInImage(){
	while (i.color.a < 1){
		i.color.a += .05;
		yield;
	}
}

function FadeOutImage(){
	while (i.color.a > 0){
		i.color.a -= .05;
		yield;
	}
}