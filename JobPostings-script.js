"use strict";


document.addEventListener("DOMContentLoaded", function() {
    let elem = document.querySelector("button[name='createJobSubmit']");
    elem.addEventListener("click", createJobPosting);


    let searchEvent = document.querySelector("input[name='search']");
    searchEvent.addEventListener("keyup", () => {
        search();
    });
});


function createJobPosting() {
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
    document.querySelector(".job-posts").innerHTML += newPost;
    
    // clears the form by reseting it to default values
    document.getElementById("new-job-form").reset();
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