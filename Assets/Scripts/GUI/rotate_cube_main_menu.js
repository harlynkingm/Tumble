#pragma strict

private var touch0: Touch;
private var scrollVelocityX: float;
private var scrollVelocityY: float;
private var timeTouchPhaseEnded: float;
private var inertiaDuration: int = 5;

function Update () {
	if (Input.touchCount > 0){
		scrollVelocityX = 0;
		scrollVelocityY = 0;
		touch0 = Input.GetTouch(0);
		transform.Rotate (touch0.deltaPosition.y*Time.deltaTime*2,touch0.deltaPosition.x*Time.deltaTime*-1*2,0, Space.World);
		if (touch0.phase == TouchPhase.Ended){
			//if (Mathf.Abs(touch0.deltaPosition.x) >= 10){
				scrollVelocityX = touch0.deltaPosition.x/touch0.deltaTime/10 * -1;
				scrollVelocityY = touch0.deltaPosition.y/touch0.deltaTime/10;
				timeTouchPhaseEnded = Time.time;
			//}
			}}
	else if (Input.touchCount < 1){
		if (scrollVelocityX != 0){
			var t: float = (Time.time - timeTouchPhaseEnded)/inertiaDuration;
			var frameVelocityX = Mathf.Lerp(scrollVelocityX, 0, t);
			var frameVelocityY = Mathf.Lerp(scrollVelocityY, 0, t);
			transform.Rotate (frameVelocityY*Time.deltaTime,frameVelocityX*Time.deltaTime,0, Space.World);
			if (t >= inertiaDuration){
				scrollVelocityX = 0;
				}}
	}
}