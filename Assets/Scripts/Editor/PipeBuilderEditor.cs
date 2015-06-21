using UnityEngine;
using System.Collections;
using UnityEditor;

[CustomEditor(typeof(PipeBuilder))]
public class PipeBuilderEditor : Editor {

	public override void OnInspectorGUI(){
		DrawDefaultInspector();
		PipeBuilder builder = (PipeBuilder) target;
		EditorGUILayout.Space();
		if (GUILayout.Button("Up")){
			builder.Build(new Vector3(0, 1, 0));
		}
		EditorGUILayout.BeginHorizontal();
		if (GUILayout.Button("Left")){
			builder.Build(new Vector3(-1, 0, 0));
		}
		if (GUILayout.Button("Right")){
			builder.Build(new Vector3(1, 0, 0));
		}
		EditorGUILayout.EndHorizontal();
		if (GUILayout.Button("Down")){
			builder.Build(new Vector3(0, -1, 0));
		}
		EditorGUILayout.BeginHorizontal();
		if (GUILayout.Button("In")){
			builder.Build(new Vector3(0, 0, 1));
		}
		if (GUILayout.Button("Out")){
			builder.Build(new Vector3(0, 0, -1));
		}
		EditorGUILayout.EndHorizontal();
		EditorGUILayout.Space();
		if (GUILayout.Button ("Delete")){
			builder.Delete();
		}
		EditorGUILayout.Space();
		EditorGUILayout.BeginHorizontal();
		if (GUILayout.Button ("Scale Down")){
			builder.ScaleDown();
		}
		if (GUILayout.Button("Scale Up")){
			builder.ScaleUp();
		}
		EditorGUILayout.EndHorizontal();
	}
}
