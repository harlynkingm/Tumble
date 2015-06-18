#pragma strict

private var rotated : boolean = false;

function OnTriggerEnter (other : Collider) {
	if (other.CompareTag("Player")){
		if (rotated) rotated = false;
		else rotated = true;
		RotateAngle();
	}
}

function RotateAngle(){
	var startTime : float = Time.time;
	var currentAngle : float;
	if (rotated) currentAngle = 90;
	else currentAngle = 0;
	var startAngle : float = transform.eulerAngles.z;
	var p : float = 0;
	var x : float = 0;
	var curEuler : Vector3 = Vector3(0, startAngle, 0);
	while (p < 1){
		p = Mathf.Clamp01((Time.time - startTime)/.5);
		x = p*p*p*(p*(p*6 - 15) + 10);
		curEuler.y = Mathf.Lerp(startAngle, currentAngle, x);
		transform.eulerAngles = curEuler;
		yield;
	}
}