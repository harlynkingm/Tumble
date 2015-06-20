#pragma strict

var force : Vector2;

function OnTriggerStay (other : Collider) {
	if (other.GetComponent(Rigidbody) != null){
		if (force.x != 0) other.GetComponent(Rigidbody).AddForce(transform.right * force.x);
		if (force.y != 0) other.GetComponent(Rigidbody).AddForce(transform.up * force.y);
	}
}