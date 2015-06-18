#pragma strict

var left_end : Transform;
var right_end : Transform;
private var min : Vector3;
private var max : Vector3;
private var hit : RaycastHit;
private var coll : Collider;
private var cam : Camera;
private var moving : boolean;
private var p : float = 0;
private var vert : boolean = false;
private var velocity : Vector2;


function Start(){
	if (transform.parent.eulerAngles.z > 45) vert = true;
	var horizontalSpace : float = (right_end.position.x - left_end.position.x) * .07;
	var verticalSpace : float = (right_end.position.y - left_end.position.y) * .07;
	min = Vector3(left_end.position.x + horizontalSpace, left_end.position.y + verticalSpace, transform.position.z);
	max = Vector3(right_end.position.x - horizontalSpace, right_end.position.y - verticalSpace, transform.position.z);
	coll = GetComponent(Collider);
	cam = Camera.main;
	var totalDist : float = Vector3.Distance(min, max);
	var curDist : float = Vector3.Distance(min, transform.position);
	p = curDist/totalDist;
	transform.position = Vector3.Lerp(min, max, p);
}

function Update () {
	if (Input.touchCount == 1 && Time.timeScale == 1){
		if (Input.GetTouch(0).phase == TouchPhase.Moved){
			if (!moving) moving = CheckHits(Input.GetTouch(0));
			if (moving) velocity = Input.GetTouch(0).deltaPosition;
		}
		else if (Input.GetTouch(0).phase == TouchPhase.Began && CheckHits(Input.GetTouch(0))) velocity = Vector2(0, 0);
		else if (Input.GetTouch(0).phase == TouchPhase.Ended){
			moving = false;
		}
		if (moving) Move(Input.GetTouch(0).deltaPosition);
	}
	if (!moving && Mathf.Abs(velocity.x) > 0){
		velocity = velocity * .95;
		Move(velocity);
		if (Mathf.Abs(velocity.x) < .001) velocity = Vector2(0, 0);
		if (transform.position == min || transform.position == max) velocity *= -1;
	}
}

function CheckHits(touch : Touch){
	var ray : Ray = cam.ScreenPointToRay(touch.position);
	if (Physics.Raycast(ray, hit)){
		if (hit.collider == coll){
			return true;
		}
	}
	return false;
}

function Move(delta : Vector2){
	if (vert) p = Mathf.Clamp01(p + delta.y * .0005);
	else p = Mathf.Clamp01(p + delta.x * .0005);
	transform.position = Vector3.Lerp(min, max, p);
}