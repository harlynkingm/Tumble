#pragma strict

var oldStuff: GameObject;
private var height: int = 492;
private var startTime: float;
private var startY: float;
private var p: float;
private var x: float;
private var curPos: Vector2;
private var time: float = 1;

function SendIn(){
	gameObject.transform.parent.gameObject.SetActive(true);
	curPos = new Vector2(0, height);
	gameObject.GetComponent(RectTransform).anchoredPosition = curPos;
	slideIn();
}

function SendOff(){
	slideOff();
}

function getTime(){
	return (System.DateTime.Now.Second + (System.DateTime.Now.Millisecond * 1/1000.0));
}

function slideIn(){
	startTime = getTime();
	startY = gameObject.GetComponent(RectTransform).anchoredPosition.y;
	p = 0;
	while (p < 1){
		p = Mathf.Clamp01((getTime() - startTime)/time);
		x = p*p*p*(p*(p*6 - 15) + 10);
		curPos.y = Mathf.Lerp(startY, 0, x);
		gameObject.GetComponent(RectTransform).anchoredPosition = curPos;
		yield;
	}
	oldStuff.SetActive(false);
}

function slideOff(){
	startTime = getTime();
	startY = gameObject.GetComponent(RectTransform).anchoredPosition.y;
	p = 0;
	while (p < 1){
		p = Mathf.Clamp01((getTime() - startTime)/time);
		x = p*p*p*(p*(p*6 - 15) + 10);
		curPos.y = Mathf.Lerp(startY, height, x);
		gameObject.GetComponent(RectTransform).anchoredPosition = curPos;
		yield;
	}
	gameObject.transform.parent.gameObject.SetActive(false);
}

function alreadyThere(stuff: GameObject){
	stuff.SetActive(true);
	slideOff();
}