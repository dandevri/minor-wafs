# Assignment 3

Websites run **client side** or **server side**, client side refers
to the browser that renders the script. Most of the client side development is
done in JavaScript. JavaScript is called a client side language[1] because it runs
on your computer after you've loaded the page. HTML elements get dynamically added to
the document.

Developing web apps with client side rendering has many advantages. Below are some pros
and cons for using vanilla JavaScript for developing Web Apps. [2]

>Client-side rendering is when the client-side environment is used to run scripting. The source code is transferred from the web server to the user’s device and then run, typically in a browser.

>Server-side rendering is when the web server runs the scripting language. The web server runs the script to create dynamic HTML pages which are then sent to the client’s browser.

---

## Pros
* When you have a big userbase and many people people interact *at the same time* with your site
client-side renders faster in the browser.
* The **initial load** of the page is much faster because there is just 1 request.
* Because the document is already by the client you can **cache** it better.
* Only update *(get required data)* when needed, reduces **latency**.


## Cons
* Because its purely JavaScript based, the app crashes if JavaScript is **disabled**.
* From a marketing perspective it's complex to do **SEO** because HTML elements are dynamic. [3]
* A SPA can get heavy in files which impacts the experience on mostly **mobile devices**. [4]
* The browser stores the history when the user clicks **back**. The application will need to store in the cache. [5]

Amen. 🙏

[1]: http://www.codeconquest.com/website/client-side-vs-server-side/
[2]: https://staceylearnscode.wordpress.com/2015/04/22/client-side-rendering-pros-and-cons/
[3]: https://www.quora.com/What-are-the-pros-and-cons-of-client-side-rendering
[4]: https://stackoverflow.com/questions/21862054/single-page-application-advantages-and-disadvantages
[5]: http://adamsilver.io/articles/the-disadvantages-of-single-page-applications/
