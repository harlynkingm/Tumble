#pragma strict

private var lt : Light;
var colors : Color[];
private var grad : Gradient;
private var fadeTime : float = 50;
private var amt : float = 0.04;
private var p : float;
private var defaultC : Color = Color(0, 0, 0, 1);

function Start(){
	lt = gameObject.GetComponent(Light);
	grad = new Gradient();
	var gck : GradientColorKey[];
	var gak : GradientAlphaKey[];
	gck = new GradientColorKey[8];
	gak = new GradientAlphaKey[1];
	gak[0].alpha = 1;
	gak[0].time = 0;
	for (var i : int = 0; i < 8; i++){
		gck[i].color = colors[i];
		if (i == 8) gck[i].time = 1;
		else gck[i].time = (1/6.0) * (i);
	}
	grad.SetKeys(gck, gak);
}

function Update () {
	p = Mathf.Sin((Mathf.PI * (Time.time - fadeTime/2))/fadeTime)/2 + .5;
	lt.color = grad.Evaluate(p);
}

function OnApplicationQuit(){
	lt.color = defaultC;
}