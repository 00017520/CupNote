const form = document.getElementById("loginForm");

form.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); 
    submitLoginForm();
  }
});

async function submitLoginForm(){
    const formData=new FormData(form);
    const {username, password} = Object.fromEntries(formData.entries());


    await fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username, password})
    }).then((res)=>{
        if(res.ok){
            window.location='/dashboard'
        }
    }).catch((err)=>{
        console.error(err);
        alert("An error occurred while logging in. Please try again.");
    })
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
      submitLoginForm();
    }
}