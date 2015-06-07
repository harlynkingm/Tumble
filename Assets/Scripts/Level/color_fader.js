#pragma strict

var mat : Material;
var img : UI.Image;
var colors : Color[];
private var color : Color;
private var color1 : Color;
private var grad : Gradient;
private var fadeTime : float = 400;
private var offset : float;
private var amt : float = 0.04;
private var p : float;
var defaultC : Color = Color(.11, .11, .11, 1);

function Start(){
//	color = colors[(Application.loadedLevel - 1) % colors.Length];
//	var red : float = color.r;
//	var blue : float = color.b;
//	var green : float = color.g;
//	if (red > blue && red > green) red -= amt;
//	else if (blue > red && blue > green) blue -= amt;
//	else if (green > red && green > blue) green -= amt;
//	color1 = Color(red, green, blue);
	grad = new Gradient();
	var gck : GradientColorKey[];
	var gak : GradientAlphaKey[];
	gck = new GradientColorKey[8];
	gak = new GradientAlphaKey[1];
	gak[0].alpha = 1;
	gak[0].time = 0;
	for (var i : int = 1; i < 9; i++){
		gck[i - 1].color = colors[i];
		if (i == 8) gck[i - 1].time = 1;
		else gck[i - 1].time = (1/6.0) * (i - 1);
	}
	grad.SetKeys(gck, gak);
	offset = Random.Range(0, fadeTime);
}

function Update () {
	if (Time.timeScale == 1) p = Mathf.Sin((Mathf.PI * (Time.time + offset))/fadeTime)/2 + .5;
	else if (img != null){
		offset += .05;
		p = Mathf.Sin((Mathf.PI * (offset))/fadeTime)/2 + .5;
	}
	if (mat != null) mat.color = grad.Evaluate(p);
	if (img != null) img.color = grad.Evaluate(p);
}

function OnApplicationQuit(){
	if (mat != null) mat.color = defaultC;
}