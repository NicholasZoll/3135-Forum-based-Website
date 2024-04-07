"use strict";


document.addEventListener("DOMContentLoaded", function() {
    let elem2 = document.querySelector("button[name='createItemSubmit']");
    elem2.addEventListener("click", createItemPosting);


    let searchItemEvent = document.querySelector("input[name='search']");
    searchItemEvent.addEventListener("keyup", () => {
        searchItems();
    });


    $('img')
    .wrap('<span style="display:inline-block"></span>')
    .css('display', 'block')
    .parent()
    .zoom(); // using the zoom library to allow for zooming in on images when clicked on
});





// Function to apply zoom functionality to images NEWNEW
function applyZoom() {
    $('img').each(function() {
        $(this).wrap('<span style="display:inline-block"></span>')
               .css('display', 'block')
               .parent()
               .zoom();
    });
}

function createItemPosting() {
    // getting form values for item title, item description, item price, and item image urls if they are entered
    let title = document.querySelector("#item-title").value.trim();
    let description = document.querySelector("#item-description").value.trim();
    let price = document.querySelector("#item-price").value.trim();
    let imageUrls = document.querySelector("#item-image-urls").value.trim().split(','); // Get the image URLs as an array

    // check if files were dragged and dropped
    let filesUploaded = false;
    let fileInputs = document.querySelectorAll('input[type="file"]'); // grabs all file-type input elements on the page
    
    // loops through each file input to check if files were uploaded
    fileInputs.forEach(function(fileInput) {
        if (fileInput.files.length > 0) { //checks if the current file input has any files
            filesUploaded = true; // sets filesUploaded to true to signify that there is at least one file uploaded
        }
    });
    

    // if at least one file has been uploaded, it will call handleFiles function which will then handle creating the post.
    if (filesUploaded) {
        handleFiles();
        return;
    }

    // check to see if required fields are filled
    if (title === "" || description === "" || price === "") {
        alert("Please fill out all required fields of title, description, and price.");
        return;
    }

    if (imageUrls.length === 1) //if only one image url has been entered
    {       // setting up template for inserting the user's item post
            let itemPost = '<div class="item-post">' +
            '<h3>' + title + '</h3>' +
            '<p>Description: ' + description + '</p>' +
            '<p>Price: ' + price + '</p>' +
            '<img src="' + imageUrls + '">' +
            '</div>';

        // using innerHTML to append new item post 
        document.querySelector(".item-grid").innerHTML += itemPost;

        // clears the form by reseting it to default values
        document.getElementById("new-item-form").reset();
    }
    else //if more than one image URL has been entered
    {
        // setting up template for inserting the user's item post
        let itemPost = '<div class="item-post">' +
                        '<h3>' + title + '</h3>' +
                        '<p>Description: ' + description + '</p>' +
                        '<p>Price: ' + price + '</p>' +
                        '<div class="image-gallery">'; // setting up image gallery

        // loop to go through each image URL
        for (let i = 0; i < imageUrls.length; i++) {
            let imageUrl = imageUrls[i].trim();
            if (imageUrl !== "") {
                itemPost += '<img src="' + imageUrl + '">'; // adding image to the image gallery of the post
            }
        }

        itemPost += '</div>' + // closing div of image gallery
                '</div>'; // closing div of the post

        // using innerHTML to append new item post 
        document.querySelector(".item-grid").innerHTML += itemPost;

        // clears the form by reseting it to default values
        document.getElementById("new-item-form").reset();
    }
    // Reinitialize the zoom plugin for all images
    setTimeout(applyZoom, 100);
}




// function to handle the search feature, I used this resource as a reference to understand how similar implementations would work: https://www.geeksforgeeks.org/search-bar-using-html-css-and-javascript/
function searchItems() {
    // sets the value in the searchbar to its equivalent lowercase value
    let input = document.getElementById('searchbar').value.toLowerCase();
    // gets all post  elements so that it can be used to search for a match
    let items = document.querySelectorAll('.item-post'); 

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

// function for if image files are uploaded to the form post.
// I was not familiar with the syntax of handling files in Javascript, but have dones so in C# and Java. I used these resources to learn more about how to do it in Javascript: https://www.digitalocean.com/community/tutorials/js-file-reader, https://stackoverflow.com/questions/40902437/cant-use-foreach-with-filelist, and ChatGPT for syntax questions regarding the file reader.
function handleFiles() {
    // gets values from the form
    let title = document.querySelector("#item-title").value.trim();
    let description = document.querySelector("#item-description").value.trim();
    let price = document.querySelector("#item-price").value.trim();
    let files = []; //empty array for files for now

    // checking for fields being filled
    if (title === "" || description === "" || price === "") {
        alert("Please fill out all required fields of title, description, and price.");
        return;
    }

    // grabs all file-type input elements on the page
    const fileInputs = document.querySelectorAll('input[type="file"]');

    // loops through each file input
    fileInputs.forEach(function(fileInput) {
        for (let i = 0; i < fileInput.files.length; i++) {
            files.push(fileInput.files[i]); //pushes it to the files array
        }
    });
    

    // setting up template for inserting the user's item post
    let itemPost = '<div class="item-post">' +
        '<h3>' + title + '</h3>' +
        '<p>Description: ' + description + '</p>' +
        '<p>Price: ' + price + '</p>' +
        '<div class="image-gallery">'; // setting up image gallery

    // looping through each file in files array
    files.forEach((file, index) => {
        const reader = new FileReader(); //creating FileReader object to read file content

        // helps with processing the file content to be used later
        reader.onload = function () {
            // setting up img html, using the file's data as the image url and the alt information as the file name
            itemPost += `<img src="${reader.result}" alt="${file.name}">`;

            // if its the last image, close the div of the gallery and append the post
            if (index === files.length - 1) {
                itemPost += '</div>'; // end of image gallery div

                // create post by appending it using innerHTML
                document.querySelector(".item-grid").innerHTML += itemPost;

                // clearing the form field by resetting it to default
                document.getElementById("new-item-form").reset();
            }
        };

        reader.readAsDataURL(file); // used to read the file as a data url
    });
    
    setTimeout(applyZoom, 100);
}



