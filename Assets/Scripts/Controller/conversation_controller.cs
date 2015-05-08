using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class conversation_controller : MonoBehaviour {

	public GameObject display;
	public GameObject qDisplay;
	public GameObject a1Display;
	public GameObject a2Display;
	private ConversationNode currentNode;
	private Text qText;
	private Text a1Text;
	private Text a2Text;

	public class ConversationNode : MonoBehaviour{
		public string question;
		public string response1;
		public string response2;
		private ConversationNode leftNode;
		private ConversationNode rightNode;

		public ConversationNode(string q, string r1, string r2){
			question = q;
			response1 = r1;
			response2 = r2;
		}

		public void setLeft(ConversationNode left){
			leftNode = left;
		}

		public void setRight(ConversationNode right){
			rightNode = right;
		}

		public void setBoth(ConversationNode node){
			leftNode = node;
			rightNode = node;
		}

		public ConversationNode getLeft(){
			return leftNode;
		}

		public ConversationNode getRight(){
			return rightNode;
		}
	}

	void Awake(){
		currentNode = DefineTree(Application.loadedLevelName);
		if (currentNode != null){
			qText = qDisplay.GetComponent<Text>();
			a1Text = a1Display.GetComponent<Text>();
			a2Text = a2Display.GetComponent<Text>();
			displayText();
			openDialog();
		}
	}

	ConversationNode DefineTree(string levelname){
		switch(levelname){
		case "Level 1":
			return LevelOne();
		default:
			return null;
		}
	}

	ConversationNode LevelOne(){
		int random = Random.Range(12256, 2566891);
		ConversationNode head = new ConversationNode(System.String.Format("Hello, Subject #{0}!\nWe're glad you made it.\nDo you know why you're here?", random), "No", "Yes");
		ConversationNode oneA = new ConversationNode("Wonderful. Well, we'll get started in a moment- Right after you take your PEAS.", "Okay.", "What are PEAS?");
		head.setRight(oneA);
		ConversationNode oneB = new ConversationNode("Wonderful... You're here to help us find the evidence we need to complete our experiment.", "Tell me more.", "Cool");
		head.setLeft(oneB);
		ConversationNode twoA = new ConversationNode("You'll find out more as you go along- but first, you have to take your PEAS!", "Okay.", "What are PEAS?");
		oneB.setRight(twoA);
		oneB.setLeft(twoA);
		ConversationNode twoB = new ConversationNode("PEAS- Personality Examination Aptitude Surveys. They help us see how we'll you're doing.", "I hate tests.", "Okay, sure.");
		oneA.setRight(twoB);
		twoA.setRight(twoB);
		ConversationNode twoC = new ConversationNode("In case you were wondering, PEAS stands for Personality Examination Aptitude Surveys.", "I don't care.", "Nice.");
		oneA.setLeft (twoC);
		twoA.setLeft(twoC);
		ConversationNode threeA = new ConversationNode("So, are you ready to begin?", "Just start.", "Sure!");
		twoC.setBoth(threeA);
		twoB.setBoth(threeA);
		ConversationNode fourA = new ConversationNode("Question 1:\n What is your favorite color?", "Red", "Blue");
		threeA.setBoth(fourA);
		ConversationNode fiveA = new ConversationNode("Question 2:\n If you could be anywhere right now, where would you be?", "Right here.", "Somewhere else.");
		fourA.setBoth(fiveA);
		ConversationNode sixA = new ConversationNode("Question 3:\n You are in a truck filled with lima beans.\nDo you choose to partake in the pizza party?", "Yes.", "Um...");
		fiveA.setBoth(sixA);
		ConversationNode sevenA = new ConversationNode("Congratulations! You passed your first PEAS. The choices you made have been recorded permanently.", "Yay!", "Aww.");
		sixA.setBoth(sevenA);
		ConversationNode eightA = new ConversationNode("Instructions\nCOLLECT THE BLUE CUBE TO FINISH THE LEVEL\nCOLLECT (OPTIONAL) GOLD CUBES TO USE AS CHECKPOINTS\nTILT YOUR DEVICE TO MOVE.", "Sounds good.", "Whatever.");
		sevenA.setBoth(eightA);
		return head;
	}

	void displayText(){
		qText.text = currentNode.question;
		a1Text.text = currentNode.response1;
		a2Text.text = currentNode.response2;
	}

	void ChooseLeft(){
		if (currentNode.getLeft() == null) closeDialog();
		else currentNode = currentNode.getLeft();
		displayText();
	}

	void ChooseRight(){
		if (currentNode.getRight() == null) closeDialog();
		else currentNode = currentNode.getRight();
		displayText();
	}

	void openDialog(){
		display.SetActive(true);
		Time.timeScale = 0;
	}

	void closeDialog(){
		display.SetActive(false);
		Time.timeScale = 1;
	}
}
