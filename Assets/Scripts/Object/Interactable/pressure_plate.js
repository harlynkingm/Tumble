#pragma strict

var actions : single_animation[];
var animations : constant_animation[];
//private var count : int;
//private var lastCount : int = 0;

function OnCollisionEnter (other : Collision) {;
	if (other.gameObject.CompareTag("Player") || other.gameObject.CompareTag("GameController") || other.gameObject.CompareTag("Neutral")){
		GetComponent(single_animation).ActivateMove();
		for (var action : single_animation in actions) action.ActivateMove();
		for (var animation : constant_animation in animations) animation.Stop();
	}
}

function OnCollisionExit(other : Collision){
	if (other.gameObject.CompareTag("Player") || other.gameObject.CompareTag("GameController") || other.gameObject.CompareTag("Neutral")){
//		if (count > 0) return;
		GetComponent(single_animation).ActivateReverseMove();
		for (var action : single_animation in actions) action.ActivateReverseMove();
		for (var animation : constant_animation in animations) animation.Begin();
	}
}

//function OnCollisionEnter(other : Collision){
//	count++;
//}

function OnCollisionStay(other : Collision){
//	count++;
	GetComponent(single_animation).ActivateMove();
	for (var action : single_animation in actions) action.ActivateMove();
	for (var animation : constant_animation in animations) animation.Stop();
}

//function FixedUpdate(){
//	if (count != lastCount && count > 0){
//		GetComponent(single_animation).ActivateMove();
//		for (var action : single_animation in actions){
//			action.ActivateMove();
//		}
//	}
//	else if (count != lastCount){
//		GetComponent(single_animation).ActivateReverseMove();
//		for (var action : single_animation in actions){
//			action.ActivateReverseMove();
//		}
//	}
//	lastCount = count;
//	count = 0;
//}

function OnDrawGizmosSelected(){
	if (actions.Length != 0){
		Gizmos.color = Color.gray;
		for (var i : int = 0; i < actions.Length; i++){
			Gizmos.DrawLine(transform.position, actions[i].gameObject.transform.position);
		}
	}
}