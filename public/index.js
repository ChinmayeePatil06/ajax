let con=document.getElementById("container");
let btn=document.getElementById("btn");
let form_div=document.getElementById("form-div");
let close=document.getElementById("close");

btn.addEventListener("click",function()
{
    form_div.style.display="block";
    document.body.classList.add("dark-background");
    let overlay = document.createElement("div");
    overlay.classList.add("dark-overlay");
    document.body.appendChild(overlay);
});

close.addEventListener("click",function()
{
    form_div.style.display="none";
    document.body.classList.remove("dark-background");
    let overlay = document.querySelector(".dark-overlay");
    if (overlay) {
      overlay.parentNode.removeChild(overlay);
    }
});

let users=[
    {
        "Name": "John Doe",
        "E-mail":"john.doe@gmail.com",
        "Designation":"Student",
        "Organization":"MIT",
        "City":"New York"
    },
    {
        "Name": "Jane Smith",
        "E-mail":"jane.smith@gmail.com",
        "Designation":"Student",
        "Organization":"MIT",
        "City":"New York"
    }
];
let div;

localStorage.setItem("users",JSON.stringify(users));

users.forEach(user => {
    let div = document.createElement("div");
    div.innerHTML = `
        <p>Name: ${user.Name}</p>
        <p>E-mail: ${user["E-mail"]}</p>
        <p>Designation: ${user.Designation}</p>
        <p>Organization: ${user.Organization}</p>
        <p>City: ${user.City}</p>
        <hr>`; 
    container.appendChild(div); 
});

let form=document.getElementById("form");

form.addEventListener("submit",function(event)
{
    event.preventDefault();

    let xhr=new XMLHttpRequest();
    let name=document.getElementById("name").value;
    let mail=document.getElementById("mail").value;
    let des=document.getElementById("des").value;
    let org=document.getElementById("org").value;
    let city=document.getElementById("city").value;

    xhr.open("POST","/submit");

    xhr.onload=function()
    {
        if(xhr.status==200 && xhr.readyState==4)
        {
            users.push(
                {
                    "Name": name,
                    "E-mail":mail,
                    "Designation":des,
                    "Organization":org,
                    "City":city
                }
            );
            localStorage.setItem("users",JSON.stringify(users));
            let div = document.createElement("div");
            div.innerHTML = `
                <p>Name: ${name}</p>
                <p>E-mail: ${mail}</p>
                <p>Designation: ${des}</p>
                <p>Organization: ${org}</p>
                <p>City: ${city}</p>
                <hr>`; 
            container.appendChild(div); 
        }
    }

    xhr.send();
    close.click();
})