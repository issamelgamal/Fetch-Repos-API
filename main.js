//main variables
let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

getButton.onclick = function(){
    getRepos();
}
//Get repos function
function getRepos(){ 
    // if value is empty
    if (theInput.value == ""){
        reposData.innerHTML = "<span>Please write Github User name</span>";
    }else {
        fetch(`https://api.github.com/users/${theInput.value}/repos`).then((response)=>{
            return response.json();
        })
        .then((repos)=>{
            //Empty the container
            reposData.innerHTML = '';
            //loop on repos 
            repos.forEach(repo =>{
                // create main div Element 
                let mainDiv = document.createElement("div");
                // create repo name text 
                let repoName = document.createTextNode(repo.name);
                //append text to main div
                mainDiv.appendChild(repoName);
                
                // create repo url 
                let theUrl = document.createElement('a');
                //create repo url text 
                let theUrlText = document.createTextNode("Visit")
                //append url text  to anchor tag
                theUrl.appendChild(theUrlText)
                //add hyper text Refrence "href"
                theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;
                // set attribute blank to open in another page
                theUrl.setAttribute('target','_blank')
                //append url anchor to main div
                mainDiv.appendChild(theUrl)
                // create stars count span 
                let StarsSpan = document.createElement("span");
                // create stars count text 
                let Starstext = document.createTextNode(`Stars ${repo.stargazers_count}`);
                //add Starstext  to StarsSpan
                StarsSpan.appendChild(Starstext)
                //append StarsSpan count  to main div
                mainDiv.appendChild(StarsSpan)
                //add class on main Div
                mainDiv.className = 'repo-box';
                //append main div to container
                reposData.appendChild(mainDiv);

            })
        })
    }
}