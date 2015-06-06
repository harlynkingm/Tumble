#pragma strict

var ignore_tag : String;

function OnCollisionEnter(other : Collision){
	if (other.gameObject.CompareTag(ignore_tag)){
		Physics.IgnoreCollision(gameObject.GetComponent(Collider), other.gameObject.GetComponent(Collider), true);
	}
}