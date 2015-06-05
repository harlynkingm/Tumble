#pragma strict

import UnityEngine.UI;

var rect : ScrollRect;
private var lastSpot: float;
private var velocity : float;

function OnDrag () {
	if (Input.touchCount == 1){
		lastSpot = rect.normalizedPosition.x;
		rect.normalizedPosition.x -= Input.GetTouch(0).deltaPosition.x * .0002;
		velocity = Mathf.Clamp(lastSpot - rect.normalizedPosition.x, -.03, .03);
	}
}

function Update(){
	if (Input.touchCount == 0 && Mathf.Abs(velocity) > 0){
		if (Mathf.Abs(velocity) < .0001) velocity = 0;
		rect.normalizedPosition.x -= velocity;
		velocity *= .9;
	}
	if (Input.touchCount >= 1 && Input.GetTouch(0).phase == TouchPhase.Began) velocity = 0;
}