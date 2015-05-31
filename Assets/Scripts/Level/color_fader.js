#pragma strict

var mat : Material;
var grad : Gradient;
private var fadeTime : float = 90;
private var p : float;
private var defaultC : Color = Color(.11, .11, .11, 1);

function Update () {
	p = Mathf.Sin((Mathf.PI * Time.time)/fadeTime)/2 + .5;
	mat.color = grad.Evaluate(p);
}

function OnApplicationQuit(){
	mat.color = defaultC;
}