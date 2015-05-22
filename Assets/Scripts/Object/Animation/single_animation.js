#pragma strict

var activeOnStart : boolean = true;
var relativeDestination : Vector3;
var length: float = 1;
var delay: int;
private var moving : boolean = false;
private var reverse : boolean = false;
private var p: float;
private var x: float;
private var startTime : float;
private var startPos : Vector3;

function Start () {
	if (activeOnStart) Invoke("ActivateMove", delay);
}

function ActivateMove(){
	moving = true;
	reverse = false;
	startTime = Time.time;
	startPos = transform.localPosition;
	p = 0;
}

function ActivateReverseMove(){
	ActivateMove();
	reverse = true;
}

function Update () {
	if (moving && p < 1){
		p = Mathf.Clamp01((Time.time - startTime)/length);
		x = p*p*p*(p*(p*6 - 15) + 10);
		if (reverse) transform.localPosition = Vector3.Lerp(startPos, startPos + relativeDestination, 1 - x);
		else transform.localPosition = Vector3.Lerp(startPos, startPos + relativeDestination, x);
	}
	else if (moving && p >= 1){
		moving = false;
	}
}

function OnDrawGizmosSelected(){
	Gizmos.color = Color.grey;
	Gizmos.DrawLine(transform.position, transform.position + relativeDestination);
	if (GetComponent(MeshFilter) != null){
		Gizmos.DrawWireMesh(GetComponent(MeshFilter).sharedMesh, transform.position + relativeDestination, transform.rotation, transform.localScale);
		}
	for (var child : Transform in transform){
		if (child.gameObject.GetComponent(MeshFilter) != null){
			Gizmos.DrawWireMesh(child.gameObject.GetComponent(MeshFilter).sharedMesh, child.position + relativeDestination, child.rotation, child.localScale);
		}
	} 
}