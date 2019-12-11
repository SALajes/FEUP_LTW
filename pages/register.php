<?php
    include_once('../session.php');
    include_once('../templates/temp_common.php');
    include_once('../templates/temp_message.php');

    if(isset($_SESSION['username'])) {
        die(header('Location: ../pages/profile.php'));
    }

    draw_black_header();
?>
    <link href="../css/loginregisterStyle.css" rel="stylesheet" >
    <div id="registerDiv">
        <section id="Main">
            <p id="firstSentence"><a>Register</a> now to find the vacation stay
                <span>that makes you feel like <a>home</a>.</span></p>
            <form action="/actions/resgister_action.php" method="POST">
                <input id="username" type="text" name="username" placeholder="USERNAME"> <br>
                <input id="name" type="text" name="name" placeholder="NAME"> <br>
                <input id="email" type="email" name="email" placeholder="EMAIL"> <br>
                <input id="password" type="password" name="password" placeholder="PASSWORD"> <br>
                <input id="submit" type="submit" value="REGISTER">
            </form>
            <p id="else">Already have an account?<span>
                <a href="login.php">Login</a> now to continue your search!</span></p>
        </section>
        <section id="Images">
                <div id="highlighted">
                    <img src="../icons/housemock2.jpg">
                </div>
                <div id="lessImportant">
                    <div id="small">
                        <img src="../icons/housemock1.jpeg">
                    </div>
                    <div id="medium">
                        <img src="../icons/housemock.jpg">
                    </div>
                </div>
        </section>
    </div>
<?php
    if(isset($_SESSION['messages'])) {
        $type = $_SESSION['messages'][0]['type'];
        $content = $_SESSION['messages'][0]['content'];

        draw_message($type, $content);
    }
?>
<?php 
    draw_footer();
    unset($_SESSION['messages']);
?>