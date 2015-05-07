#pragma strict

var time: float = 3;
private var minSize : float = 0.08;
var maxSize : float = 2.5;
private var circle : SpriteRenderer;
private var distance: float;
private var fadeUp: float;
private var fadeDown: float;
private var startTime: float;
private var fadeUpP: float = 0.3;
private var fadeDownP: float = 0.6;

function Start () {
	startTime = Time.time;
	circle = GetComponent(SpriteRenderer);
	transform.localScale = Vector3.one * minSize;
	circle.color.a = 0;
	distance = (maxSize - minSize)/time;
	fadeUp = time * fadeUpP;
	fadeDown = time * fadeDownP;
	transform.position.z -= 1.5;
}

function Update () {
	transform.localScale += Vector3.one * (distance * Time.deltaTime);
	if (Time.time - startTime < fadeUp) circle.color.a = Mathf.Lerp(0, .6, (Time.time - startTime)/fadeUp);
	else if (Time.time - startTime > fadeDown) circle.color.a = Mathf.Lerp(.6, 0, (Time.time - (startTime + fadeDown))/(1 - fadeDownP));
	if (transform.localScale.x >= maxSize) Destroy(gameObject);
}