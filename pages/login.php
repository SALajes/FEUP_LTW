<?php 
    include_once('../session.php');
    include_once('../templates/temp_common.php');
    include_once('../templates/temp_message.php');

    if(isset($_SESSION['username'])) {
        die(header('Location: ../pages/profile.php'));
    }

    draw_black_header('');
    draw_style('messages');
    draw_style('loginregisterStyle');
    draw_style('inputStyle');
?>  
    <div>
        <section id="Main">
            <p id="firstSentence">Find the best deal...<span>... for the perfect <a>house</a>.</span></p>
            <form action="../actions/login_action.php" method="POST">
                <input type="text" name="user" placeholder="USERNAME">
                <input type="password" name="pass" placeholder="PASSWORD">
                <input type="submit" value="LOGIN">
            </form>
            <?php
                if(isset($_SESSION['messages'])) {
                    $type = $_SESSION['messages'][0]['type'];
                    $content = $_SESSION['messages'][0]['content'];

                    draw_message($type, $content);
                }
            ?>        
            <p id="else">Are you new here? <span>
                <a href="register.php">Register</a> now to find the perfect stay! </span></p>
        </section>
        <section id="Images">
            <div id="highlighted">
                <img src="../icons/housemock.jpg" alt="Image of a house">
            </div>
            <div id="lessImportant">
                <div id="small">
                    <img src="../icons/housemock1.jpeg" alt="Image of a house">
                </div>
                <div id="medium">
                    <img src="../icons/housemock2.jpg" alt="Image of a house">
                </div>
            </div>
        </section>
    </div>
<?php 
    draw_footer();
    unset($_SESSION['messages']);
?>