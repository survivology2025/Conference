// Improved mobile navigation toggle with accessibility and robust behavior
(function(){
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');

  // set year if element exists
  if (document.getElementById('year')) {
    document.getElementById('year').textContent = new Date().getFullYear();
  }

  if(!navToggle || !mainNav) return;

  // helper to set visible inline style
  function showNavInline(){
    // ensure visible and stack above
    mainNav.style.display = "flex";
    mainNav.style.flexDirection = "column";
    mainNav.style.zIndex = "9999";
  }
  function hideNavInline(){
    mainNav.style.removeProperty('display');
    mainNav.style.removeProperty('flex-direction');
    mainNav.style.removeProperty('z-index');
  }

  // close nav helper
  function closeNav(){
    mainNav.classList.remove('show');
    hideNavInline();
    navToggle.setAttribute('aria-expanded', 'false');
  }
  // open nav helper
  function openNav(){
    mainNav.classList.add('show');
    showNavInline();
    navToggle.setAttribute('aria-expanded', 'true');
  }

  // Toggle click: stop propagation so document click doesn't immediately close it
  navToggle.addEventListener('click', function(e){
    e.stopPropagation();
    if(mainNav.classList.contains('show')){
      closeNav();
    } else {
      openNav();
    }
  });

  // Close when clicking outside nav or toggle
  document.addEventListener('click', function(e){
    const target = e.target;
    if(!mainNav.contains(target) && target !== navToggle){
      closeNav();
    }
  });

  // Close nav when a link inside it is clicked (mobile navigation)
  Array.prototype.slice.call(mainNav.querySelectorAll('a')).forEach(function(a){
    a.addEventListener('click', function(){
      setTimeout(closeNav, 120);
    });
  });

  // Close on Escape
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' || e.key === 'Esc'){
      closeNav();
      navToggle.focus();
    }
  });

  // on resize, remove inline mobile nav if switching to desktop
  window.addEventListener('resize', function(){
    if(window.innerWidth > 900){
      mainNav.classList.remove('show');
      navToggle.setAttribute('aria-expanded','false');
      hideNavInline();
    }
  });
})();
