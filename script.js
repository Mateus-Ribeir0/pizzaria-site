window.onscroll = function() {scrollFunction()}; 
    var navbar = document.getElementById("header");
    var headerHeight = navbar.offsetHeight;
    function scrollFunction() {
        if (window.pageYOffset <= headerHeight) {
            navbar.classList.add("sticky");
        } else {
            navbar.classList.remove("sticky");
        }
    }
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const target = document.querySelector(this.getAttribute('href'));
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });