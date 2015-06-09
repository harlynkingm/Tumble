#pragma strict

var mat : Material;
private var background : GameObject;

function Start () {
	background = new GameObject();
	background.name = "Background";
	var mesh : Mesh = new Mesh();
	var filter : MeshFilter = background.AddComponent(MeshFilter);
	var renderer : MeshRenderer = background.AddComponent(MeshRenderer);
	var nodePositions : Vector3[] = new Vector3[transform.childCount];
	for (var i : int = 0; i < transform.childCount; i++){
		nodePositions[i] = transform.GetChild(i).position;
		GameObject.Destroy(transform.GetChild(i).gameObject);
	}
	mesh = CreateMesh(nodePositions);
	renderer.material = mat;
	filter.mesh = mesh;
}

function OnDrawGizmosSelected(){
	Gizmos.color = Color.white;
	var mesh : Mesh = new Mesh();
	var nodePositions : Vector3[] = new Vector3[transform.childCount];
	for (var i : int = 0; i < transform.childCount; i++){
		nodePositions[i] = transform.GetChild(i).position;
		}
	mesh = CreateMesh(nodePositions);
	Gizmos.DrawMesh(mesh);
}

function CreateMesh(nodePositions : Vector3[]){

	var x : int; //Counter
 
    //Create a new mesh
    var mesh : Mesh = new Mesh();
   
    //Vertices
    var vertex = new Vector3[nodePositions.length];
   
    for(x = 0; x < nodePositions.length; x++)
    {
        vertex[x] = nodePositions[x];
    }
   
    //UVs
    var uvs = new Vector2[vertex.length];
   
    for(x = 0; x < vertex.length; x++)
    {
        if((x%2) == 0)
        {
            uvs[x] = Vector2(0,0);
        }
        else
        {
            uvs[x] = Vector2(1,1);
        }
    }
   
    //Triangles
    var tris = new int[3 * (vertex.length - 2)];    //3 verts per triangle * num triangles
    var C1 : int;
    var C2 : int;
    var C3 : int;
   
    C1 = 0;
    C2 = 1;
    C3 = 2;
   
    for(x = 0; x < tris.length; x+=3)
    {
        tris[x] = C1;
        tris[x+1] = C2;
        tris[x+2] = C3;
       
        C2++;
        C3++;
    }
   
    //Assign data to mesh
    mesh.vertices = vertex;
    mesh.uv = uvs;
    mesh.triangles = tris;
   
    //Recalculations
    mesh.RecalculateNormals();
    mesh.RecalculateBounds();  
    mesh.Optimize();
   
    //Name the mesh
    mesh.name = "MyMesh";
   
    //Return the mesh
    return mesh;
}