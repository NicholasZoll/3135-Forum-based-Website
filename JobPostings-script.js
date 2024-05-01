"use strict";


document.addEventListener("DOMContentLoaded", function() {
    let savedPosts = sessionStorage.getItem("jobPosts"); //gets the saved posts from session storage
    if (savedPosts) { //if there are saved posts, it will display them
        document.querySelector(".job-posts").innerHTML = savedPosts;
    }

    let form = document.getElementById("new-job-form"); //selects the form for job posts
    form.addEventListener("submit", function(event) {
        createJobPosting(event);
    });


    let searchEvent = document.querySelector("input[name='search']"); //selects the search input field
    searchEvent.addEventListener("keyup", () => {
        search();
    });


    //ajax request to get the example item posts from the json file ItemList.json
    $.ajax({
        type: "get",
        url: "JobList.json",
        timeout: 10000,
        dataType: "json"
    })
    .done(
        function(data) {
            let jobPosts = $('.job-posts'); //selects the job-posts class
            data.jobposts.forEach(function(post) { // Loop through the posts in the JSON file
                jobPosts.append(`<div class="job-post">
                    <p class="post-title">${post.title}</p>
                    <p class="post-text">${post.description}</p>
                </div>`);
            });
    })
    .fail(function(xhr, status, error) { //if the ajax request fails, it will display an error message. It seems to not work using local file view, but works on live server. I have read that this is a common occurance for ajax requests viewed locally due to security reasons.
            alert("Ajax Error: " + xhr.status + " , " + error);
    });
});



function createJobPosting(event) {
    event.preventDefault(); //prevents the default action of the form submission
    // getting form values for job title and job description
    let title = document.querySelector("#job-title").value.trim();
    let description = document.querySelector("#job-description").value.trim();
    
    // checking if required fields are filled
    if (title === "" || description === "") {
        alert("Please fill out all required fields.");
        return;
    }
    
    // setting up template for inserting the user's job post
    let newPost = '<div class="job-post">' +
                    '<p class="post-title">' + title + '</p>' +
                    '<p class="post-text">' + description + '</p>' +
                '</div>';
    
    // using innerHTML to append new job post 
    document.querySelector(".job-posts").innerHTML = newPost + document.querySelector(".job-posts").innerHTML;
    
    // saving the job posts to session storage
    sessionStorage.setItem("jobPosts", document.querySelector(".job-posts").innerHTML);
    // clears the form by reseting it to default values
    document.getElementById("new-job-form").reset();
    
    toastr.success('Post Submitted Successfully!'); //displays success message using toastr
}



// function to handle the search feature, I used this resource as a reference to understand how similar implementations would work: https://www.geeksforgeeks.org/search-bar-using-html-css-and-javascript/
function search() {
    // sets the value in the searchbar to its equivalent lowercase value
    let input = document.getElementById('searchbar').value.toLowerCase();
    // gets all post-title elements so that it can be used to search for a match
    let x = document.getElementsByClassName('post-title');

    //looping through each post title for a match 
    for (let i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) //checking to see if the innerHTML of a post title includes the user's searched value
        {
            x[i].parentElement.style.display = "none"; //if it is not a match, it is hidden
        } else 
        {
            x[i].parentElement.style.display = "block"; //if it is a match, it is not hidden and its display layout is set to block
        }
    }
}