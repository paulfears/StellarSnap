<!-- Footer.svelte -->
<div uk-sticky="position: bottom;">
    <p>footer</p>
</div>
<style>
    footer {
        background-color: #333;
        color: #fff;
        padding: 20px 0;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
    }

    .footer-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    nav ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    nav ul li {
        display: inline-block;
        margin-right: 20px;
    }

    nav ul li:last-child {
        margin-right: 0;
    }

    nav ul li a {
        color: #fff;
        text-decoration: none;
        transition: color 0.3s ease;
    }

    nav ul li a:hover {
        color: #ccc;
    }
</style>