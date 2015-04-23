#pragma strict

var relativeEnd: Vector3;
var loopTime: float;
var object: GameObject;
var objectRotation: Vector3;
var numberOfElevators: int = 1;
private var p : float;
private var startPos: Vector3;
private var endPos: Vector3;
private var elevators : GameObject[];

function Start(){
	elevators = new GameObject[numberOfElevators];
	endPos = transform.position + relativeEnd; 
	startPos = transform.position;
	for (var i : int = 0; i < numberOfElevators; i++){
		var newObj : GameObject = GameObject.Instantiate(object, Vector3(0, 0, 0), Quaternion.identity);
		var offset : float = parseFloat(i)/parseFloat(numberOfElevators);
		newObj.transform.position = Vector3(Mathf.Lerp(startPos.x, endPos.x, offset), Mathf.Lerp(startPos.y, endPos.y, offset), Mathf.Lerp(startPos.z, endPos.z, offset));
		newObj.transform.eulerAngles = objectRotation;
		newObj.name = "crusher-";
		elevators[i] = newObj;
		}
}

function Update(){
	for (var i : int = 0; i < numberOfElevators; i++){
		var offset : float = parseFloat(i)/parseFloat(numberOfElevators);
		p = (offset + (Time.time % loopTime)/loopTime)%1;
		elevators[i].transform.position = Vector3(Mathf.Lerp(startPos.x, endPos.x, p), Mathf.Lerp(startPos.y, endPos.y, p), Mathf.Lerp(startPos.z, endPos.z, p));
	}
}

function OnDrawGizmosSelected(){
	Gizmos.color = Color.grey;
	endPos = transform.position + relativeEnd;
	Gizmos.DrawLine(transform.position, endPos);
	if (object != null && object.GetComponent(MeshFilter) != null){
		for (var i : int = 0; i <= numberOfElevators; i++){
			var offset : float = parseFloat(i)/parseFloat(numberOfElevators);
			Gizmos.DrawWireMesh(object.GetComponent(MeshFilter).sharedMesh, Vector3(Mathf.Lerp(transform.position.x, endPos.x, offset), Mathf.Lerp(transform.position.y, endPos.y, offset), Mathf.Lerp(transform.position.z, endPos.z, offset)), transform.rotation, transform.localScale);
			}
		}
}