#pragma strict

//var friend_explode : GameObject;
private var collisions : List.<Collision>;

//function Start () {
//	collisions = new List.<Collision>();
//}

function Start(){
	GetComponent(Renderer).sortingOrder = 90;
}

//function FixedUpdate () {
//	collisions.Clear();
//}

function OnCollisionEnter(other : Collision){
	CheckPush(other);
}

function OnCollisionStay(other : Collision){
	CheckPush(other);
}

function CheckPush(other : Collision){
	if (other.gameObject.CompareTag("Neutral")) return;
	else if (other.gameObject.CompareTag("Player")){
		if (other.contacts[0].point.y > transform.position.y){
			if (other.contacts[0].point.x > transform.position.x) GetComponent(Rigidbody).AddForce(Vector3.left * .1, ForceMode.Impulse);
			else GetComponent(Rigidbody).AddForce(Vector3.right * .1, ForceMode.Impulse);
		}
	}
	else if (other.contacts.Length > 0 && Mathf.Abs(transform.position.y - other.contacts[0].point.y) < .1){
		if (other.contacts[0].point.x > transform.position.x) GetComponent(Rigidbody).AddForce(Vector3.left * .1, ForceMode.Impulse);
		else GetComponent(Rigidbody).AddForce(Vector3.right * .1, ForceMode.Impulse);
	}
}

//function OnCollisionStay(collision: Collision){
//	if (collisions.Count < 2) return;
//	if (collision.gameObject.CompareTag("Neutral") || collision.gameObject.CompareTag("Player")) return;
//	CheckPush(collision);
//	var new_normal : Vector3 = collision.contacts[0].normal;
//	for (var existing_coll : Collision in collisions){
//		if (existing_coll.gameObject.CompareTag("Neutral") || collision.gameObject.CompareTag("Player")) return;
//		var existing_normal : Vector3 = existing_coll.contacts[0].normal;
//		var normal_angle : float = Vector3.Angle(new_normal, existing_normal);
//		if (normal_angle > 170) despawn();
//	}
//}
//
//function despawn(){
//	GameObject.Destroy(GameObject.Instantiate(friend_explode, transform.position, transform.rotation), 5);
//	GameObject.Destroy(gameObject);
//}