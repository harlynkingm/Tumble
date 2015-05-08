#pragma strict

function Start () {
	for (var i = gameObject.transform.childCount - 1; i >= 0; i--){
	     var objectA = gameObject.transform.GetChild(i);
	     objectA.transform.SetParent(null);
     } 
}