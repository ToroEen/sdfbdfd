function generate() {
  const codeblock = document.getElementById("code")
  const playground = document.getElementById("playground")
  const draggables = playground.querySelectorAll('.draggable')  
  var t = ""
  
  draggables.forEach(draggable => {
    if (draggable.querySelector("#input") !== null) {
      t = t + draggable.id + "[" + draggable.querySelector("#input").value + "]" + "||"
    }   
  })

  const data = t.split("||")
  var code = []
  var funcs = []

  function line(first, content) {
    const total = "$" + first + content
    var str = ""
    
    for (var i = 0; i < (total.length + 2); i++) {
      str += content.charAt(i)
      if (i == 75) {
        str += "\n"
      }
    }
    return str.replace("]", "\\]").replace("%{performer_userID}%", "$authorID").replace("%{mentioned_userID}%", "$mentioned[1]")
  }
  
  function generate(func, content, count) {
    var span1 = document.createElement('span');
    span1.className = "func"; 
    span1.innerText = `$${func}`;

    code.push(span1);
    if (content !== null) {
      var span2 = document.createElement('span');
      var span3 = document.createElement('span');
      var span4 = document.createElement('span');
      span2.className = "br";
      span2.innerText = "[";
      span3.className = `txt`;
      span3.innerText = line(func, content);
      span4.className = "br";
      span4.innerText = (count > 0 ? `;${count + 1}]` : "]") + "\n";
      code.push(span2);
      code.push(span3);
      code.push(span4);

      funcs.push("$" + func)
    }
  }
  
  for (const i of data) {    
    if (i.includes("b001c")) {    
      if (i.replace("b001c", "") !== "[]") {
        generate("title", i.replace("b001c[", "").slice(0, -1) + "", funcs.filter(x => x === "$title").length)
      }
    } else if (i.includes("b002c")) {    
      if (i.replace("b002c", "") !== "[]") {
        generate("description", i.replace("b002c[", "").slice(0, -1) + "", funcs.filter(x => x === "$description").length)
      }
    } else if (i.includes("b003c")) {    
      if (i.replace("b003c", "") !== "[]") {
        generate("footer", i.replace("b003c[", "").slice(0, -1) + "", funcs.filter(x => x === "$footer").length)
      }
    }
  }

  codeblock.querySelector("code").innerHTML = "";
  for (const i of code) {
    codeblock.querySelector("code").appendChild(i);
  }

  codeblock.classList.remove("hidden")
}  