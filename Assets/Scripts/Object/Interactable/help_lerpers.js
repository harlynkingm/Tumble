#pragma strict

var lerper_count : int;
var door : single_animation;
var sign : TextMesh;
private var cur_lerpers : int;

//function Start(){
//	sign.text = String.Format("{0}", lerper_count);
//}

function OnCollisionEnter(other : Collision){
	if (other.gameObject.name == "FRIEND") cur_lerpers += 1;
	GameObject.Destroy(other.gameObject);
}

//function OnCollisionExit(other : Collision){
//	if (other.gameObject.name == "FRIEND") cur_lerpers -= 1;
//}

function Update () {
	sign.text = String.Format("{0}", Mathf.Clamp(lerper_count - cur_lerpers, 0, lerper_count));
	if (cur_lerpers >= lerper_count) door.ActivateMove();
}