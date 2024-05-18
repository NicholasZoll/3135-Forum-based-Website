"use strict";


document.addEventListener("DOMContentLoaded", function() {
    let savedMCPosts = sessionStorage.getItem("mcPosts"); //gets the saved posts from session storage
    if (savedMCPosts) { //if there are saved posts, it will display them
        document.querySelector(".ms-posts").innerHTML = savedMCPosts;
    }


    //let elem3 = document.querySelector("button[name='createMSPost']");
    //elem3.addEventListener("click", createMSPosting);

    let elem3 = document.getElementById("new-ms-form"); //selects the form for missed connection posts
    elem3.addEventListener("submit", function(event) {
        createMSPosting(event);
    });

    let searchMSEvent = document.querySelector("input[name='search']");
    searchMSEvent.addEventListener("keyup", () => {
        searchConnections();
    });

    $("#dialog-container").dialog({
        autoOpen: false, // dialog will not open by default
        modal: true, // dialog will act like modal, so user cannot interact with the page unless they close dialog
        buttons: {
            "OK": function() {
                $(this).dialog("close"); // closes dialog
            }
        }
    });
});



function createMSPosting(event) {
    event.preventDefault(); //prevents the default action of the form submission
    // getting form values for title, description, and image URL if applicable
    let title = document.querySelector("#ms-title").value.trim();
    let description = document.querySelector("#ms-description").value.trim();
    let imageUrl = document.querySelector("#ms-image-url").value.trim(); 
    
    // checking if required fields are filled
    if (title === "" || description === "") {
        $("#dialog-container").dialog("open"); // Open the dialog using the container
        return;
    }
    
    // setting up template for inserting the user's missed connection post
    let msPost = '<div class="ms-post">' +
                    '<h3>' + title + '</h3>' +
                    '<p>Description: ' + description + '</p>' +
                    '<img src="' + imageUrl + '">' +
                '</div>';
    
    
    // using innerHTML to append new missed connection post 
    document.querySelector(".ms-posts").innerHTML = msPost + document.querySelector(".ms-posts").innerHTML;
    
    // saving the missed connection posts to session storage
    sessionStorage.setItem("mcPosts", document.querySelector(".ms-posts").innerHTML);

    // clears the form by reseting it to default values
    document.getElementById("new-ms-form").reset();
}


// function to handle the search feature, I used this resource as a reference to understand how similar implementations would work: https://www.geeksforgeeks.org/search-bar-using-html-css-and-javascript/
function searchConnections() {
    // sets the value in the searchbar to its equivalent lowercase value
    let input = document.getElementById('searchbar').value.toLowerCase();
    // gets all post elements so that it can be used to search for a match
    let items = document.querySelectorAll('.ms-post'); 

    items.forEach(function(item) { //looping through each post title for a match 
        let title = item.querySelector('h3').textContent.toLowerCase(); // get the title of the item post
        if (title.includes(input)) // if the post title is a match to the user's search input
        { 
            item.style.display = "block"; //if it is a match, it is not hidden and its display layout is set to block
        } 
        else 
        {
            item.style.display = "none"; //if it is not a match, it is hidden from user's view
        }
    });
}