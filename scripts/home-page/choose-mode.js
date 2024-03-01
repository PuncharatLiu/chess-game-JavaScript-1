const pwcBtn = document.getElementById("pwc");
const pwfBtn = document.getElementById("pwf");
const paBtn = document.getElementById("pa");

pwcBtn.addEventListener("click", pwc);

pwfBtn.addEventListener("click", pwf);

paBtn.addEventListener("click", pa);

function pwc(){
  // localStorage.setItem("mode", "pwc");
  window.location.href = "./html/pwc.html?mode=pwc";
}

function pwf(){
  // localStorage.setItem("mode", "pwf");
  window.location.href = "./html/pwc.html?mode=pwf";
}

function pa(){
  window.location.href = "./html/pa.html?mode=pa";
}