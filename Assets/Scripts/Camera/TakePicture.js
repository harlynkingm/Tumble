#pragma strict

private var screenshot: int = 0;

function Update () {
	if (Input.GetKeyDown("p")){
		Application.CaptureScreenshot("Screenshot" + screenshot + ".png", 1);
		screenshot += 1;
		}
}