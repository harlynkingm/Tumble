#pragma strict

var activeOnStart : boolean = true;
var relativeDestination : Vector3;
var length: float = 1;
var trigger : single_animation;
private var moving : boolean = false;
private var reverse : boolean = false;
private var p: float;
private var x: float;
private var startTime : float;
private var startPos : Vector3;
private var endPos: Vector3;
private var originalLength: float;
private var playerR: Renderer;
private var lastEnabled: boolean;

function Start () {
	if (activeOnStart && trigger == null) ActivateMove();
	originalLength = length;
	playerR = GameObject.FindGameObjectWithTag("Player").GetComponent(Renderer);
	startPos = transform.localPosition;
	endPos = startPos + relativeDestination;
}

function ActivateMove(){
	moving = true;
	reverse = false;
	startTime = Time.time;
}

function ActivateReverseMove(){
	ActivateMove();
	reverse = true;
}

function ActivateSuperReverseMove(){
	ActivateReverseMove();
	length = 1;
}

function ResetLength(){
	length = originalLength;
}

function Update () {
	if (trigger != null && trigger.GetDone() && !moving && p == 0){
		ResetLength();
		Invoke("ActivateMove", 1);
	}
	else if (trigger == null && activeOnStart && !moving && p == 0){
		ResetLength();
		Invoke("ActivateMove", 1);
	}
	if (moving && !reverse && p < 1){
//		p = Mathf.Clamp01((Time.time - startTime)/length);
//		x = p*p*p*(p*(p*6 - 15) + 10);
//		if (reverse) transform.localPosition = Vector3.Lerp(curPos, startPos, x);
//		else transform.localPosition = Vector3.Lerp(curPos, endPos, x);
		p = Mathf.Clamp01(p + (Time.deltaTime/length));
		transform.localPosition = Vector3.Lerp(startPos, endPos, p);
	}
	else if (moving && !reverse && p >= 1){
		moving = false;
	}
	else if (moving && reverse && p > 0){
		p = Mathf.Clamp01(p - (Time.deltaTime/length));
		transform.localPosition = Vector3.Lerp(startPos, endPos, p);
	}
	else if (moving && reverse && p <= 0){
		moving = false;
	}
	if (!playerR.enabled && lastEnabled && moving){
		ActivateSuperReverseMove();
	}
	lastEnabled = playerR.enabled;
}

function GetDone(){
	if (p >= 1) return true;
	else return false;
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