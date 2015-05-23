﻿using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class lottery_menu : MonoBehaviour {

	public GameObject cubes;
	public GameObject ticketBtn;
	public Text ticketText;
	public Toggle notify;
	public GameObject plus;
	public GameObject minus;
	private Text cubesText;
	private int currentInvestAmount = 0;
	private float lastTime;

	void Start () {
		currentInvestAmount = GetInvested();
		cubesText = cubes.GetComponent<Text>();
		if (GetActive() == false) ResetMenu();
		else SetupMenu();
	}
	

	void Update () {
		cubesText.text = string.Format("{0}", currentInvestAmount);
	}

	public void AddFive(){
		if (Time.time - lastTime > .3){
			if (currentInvestAmount < 50){
				currentInvestAmount += 5;
			}
			lastTime = Time.time;
		}
	}

	public void MinusFive(){
		if (Time.time - lastTime > .3){
			if (currentInvestAmount > 0){
				currentInvestAmount -= 5;
			}
			lastTime = Time.time;
		}
	}

	public void BuyTicket(){
		if (currentInvestAmount > 0 && GetActive() == false && currentInvestAmount <= PlayerPrefs.GetInt("cubes")){
			PlayerPrefs.SetInt("cubes", PlayerPrefs.GetInt("cubes") - currentInvestAmount);
			SetCubeAmount(currentInvestAmount);
			SetActive();
			if (System.DateTime.Now.Hour < 8) SetDay(System.DateTime.Today, 8);
			else if (System.DateTime.Now.Hour < 20) SetDay(System.DateTime.Today, 20);
			else SetDay(System.DateTime.Today.AddDays(1), 8);
			SetupMenu();
			SetNotification();
		}
	}

	void ResetMenu(){
		Color temp = ticketBtn.GetComponent<Image>().color;
		temp.a = 1f;
		ticketBtn.GetComponent<Image>().color = temp;
		ticketText.text = "Buy Ticket";
		plus.SetActive(true);
		minus.SetActive(true);
	}

	void SetupMenu(){
		Color temp = ticketBtn.GetComponent<Image>().color;
		temp.a = .5f;
		ticketBtn.GetComponent<Image>().color = temp;
		ticketText.text = "Ticket Purchased";
		plus.SetActive(false);
		minus.SetActive(false);
	}

	public void CheckNotification(){
		if (notify.isOn) SetNotification();
		else ClearNotifications();
	}

	void SetNotification(){
		if (GetActive() && notify.isOn){
			Debug.Log ("NOTIFICATIONS ON");
			UnityEngine.iOS.LocalNotification notification = new UnityEngine.iOS.LocalNotification();
			notification.fireDate = new System.DateTime(GetYear (), GetMonth(), GetDay(), GetHour(), 0, 0);
			notification.alertBody = "Company lottery winners have been announced! See what you won!";
			UnityEngine.iOS.NotificationServices.ScheduleLocalNotification(notification);
		}
	}

	void ClearNotifications(){
		Debug.Log ("NOTIFICATIONS OFF");
		UnityEngine.iOS.NotificationServices.CancelAllLocalNotifications();
	}

	void SetDay(System.DateTime date, int hour){
		int day = date.Day;
		int month = date.Month;
		int year = date.Year;
		string tempDay;
		string tempMonth;
		if (day < 10) tempDay = "0";
		else tempDay = "";
		if (month < 10) tempMonth = "0";
		else tempMonth = "";
		string tempString = string.Format("{0}{1}|{2}{3}|{4}|{5}|{6}", tempDay, day, tempMonth, month, year, hour, PlayerPrefs.GetString("lottery").Substring(13));
		PlayerPrefs.SetString("lottery", tempString);
	}

	int GetYear(){
		return int.Parse(PlayerPrefs.GetString("lottery").Substring(6, 4));
	}
	
	int GetDay(){
		return int.Parse(PlayerPrefs.GetString("lottery").Substring(0, 2));
	}
	
	int GetMonth(){
		return int.Parse(PlayerPrefs.GetString("lottery").Substring(3, 2));
	}
	
	int GetHour(){
		if (int.Parse(PlayerPrefs.GetString("lottery").Substring(11, 1)) == 0){
			return 8;
		}
		else return 20;
	}
	
	int GetInvested(){
		return int.Parse(PlayerPrefs.GetString("lottery").Substring(15));
	}

	bool GetActive(){
		if (int.Parse(PlayerPrefs.GetString("lottery").Substring(13, 1)) == 1){
			return true;
		}
		else return false;
	}
	
	void SetActive(){
		string tempString = string.Format("{0}{1}{2}", PlayerPrefs.GetString("lottery").Substring(0, 13), "1", PlayerPrefs.GetString("lottery").Substring(14));
		PlayerPrefs.SetString("lottery", tempString);
	}

	void SetCubeAmount(int amt){
		string tempString = string.Format("{0}{1}", PlayerPrefs.GetString("lottery").Substring(0, 15), amt);
		PlayerPrefs.SetString("lottery", tempString);
	}
}
