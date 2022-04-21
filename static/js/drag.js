function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) { 
  ev.dataTransfer.setData("text/html", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  
  var data = ev.dataTransfer.getData("text/html");
  const target = ev.target

  if (target.nodeName === "TEXTAREA") {
    if (document.getElementById(data).id === "b004") {
      target.value += "%{performer_userID}%"
    } else if (document.getElementById(data).id === "b005") {
      target.value += "%{mentioned_userID}%"
    }
    document.removeChild(document.getElementById(data))
  } else if (target.nodeName === "DIV") {
    data = data.replace("c", "")
    const nodeCopy = document.getElementById(data).cloneNode(true);
      
    nodeCopy.id = document.getElementById(data).id + "c"; 
    ev.target.appendChild(nodeCopy);
  }
}

function del(ev) {
  ev.preventDefault();
  var element = document.getElementById(ev.dataTransfer.getData("text/html"));

  if (element.id.includes("c")) {
    element.parentNode.removeChild(element);
  }
}