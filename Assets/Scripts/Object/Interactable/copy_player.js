#pragma strict

private var x : float;
private var y : float;
private var rb : Rigidbody;
private var maxSpeed : float = 7;
private var canMove : boolean = false;

function Start(){
	rb = GetComponent(Rigidbody);
}

function Update(){
	if (Time.timeScale == 1) Move();
}

function Move(){
	if (canMove){
	x = Mathf.Clamp(Input.acceleration.x * 3, -1, 1);
	y = Mathf.Clamp((Input.acceleration.y + .5) * 3, -1, 1);
	if (Mathf.Abs(x) < .05) x = 0;
	if (Mathf.Abs(y) < .05) y = 0;
	rb.AddForce(Vector3(x, y, 0), ForceMode.VelocityChange);
	if (x == 0) rb.AddForce(Vector3(rb.velocity.x * -.15, 0, 0), ForceMode.VelocityChange);
	if (y == 0) rb.AddForce(Vector3(0, rb.velocity.y * -.15, 0), ForceMode.VelocityChange);
	}
}

function StopMoving(){
	canMove = false;
	rb.isKinematic = true;
}

function StartMoving(){
	canMove = true;
	rb.isKinematic = false;
}

function FixedUpdate(){
	if(rb.velocity.magnitude > maxSpeed){
		rb.velocity = rb.velocity.normalized * maxSpeed;
		}
}