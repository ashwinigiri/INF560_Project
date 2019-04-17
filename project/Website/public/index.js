
// All Global variables
var submitbtn = document.getElementById("myUL");
var divid = document.getElementById("divid");
var tablebody = document.getElementById('tbody');

var finalstr ="";
var finalstr1 ="";
var yearchecked = [];
var causename = [];
var deaths = [0,2712630];
var statename = '';

var user = firebase.auth().currentUser;
  
if(user != null){
  
        var email_id = user.email;
  
}


// var savesearch = document.getElementById("savesearch");

function myFunction() {
    var x = document.getElementById("myUL");
    x.style.display = "block";
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";

        }
    }
}

function clickfun(){
    year_object={};
    yearchecked =[];
    var yeararray = document.getElementsByName('yearname');
    for(b=0;b<yeararray.length;b++){
        if(yeararray[b].checked){
            yearchecked.push(yeararray[b].value);
        }
    } 
        if((yearchecked.length!=0) || (causename.length!=0)){
            submitFun();
        }
        else{
            submitlist(statename);
        }
}

function causeclick(){
    cause_object ={};
    causename =[];
    var cause = document.getElementsByName('causename');
    for(b=0;b<cause.length;b++){
        if(cause[b].checked){
            causename.push(cause[b].value);
        }
    }
        if((yearchecked.length!=0) || (causename.length!=0)){
            submitFun();
        }
        else{
            submitlist(statename);
        }
}


function submitlist(x){

    var modal1 = document.getElementById('myModal1');
    modal1.style.display = "none";

    finalstr ="";
    statename = x;
    // yearchecked = [];
    // causename = [];
    // deaths = [0,2712630];

    // document.getElementsByName('causename').checked = false;
    // document.getElementsByName('yearname').checked = false;
    // // document.getElementById("minlimit").value = undefined;
    // // document.getElementById("maxlimit").value = undefined;

    document.getElementById("myInput").value = statename;

    var tablehere = document.getElementById("displaytable");
    tablehere.innerHTML = "";
    // savesearch.style.display = "block";
    var y = document.getElementById("myUL");
    y.style.display = "none";

    var z = document.getElementById("facetdiv");
    z.style.display = "block";

    var savesearch = document.getElementById("savesearch");
    savesearch.style.display = "block";

    // alert('after facet display');
    var f = document.getElementById("displaytable");
    f.style.display = "block";

    submitFun();

    // var fireheadref = firebase.database().ref().child("state").child(x);
    // fireheadref.on('value', function(snapshot){
    //     ni = snapshot.val();
        
    //     var keysofobject = Object.keys(ni);
    //     for(h=keysofobject.length;h>0;h--){
    //         finalstr = "";
    //         var row = tablehere.insertRow(0);
    //         var cell1 = row.insertCell(0);
    //         finalstr = "<br><strong><a> Cause Name: </a></strong>"+((ni[h-1]).CauseName).toString()+"<br><strong><a> 113 Cause Name: </a></strong>"+((ni[h-1]).CauseName113).toString()+"<br><strong><a> Deaths: </a></strong>"+((ni[h-1]).Deaths).toString()+"<br><strong><a> Year: </a></strong>"+((ni[h-1]).Year).toString()+"<br><strong><a> Age Adjusted Death Rate: </a></strong>"+((ni[h-1]).AgeadjustedDeathRate).toString()+"<hr>";
    //         cell1.innerHTML = finalstr;
            
    //     }   
    // });  
}

function submitFun(){
    finalstr = "";
    var tablehere = document.getElementById("displaytable");
    tablehere.innerHTML = "";
    deaths = [0,2712630];

    var fireheadref = firebase.database().ref().child("state").child(statename);

    fireheadref.on('value', function(snapshot){
        var ni = snapshot.val();
        var finalcomplete = ni;

        if(document.getElementById('minlimit').value=="" && document.getElementById('minlimit').value==undefined && document.getElementById('maxlimit').value=="" && document.getElementById('maxlimit').value==undefined){
        }
        else{
            var mindeath = document.getElementById("minlimit").value;
            var maxdeath = document.getElementById("maxlimit").value;
            if(mindeath!=""){
                deaths[0] = parseInt(mindeath);
                deaths[1] = 2712630;
            }
            if(maxdeath!=""){
                deaths[0] = 0;
                deaths[1] = parseInt(maxdeath);
            }
            if(mindeath!="" && maxdeath!=""){
                deaths[0] = parseInt(mindeath);
                deaths[1] = parseInt(maxdeath);
            }
        }

        if(yearchecked.length!=0){
            var keys = Object.keys(finalcomplete);
            var temp ={};
            for(i=0;i<Object.keys(finalcomplete).length;i++){
                for(j=0;j<yearchecked.length;j++){
                    if(yearchecked[j]==(finalcomplete[(keys[i])]).Year){
                        temp[i] = finalcomplete[(keys[i])];
                    }
                }
            }
            finalcomplete = temp;
        }
        
        if(causename.length!=0){
            var keys = Object.keys(finalcomplete);
            var temp ={};
            for(i=0;i<Object.keys(finalcomplete).length;i++){
                for(j=0;j<causename.length;j++){
                    if(causename[j]==(finalcomplete[(keys[i])]).CauseName){
                        temp[i] = finalcomplete[(keys[i])];
                    }
                }
            }
            finalcomplete = temp;
        }

        if(deaths.length!=0){
            var keys = Object.keys(finalcomplete);
            var min = deaths[0];
            var max = deaths[1];
            var temp ={};
            for(i=0;i<Object.keys(finalcomplete).length;i++){
                var de = (finalcomplete[keys[i]]).Deaths;
                if(de>=min && de<=max){
                    temp[i] = finalcomplete[keys[i]];
                }
            }
            finalcomplete = temp;
        }


        var completable = finalcomplete;

        var keysofobject = Object.keys(completable);
        if(keysofobject.length!=0){
            for(h=keysofobject.length;h>=1;h--){
                finalstr = "";
                // var tablehere = document.getElementById("displaytable");
                var row = tablehere.insertRow(0);
                var cell1 = row.insertCell(0);
                finalstr = "<br><strong><a> State Name: </a></strong>"+((completable[keysofobject[h-1]]).State).toString()+"<br><strong><a> Cause Name: </a></strong>"+((completable[keysofobject[h-1]]).CauseName).toString()+"<br><strong><a> 113 Cause Name: </a></strong>"+((completable[keysofobject[h-1]]).CauseName113).toString()+"<br><strong><a> Deaths: </a></strong>"+((completable[keysofobject[h-1]]).Deaths).toString()+"<br><strong><a> Year: </a></strong>"+((completable[keysofobject[h-1]]).Year).toString()+"<br><strong><a> Age Adjusted Death Rate: </a></strong>"+((completable[keysofobject[h-1]]).AgeadjustedDeathRate).toString()+"<hr>";
                // finalstr = "<br><strong><a> Cause Name: </a></strong>"++"<br>Deaths: "+((completable[keysofobject[h-1]]).Deaths).toString()+"<br>Year: "+((completable[keysofobject[h-1]]).Year).toString()+"<hr>";
                cell1.innerHTML = finalstr;
                
            }
        }
        else{
            var row = tablehere.insertRow(0);
            var cell1 = row.insertCell(0);
            cell1.innerHTML = "No values found, Please select appropriate filters!!"
        }
    });
}

function profile(){
    var email = firebase.auth().currentUser.email;
}


    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("savesearch");

    var modal1 = document.getElementById('myModal1');

    // Get the button that opens the modal
    var btn1 = document.getElementById("myprof");

    // Get the <span> element that closes the modal
    // var span = document.getElementsByClassName("close")[0];

    var cl = document.getElementById("close");
    var cl1 = document.getElementById("close1");

    // When the user clicks the button, open the modal 
    btn.onclick = function() {
        modal.style.display = "block";
        var table = document.getElementById("savesearchtable");
        table.innerHTML = "";
        
    }

    btn1.onclick = function() {
        modal1.style.display = "block";
        var table = document.getElementById("savesearchtable");
        table.innerHTML = "";
    }

    // When the user clicks on <span> (x), close the modal
    // span.onclick = function() {
    //     modal.style.display = "none";
    //     modal1.style.display = "none";
    // }

    cl.onclick = function() {
        modal.style.display = "none";
        modal1.style.display = "none";
    }

    cl1.onclick = function() {
        modal.style.display = "none";
        modal1.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
        if (event.target == modal1) {
            modal1.style.display = "none";
        }

    }


function savesearch(){
    var table = document.getElementById("savesearchtable");
    table.innerHTML = "";
    finalstr1="";
    var email = firebase.auth().currentUser.email;
    var name = document.getElementById("searchname").value;
    var firebaseuser = firebase.database().ref().child("userdata");
    firebaseuser.push().set({
        emailid: email,
        searchtext: statename,
        searchname:name
      });
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
    document.getElementById("searchname").value = "";
}

function savedsearches(){
    finalstr1 = "";
    var fireheadref = firebase.database().ref().child("userdata");
    var email = firebase.auth().currentUser.email;
    var savesearch = [];
    var table = document.getElementById("savesearchtable");
    table.innerHTML = "";

    fireheadref.on('value', function(snapshot){
        var ni = snapshot.val();

        var keysofobject = Object.keys(ni);
        if(keysofobject.length!=0){
            for(h=keysofobject.length;h>=1;h--){
                if((ni[keysofobject[h-1]]).emailid == email){
                    finalstr1 = "";
                    // var tablehere = document.getElementById("displaytable");
                    var row = table.insertRow(0);
                    var cell1 = row.insertCell(0);
                    // finalstr1 = "<input type=\"submit\" onclick=\"submitlist('"+((ni[keysofobject[h-1]]).searchtext).toString()+"')\">"+((ni[keysofobject[h-1]]).searchname).toString();
                    finalstr1 = "<a href = \"#\" onclick=\"submitlist('"+((ni[keysofobject[h-1]]).searchtext).toString()+"')\">"+((ni[keysofobject[h-1]]).searchname).toString()+"</a>";
                    // finalstr1 = "<input type='submit' onclick='submitsave()'>"+((ni[keysofobject[h-1]]).searchname).toString();
                    //finalstr = "<br><strong><a> Cause Name: </a></strong>"++"<br>Deaths: "+((completable[keysofobject[h-1]]).Deaths).toString()+"<br>Year: "+((completable[keysofobject[h-1]]).Year).toString()+"<hr>";
                    cell1.innerHTML = finalstr1;
                }
                
            }
        }
        else{
            var row = table.insertRow(0);
            var cell1 = row.insertCell(0);
            cell1.innerHTML = "No saved searches"
        }

    });
}
