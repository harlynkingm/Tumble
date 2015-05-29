using UnityEngine;
using UnityEngine.iOS;
using System;
using System.Collections;

public class notification_controller : MonoBehaviour {

	private UnityEngine.iOS.LocalNotification notif;

	public void CreateNotification(DateTime date){
		notif = new UnityEngine.iOS.LocalNotification();
		notif.fireDate = notif.fireDate.AddDays(10);
		notif.applicationIconBadgeNumber = 1;
		notif.hasAction = true;
		notif.alertBody = "Lottery winners have been announced! See what you won!";
		Debug.Log (notif.fireDate);
		UnityEngine.iOS.NotificationServices.ScheduleLocalNotification(notif); 
		Debug.Log(UnityEngine.iOS.NotificationServices.scheduledLocalNotifications);
	}
}