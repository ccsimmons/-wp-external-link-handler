/**
 * wp-external-link-handler.js
 * ---------------------
 * Author: csimmons
 * Description:
 * This script detects external links on the page and:
 * - Adds rel="nofollow noopener noreferrer"
 * - Appends a Font Awesome external link icon with a tooltip ("Opens External Link")
 * - Displays a confirmation dialog before navigating away from the site
 * - Skips mailto:, tel:, and javascript: links
 * 
 * Created: 03.25.2025
 * Last updated: 03.31.2025
 */

// Function to check if a URL is external
function isExternalLink(url) {
  try {
    const parsedUrl = new URL(url, window.location.href);
    return (
      parsedUrl.protocol.startsWith('http') &&
      parsedUrl.host !== window.location.host
    );
  } catch (e) {
    return false;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a[href]');

  links.forEach(link => {
    const href = link.getAttribute('href');

    // Skip mailto:, tel:, and javascript: links
    if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
      return;
    }

    if (isExternalLink(href)) {
      // Add rel attributes
      link.setAttribute('rel', 'nofollow noopener noreferrer');

      // Append external link icon if not already added
      if (!link.querySelector('.fa-external-link')) {
        const icon = document.createElement('i');
        icon.className = 'fa fa-external-link';
        icon.setAttribute('aria-hidden', 'true');
        icon.setAttribute('title', 'Opens External Link'); // Tooltip on hover
        icon.style.marginLeft = '0.25rem';
        link.appendChild(icon);
      }

      // Confirmation dialog
      link.addEventListener('click', function (event) {
        const message = `The link you have selected is located on another server:\n\n${link.href}\n\nThis link leaves the website of the Foundation for Atlanta Veterans Education and Research (FAVER). The appearance of this hyperlink does not constitute endorsement by FAVER of this website or the information, products or services contained therein.\n\nPlease click "Ok" to leave this website and proceed to the selected site.`;

        if (!confirm(message)) {
          event.preventDefault();
        }
      });
    }
  });
});
