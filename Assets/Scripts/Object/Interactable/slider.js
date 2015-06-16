#pragma strict

var left_end : Transform;
var right_end : Transform;
var startAtEnd : boolean = false;
private var min : Vector3;
private var max : Vector3;
private var hit : RaycastHit;
private var coll : Collider;
private var cam : Camera;
private var moving : boolean;
private var p : float = 0;
private var vert : boolean = false;

function Start(){
	if (transform.parent.eulerAngles.z > 45) vert = true;
	var horizontalSpace : float = (right_end.position.x - left_end.position.x) * .07;
	var verticalSpace : float = (right_end.position.y - left_end.position.y) * .07;
	min = Vector3(left_end.position.x + horizontalSpace, left_end.position.y + verticalSpace, transform.position.z);
	max = Vector3(right_end.position.x - horizontalSpace, right_end.position.y - verticalSpace, transform.position.z);
	coll = GetComponent(Collider);
	cam = Camera.main;
	if (startAtEnd) p = 1;
	transform.position = Vector3.Lerp(min, max, p);
}

function Update () {
	if (Input.touchCount == 1 && Time.timeScale == 1){
		if (Input.GetTouch(0).phase == TouchPhase.Moved) CheckHits(Input.GetTouch(0));
		else if (Input.GetTouch(0).phase == TouchPhase.Ended) moving = false;
		if (moving) Move(Input.GetTouch(0).deltaPosition);
	}
}

function CheckHits(touch : Touch){
	var ray : Ray = cam.ScreenPointToRay(touch.position);
	if (Physics.Raycast(ray, hit)){
		if (hit.collider == coll){
			moving = true;
		}
	}
}

function Move(delta : Vector2){
	if (vert) p = Mathf.Clamp01(p + delta.y * .0005);
	else p = Mathf.Clamp01(p + delta.x * .0005);
	transform.position = Vector3.Lerp(min, max, p);
}