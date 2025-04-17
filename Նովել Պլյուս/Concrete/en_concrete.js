window.onload = function() {
    if (window.location.hash) {
        history.replaceState({}, document.title, window.location.pathname);
    }
    window.scrollTo(0, 0);
};


const languageItem = document.getElementById('language-item');
const languageModal = document.getElementById('language-modal');
const closeBtn = document.getElementById('close-btn');
const languageDropdown = document.getElementById('language-dropdown'); // Ensure this element exists

// Change color when clicked and held
languageItem.addEventListener('mousedown', () => {
    languageItem.style.color = 'rgb(123, 123, 123)'; // Change text color
});

// Revert color when click is released
languageItem.addEventListener('mouseup', () => {
    languageItem.style.backgroundColor = '#000000'; // Revert background color
    languageItem.style.color = 'white'; // Revert text color
});

// Ensure mobile users get the same effect
languageItem.addEventListener('touchstart', () => {
    languageItem.style.backgroundColor = 'rgb(38, 38, 38)';
    languageItem.style.color = 'rgb(123, 123, 123)';
});

languageItem.addEventListener('touchend', () => {
    languageItem.style.backgroundColor = '#000000';
    languageItem.style.color = 'white';
});

// Toggle dropdown visibility on click
languageItem.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevents closing immediately after opening
    if (languageDropdown.style.display === 'none' || languageDropdown.style.display === '') {
        languageDropdown.style.display = 'block';
    } else {
        languageDropdown.style.display = 'none';
    }
});



// Add event listener for click to toggle the dropdown visibility
languageItem.addEventListener('click', function (event) {
    event.stopPropagation(); // Prevents closing immediately after opening

    if (languageDropdown.classList.contains('active')) {
        // Animate closing (from up to down)
        languageDropdown.style.opacity = "0";
        languageDropdown.style.transform = "translateY(10px)"; // Move it upwards slightly

        // Wait for the transition to finish before hiding
        setTimeout(() => {
            languageDropdown.classList.remove('active');
            languageDropdown.style.display = "none"; // Hide the dropdown after animation
        }, 300); // Match the transition duration (300ms)
    } else {
        // Make visible and animate opening (from down to up)
        languageDropdown.style.display = "block"; // Ensure the dropdown is visible first
        setTimeout(() => {
            languageDropdown.classList.add('active');
            languageDropdown.style.opacity = "1";
            languageDropdown.style.transform = "translateY(0)"; // Move it to its original position
        }, 10); // Slight delay to trigger transition properly
    }
});

// Close the dropdown if clicking outside
document.addEventListener('click', (event) => {
    if (!languageItem.contains(event.target) && !languageDropdown.contains(event.target)) {
        if (languageDropdown.classList.contains('active')) {
            languageDropdown.style.opacity = "0";
            languageDropdown.style.transform = "translateY(10px)";
            setTimeout(() => {
                languageDropdown.classList.remove('active');
                languageDropdown.style.display = "none"; // Hide the dropdown after animation
            }, 300); // Wait for transition to complete before hiding
        }
    }
});


document.addEventListener("DOMContentLoaded", function () {
    // Search Bar Toggle
    const searchBoxContainer = document.getElementById('searchBoxContainer');
    const searchTrigger = document.getElementById('search-trigger');
    const sidebar = document.querySelector('.sidebar');
    const searchInput = document.getElementById('search');
    const suggestionsList = document.getElementById('suggestions');
    
    // Toggle Search Bar on click of Search Icon or Text
    searchTrigger.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default link behavior
        sidebar.classList.toggle('search-bar-active');
        document.getElementById('search').focus();
    });

    // Close Search Bar when clicking outside
    document.addEventListener('click', function (e) {
        if (!searchBoxContainer.contains(e.target) && !searchTrigger.contains(e.target)) {
            sidebar.classList.remove('search-bar-active');
        }
    });


    // List of stones for search suggestions
    const stones = [
        { name: "Տրավերտին", link: "/Տրավերտին/hy_travertine.html" },
        { name: "Բազալտ", link: "/Բազալտ/hy_basalt.html" },
        { name: "Սև տուֆ", link: "/Սև Տուֆ/hy_blacktuff.html" },
        { name: "Բեռնատար", link: "/Ծառայություն/hy_services.html" },
        { name: "Բետոնի Մեքենա", link: "/Ծառայություն/hy_services.html" },
        { name: "Այլ Քարեր", link: "/Մեր Մասին/hy_aboutus.html" },
        { name: "Քարեր", link: "/Քարեր/hy_stones.html" },
        { name: "Բետոն", link: "/Բետոն/hy_concrete.html" },
    
        // English
        { name: "Travertine", link: "/Travertine/en_travertine.html" },
        { name: "Basalt", link: "/Basalt/en_basalt.html" },
        { name: "Black Tuff", link: "/Black Tuff/en_blacktuff.html" },
        { name: "Truck", link: "/Services/en_services.html" },
        { name: "Concrete Truck", link: "/Services/en_services.html" },
        { name: "Other Stones", link: "/About us/en_aboutus.html" },
        { name: "Stones", link: "/Stones/en_stones.html" },
        { name: "Concrete", link: "/Concrete/en_concrete.html" },
    
        // Russian
        { name: "Травертин", link: "/Травертин/ru_travertine.html" },
        { name: "Базальт", link: "/Базальт/ru_basalt.html" },
        { name: "Черный Туф", link: "/Черный туф/ru_blacktuff.html" },
        { name: "Грузовик", link: "/Услуги/ru_services.html" },
        { name: "Бетономешалка", link: "/Услуги/ru_services.html" },
        { name: "Другие Камни", link: "/О нас/ru_aboutus.html" },
        { name: "Камни", link: "/Камни/ru_stones.html" },
        { name: "Бетон", link: "/Бетон/ru_concrete.html" }
    ];
    
    function showSuggestions() {
        const query = searchInput.value.trim().toLowerCase();  // Get the value and convert to lowercase
        suggestionsList.innerHTML = '';  // Clear any previous suggestions

        if (query.length > 0) {
            const filteredStones = stones.filter(stone => {
                return stone.name.toLowerCase().includes(query);  // Case-insensitive match
            });

            if (filteredStones.length > 0) {
                suggestionsList.style.display = 'block';  // Show suggestions
                filteredStones.forEach(stone => {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.textContent = stone.name;  // Add the stone name
                    a.href = stone.link;  // Link to stone's page
                    li.appendChild(a);
                    suggestionsList.appendChild(li);
                });
            } else {
                suggestionsList.style.display = 'none';  // No matches found
            }
        } else {
            suggestionsList.style.display = 'none';  // Hide suggestions if input is empty
        }
    }

    // Event listener to show suggestions on input
    searchInput.addEventListener('input', showSuggestions);

    // Hide suggestions when clicking outside
    document.addEventListener('click', function(event) {
        if (!searchInput.contains(event.target) && !suggestionsList.contains(event.target)) {
            suggestionsList.style.display = 'none';  // Hide suggestions
        }
    });


    // Event listener to show suggestions as the user types
    searchInput.addEventListener('input', showSuggestions);

});













document.addEventListener("DOMContentLoaded", () => {
    console.log("Website loaded successfully");

    // Get elements
    const languageItem_ph = document.getElementById('language-item_ph');
    const languageDropdown_ph = document.getElementById('language-dropdown_ph');

    languageItem_ph.addEventListener('click', (event) => {
        event.stopPropagation();
    
        if (languageDropdown_ph.classList.contains('active')) {
            // Dropdown is open, so close it and reset color
            languageDropdown_ph.classList.remove('active');
            languageItem_ph.style.color = 'white'; // Revert to white
        } else {
            // Open the dropdown and apply active color
            languageDropdown_ph.classList.add('active');
            languageItem_ph.style.color = 'rgb(123, 123, 123)';
        }
    });
    
    
    // Revert color to the previous one when clicked outside the language item or dropdown
    document.addEventListener('click', (event) => {
        if (!languageItem_ph.contains(event.target) && !languageDropdown_ph.contains(event.target)) {
            languageDropdown_ph.classList.remove('active');
            languageItem_ph.style.color = 'white'; // Revert to the original color
        }
    });

    // Handle active state for language item and navigation buttons
    navButtons_ph.forEach(button => {
        // Set initial color to white
        button.style.color = 'white';

        // On mouse down, change the color to rgb(123, 123, 123)
        button.addEventListener('mousedown', () => {
            button.style.color = 'rgb(123, 123, 123)'; // Change color to rgb(123, 123, 123) on click
        });

        // On mouse up, revert to white
        button.addEventListener('mouseup', () => {
            button.style.color = 'white'; // Revert to white color when click is released
        });

        // Optional: Reset color to white if clicked outside the button
        document.addEventListener('click', (event) => {
            if (!button.contains(event.target)) {
                button.style.color = 'white'; // Revert to the original color
            }
        });
    });
});

    
    document.addEventListener("DOMContentLoaded", () => {
        console.log("Website loaded successfully");
    
        // Get references to the input and suggestions list
        const searchInput_ph = document.getElementById('search_ph');
        const suggestionsList_ph = document.getElementById('suggestions_ph');
    
        // Define the array of stones
        const stones_ph = [
            { name: "Տրավերտին", link: "/Տրավերտին/hy_travertine.html" },
            { name: "Բազալտ", link: "/Բազալտ/hy_basalt.html" },
            { name: "Սև տուֆ", link: "/Սև Տուֆ/hy_blacktuff.html" },
            { name: "Բեռնատար", link: "/Ծառայություն/hy_services.html" },
            { name: "Բետոնի Մեքենա", link: "/Ծառայություն/hy_services.html" },
            { name: "Այլ Քարեր", link: "/Մեր Մասին/hy_aboutus.html" },
            { name: "Քարեր", link: "/Քարեր/hy_stones.html" },
            { name: "Բետոն", link: "/Բետոն/hy_concrete.html" },
        
            // English
            { name: "Travertine", link: "/Travertine/en_travertine.html" },
            { name: "Basalt", link: "/Basalt/en_basalt.html" },
            { name: "Black Tuff", link: "/Black Tuff/en_blacktuff.html" },
            { name: "Truck", link: "/Services/en_services.html" },
            { name: "Concrete Truck", link: "/Services/en_services.html" },
            { name: "Other Stones", link: "/About us/en_aboutus.html" },
            { name: "Stones", link: "/Stones/en_stones.html" },
            { name: "Concrete", link: "/Concrete/en_concrete.html" },
        
            // Russian
            { name: "Травертин", link: "/Травертин/ru_travertine.html" },
            { name: "Базальт", link: "/Базальт/ru_basalt.html" },
            { name: "Черный Туф", link: "/Черный туф/ru_blacktuff.html" },
            { name: "Грузовик", link: "/Услуги/ru_services.html" },
            { name: "Бетономешалка", link: "/Услуги/ru_services.html" },
            { name: "Другие Камни", link: "/О нас/ru_aboutus.html" },
            { name: "Камни", link: "/Камни/ru_stones.html" },
            { name: "Бетон", link: "/Бетон/ru_concrete.html" }
        ];        
    
        // Show suggestions based on input value
        function showSuggestions_ph() {
            const query = searchInput_ph.value.trim().toLowerCase(); // Get input and make it lowercase
            suggestionsList_ph.innerHTML = ''; // Clear previous suggestions
    
            if (query.length > 0) {
                const filteredStones = stones_ph.filter(stone =>
                    stone.name.toLowerCase().includes(query) // Case insensitive match
                );
    
                if (filteredStones.length > 0) {
                    suggestionsList_ph.style.display = 'block'; // Show suggestions
                    filteredStones.forEach(stone => {
                        const li = document.createElement('li');
                        const a = document.createElement('a');
                        a.textContent = stone.name;
                        a.href = stone.link;
                        li.appendChild(a);
                        suggestionsList_ph.appendChild(li);
                    });
                } else {
                    suggestionsList_ph.style.display = 'none'; // Hide suggestions if no matches
                }
            } else {
                suggestionsList_ph.style.display = 'none'; // Hide suggestions if input is empty
            }
        }
    
        // Add event listener to search input field to listen for user input
        searchInput_ph.addEventListener('input', showSuggestions_ph);
    
        // Hide suggestions when clicking outside the search input or suggestions list
        document.addEventListener('click', function(event) {
            if (!searchInput_ph.contains(event.target) && !suggestionsList_ph.contains(event.target)) {
                suggestionsList_ph.style.display = 'none'; // Hide suggestions
            }
        });
    
        // Prevent site zoom on search bar click (specific to mobile devices)
        searchInput_ph.addEventListener("focus", function() {
            document.body.style.zoom = "1"; // Prevent zoom
        });
    });
    document.addEventListener("DOMContentLoaded", function () {
        const callButton = document.querySelector(".call-button_ph");
    
        callButton.addEventListener("mousedown", function () {
            this.style.transform = "scale(0.95)";
        });
    
        const resetButton = () => {
            callButton.style.transform = "scale(1)";
            callButton.style.backgroundColor = "rgb(209, 129, 16)"; // Reset color
        };
    
        // Trigger reset when mouse is released
        callButton.addEventListener("mouseup", resetButton);
        
        // Ensure reset if mouse leaves the button
        callButton.addEventListener("mouseleave", resetButton);
    
        // Also reset when touch ends on mobile
        callButton.addEventListener("touchend", resetButton);
    });
    
    document.addEventListener("DOMContentLoaded", function () {
        const images = document.querySelectorAll(".gallery img");
    
        images.forEach(img => {
            img.addEventListener("click", function (event) {
                // Remove active class from all images first
                images.forEach(image => {
                    image.classList.remove("active");
                });
    
                // Add active class to the clicked image
                this.classList.add("active");
    
                // Stop event from propagating to document
                event.stopPropagation();
            });
        });
    
        // If user clicks anywhere outside images, reset all images
        document.addEventListener("click", function () {
            images.forEach(img => {
                img.classList.remove("active");
            });
        });
    });
        