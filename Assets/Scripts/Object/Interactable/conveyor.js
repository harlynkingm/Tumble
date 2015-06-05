#pragma strict

var force : float;
var reverse : boolean;
private var multiplier : int;

function Start(){
	if (reverse){
		for (var child : Transform in transform){
			child.gameObject.GetComponent(constant_animation).ReverseRotation();
		}
		force *= -1;
	}
}

function OnCollisionStay (other : Collision) {
	if (other.gameObject.GetComponent(Rigidbody) != null){
		var normal : Vector3 = other.contacts[0].normal;
		if (normal.y > 0) multiplier = -1; //Bottom
		else multiplier = 1; //Top
		if (other.gameObject.CompareTag("Player")) other.rigidbody.AddForce(transform.up * 9.81 * multiplier * -1, ForceMode.Force); 
		other.rigidbody.AddForce(transform.right * force * multiplier, ForceMode.Acceleration);
	}
}