#pragma strict

var rotating : boolean = false;
var rotation : Vector3;
var moving : boolean = false;
var relativeEnd : Vector3;
var moveTime : float = 1;
var offset: float = 0;
private var startPos : Vector3;
private var endPos : Vector3;
private var p : float;

function Start(){
	startPos = transform.localPosition;
	endPos = startPos + relativeEnd;
}

function Update () {
	if (rotating) transform.Rotate(rotation * Time.deltaTime);
	if (moving){
		p = Mathf.Sin((Mathf.PI * (Time.time - offset))/moveTime)/2 + .5;
		transform.localPosition = Vector3.Lerp(startPos, endPos, p);
	}
}

function OnDrawGizmosSelected(){
	Gizmos.color = Color.grey;
	Gizmos.DrawLine(transform.position, transform.position + relativeEnd);
	if (GetComponent(MeshFilter) != null){
		Gizmos.DrawWireMesh(GetComponent(MeshFilter).sharedMesh, transform.position + relativeEnd, transform.rotation, transform.localScale);
		}
	for (var child : Transform in transform){
		if (child.gameObject.GetComponent(MeshFilter) != null){
			Gizmos.DrawWireMesh(child.gameObject.GetComponent(MeshFilter).sharedMesh, child.position + relativeEnd, child.rotation, child.localScale);
		}
	} 
}