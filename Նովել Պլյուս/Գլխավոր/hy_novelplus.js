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
        { name: "Տրավերտին", link: "travertine.html" },
        { name: "Բազալտ", link: "basalt.html" },
        { name: "Սև տուֆ", link: "black-tuff.html" },
        { name: "Basalt", link: "basalt.html" },
        { name: "Travertine", link: "travertine.html" },
        { name: "Black Tuff", link: "black-tuff.html" },
        { name: "Базальт", link: "basalt.html" },
        { name: "Черный Туф", link: "black-tuff.html" },
        { name: "Травертин", link: "travertine.html" },
        { name: "Բեռնատար", link: "truck.html" },
        { name: "Բետոնի Մեքենա", link: "concrete-truck.html" },
        { name: "Այլ Քարեր", link: "other-stones.html" },
        { name: "Քարեր", link: "other-stones.html" },
        { name: "Բետոն", link: "concrete.html" },
        { name: "Truck", link: "truck.html" },
        { name: "Concrete Truck", link: "concrete-truck.html" },
        { name: "Other Stones", link: "other-stones.html" },
        { name: "Stones", link: "other-stones.html" },
        { name: "Concrete", link: "concrete.html" },
        { name: "Грузовик", link: "truck.html" },
        { name: "Бетономешалка", link: "concrete-truck.html" },
        { name: "Другие Камни", link: "other-stones.html" },
        { name: "Камни", link: "other-stones.html" },
        { name: "Бетон", link: "concrete.html" }
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

    // Toggle dropdown visibility when language item is clicked
    languageItem_ph.addEventListener('click', (event) => {
        event.stopPropagation();
        languageDropdown_ph.classList.toggle('active');

        // Change the color of the language item to rgb(123, 123, 123) when clicked
        languageItem_ph.style.color = 'rgb(123, 123, 123)';
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
            { name: "Տրավերտին", link: "travertine.html" },
            { name: "Բազալտ", link: "basalt.html" },
            { name: "Սև տուֆ", link: "black-tuff.html" },
            { name: "Basalt", link: "basalt.html" },
            { name: "Travertine", link: "travertine.html" },
            { name: "Black Tuff", link: "black-tuff.html" },
            { name: "Базальт", link: "basalt.html" },
            { name: "Черный Туф", link: "black-tuff.html" },
            { name: "Травертин", link: "travertine.html" },
            { name: "Բեռնատար", link: "truck.html" },
            { name: "Բետոնի Մեքենա", link: "concrete-truck.html" },
            { name: "Այլ Քարեր", link: "other-stones.html" },
            { name: "Քարեր", link: "other-stones.html" },
            { name: "Բետոն", link: "concrete.html" },
            { name: "Truck", link: "truck.html" },
            { name: "Concrete Truck", link: "concrete-truck.html" },
            { name: "Other Stones", link: "other-stones.html" },
            { name: "Stones", link: "other-stones.html" },
            { name: "Concrete", link: "concrete.html" },
            { name: "Грузовик", link: "truck.html" },
            { name: "Бетономешалка", link: "concrete-truck.html" },
            { name: "Другие Камни", link: "other-stones.html" },
            { name: "Камни", link: "other-stones.html" },
            { name: "Бетон", link: "concrete.html" }
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

