#pragma strict

var gears : RectTransform[];
var button : UI.Image;
var on : Sprite;
var off : Sprite;
private var sliding : RectTransform;
private var moving : boolean = false;
private var forward : boolean = false;
private var p : float;
private var startPos : Vector2;
private var endPos : Vector2;
private var lastPress : float;

function Start () {
	sliding = GetComponent(RectTransform);
	startPos = sliding.anchoredPosition;
	endPos = Vector2(startPos.x, 0);
}

function Press(){
	if (Time.realtimeSinceStartup - lastPress > .5){
		moving = true;
		if (forward){
			forward = false;
			button.sprite = off;
		}
		else{
			forward = true;
			button.sprite = on;
		}
		lastPress = Time.realtimeSinceStartup;
	}
}

function Update(){
	for (var i : int = 0; i < gears.Length; i++){
		if (i % 2 == 1) gears[i].Rotate(Vector3(0, 0, 60) * .01);
		else gears[i].Rotate(Vector3(0, 0, -60) * .01);
	}
	if (moving){
		if (forward && p < 1) p += .02;
		else if (forward && p >= 1) moving = false;
		else if (!forward && p > 0) p -= .02;
		else if (!forward && p <= 0) moving = false;
		sliding.anchoredPosition = Vector2.Lerp(startPos, endPos, p);
	}
}