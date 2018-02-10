<?php 
add_theme_support( 'post-thumbnails' ); 

function res() {
    echo get_template_directory_uri();
}

function base_url() {
    bloginfo('url');
}