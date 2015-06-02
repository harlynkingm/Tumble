using UnityEngine;
using UnityEngine.iOS;
using System;
using System.Collections;

public class notification_controller : MonoBehaviour {

	private UnityEngine.iOS.LocalNotification notif;

	public void CreateNotification(DateTime date){
		notif = new UnityEngine.iOS.LocalNotification();
		notif.fireDate = System.DateTime.Now.AddSeconds(1);
		notif.applicationIconBadgeNumber = 1;
		notif.hasAction = true;
		notif.alertBody = "Lottery winners have been announced! See what you won!";
		UnityEngine.iOS.NotificationServices.ScheduleLocalNotification(notif); 
		Debug.Log(UnityEngine.iOS.NotificationServices.scheduledLocalNotifications[0]);
	}
}