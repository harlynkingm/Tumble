#pragma strict

private var second : int;
private var event : EventSystems.BaseEventData;

function UseEvent(data : EventSystems.BaseEventData){
	data.Use();
	event = data;
	second = (System.DateTime.Now.Second + 1)%60;
}

function Update(){
	if (event != null && event.used && System.DateTime.Now.Second == second){
		event.Reset();
	}
}