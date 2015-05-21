#pragma strict

var oldStuff: GameObject;
private var height: int = 492;
private var startY: float;
private var p: float;
private var x: float;
private var curPos: Vector2;
var block: GameObject;
private var animating: boolean = false;
private var into: boolean = false;
private var endp: float;

function SendIn(){
	gameObject.transform.parent.gameObject.SetActive(true);
	curPos = new Vector2(0, height);
	gameObject.GetComponent(RectTransform).anchoredPosition = curPos;
	animate(0, true);
}

function SendOff(){
	animate(height, false);
}

function alreadyThere(stuff: GameObject){
	stuff.SetActive(true);
	animate(height, false);
}

function animate(endpos: float, si : boolean){
	block.SetActive(true);
	startY = gameObject.GetComponent(RectTransform).anchoredPosition.y;
	p = 0;
	into = si;
	animating = true;
	endp = endpos;
//	while (p < 1){
//		p = Mathf.Clamp01((getTime() - startTime)/time);
//		x = p*p*p*(p*(p*6 - 15) + 10);
//		curPos.y = Mathf.Lerp(startY, endpos, x);
//		gameObject.GetComponent(RectTransform).anchoredPosition = curPos;
//		yield;
//	}
//	if (si) oldStuff.SetActive(false);
//	else{
//		gameObject.transform.parent.gameObject.SetActive(false);
//	}
//	block.SetActive(false);
}

function Update(){
	if (animating && p < 1){
		p += .025;
		x = p*p*p*(p*(p*6 - 15) + 10);
		curPos.y = Mathf.Lerp(startY, endp, x);
		gameObject.GetComponent(RectTransform).anchoredPosition = curPos;
	}
	else if (animating && p >= 1){
		animating = false;
		if (into) oldStuff.SetActive(false);
		else gameObject.transform.parent.gameObject.SetActive(false);
		block.SetActive(false);
	}
}