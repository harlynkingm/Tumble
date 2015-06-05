#pragma strict

private var p : GameObject;
private var pc : player_controller;
private var r : RectTransform;
private var other : GameObject;

function Start(){
	p = GameObject.FindGameObjectWithTag("Player");
	pc = p.GetComponent(player_controller);
	r = GetComponent(RectTransform);
}

function Update () {
	if (gameObject.activeSelf){
		other = pc.NearestCapturePoint();
		var v3Pos : Vector3 = Camera.main.WorldToViewportPoint(other.transform.position);
		v3Pos.x -= .5;
		v3Pos.y -= .5;
		v3Pos.z = 0;
		var fAngle : float = Mathf.Atan2(v3Pos.x, v3Pos.y);
		r.localEulerAngles = Vector3(0, 0, fAngle * -1 * Mathf.Rad2Deg);
	}
}