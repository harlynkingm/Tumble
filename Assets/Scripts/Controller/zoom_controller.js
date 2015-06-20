#pragma strict

private var cam : Camera;
private var lastDistance : float;

function Start () {
	cam = GetComponent(Camera);
}

function Update () {
	if (Time.timeScale == 1 && Input.touchCount == 2){
		Zoom();
	}
}

function Zoom(){
	if (Input.GetTouch(0).phase == TouchPhase.Began || Input.GetTouch(1).phase == TouchPhase.Began){ 
		lastDistance = GetTouchesDistance();
		}
	var delta : float = GetTouchesDistance() - lastDistance;
	if (cam.orthographic){
		cam.orthographicSize = Mathf.Clamp(cam.orthographicSize - (delta * Time.deltaTime * .5), 3, 10);
//		if (cam.orthographicSize < 3) cam.orthographicSize = 3;
//		else if (cam.orthographicSize > 10) cam.orthographicSize = 10;
		}
	else{
		cam.fieldOfView = Mathf.Clamp(cam.fieldOfView - (delta * Time.deltaTime * 5), 30, 100);
	}
	lastDistance = GetTouchesDistance();
}

function GetTouchesDistance(){
	return Vector2.Distance(Input.GetTouch(0).position, Input.GetTouch(1).position);
}