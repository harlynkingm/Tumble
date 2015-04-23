#pragma strict

function Start () {
	var rb : Rigidbody = GetComponent(Rigidbody);
	rb.AddForce(Vector3(Random.Range(-1, 1), Random.Range(-1, 1), 0) * 20, ForceMode.VelocityChange);
}