<?php
    include_once('../templates/temp_common.php');
    include_once('../templates/temp_search.php');

    draw_black_header();
    draw_style('search');
    draw_style('inputStyle');
    draw_style('templateHouseStyle');
    draw_script('search_houses');
    draw_search();
    draw_footer();
?>